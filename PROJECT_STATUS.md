# Project Status

For the project's stable identity and decision principles, see [PROJECT_DIRECTION.md](PROJECT_DIRECTION.md). This file tracks current state and remaining work only.

The 2026-2027 course repository is ready to teach and should remain stable until real teaching, institutional, maintenance, or new-year requirements create a reason to change it.

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

- **Sessions 01-07** (the full core curriculum, Drawing/Functions through Arrays/Objects/Particles): each session has an explicit bridge from the one before it, a behavioral (non-error) debugging moment from Session 03 onward, a Processing comparison, and Lab exposure via the shared `assets/lab.js` runtime. Two discovered-and-fixed Lab safety nets: `assets/lab.js` reports runtime errors instead of freezing silently; Recursive Tree and Particles Follow both gate their own growth (`MAX_BRANCH_CALLS`, `MAX_PARTICLES`) against worksheet-suggested edits that could otherwise run away.
- A full-course pedagogical review of Sessions 1-7 concluded "core course ready with minor revisions" - confirming no prerequisite inversion, a reasonable increasing cognitive-load curve, and no redundant sketch - and identified the project/assessment gap addressed next.
- **Projects and assessment**: Project Brief 1 (Interactive Visual Composition, after Sessions 01-02, extendable to 03), Project Brief 2 (Generative Visual System, after Sessions 04-05, extendable to 06 - `noise()`/recursion explicitly available, not required), and a Final Project (after Session 07 - complexity is explicitly not the goal, and a Sessions-1-4-only project can be just as strong as one using every technique in the course), plus a five-principle qualitative assessment framework - all on `years/2026-2027/projects/index.html`. No percentages, deadlines, or submission mechanism were invented; none exist anywhere in the repository, so none are stated (see Remaining Tasks).
- Session 06's bridge wording fixed to name noise's lineage (Session 02's `map()`, Session 04's grids) alongside recursion's; Session 04's wording was reviewed and intentionally left unchanged.
- `PROJECT_DIRECTION.md` established as the durable identity/principles document, separate from this file's current-state role.
- `years/2024-2025/` and `years/2025-2026/` are unchanged throughout every pass above (verified with `git diff` and `git log` against both archives).

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
