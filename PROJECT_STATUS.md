# Project Status

## Completed This Pass (Sessions 05-06 Build)

Implemented Sessions 5 and 6, reusing the established teaching pattern (one
concept, an opener only where it isolates something cleanly, one canonical
p5.js-first sketch with a Processing comparison, one independent worksheet
per sketch, an explicit bridge from the previous session, one
organically-caused debugging moment, and Lab exposure).

- **Session 05: Functions, Parameters and Generative Systems.** One required sketch: **Shapes Function** (adapted from 2025-2026, already the strongest historical candidate - a `drawAbstractShape(x, y, size)` function called 20 times with random parameters, click-to-regenerate via `mousePressed()` -> `redraw()`). No opener was added: Session 01's `drawFace()` already taught "call the same function several times with different values," so a new small opener would only reteach that; Shapes Function's loop + randomness is the genuinely new material. The debugging moment is a fresh lesson distinct from Session 01's: a fourth parameter (`opacity`) is added and passed a different value from every call, but the function body never reads it, so nothing visibly changes - "I changed a parameter but nothing happened" (confirmed by manual testing). Added `mousePressed()` -> `redraw()` to the Processing `.pde` too, since the historical Processing version lacked the interaction the p5.js version already had. **Spiral Spins** (polar coordinates, HSB color, easing, keyboard toggle) was deliberately **not** added - it is meaningfully more advanced than Shapes Function and not part of Session 5's core concept; it remains in the historical archive as a candidate for a future optional/stretch addition.
- **Session 06: Noise and Recursion.** Two required sketches, kept as two distinct concepts rather than blended: **Noise Grid** (new - reuses Session 04's grid layout and Session 02's `map()`, but replaces `random()` with `noise()` to control only circle size, so the smooth-vs-abrupt contrast is directly visible) and **Recursive Tree** (adapted from 2024-2025's animated version, simplified from two mirrored trees to one, since a single `branch(length, angle)` call is enough to teach the base case without doubling the push/pop scaffolding a beginner has to parse first). The base case (`length > 8`) is explicitly named and traced in the worksheet ("big branch -> smaller branches -> ... -> stop"), not left as implementation detail. **A real technical risk was found and fixed during implementation**: with the worksheet's own suggested multiplier range (0.5-0.85) the tree is always safe, but a curious edit toward 1 (e.g. 0.97) makes the length-based base case take dozens of levels to trigger, and with two recursive calls per level that is an intractable number of draw calls - both `branch()` implementations now also carry a call-count safety net (`branchCalls`/`MAX_BRANCH_CALLS`, reset every frame) independent of the length check, verified by deliberately testing a 0.97 multiplier in the Lab (stays responsive) and covered by a new pinned regression test. The debugging moment is safe and behavioral (both recursive calls rotating the same way, so the tree curls into one arm instead of forking) - the base case itself is never removed as an exercise. Perlin Noise Letters (a full particle/class system) and the richer historical Generative Grid (noise + rotation + multiple mappings at once) were deliberately **not** adapted; both stay historical-only, and Generative Grid is mentioned only as an optional "push further yourself" idea in the session page, not a new sketch.
- Added an explicit **Session 4 -> 5** bridge (loops repeating an instruction -> a function packaging a visual rule, with a callback to Session 01's `drawFace()`) and **Session 5 -> 6** bridge ("Last session, you called your own functions... now we will see what happens when a function calls itself" / noise as a second, different route to complexity).
- Wrote three independent instruction sheets (Shapes Function, Noise Grid, Recursive Tree), each with visible-feedback steps and a personal-variation step.
- All three new sketches were added to `years/2026-2027/course-data.js` and are editable in the existing Lab; `assets/lab.js` was not modified.
- No slide decks were added (none exist for 2026-2027 yet, by design).
- Session 07 and the optional media session were **not** built. No historical folder was copied wholesale.
- `currentSession` in `course-data.js` now points to `session-06` (the newest session), matching the existing convention.
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`).

## Previously Completed

- **Sessions 01-02** (Drawing/Coordinates/Functions; Variables/Mouse/Mapping): Face Exercise, Color House, Mouse Shapes, plus a correction pass that fixed a `const`/`let` reassignment bug in Mouse Shapes, added a missing Color House instruction sheet, added an explicit Session 1->2 bridge, and fixed the Lab's silent runtime-error reporting gap (`assets/lab.js` now reports errors thrown inside `draw()`/`setup()`/etc. instead of freezing silently).
- **Sessions 03-04** (Conditionals/Movement/State; Loops/Grids/Waves): Hover Color, Bouncing Ball Color, Loop Row, Hover Grid, Simple Waves - each with explicit previous-session bridges and behavioral (non-error) debugging moments.
- The 2026-2027 Sketch Lab (`web/lab.html`) exposes every course sketch above via the shared `assets/lab.js` runtime.
- No slide decks exist yet: no editable slide-source workflow exists in the repository, and the 2026-2027 session boundaries do not match the historical ones closely enough to reuse them honestly.

## Files Changed (This Pass)

- `years/2026-2027/course-data.js` (added `session-05`, `session-06`, 3 new sketches; `currentSession` now points to `session-06`)
- `years/2026-2027/sessions/session-05/index.html`, `session-06/index.html` (new)
- `years/2026-2027/source/session-05/shapes-function/{shapes-function.pde, instructions_shapes-function.txt}` (new)
- `years/2026-2027/source/session-06/noise-grid/{noise-grid.pde, instructions_noise-grid.txt}` (new)
- `years/2026-2027/source/session-06/recursive-tree/{recursive-tree.pde, instructions_recursive-tree.txt}` (new)
- `years/2026-2027/web/{shapes-function,noise-grid,recursive-tree}/{index.html,sketch.js}` (new)
- `years/2026-2027/README.md` (course map + web sketch list)
- `index.html`, `README.md`, `COURSE_INDEX.md` (2026-2027 now shows 6 sessions)
- `tools/smoke-test.mjs` (pinned Recursive Tree call-count safety-net regression, timeout-guarded)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets).
- `npm run smoke:browser` - passed, including the new pinned Recursive Tree safety-net regression and the existing generic "every Lab sketch for the newest year loads cleanly" check (now covering all 11 sketches).
- Fresh-install verification: `rm -rf node_modules && npm ci` followed by `npm run check` and `npm run smoke:browser` - both passed.
- `node --check` on `tools/smoke-test.mjs` and `years/2026-2027/course-data.js` - passed. `git diff --check` - clean.
- Manual Playwright verification of literal worksheet edits for all 3 new sketches (parameter ranges, noise scale, branch multiplier, stopping threshold, angle) - all ran cleanly with no page errors.
- Manual verification of both debugging moments by screenshot: Recursive Tree's matched-rotation mistake curls the tree into one arm instead of forking (no error); Noise Grid's scale extremes visibly confirm smooth-vs-chaotic behavior.
- Manual stress test: an aggressive branch multiplier (0.97) was run in the Lab and confirmed the page stays responsive, verifying the call-count safety net.
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- Session 07: Arrays, Objects and Particles
- Optional Session 08: Image and Video as Material
- Assessment/final-project prompts for 2026-2027, once enough sessions exist to write them against
- Optional lightweight teaching diagrams (not slide decks): canvas coordinate diagram (01), `map()` range diagram (02), position/velocity + condition-flow diagram (03), loop/grid/wave diagrams (04), function-definition/call + parameter-flow diagram (05), random-vs-noise comparison + recursive call-level/base-case diagram (06)
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1)
- Author decision on licensing for the original teaching material
- Possible future optional/stretch addition: Spiral Spins (kept historical for now, not part of any required session)

## Known Issues

- No slide decks exist yet for 2026-2027 (by design - see above).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
