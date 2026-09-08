(function () {
  const data = window.COURSE_DATA || {};
  const lab = data.lab || {};
  const select = document.querySelector("#sketch-select");
  const preview = document.querySelector("#preview");
  const code = document.querySelector("#code");
  const status = document.querySelector("#status");
  const title = document.querySelector("#sketch-title");
  const meta = document.querySelector("#sketch-meta");
  const openPage = document.querySelector("#open-page");
  const openSource = document.querySelector("#open-source");
  const fileWarning = document.querySelector("#file-warning");
  const params = new URLSearchParams(window.location.search);
  const isFileMode = window.location.protocol === "file:";
  let currentSketch = null;
  let originalCode = "";
  let activeP5 = null;

  const courseSketches = (data.sketches || []).map((sketch) => ({
    id: sketch.id,
    title: sketch.title,
    session: sketch.session,
    path: sketch.path || `${sketch.id}/sketch.js`,
    page: sketch.page ? sketch.page.replace(/^web\//, "") : sketch.page,
    source: sketch.source ? `../${sketch.source}` : sketch.source,
    notes: sketch.notes || sketch.try || sketch.description || "Try a small change, then run the sketch again.",
  }));

  if (isFileMode && fileWarning) {
    fileWarning.hidden = false;
  }

  function writeStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("error", isError);
  }

  // Wraps a student-defined p5 callback (setup, draw, mousePressed, ...) so
  // that a runtime error thrown while it runs is reported in the status bar
  // instead of failing silently. p5 calls draw() on its own animation loop,
  // outside the synchronous try/catch below, so this is the only place that
  // can catch an error there. Once one callback fails, every other wrapped
  // callback becomes a no-op (and the loop stops) until the student presses
  // Run or Reset, so a broken sketch does not keep re-reporting the same
  // error on every frame or click.
  function wrapCallback(p, runState, name, fn) {
    return (...args) => {
      if (runState.failed) return;
      try {
        return fn.apply(p, args);
      } catch (error) {
        runState.failed = true;
        writeStatus(`Error in ${name}(): ${error.message}`, true);
        if (typeof p.noLoop === "function") p.noLoop();
      }
    };
  }

  function render(codeText) {
    if (activeP5) {
      activeP5.remove();
      activeP5 = null;
    }

    preview.innerHTML = '<div id="sketch" class="sketch-mount"></div>';
    const mount = preview.querySelector("#sketch");
    writeStatus("Running your sketch with the local p5.js runtime...");

    const runState = { failed: false };

    try {
      activeP5 = new p5((p) => {
        const install = new Function("p", "wrapCallback", "runState", [
          "with (p) {",
          codeText,
          "if (typeof preload === 'function') p.preload = wrapCallback(p, runState, 'preload', preload);",
          "if (typeof setup === 'function') p.setup = wrapCallback(p, runState, 'setup', setup);",
          "if (typeof draw === 'function') p.draw = wrapCallback(p, runState, 'draw', draw);",
          "if (typeof mousePressed === 'function') p.mousePressed = wrapCallback(p, runState, 'mousePressed', mousePressed);",
          "if (typeof keyPressed === 'function') p.keyPressed = wrapCallback(p, runState, 'keyPressed', keyPressed);",
          "}",
        ].join("\n"));
        install(p, wrapCallback, runState);
      }, mount);
      if (!runState.failed) {
        writeStatus("Your sketch is running. Your edits stay in this browser.");
      }
    } catch (error) {
      writeStatus(`Error: ${error.message}`, true);
    }
  }

  function showLoadProblem(error) {
    const message = isFileMode
      ? "This browser blocked the course sketch code because the Lab was opened as a local file. Use the GitHub Pages site or start a local server, then open the Lab again."
      : `The course sketch code could not be loaded: ${error.message}`;

    if (activeP5) {
      activeP5.remove();
      activeP5 = null;
    }

    preview.innerHTML = [
      '<div class="load-message">',
      "<strong>Course sketch code did not load.</strong>",
      `<span>${message}</span>`,
      "</div>",
    ].join("");
    code.value = [
      `// ${message}`,
      `// Sketch file: ${currentSketch.path}`,
      "// Your browser has not loaded editable course code yet.",
    ].join("\n");
    writeStatus(message, true);
  }

  async function loadSketch(id) {
    currentSketch = courseSketches.find((sketch) => sketch.id === id) || courseSketches[0];
    select.value = currentSketch.id;
    title.textContent = currentSketch.title;
    meta.textContent = `${currentSketch.session}. ${currentSketch.notes}`;
    openPage.href = currentSketch.page || "#";
    openSource.href = currentSketch.source || "#";
    writeStatus("Loading the sketch code...");
    history.replaceState(null, "", `?sketch=${currentSketch.id}`);
    try {
      const response = await fetch(currentSketch.path);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      originalCode = await response.text();
      code.value = originalCode;
      render(originalCode);
    } catch (error) {
      originalCode = "";
      showLoadProblem(error);
    }
  }

  function init() {
    if (!select || !preview || !code || !status || !title || !meta || !openPage || !openSource) return;
    if (!courseSketches.length) {
      writeStatus("No editable course sketches are listed for this Lab yet.", true);
      document.querySelector("#run-button")?.setAttribute("disabled", "");
      document.querySelector("#reset-button")?.setAttribute("disabled", "");
      return;
    }

    for (const sketch of courseSketches) {
      const option = document.createElement("option");
      option.value = sketch.id;
      option.textContent = `${sketch.session} - ${sketch.title}`;
      select.append(option);
    }

    select.addEventListener("change", () => loadSketch(select.value));
    document.querySelector("#run-button")?.addEventListener("click", () => render(code.value));
    document.querySelector("#reset-button")?.addEventListener("click", () => {
      code.value = originalCode;
      render(originalCode);
    });

    loadSketch(params.get("sketch") || lab.defaultSketch || courseSketches[0].id);
  }

  init();
})();
