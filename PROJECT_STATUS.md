# Project Status

For the project's stable identity and decision principles, see [PROJECT_DIRECTION.md](PROJECT_DIRECTION.md). This file tracks current state and remaining work only.

## Completed This Pass (Teaching Diagrams)

Added the small set of lightweight teaching visuals the full-course review
recommended for concepts that are hard to communicate through code and prose
alone. Not slide decks - seven local, inline-referenced SVG cards living
directly on the session pages where each concept is introduced.

- **Session 01 - `canvas-coordinates.svg`**: the canvas coordinate system (origin top-left, x right, y down, one example point). Placed right after the hero, before the rhythm cards.
- **Session 02 - `map-ranges.svg`**: mouseX's 0-width range becoming a 0-255 output range, with a marker at the same relative position in both. Uses the actual range from the Mouse Shapes worksheet.
- **Session 04 - `nested-loop-grid.svg`**: a 4x3 grid with one row (solid outline) and one column (dashed outline) highlighted and their intersection filled - directly supports the session's own row/column debugging exercise.
- **Session 05 - `function-parameters.svg`**: two calls to the actual `drawAbstractShape(x, y, size)` function with different values, connected to two differently-sized result circles.
- **Session 06 - two cards**, kept as visibly separate concepts: `random-vs-noise.svg` (two bar-height sequences contrasting independent jumps with smooth neighboring change) and `recursion-base-case.svg` (a small branching tree labeled branch(100) -> branch(70) -> branch(49) -> branch(34): stop, with a summary line). The recursion card is the highest-priority visual in the pass.
- **Session 07 - `particle-lifecycle.svg`**: one card combining `class Particle` (the recipe) with the `particles[]` array (many objects), plus a five-step create -> push -> update -> display -> remove flow.
- **Session 03 - no visual added**, matching the review's explicit finding that none was needed; nothing added for symmetry.
- All seven are local SVG files under `years/2026-2027/assets/teaching/`, referenced via `<img>` inside a small new `.teaching-card` pattern (`figure` + `figcaption`) added to the existing shared `sessions/session.css` - no new stylesheet, no build dependency, no external host. Each SVG is monochrome (matching the site's actual rendered ASCII-terminal skin, which overrides color site-wide) with `role="img"`, a `<title>`, and a `<desc>`, plus a descriptive `alt` on the `<img>`; no information is carried by color alone anywhere.
- **A real accessibility bug was found and fixed during implementation**: a white text label inside the nested-loop-grid diagram was invisible because a global `text { fill: #000000; }` stylesheet rule inside the SVG overrode its `fill="#ffffff"` presentation attribute. Fixed with an inline `style` override; caught only by actually rendering and screenshotting the file, not by reading the markup.
- Two smaller layout bugs were found and fixed the same way: the Session 01 card's rotated y-axis label originally overlapped its own `(0, 0)` text and contained a `↓` glyph that rotated into a misleading sideways arrow; the recursion card's four `branch(49)` labels originally collided into unreadable overlapping text. Both fixed and re-verified by rendering.
- No curriculum content changed: no session titles, order, worksheets, sketches, Lab behavior, or project/assessment text were touched.

## Previously Completed

- **Projects and assessment**: Project Brief 1, Project Brief 2, Final Project, and a qualitative assessment framework, all on `years/2026-2027/projects/index.html`; Session 06's bridge wording fixed to name noise's lineage (Session 02's `map()`, Session 04's grids) alongside recursion's.

A full-course review of Sessions 1-7 concluded "core course ready with minor
revisions," with the main remaining gap being that 2026-2027 had no project
or assessment material at all. This pass closes that gap and applies the
review's two small approved wording fixes.

- **Project Brief 1 - Interactive Visual Composition** (after Sessions 01-02, extendable to after 03): synthesizes mouse input, variables, functions, and (optionally) conditionals/state into a small responsive composition. States plainly that a mouse + variables + one function project is complete on its own.
- **Project Brief 2 - Generative Visual System** (after Sessions 04-05, extendable to after 06): synthesizes loops, functions, and randomness into a rule that produces a family of related results. Explicitly states `noise()` and recursion are available, not required, and using them does not make a stronger project by itself.
- **Final Project** (after Session 07): synthesis + personal visual direction + understood code. Explicitly states complexity is not the goal, that a Sessions-1-4-only project can be just as strong as one using every technique in the course, sets a small/focused/finished scope (not a large app, game, or installation), and asks students to be ready to explain what they submit and what they changed or adapted.
- **Qualitative assessment framework** (`#assessment` on the new projects page): five principles - experimentation and process, technical understanding (judged against techniques actually chosen, not the most advanced material in the course), intentional use of code, visual/artistic development, and explaining/modifying own code. No percentages, deadlines, submission mechanism, or grading-scale rules were invented - none exist anywhere in the repository (verified by search across all three years), so none are stated here; that remains a teacher/institution decision (see Remaining Tasks).
- All three project stages and the assessment framework live on one new page, `years/2026-2027/projects/index.html`, reusing the existing `sessions/session.css` stylesheet rather than adding a new one. The year's `#assignments` section now links to it with four short cards instead of the empty placeholder it had before. Three `searchExtras` entries make the projects findable through the existing site search - the smallest reuse of an extension point the data schema already had, not a new metadata system.
- Added a short "After Session 07: Project Studio" note (not a numbered session) stating that class time after Session 07 is for project development, debugging, and critique rather than a new programming topic.
- **Session 06 bridge wording fixed**: the hero paragraph previously bridged only functions -> recursion; it now also names noise's real lineage (Session 02's `map()` and Session 04's grids), matching what Noise Grid's own worksheet already said. One sentence changed.
- **Session 04 wording reviewed, left unchanged**: the review flagged this as optional only. The existing sentence already sequences Loop Row -> Hover Grid -> Simple Waves with a one-clause reason for each; adding explicit "main arc / second idea" labels would add words without clearly improving scannability, so no change was made.
- No new sketches, no Session 08, no slide decks, no visual teaching cards - all explicitly out of scope for this pass.
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`); their existing Project Brief 1/2 cards (one sentence each, no rubric or grading language) were read as reference only.

## Previously Completed

- **Sessions 01-07**, the full core curriculum (Drawing/Functions through Arrays/Objects/Particles), each with an explicit bridge from the previous session, a behavioral (non-error) debugging moment from Session 03 onward, a Processing comparison, and Lab exposure via the shared `assets/lab.js` runtime.
- Two discovered-and-fixed Lab safety nets: `assets/lab.js` reports runtime errors instead of freezing silently; Recursive Tree and Particles Follow both gate their own growth (`MAX_BRANCH_CALLS`, `MAX_PARTICLES`) against worksheet-suggested edits that could otherwise run away.
- A full-course pedagogical review (Sessions 1-7) confirmed no prerequisite inversion, a reasonable increasing cognitive-load curve, and no redundant sketch - and identified the project/assessment gap this pass addresses.

## Files Changed (This Pass)

- `years/2026-2027/assets/teaching/{canvas-coordinates,map-ranges,nested-loop-grid,function-parameters,random-vs-noise,recursion-base-case,particle-lifecycle}.svg` (new)
- `years/2026-2027/sessions/session.css` (new `.teaching-card` figure/figcaption pattern, reusing existing `--line`/`--panel`/`--muted` variables)
- `years/2026-2027/sessions/session-01/index.html`, `session-02/index.html`, `session-04/index.html`, `session-05/index.html`, `session-06/index.html`, `session-07/index.html` (one new section each with a `figure.teaching-card`, placed after the hero and before the rhythm cards; session-06 gets two)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets) on the first run, including the image `alt`-text and local-link checks against all seven new files.
- `npm run smoke:browser` - passed, no changes needed.
- Fresh-install verification: `rm -rf node_modules && npm ci` followed by `npm run check` and `npm run smoke:browser` - both passed.
- `git diff --check` - clean. No JavaScript/Node tooling files were changed this pass, so `node --check` had nothing new to run.
- Manual rendering of all seven SVGs in isolation caught and fixed three real bugs (see above) before they were ever wired into a session page.
- Manual desktop and 390px-mobile review of all six updated session pages: every teaching-card image loads, every `alt` text is present and descriptive, no horizontal overflow at 390px, and the recursion card - the highest-priority visual - was confirmed legible at native mobile pixel size via a cropped screenshot, not just "present."
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- **Teacher/institution decisions** (deliberately not invented in any pass): actual scheduling/deadlines for each project stage, the submission mechanism, and any grading-scale or weighting beyond the published qualitative framework.
- Optional future workshop, not core curriculum: Image (and optionally local video) as data - still-image pixel manipulation (`pixels[]`, invert, grayscale, threshold) on a small bundled file; explicitly no camera, no microphone, no FFT.
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1).
- Author decision on licensing for the original teaching material.
- Possible future optional/stretch sketch additions (kept historical for now): Spiral Spins, Particles with Noise.

## Known Issues

- No slide decks exist yet for 2026-2027 (by design).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
