# Project Status

## Completed This Pass (Correction Pass, Post-Review)

A teaching-quality review of the implemented Sessions 1-2 found them "ready
with minor revisions." This pass applies those fixes so Sessions 1-2 are
solid enough to serve as the template for Sessions 3-7:

- **Fixed a MUST-FIX bug**: `years/2026-2027/web/mouse-shapes/sketch.js` declared `circleSize`/`squareSize` with `const`, while the worksheet explicitly instructs students to reassign them (`circleSize = map(mouseX, 0, width, 10, 120);`, and later a click-driven random reassignment). That threw `Assignment to constant variable.` on the very next animation frame, silently freezing the canvas. Both are now `let`. The Processing `.pde` was already correct (`float circleSize = 50;`) and needed no change.
- **Added a Color House instruction sheet** (`years/2026-2027/source/session-02/color-house/instructions_color-house.txt`, new - previously the only Session 2 sketch without one). It opens with the plain-language variable definition ("a variable is a named place where you keep a value so you can read or change it later"), walks through `mousePressed()`, and asks for one deliberate visual choice. Not linked from HTML/course-data, matching the existing convention (Face Exercise's and Mouse Shapes' instruction files aren't linked from anywhere either).
- **Added an explicit Session 1 -> Session 2 bridge**: the Session 02 hero paragraph now opens with "In Session 01 you gave drawFace() its x and y yourself. Here, mouseX and mouseY supply changing position values for you, every frame..." One short echo was added in the Mouse Shapes worksheet (Step 3) rather than repeating it everywhere.
- **Reworded the Face Exercise debugging moment**: it no longer promises a specific error string ("not enough arguments"); it now says wording varies and gives a short, concrete checklist (notice what changed -> compare the call against the definition -> check every parameter has a value -> fix and rerun).
- **Reduced Mouse Shapes' first-impression overload without touching the sketch**: a new worksheet Step 2 ("Focus on One Thing First") asks students to isolate the background/mouseX relationship before the existing steps expand to the circle, square, and the rest of the `map()` calls. All later steps were renumbered (now 9 steps instead of 8); no code changed.
- **Fixed the Lab's silent runtime-error gap** (`assets/lab.js`): errors thrown inside `draw()`, `setup()`, `preload()`, `mousePressed()`, or `keyPressed()` are now caught at the point each callback is installed on the p5 instance (a `wrapCallback` wrapper), not only during the synchronous construction that the previous `try/catch` covered. The status bar now reports `Error in draw(): <message>` (etc.) instead of falsely continuing to say "Your sketch is running." after the canvas has frozen. The first error in any callback stops the sketch (`p.noLoop()`) and silences further callbacks until Run or Reset, so one bug does not spam a new status line every frame or click. Students still write plain `function draw() {}` - no new API.
- **Removed dead code**: the `window.addEventListener("message", ...)` handler in `assets/lab.js` for `sketch-running`/`sketch-error` messages was vestigial (grepped the repo - nothing posts those messages; the Lab mounts p5 directly, not via iframe/postMessage) and was removed as part of the same change.
- **Added regression coverage** in `tools/smoke-test.mjs`: (1) a generic check, run against whichever published year has a Lab, that appends a deliberately throwing `draw()`, confirms the status reports the error and does not flip back to "running" on a later frame, then confirms Reset recovers; (2) a pinned historical regression (`checkMouseShapesReassignmentRegression`, modeled on the existing `checkBouncingBallLabRegression` pattern) confirming 2026-2027's Mouse Shapes Lab can now run a version where `circleSize` is reassigned inside `draw()` - it skips quietly if that fixture is ever removed in a future year.
- Sessions 1-2 remain the only implemented 2026-2027 sessions; no Session 3+ material, no slide decks, and no changes to `years/2024-2025/` or `years/2025-2026/` were made in this pass.

## Previously Completed (Initial Sessions 1-2 Build)

- Implemented **Session 01 (Drawing, Coordinates and First Functions)**: one canonical Processing/p5.js "Face Exercise" that merges the strongest ideas from 2025-2026's `face_exercise` and 2024-2025's `smile-face` - a single `drawFace(x, y, diameter)` function called three times at different sizes/positions, with proportional (not fixed-pixel) eye offsets so it scales correctly at every size.
- Implemented **Session 02 (Variables, Mouse Input and Mapping)**: "Color House" (simplified click-to-recolor opener, adapted from 2024-2025's `color-house`/`extra_coloronmousepress`) and "Mouse Shapes" (adapted from 2025-2026's implementation, the stronger of the two historical versions since it already teaches `map()` explicitly).
- Wrote one progressive `instructions_*.txt` exercise sheet per session, following the established 2025-2026 pattern, each ending in a short debugging/error-reading moment.
- Created the 2026-2027 Sketch Lab (`web/lab.html`), now justified since browser sketches exist; it exposes all three new sketches (Face Exercise, Color House, Mouse Shapes) via the shared `assets/lab.js` runtime, unmodified.
- Did **not** build "Follow the Mouse" (left optional, per instructions, to keep this pilot's maintenance surface minimal) and did **not** restore the console-only operators/variable-types exercises (no visual output; explicitly excluded).
- No slide decks were added: no editable slide-source workflow exists in the repository, only final PDFs, and the 2026-2027 session boundaries do not match the historical ones closely enough to reuse them honestly. Session pages show an honest "not added yet" note instead of a dead PDF link.
- Fixed two related, previously-latent generic bugs, both only reachable once a session legitimately has no slide deck (never true before this pass): `tools/check-site.mjs` and `tools/smoke-test.mjs` both unconditionally required every session page to have a working PDF panel/link. Both now check whether `slides/session-XX.pdf` actually exists for that session before requiring the panel/link.
- Updated root `index.html`/`README.md` and regenerated `COURSE_INDEX.md` to show 2026-2027's real counts (2 sessions, 3 sketches, 0 slide decks, Lab present).
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`).

## Files Changed (This Pass)

- `assets/lab.js` (runtime-error reporting at the callback boundary; removed dead `postMessage` handler)
- `tools/smoke-test.mjs` (Lab runtime-error regression + pinned Mouse Shapes reassignment regression)
- `years/2026-2027/web/mouse-shapes/sketch.js` (`const` -> `let` for `circleSize`/`squareSize`)
- `years/2026-2027/source/session-01/face-exercise/instructions_face-exercise.txt` (debugging wording)
- `years/2026-2027/source/session-02/mouse-shapes/instructions_mouse-shapes.txt` (first-focus step, Session 1 bridge echo, renumbered steps)
- `years/2026-2027/source/session-02/color-house/instructions_color-house.txt` (new)
- `years/2026-2027/sessions/session-02/index.html` (Session 1 -> 2 bridge in the hero)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets).
- `npm run smoke:browser` - passed, including the two new Lab regression checks.
- Fresh-install verification: `rm -rf node_modules && npm ci` (0 vulnerabilities) followed by `npm run check` and `npm run smoke:browser` - both passed.
- `node --check` on `assets/lab.js`, `tools/smoke-test.mjs`, and `years/2026-2027/web/mouse-shapes/sketch.js` - passed. `git diff --check` - clean.
- Manual Playwright verification of the literal worksheet edits: Mouse Shapes Step 4 (`circleSize = map(...)`) and Step 8 (click-driven `circleSize` reassignment) both run cleanly with no page errors; a deliberately thrown `draw()` error is reported as `Error in draw(): ...`, stays reported (no false "running" flip, no spam), and Reset recovers; the Face Exercise missing-argument scenario still reports a clear error; Color House unaffected.
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- Session 03: Conditionals, Movement and State
- Session 04: Loops, Grids and Waves
- Session 05: Functions, Parameters and Generative Systems
- Session 06: Noise and Recursion
- Session 07: Arrays, Objects and Particles
- Optional Session 08: Image and Video as Material
- Assessment/final-project prompts for 2026-2027, once enough sessions exist to write them against
- Optional lightweight teaching diagrams (not slide decks): a canvas coordinate diagram for Session 01, a `map()` range diagram for Session 02 - identified as the only visual material either session might benefit from
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1)
- Author decision on licensing for the original teaching material

## Known Issues

- No slide decks exist yet for 2026-2027 (by design - see above).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
