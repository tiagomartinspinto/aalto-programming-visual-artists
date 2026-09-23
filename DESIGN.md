# Design

How Programming for Visual Artists looks and behaves. Read
[PROJECT_DIRECTION.md](PROJECT_DIRECTION.md) first for why the project exists;
this file turns its design position into rules for the interface. It is not a
changelog, a status report, a maintenance manual, or an inventory of CSS
values.

**Scope.** The shared visual shell used by every academic year: the home page,
year landing pages, session and project pages, standalone sketch pages, and
the Lab. The shell is currently implemented in `assets/ascii-skin.css`, which
overrides older per-year stylesheets. Historical years keep their content
untouched and inherit the shell.

**Permanence.** Exact sizes, widths, breakpoints, and font fallbacks live in
the stylesheets and may change. Every rule below should still hold if that CSS
were rewritten while the interface stayed recognizably the same.

## 1. Character

A white page, black ink, one monospace typeface: closer to a lab notebook
printed by an old terminal than to a product site or dashboard. It is
recognizably this project because of:

- monochrome chrome around full-color creative work;
- code and shell punctuation used as typographic marks: `/* TITLE */`,
  `== SECTION ==`, `> ITEM`, `:: LABEL`, `[ACTION]`, a `C:\PVA>` prompt, and
  path-style navigation;
- hard rectangular frames whose line weight, not color or shadow, carries
  hierarchy;
- a graph-paper grid behind the surfaces where sketches run.

**The central rationale for this project:** the interface stays monochrome so
that color belongs primarily to the sketches and to the student's own visual
work. The chrome is the quietest thing on the page; a running canvas is the
loudest.

**Structural identity** - keep these: monochrome chrome, one monospace face,
border weight as hierarchy, bracketed actions, path navigation, graph paper as
the sign of a working surface, flatness.

**Ornamental details** - part of the character, but replaceable: the exact
affix glyphs, the prompt string, the `[DIR]` label. They never carry
information a reader needs, and they are the first thing to give way when
space is tight.

Restraint is the identity, not an unfinished state. Refinement is welcome when
it improves legibility, orientation, accessibility, or teaching clarity.

## 2. Color roles

The chrome is monochrome by rule. Year-level stylesheets still define older
accent, danger, and palette variables; the shared shell deliberately resolves
them all to ink and paper. Those variables do not determine the rendered
identity. Any accent tint, dark backdrop, or translucent surface that shows
through in the chrome is a regression to fix in the shared shell.

| Role | Treatment |
|---|---|
| Canvas | White: page, panels, cards, inputs, the editor |
| Ink | Black: text, frames, rules, diagram strokes |
| Hover and current location | One pale gray fill, with a black border on the current item |
| Selected / pressed | Inversion - black ground, white text |
| Inversion (generally) | The strongest emphasis available; used sparingly (text selection, the pressed filter, a highlighted cell inside a diagram) |
| Focus | A black double outline, offset from the element |
| Status and error | Ink, like everything else - distinguished by words and structure |
| Work surface | Graph-paper grid of black lines on white, only where sketches (or slide documents) render |
| Sketch and student output | Unrestricted full color - the only color on the page |

- **Meaning never depends on color alone.** States are carried by text,
  border weight, fill (gray or inverted), position, or a leading word.
- Do not add a second gray tone or an accent color for emphasis.
- Teaching diagrams are black line work on white. Distinguish parts with solid
  versus dashed lines, filled versus outlined shapes, and labels.
- Color inside a running sketch is content. Never restyle it.
- The site is light-only; there is no dark theme.

## 3. Typography

Identity-level:

- One locally available monospace family for everything: headings, prose,
  code, navigation, and form controls. No remote or web fonts, no second
  typeface.
- Headings, labels, tags, actions, filters, and the footer are uppercase and
  heavy.
  Navigation is uppercase at normal weight. Prose and code keep their own case
  at normal weight.
- No letter-spacing; the monospace grid is the rhythm.
- Heading levels are marked by affix as well as size: H1 `/* … */`,
  H2 `== … ==`, H3 `> …`. Small labels on the year and home pages (eyebrows,
  result types, course-tool labels) take a `:: ` prefix.
- Code is not set apart by typeface - everything is monospace - but by its
  container: the framed editor, or its placement in a code-shaped context.
  Inline code needs no chip.
