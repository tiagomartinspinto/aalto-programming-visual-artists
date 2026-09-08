import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { loadCourseData } from "./course-data-loader.mjs";
import { startStaticServer } from "./static-server.mjs";

const root = process.cwd();
const explicitSiteUrl = process.env.PVA_SITE_URL;
const expectedYearSections = ["current-session", "web-sketches", "lab", "sessions", "slides", "assignments", "comparison"];
const viewports = [{ width: 1280, height: 800 }, { width: 820, height: 900 }, { width: 390, height: 844 }];

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error("Playwright is required for this smoke test. Install it with `npm install --save-dev playwright`.");
    process.exit(1);
  }
}

// --- Academic-year discovery -------------------------------------------------
// Future years need no changes here: each published years/YYYY-YYYY/ folder is
// discovered from the repository itself, and expected counts come from its
// own course-data.js rather than being hard-coded per year.

function isDirectory(filePath) {
  try {
    return statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function discoverYears() {
  const yearsRoot = path.join(root, "years");
  if (!isDirectory(yearsRoot)) return [];
  const names = readdirSync(yearsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{4}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  return names.map((year) => {
    const yearPath = path.join(yearsRoot, year);
    const data = loadCourseData(path.join(yearPath, "course-data.js")) || {};
    const sessionsCount = (data.sessions || []).length;
    const sketchesCount = (data.sketches || []).length;
    const slidesCount = (data.slides || []).length;
    return {
      year,
      urlPath: `/years/${year}/`,
      yearPath,
      data,
      sessionsCount,
      sketchesCount,
      slidesCount,
      hasLab: existsSync(path.join(yearPath, "web", "lab.html")),
      isEmpty: sessionsCount === 0 && sketchesCount === 0 && slidesCount === 0,
    };
  });
}

// Newest (last, since YYYY-YYYY sorts chronologically) year matching `predicate`.
function findNewest(years, predicate) {
  for (let index = years.length - 1; index >= 0; index -= 1) {
    if (predicate(years[index])) return years[index];
  }
  return null;
}

// A sketch "animates" here if it defines draw(), does not immediately stop
// its own loop, and changes state on its own each frame (frameCount, or a
// "+=" accumulation not derived from the pointer position) rather than only
// redrawing in response to mouse movement the headless test never sends.
function findAnimatedSketch(yearInfo) {
  for (const sketch of yearInfo.data.sketches || []) {
    const sketchJsPath = path.join(yearInfo.yearPath, "web", sketch.id, "sketch.js");
    if (!existsSync(sketchJsPath)) continue;
    const source = readFileSync(sketchJsPath, "utf8");
    if (!/function\s+draw\s*\(/.test(source) || /\bnoLoop\s*\(/.test(source)) continue;
    const usesFrameCount = /frameCount/.test(source);
    const hasSelfDrivenIncrement = /[\w$.]+\s*\+=\s*(?![^;\n]*\bmouse[XY]\b)[^;\n]+;/.test(source);
    if (usesFrameCount || hasSelfDrivenIncrement) return sketch;
  }
  return null;
}

// --- Small assertion helpers --------------------------------------------------

async function expectCount(page, selector, expected, label) {
  const count = await page.locator(selector).count();
  if (count !== expected) throw new Error(`${label} expected exactly ${expected}, found ${count}`);
}

async function expectAtLeastCount(page, selector, minimum, label) {
  const count = await page.locator(selector).count();
  if (count < minimum) throw new Error(`${label} expected at least ${minimum}, found ${count}`);
}

async function expectNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));
  if (overflow.documentWidth > overflow.viewport + 1 || overflow.bodyWidth > overflow.viewport + 1) {
    throw new Error(`${label} has horizontal overflow: viewport ${overflow.viewport}, document ${overflow.documentWidth}, body ${overflow.bodyWidth}`);
  }
}

async function expectCanvasChanges(locator, label) {
  const handle = await locator.elementHandle({ timeout: 10000 });
  const changed = await handle.evaluate(async (canvas) => {
    const context = canvas.getContext("2d");
    if (!context) return false;
    const sample = () => canvas.toDataURL("image/png");
    const before = sample();
    await new Promise((resolve) => setTimeout(resolve, 700));
    return before !== sample();
  });
  if (!changed) throw new Error(`${label} did not visibly animate`);
}

function expectSectionOrder(structure, label) {
  const actual = JSON.stringify(structure.sections);
  const expected = JSON.stringify(expectedYearSections);
  if (actual !== expected) throw new Error(`${label} section order changed: ${actual}`);
}

function withoutCounts(structure) {
  return {
    ...structure,
    fallbackLinks: structure.fallbackLinks.map((link) => ({
      href: link.href.replace(/session-\d+\.pdf$/, "session-NN.pdf"),
      target: link.target,
      rel: link.rel,
    })).slice(0, 1),
    enhancedOptions: structure.enhancedOptions.length ? ["0..n"] : [],
  };
}

function expectSameStructure(left, right, label) {
  const normalizedLeft = JSON.stringify(withoutCounts(left));
  const normalizedRight = JSON.stringify(withoutCounts(right));
  if (normalizedLeft !== normalizedRight) {
    throw new Error(`${label} structures drifted:\n${normalizedLeft}\n${normalizedRight}`);
  }
}

let server = null;
const baseUrl = explicitSiteUrl || (server = await startStaticServer({ rootDir: root, preferredPort: 8123 })).url;

function site(urlPath) {
  return new URL(urlPath, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).toString();
}

// --- Page-level checks ---------------------------------------------------

async function yearStructure(page, urlPath) {
  await page.goto(site(urlPath), { waitUntil: "domcontentloaded" });
  return page.evaluate(() => {
    const className = (element) => [...element.classList].sort().join(".");
    const childSignature = (selector) => {
      const element = document.querySelector(selector);
      return element ? [...element.children].map((child) => `${child.tagName.toLowerCase()}#${child.id || ""}.${className(child)}`) : [];
    };
    return {
      sections: [...document.querySelectorAll("main > section")].map((section) => section.id).filter(Boolean),
      navHrefs: [...document.querySelectorAll(".topbar nav a")].map((link) => link.getAttribute("href")),
      searchFilters: [...document.querySelectorAll("[data-search-type]")].map((button) => button.dataset.searchType),
      currentSessionChildren: childSignature(".current-session-card"),
      courseSearchChildren: childSignature(".course-search"),
      slideReaderChildren: childSignature(".slides-reader"),
      slideControlsChildren: childSignature(".slide-controls"),
      slideViewerChildren: childSignature(".slide-viewer"),
      slideViewerBarChildren: childSignature(".slide-viewer-bar"),
      slideActionsChildren: childSignature(".slide-actions"),
      pdfPanelChildren: childSignature(".pdf-panel"),
      assignmentGridTag: document.querySelector("#assignments .feature-grid")?.tagName.toLowerCase() || "",
      sessionsGridTag: document.querySelector("#sessions .sessions")?.tagName.toLowerCase() || "",
      footerChildren: childSignature("footer.footer"),
      fallbackLinks: [...document.querySelectorAll(".slide-fallback-list a")].map((link) => ({
        href: link.getAttribute("href"),
        target: link.getAttribute("target"),
        rel: link.getAttribute("rel"),
      })),
      enhancedOptions: [...document.querySelectorAll("#slide-select option")].map((option) => option.value),
      shortcutButtons: [...document.querySelectorAll(".slide-buttons, .slide-picker")].map((element) => ({
        tag: element.tagName.toLowerCase(),
        visible: Boolean(element.offsetParent),
      })),
    };
  });
}

async function noJsYearStructure(browser, urlPath) {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const structure = await yearStructure(page, urlPath);
  await context.close();
  return structure;
}

async function checkCardCounts(page, yearInfo) {
  await page.goto(site(yearInfo.urlPath), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", yearInfo.sketchesCount, `${yearInfo.year} sketch cards`);
  await expectCount(page, ".session-card", yearInfo.sessionsCount, `${yearInfo.year} session cards`);
}

// A generic search check: every sketch title is guaranteed present in its
// own year's search index, so no year-specific search term needs hard-coding.
async function checkSearch(page, yearInfo) {
  if (yearInfo.sketchesCount === 0) return;
  const term = yearInfo.data.sketches[0].title.split(" ")[0];
  await page.goto(site(yearInfo.urlPath), { waitUntil: "domcontentloaded" });
  await page.locator("#course-search-input").fill(term);
  await page.locator('[data-search-type="sketch"]').click();
  await expectAtLeastCount(page, ".search-result-link", 1, `${yearInfo.year} sketch search for "${term}"`);
}

async function expectSlideReader(page, yearInfo) {
  const { year, slidesCount } = yearInfo;
  await page.goto(site(yearInfo.urlPath), { waitUntil: "domcontentloaded" });

  const heading = await page.locator("#slides h2").textContent();
  if (heading?.trim() !== "Slide Decks") throw new Error(`${year} must label the PDF section as Slide Decks`);
  if ((await page.locator(".slides-reader").getAttribute("aria-label")) !== "Slide deck selector") {
    throw new Error(`${year} Slide Decks panel has the wrong aria label`);
  }
  if ((await page.locator("#slide-frame").count()) !== 0) throw new Error(`${year} still uses a year-level PDF iframe`);

  if (slidesCount === 0) {
    // A newly scaffolded year must not pretend to have slide decks yet.
    if ((await page.locator("#slide-select").count()) !== 0) {
      throw new Error(`${year} should not show a slide selector with zero slide decks`);
    }
    const message = (await page.locator("#slide-panel-message").textContent())?.trim();
    if (!message) throw new Error(`${year} is missing a placeholder Slide Decks message`);
    return;
  }

  await expectCount(page, "#slide-select option", slidesCount, `${year} slide deck options`);
  await expectCount(page, "#slide-direct-link", 1, `${year} direct PDF link`);
  await expectCount(page, "#slide-panel-message", 1, `${year} PDF fallback message`);
  await expectCount(page, ".pdf-panel", 1, `${year} PDF panel`);
  if (!(await page.locator("#slide-select").isVisible())) throw new Error(`${year} enhanced slide select is not visible`);
  if ((await page.locator(".slide-buttons, .slide-picker").count()) !== 0) {
    throw new Error(`${year} still renders shortcut slide buttons after JavaScript enhancement`);
  }

  const direct = page.locator("#slide-direct-link");
  if ((await direct.getAttribute("target")) !== "_blank") throw new Error(`${year} direct PDF link does not open in a new tab`);
  const relAttr = await direct.getAttribute("rel");
  if (!relAttr?.includes("noopener") || !relAttr.includes("noreferrer")) {
    throw new Error(`${year} direct PDF link is missing rel safety attributes`);
  }
  const fallback = await page.locator("#slide-panel-message").textContent();
  if (!fallback?.includes("browsers block embedded PDF readers")) {
    throw new Error(`${year} fallback message does not explain blocked embedded PDF readers`);
  }

  const expectedLastPdf = `session-${String(slidesCount).padStart(2, "0")}.pdf`;
  await page.locator("#slide-select").selectOption(String(slidesCount - 1));
  const finalPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
  if (!finalPath.endsWith(`/slides/${expectedLastPdf}`)) throw new Error(`${year} direct PDF link did not update to ${expectedLastPdf}`);

  await page.locator("#slide-select").selectOption("0");
  if (slidesCount > 1) {
    await page.locator("#next-slide-deck").click();
    const nextPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
    if (!nextPath.endsWith("/slides/session-02.pdf")) throw new Error(`${year} next deck button did not advance to session-02.pdf`);
    await page.locator("#prev-slide-deck").click();
    const previousPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
    if (!previousPath.endsWith("/slides/session-01.pdf")) throw new Error(`${year} previous deck button did not return to session-01.pdf`);
  }
  await page.locator("#prev-slide-deck").click();
  const wrappedPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
  if (!wrappedPath.endsWith(`/slides/${expectedLastPdf}`)) throw new Error(`${year} previous deck button did not wrap to ${expectedLastPdf}`);
}

async function checkFallbackSlideList(browser, yearInfo, viewport) {
  const { year, urlPath, slidesCount } = yearInfo;
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  try {
    await page.goto(site(urlPath), { waitUntil: "domcontentloaded" });
    if (slidesCount === 0) {
      if ((await page.locator(".slide-controls a[href$='.pdf']").count()) !== 0) {
        throw new Error(`${year} no-JS fallback should not list slide decks when there are none`);
      }
    } else {
      await expectCount(page, ".slide-controls a[href$='.pdf']", slidesCount, `${year} fallback slide links`);
      if (!(await page.locator(".slide-controls").isVisible())) throw new Error(`${year} fallback slide controls are not visible without JavaScript`);
      if (!(await page.locator(".slide-controls a[href$='.pdf']").first().isVisible())) {
        throw new Error(`${year} first fallback slide link is not visible without JavaScript`);
      }
      if ((await page.locator("#slide-select").count()) !== 0) throw new Error(`${year} enhanced slide select should not exist before JavaScript runs`);
      for (let index = 1; index <= slidesCount; index += 1) {
        const href = `slides/session-${String(index).padStart(2, "0")}.pdf`;
        const link = page.locator(`.slide-controls a[href="${href}"]`);
        if ((await link.count()) !== 1) throw new Error(`${year} fallback slide list is missing ${href}`);
        if ((await link.getAttribute("target")) !== "_blank") throw new Error(`${year} fallback ${href} does not open in a new tab`);
        const relAttr = await link.getAttribute("rel");
        if (!relAttr?.includes("noopener") || !relAttr.includes("noreferrer")) {
          throw new Error(`${year} fallback ${href} is missing rel safety attributes`);
        }
      }
    }
    await expectNoHorizontalOverflow(page, `${year} no-JS ${viewport.width}px`);
  } finally {
    await context.close();
  }
}

async function checkResponsiveSlideControls(page, yearInfo, viewport) {
  const { year, urlPath, slidesCount } = yearInfo;
  await page.setViewportSize(viewport);
  await page.goto(site(urlPath), { waitUntil: "domcontentloaded" });
  if (slidesCount > 0) {
    if (!(await page.locator("#slide-select").isVisible())) throw new Error(`${year} ${viewport.width}px slide select is not visible`);
    const fits = await page.locator(".slides-reader").evaluate((reader) => {
      const controls = reader.querySelector(".slide-controls");
      return reader.scrollWidth <= reader.clientWidth + 1 && (!controls || controls.scrollWidth <= controls.clientWidth + 1);
    });
    if (!fits) throw new Error(`${year} ${viewport.width}px slide controls overflow their panel`);
  }
  await expectNoHorizontalOverflow(page, `${year} JS ${viewport.width}px`);
}

async function expectSessionPdfPanel(page, urlPath, label, hasSlideDeck) {
  await page.goto(site(urlPath), { waitUntil: "domcontentloaded" });
  if ((await page.locator("iframe[src$='.pdf']").count()) !== 0) throw new Error(`${label} still embeds a PDF iframe`);
  if (!hasSlideDeck) return; // this session honestly has no slide deck yet; nothing further to check
  await expectCount(page, ".slides-panel", 1, `${label} PDF panel`);
  const link = page.locator(".slides-panel a");
  if ((await link.getAttribute("target")) !== "_blank") throw new Error(`${label} PDF link does not open in a new tab`);
  const relAttr = await link.getAttribute("rel");
  if (!relAttr?.includes("noopener") || !relAttr.includes("noreferrer")) throw new Error(`${label} PDF link is missing rel safety attributes`);
}

async function checkSessionPdfPanel(page, yearInfo) {
  if (yearInfo.sessionsCount === 0) return;
  const sessions = yearInfo.data.sessions;
  const target = sessions.find((session) => session.id === yearInfo.data.currentSession?.id) || sessions[sessions.length - 1];
  if (!target?.href) return;
  const hasSlideDeck = existsSync(path.join(yearInfo.yearPath, "slides", `${target.id}.pdf`));
  await expectSessionPdfPanel(page, `${yearInfo.urlPath}${target.href}`, `${yearInfo.year} session slides`, hasSlideDeck);
}

async function expectHomeMetadata(page) {
  await expectCount(page, ".footer .footer-note", 1, "homepage footer authorship note");
  if ((await page.locator(".site-note").count()) !== 0) {
    throw new Error("homepage still presents authorship as a large site-note block");
  }
  const note = (await page.locator(".footer .footer-note").textContent())?.trim() || "";
  if (!note.includes("Authored and maintained by Tiago Martins Pinto") ||
      !note.includes("not an official Aalto University publication") ||
      note.length > 180) {
    throw new Error("homepage authorship note is missing or too prominent");
  }
}

// --- Historical regression test ----------------------------------------------
// Pinned to one known year/sketch instead of the generic discovery above,
// because it checks one exact interaction (a mouse click recoloring the
// canvas) that was true for this sketch when the Lab test was first written.
// Future years are not required to reproduce this exact behavior; if this
// fixture is ever removed, the check quietly skips instead of failing.
async function checkBouncingBallLabRegression(browser) {
  const year = "2025-2026";
  const yearPath = path.join(root, "years", year);
  if (!existsSync(path.join(yearPath, "web", "lab.html")) || !existsSync(path.join(yearPath, "web", "bouncing-ball", "sketch.js"))) {
    return;
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(site(`/years/${year}/web/lab.html?sketch=bouncing-ball`), { waitUntil: "domcontentloaded" });
    await page.waitForSelector("canvas", { timeout: 10000 });
    const code = page.locator("#code");
    await code.fill(`${await code.inputValue()}\nfunction mousePressed() { background(255, 0, 0); }`);
    await page.locator("#run-button").click();
    await page.waitForSelector("canvas", { timeout: 10000 });
    if (!(await page.locator("#status").textContent()).includes("Your sketch is running")) {
      throw new Error(`${year} bouncing-ball Lab regression: edited sketch did not report as running`);
    }
  } finally {
    await context.close();
  }
}

// --- Historical regression test ----------------------------------------------
// Pinned to one known year/sketch, not the generic discovery above: this
// guards a specific past bug where circleSize/squareSize were declared
// `const` in the p5.js sketch while the worksheet instructed students to
// reassign them (e.g. `circleSize = map(mouseX, 0, width, 10, 120);`),
// which threw "Assignment to constant variable." on every animation frame.
// Future years are not required to reproduce this exact scenario; if this
// fixture is ever removed, the check quietly skips instead of failing.
async function checkMouseShapesReassignmentRegression(browser) {
  const year = "2026-2027";
  const yearPath = path.join(root, "years", year);
  if (!existsSync(path.join(yearPath, "web", "lab.html")) || !existsSync(path.join(yearPath, "web", "mouse-shapes", "sketch.js"))) {
    return;
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(site(`/years/${year}/web/lab.html?sketch=mouse-shapes`), { waitUntil: "domcontentloaded" });
    await page.waitForSelector("canvas", { timeout: 10000 });
    const code = page.locator("#code");
    await code.fill(`${await code.inputValue()}\nfunction draw() { circleSize = map(mouseX, 0, width, 10, 120); background(220); }`);
    await page.locator("#run-button").click();
    await page.waitForTimeout(500);
    const status = (await page.locator("#status").textContent()) || "";
    if (status.includes("constant variable") || !status.includes("Your sketch is running")) {
      throw new Error(`${year} mouse-shapes Lab regression: reassigning circleSize inside draw() did not run cleanly: "${status}"`);
    }
  } finally {
    await context.close();
  }
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  const years = discoverYears();
  if (!years.length) throw new Error("No published academic years found under years/ to test.");

  await page.goto(site("/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, "h1", 1, "homepage h1");
  await expectHomeMetadata(page);

  // Generic checks that apply to every published year, whether it is a
  // mature year with course material or a freshly scaffolded empty one.
  for (const yearInfo of years) {
    const enhanced = await yearStructure(page, yearInfo.urlPath);
    expectSectionOrder(enhanced, `${yearInfo.year} enhanced`);
    if (enhanced.shortcutButtons.length) {
      throw new Error(`${yearInfo.year} enhanced Slide Decks controls must not render per-session shortcut buttons`);
    }

    const noJs = await noJsYearStructure(browser, yearInfo.urlPath);
    expectSectionOrder(noJs, `${yearInfo.year} no-JS`);

    await checkCardCounts(page, yearInfo);
    await checkSearch(page, yearInfo);
    await expectSlideReader(page, yearInfo);
    await checkSessionPdfPanel(page, yearInfo);

    for (const viewport of viewports) {
      await checkFallbackSlideList(browser, yearInfo, viewport);
      await checkResponsiveSlideControls(page, yearInfo, viewport);
    }
  }

  // Cross-year structural consistency: mature years (real sessions, sketches,
  // and slides) should share the same shared-UI structure. An empty
  // scaffolded year is not held to this - it has nothing to render yet.
  const matureYears = years.filter((y) => y.sessionsCount > 0 && y.sketchesCount > 0 && y.slidesCount > 0);
  if (matureYears.length > 1) {
    const [reference, ...rest] = matureYears;
    const referenceEnhanced = await yearStructure(page, reference.urlPath);
    const referenceNoJs = await noJsYearStructure(browser, reference.urlPath);
    for (const other of rest) {
      const enhanced = await yearStructure(page, other.urlPath);
      expectSameStructure(referenceEnhanced, enhanced, `Enhanced year page (${reference.year} vs ${other.year})`);
      const noJs = await noJsYearStructure(browser, other.urlPath);
      expectSameStructure(referenceNoJs, noJs, `No-JavaScript year page (${reference.year} vs ${other.year})`);
    }
  }

  // Deep behavioral checks that need real course material: dynamically pick
  // the newest year with the required feature instead of hard-coding one.
  const animatedYear = findNewest(years, (y) => Boolean(findAnimatedSketch(y)));
  if (animatedYear) {
    const sketch = findAnimatedSketch(animatedYear);
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(site(animatedYear.urlPath), { waitUntil: "domcontentloaded" });
    await page.locator('nav a[href="#web-sketches"]').click();
    const card = page.locator(`[data-sketch-id="${sketch.id}"]`);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const preview = card.locator("iframe");
    if ((await preview.getAttribute("sandbox")) !== "allow-scripts") {
      throw new Error(`${animatedYear.year} sketch preview iframe sandbox changed`);
    }
    await expectCanvasChanges(page.frameLocator(`[data-sketch-id="${sketch.id}"] iframe`).locator("canvas"), `${animatedYear.year} ${sketch.title} preview`);
  } else {
    console.warn("No animated sketch found across published years; skipping the canvas-animation check.");
  }

  const labYear = findNewest(years, (y) => y.hasLab);
  if (labYear) {
    const defaultSketchId = labYear.data.lab?.defaultSketch || labYear.data.sketches?.[0]?.id;
    await page.goto(site(`${labYear.urlPath}web/lab.html${defaultSketchId ? `?sketch=${defaultSketchId}` : ""}`), { waitUntil: "domcontentloaded" });
    await page.waitForSelector("canvas", { timeout: 10000 });
    const code = page.locator("#code");
    await code.fill(`${await code.inputValue()}\nfunction draw() { background(0); }`);
    await page.locator("#run-button").click();
    await page.waitForSelector("canvas", { timeout: 10000 });
    if (!(await page.locator("#status").textContent()).includes("Your sketch is running")) {
      throw new Error(`${labYear.year} Lab did not report the edited sketch as running`);
    }

    // A runtime error thrown inside draw() happens on p5's own animation
    // frame, outside the synchronous try/catch around sketch construction -
    // assets/lab.js must catch it at the callback boundary instead, or the
    // canvas freezes silently while the status bar keeps claiming the sketch
    // is running. Deterministic because the thrown message is fixed by this
    // test, not by inspecting console output.
    await code.fill(`${await code.inputValue()}\nfunction draw() { throw new Error("Smoke test draw error"); }`);
    await page.locator("#run-button").click();
    await page.waitForTimeout(500);
    const errorStatus = (await page.locator("#status").textContent()) || "";
    if (!errorStatus.includes("Smoke test draw error") || errorStatus.includes("Your sketch is running")) {
      throw new Error(`${labYear.year} Lab did not report a runtime error thrown inside draw(): "${errorStatus}"`);
    }
    await page.waitForTimeout(800);
    const stillErrorStatus = (await page.locator("#status").textContent()) || "";
    if (!stillErrorStatus.includes("Smoke test draw error") || stillErrorStatus.includes("Your sketch is running")) {
      throw new Error(`${labYear.year} Lab falsely reported "running" again after a runtime error: "${stillErrorStatus}"`);
    }
    await page.locator("#reset-button").click();
    await page.waitForTimeout(300);
    if (!(await page.locator("#status").textContent()).includes("Your sketch is running")) {
      throw new Error(`${labYear.year} Lab did not recover to "running" after Reset`);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(site(labYear.urlPath), { waitUntil: "domcontentloaded" });
    if (!(await page.locator('nav a[href="#lab"]').isVisible())) {
      throw new Error(`${labYear.year} mobile year navigation is not visible`);
    }
  } else {
    console.warn("No published year has a Lab page yet; skipping the Lab regression check.");
  }

  await checkBouncingBallLabRegression(browser);
  await checkMouseShapesReassignmentRegression(browser);

  console.log("Browser smoke test passed.");
} finally {
  await browser.close();
  if (server) await server.close();
}
