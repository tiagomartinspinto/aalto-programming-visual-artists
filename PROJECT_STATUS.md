# Project Status

## Completed This Pass (Sessions 03-04 Build)

Implemented Sessions 3 and 4, reusing the corrected Sessions 1-2 teaching
pattern (one concept, an opener only where it isolates something cleanly,
one canonical p5.js-first sketch with a Processing comparison, one
independent worksheet per sketch, an explicit bridge from the previous
session, one organically-caused debugging moment, and Lab exposure).

- **Session 03: Conditionals, Movement and State.** Two sketches: **Hover Color** (new, small opener - one circle, one `isHovering` boolean, if/else changes its color) and **Bouncing Ball Color** (adapted from 2025-2026's `bouncing-ball`, the stronger of the two historical versions since it already teaches `map()`-free edge detection and state cleanly). Renamed `xSpeed`/`ySpeed` to `speedX`/`speedY` for consistency with `x`/`y`. All mutable state (`x`, `y`, `speedX`, `speedY`, `ballColor`) is `let`; `radius` stays `const` since nothing ever reassigns it at runtime. The debugging moment is intentionally **behavioral, not an error**: swapping which speed variable a collision reverses does not crash the sketch or print anything - the ball drifts off the top/bottom edge instead of bouncing, which is the point (confirmed by screenshot during manual testing). Historical Hover Grid was deliberately **not** used as the Session 03 opener because it already depends on nested loops, which are not taught until Session 04.
- **Session 04: Loops, Grids and Waves.** Three sketches: **Loop Row** (new, tiny opener - a single `for` loop drawing 8 circles; the worksheet shows the 8-line manual-repetition version in text first, mirroring Session 01's drawFace() before/after technique), **Hover Grid** (adapted from 2025-2026, loop counters renamed `row`/`col` instead of reused `x`/`y` for clarity, and given the same hover-red/normal-blue palette as Hover Color to make the Session 3 -> 4 conditional connection visible), and **Simple Waves** (adapted from 2025-2026, near-unchanged - already a clean single-loop `sin()` example). Perlin noise and rotation (2025-2026's Generative Grid) were deliberately **not** brought in; they are reserved for Session 06. The debugging moment mirrors Session 03's pattern explicitly: making the grid's x/y both read the same loop variable collapses the grid into a diagonal line, with no error message (confirmed by screenshot).
- Added an explicit **Session 2 -> 3** bridge (Session 03 hero: "Last session, the mouse changed values for you. Now the sketch changes its own position every frame...") and **Session 3 -> 4** bridge (Session 04 hero: "Last session, one ball changed frame after frame. Now one block of code creates many shapes...").
- Wrote one independent instruction sheet per sketch (5 new `instructions_*.txt` files), each with visible-feedback steps and a personal-variation step; no worksheet was padded to match another's length.
- All five new sketches were added to `years/2026-2027/course-data.js` and are editable in the existing Lab; `assets/lab.js` was not modified.
- No slide decks were added (none exist for 2026-2027 yet, by design). Session 03 and 04 pages honestly state slides have not been added yet.
- Sessions 5-7 and the optional media session were **not** built. No historical folder was copied wholesale; every adapted file was reviewed and, where needed, renamed/reworded for clarity (see the diff and the correction rationale above).
- `currentSession` in `course-data.js` now points to `session-04` (the newest session), matching the convention already used by 2024-2025 and 2025-2026 (both point at their final session, not their first).
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`).

## Previously Completed (Correction Pass, Post-Review of Sessions 1-2)

A teaching-quality review of the implemented Sessions 1-2 found them "ready
with minor revisions." That pass fixed:

- A MUST-FIX bug in Mouse Shapes (`const` variables the worksheet instructed students to reassign; now `let`).
- A missing Color House instruction sheet with an explicit variable definition.
- An explicit Session 1 -> 2 bridge.
- Debugging-moment wording that no longer promises one exact error string.
- A Mouse Shapes worksheet step reducing first-run overload.
- The Lab's silent runtime-error gap (`assets/lab.js` now reports errors thrown inside `draw()`/`setup()`/etc. instead of freezing silently), plus removal of a dead `postMessage` handler.
- Regression coverage for both the runtime-error fix and the historical Mouse Shapes reassignment bug.

## Previously Completed (Initial Sessions 1-2 Build)

- Implemented **Session 01 (Drawing, Coordinates and First Functions)**: one canonical Processing/p5.js "Face Exercise" - a single `drawFace(x, y, diameter)` function called three times at different sizes/positions, with proportional (not fixed-pixel) eye offsets.
- Implemented **Session 02 (Variables, Mouse Input and Mapping)**: "Color House" (click-to-recolor opener) and "Mouse Shapes" (mouseX/mouseY driving position and color through `map()`).
- Created the 2026-2027 Sketch Lab (`web/lab.html`), exposing course sketches via the shared `assets/lab.js` runtime.
- No slide decks were added: no editable slide-source workflow exists in the repository, and the 2026-2027 session boundaries do not match the historical ones closely enough to reuse them honestly.

## Files Changed (This Pass)

- `years/2026-2027/course-data.js` (added `session-03`, `session-04`, 5 new sketches; `currentSession` now points to `session-04`)
- `years/2026-2027/sessions/session-03/index.html`, `session-04/index.html` (new)
- `years/2026-2027/source/session-03/hover-color/{hover-color.pde, instructions_hover-color.txt}` (new)
- `years/2026-2027/source/session-03/bouncing-ball/{bouncing-ball.pde, instructions_bouncing-ball.txt}` (new)
- `years/2026-2027/source/session-04/loop-row/{loop-row.pde, instructions_loop-row.txt}` (new)
- `years/2026-2027/source/session-04/hover-grid/{hover-grid.pde, instructions_hover-grid.txt}` (new)
- `years/2026-2027/source/session-04/simple-waves/{simple-waves.pde, instructions_simple-waves.txt}` (new)
- `years/2026-2027/web/{hover-color,bouncing-ball,loop-row,hover-grid,simple-waves}/{index.html,sketch.js}` (new)
- `years/2026-2027/README.md` (course map + web sketch list)
- `index.html`, `README.md`, `COURSE_INDEX.md` (2026-2027 now shows 4 sessions)
- `tools/smoke-test.mjs` (generic "every Lab sketch for the newest year loads cleanly" check; pinned Bouncing Ball state-reassignment regression)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets).
- `npm run smoke:browser` - passed, including the two new checks (all-Lab-sketches-load, and the pinned Bouncing Ball `let` regression).
- Fresh-install verification: `rm -rf node_modules && npm ci` followed by `npm run check` and `npm run smoke:browser` - both passed.
- `node --check` on `tools/smoke-test.mjs` - passed. `git diff --check` - clean.
- Manual Playwright verification of literal worksheet edits for all 5 new sketches (speed/color/loop-count/spacing/amplitude changes) - all ran cleanly with no page errors.
- Manual verification of both debugging moments by screenshot: Bouncing Ball's wrong-variable swap makes the ball drift off the canvas edge instead of bouncing (no error); Hover Grid's row/col mix-up collapses the grid into a visible diagonal line (no error).
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- Session 05: Functions, Parameters and Generative Systems
- Session 06: Noise and Recursion
- Session 07: Arrays, Objects and Particles
- Optional Session 08: Image and Video as Material
- Assessment/final-project prompts for 2026-2027, once enough sessions exist to write them against
- Optional lightweight teaching diagrams (not slide decks): canvas coordinate diagram (Session 01), `map()` range diagram (Session 02), position/velocity + condition-flow diagram (Session 03), manual-repetition-vs-loop + row/column + sine amplitude/phase diagrams (Session 04)
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1)
- Author decision on licensing for the original teaching material

## Known Issues

- No slide decks exist yet for 2026-2027 (by design - see above).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