- Sustained reading prose (briefs, assessment text, ledes) is held to a
  readable measure of roughly 70-85 characters per line rather than stretching
  across its container.

Implementation details, free to evolve: the fallback order, exact sizes and
weights, line heights, and scaling ranges. Headings scale fluidly between
phone and desktop sizes; keep them fluid rather than stepping at breakpoints.

## 4. Components

Use these names. Extend an existing component before inventing a new one.

- **Topbar.** The home, year, session, project, and Lab pages all open with
  the same white, framed bar with a heavier bottom rule: the brand
  (uppercase, with the `C:\PVA>` prompt) and the directory navigation. On
  long reading pages it stays pinned. No page gets its own header treatment.
- **Directory navigation.** Path segments (`/ALL-YEARS /2026-2027 /SESSIONS
  /SESSION-06`) after a `[DIR]` label - not tabs, not a menu. The current
  location has the gray fill and a border and is marked with `aria-current`.
  It wraps; it never hides behind a toggle.
- **Hero / course header.** One framed block: a small label, the H1, one lede,
  optional byline. No imagery.
- **Content block.** The standard frame around a unit of reading: notices,
  briefs, rhythm cards, the search and current-session panels.
- **Entry card.** Short items in a set the reader scans and chooses among,
  usually leading to fuller material: year entries, session cards, web
  sketch cards, search results, and the landing page's feature summaries.
  They carry the standard frame plus a heavy left rule. The heavy left rule
  means "one of a set, pick me"; standalone content never gets it.
- **Web sketch card.** An entry card with a live preview on graph paper, then
  title, one-line purpose, tags, a "You can:" invitation, related sketches,
  and actions. Editing in the Lab is the first action.
- **Tags / metadata.** Thin-framed uppercase chips. Descriptive only; they
  must not look pressable.
- **Action.** Uppercase label in square brackets inside a solid frame
  (`[OPEN SESSION 07]`). Labels are explicit verbs naming the destination.
  Hover uses the gray fill. The main action is marked by coming first and by
  its wording, not by a different appearance (see Open design questions).
  Links inside prose stay underlined text.
- **Search and filters.** A labelled input, bracketed filters that expose a
  pressed state, a live count in words, and entry-card results. The pressed
  filter inverts so it reads as the one current selection, never weaker than
  its neighbors.
- **Rhythm cards.** Before class / During class / After class, always in that
  order and present in the HTML before any script runs.
- **Teaching card.** A framed figure holding a monochrome diagram and a
  one-sentence caption, placed where the concept is first taught.
- **Notice.** A content block with a bold lead phrase, for guidance.
- **Sketch page.** The running sketch on graph paper beside a narrow column
  with the path navigation, title, one-line purpose, and actions.
- **Lab stage.** The sketch picker, Run and Reset actions, and the running
  result on graph paper.
- **Lab editor.** Title, one-line purpose, related links, the framed code
  editor, and the status line. A framed privacy note sits above stage and
  editor.
- **Status / error message.** Ordinary status is one plain line of text
  directly under the code. An error keeps plain, factual wording that starts
  with "Error" and quotes the real message, and gains structural emphasis - a
  frame and heavy weight - so it is recognizable without color.
- **Footer.** A top rule and uppercase metadata.

## 5. Layout

- One centred reading column with a maximum width; the topbar spans the
  viewport.
- Sections are separated by vertical space and an H2, not by background
  bands.
- Frames and whitespace group things. Keep nesting shallow.
- Border weight is semantic, not decorative:
  - heavy rules - the topbar's base and the entry card's left edge;
  - standard frames - heroes, content blocks, teaching cards, actions,
    inputs, work surfaces;
  - thin lines - tags, metadata, the current-location marker.

  Similar components use the same weight on every page.
- Card groups reflow into as many columns as fit, down to one. Cards never
  shrink below a readable width and never clip their content.
- Session pages follow the student's path: what this session is, then the
  concept diagram, then before / during / after, then start in the browser,
  then compare with Processing, then slides. The browser (p5.js) action always
  comes before the Processing comparison.
- In the Lab, the code and its visual result stay in one working context: side
  by side on wide screens, stacked on narrow ones, never on separate pages or
  tabs.

## 6. Depth and motion

The interface is flat on purpose.

- No shadows, no rounded corners, no blurred or translucent chrome, no hover
  lift.
- Hierarchy comes from border weight, whitespace, black/white inversion,
  order, and position.
- The only background pattern is graph paper, reserved for working and
  rendering surfaces.
- The chrome does not animate. Motion belongs to the sketches.

## 7. Do's and don'ts

- **Add a gradient?** No. Graph paper on work surfaces is the only pattern.
- **Round a card?** No. Corners are square everywhere.
- **Introduce an accent color?** No. If something needs emphasis, use border
  weight, position, wording, or - sparingly - inversion.
- **Make something more prominent?** Put it first, word it as an explicit
  verb, keep it framed. Reach for inversion only when it is the single
  selection or the one thing in view that must not be missed.
- **Show an error?** Plain words, the real message, starting with "Error",
  close to the code being edited. Distinguish it from normal status by
  structure (frame, weight), not only color. Never invent a cause the
  environment cannot verify, and never fail silently.
- **Present optional or bonus material?** Label it in words ("Optional"),
  keep it visually subordinate to the required sequence, and never let it
  make the course look longer or harder. The concrete pattern is still open.
- **Add a diagram?** Only when a concept is hard to see from code alone.
  Black line work, a text alternative, a caption, labels readable at phone
  width. Never add one for symmetry.
- **Place code and output?** Adjacent, in one view. A change and its visible
  effect belong together.
- **Add a decorative animation, dashboard, or stat tile?** No.
  Orientation comes from path navigation and headings; motion comes from
  sketches.
- **Borrow another site's look?** No. No external fonts, assets, or brand
  styling.

## 8. Responsive behavior

- No page scrolls sideways at phone width. Card groups reflow to one column
  instead of clipping; frames, text, and previews stay inside their card.
- Multi-column arrangements collapse to a single column: the home page's
  directory moves below its hero, the year page's current-session and search
  panels stack, and rhythm cards stack in order.
- The Lab stacks the stage (controls and result) above the editor, so a change
  can be run and seen with little scrolling.
- Code never wraps. Long lines scroll inside the editor, not the page.
- Navigation wraps onto more lines and stays visible. On narrow screens the
  ornamental prefixes (the prompt and `[DIR]`) may disappear and spacing
  tightens so the pinned bar does not take an unreasonable share of the
  screen; every path segment and the current-location marker stay.
- Headings scale down fluidly.
- Teaching diagrams scale to the column, and their labels must remain
  comfortably readable at phone width - check at native phone size, not just
  that the image fits.
- Prose keeps its readable measure at every width rather than using all
  available space.

## 9. Accessibility as design

- Focus is always visible, on every interactive element.
- Reading pages (home, year, session, project, Lab) start with a skip link to
  their main material.
- Text meets contrast requirements against what is actually rendered behind
  it - including any backdrop an older stylesheet might paint.
- No state or meaning is carried by color alone (see section 2).
- One H1 per page; headings nest in order. Affix glyphs are decoration.
- Teaching diagrams carry a text alternative and a caption that states the
  idea in words.
- Status and error text is plain language and announced politely to
  assistive technology.
- Nothing is clipped or pushed off-screen at supported narrow widths.

## 10. Guidance for agents

These are review habits, not commands. Build and test steps live in
[MAINTAINING.md](MAINTAINING.md).

- Read PROJECT_DIRECTION.md, then this file, before changing shared interface
  styling.
- Preserve monochrome chrome. A new tint, accent, or dark backdrop in the
  chrome is a regression.
- Reuse the component vocabulary above before inventing a component.
- Fix shared-shell problems in the shared shell, not in historical year
  folders.
- Inspect the rendered result at a desktop width and a phone width before
  calling a visual change done. Reading the CSS is not enough.
- Do not add visual complexity without a teaching or navigation reason you
  can state in one sentence.
- If a change needs to break a rule here, say so explicitly and update this
  file deliberately.

## 11. Open design questions

Deliberately unresolved. Record the decision here when one is made; none of
these is a known defect.

1. Whether primary actions should ever receive a visual distinction beyond
   order and wording.
2. Whether the Lab status/error line should move closer to the visible
   stage/editor relationship; on some desktop screens it can sit below the
   initial fold.
3. Whether to adopt an explicit minimum touch-target size beyond the
   dimensions currently in use.
4. The concrete visual pattern for optional or bonus material, once real
   material of that kind exists.
5. Whether the CSS-generated heading affixes should be hidden from assistive
   technology; this has not yet been tested with a screen reader.
