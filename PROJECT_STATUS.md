# Project Status

## Completed This Pass

- Implemented **Session 01 (Drawing, Coordinates and First Functions)**: one canonical Processing/p5.js "Face Exercise" that merges the strongest ideas from 2025-2026's `face_exercise` and 2024-2025's `smile-face` - a single `drawFace(x, y, diameter)` function called three times at different sizes/positions, with proportional (not fixed-pixel) eye offsets so it scales correctly at every size.
- Implemented **Session 02 (Variables, Mouse Input and Mapping)**: "Color House" (simplified click-to-recolor opener, adapted from 2024-2025's `color-house`/`extra_coloronmousepress`) and "Mouse Shapes" (adapted from 2025-2026's implementation, the stronger of the two historical versions since it already teaches `map()` explicitly).
- Wrote one progressive `instructions_*.txt` exercise sheet per session, following the established 2025-2026 pattern, each ending in a short debugging/error-reading moment.
- Created the 2026-2027 Sketch Lab (`web/lab.html`), now justified since browser sketches exist; it exposes all three new sketches (Face Exercise, Color House, Mouse Shapes) via the shared `assets/lab.js` runtime, unmodified.
- Did **not** build "Follow the Mouse" (left optional, per instructions, to keep this pilot's maintenance surface minimal) and did **not** restore the console-only operators/variable-types exercises (no visual output; explicitly excluded).
- No slide decks were added: no editable slide-source workflow exists in the repository, only final PDFs, and the 2026-2027 session boundaries do not match the historical ones closely enough to reuse them honestly. Session pages show an honest "not added yet" note instead of a dead PDF link.
- Fixed two related, previously-latent generic bugs, both only reachable once a session legitimately has no slide deck (never true before this pass): `tools/check-site.mjs` and `tools/smoke-test.mjs` both unconditionally required every session page to have a working PDF panel/link. Both now check whether `slides/session-XX.pdf` actually exists for that session before requiring the panel/link.
- Updated root `index.html`/`README.md` and regenerated `COURSE_INDEX.md` to show 2026-2027's real counts (2 sessions, 3 sketches, 0 slide decks, Lab present).
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`).

## Files Changed

- `index.html`, `README.md`, `COURSE_INDEX.md`, `CHANGELOG.md`, `PROJECT_STATUS.md`
- `tools/check-site.mjs`, `tools/smoke-test.mjs` (generic session-without-slides fix)
- `years/2026-2027/README.md`, `course-data.js` (sessions 1-2, 3 sketches, `currentSession: session-01`)
- `years/2026-2027/sessions/session-01/index.html`, `session-02/index.html` (new)
- `years/2026-2027/sessions/session.css` (new, per-year palette)
- `years/2026-2027/source/session-01/face-exercise/{face-exercise.pde, instructions_face-exercise.txt}` (new)
- `years/2026-2027/source/session-02/color-house/color-house.pde`, `mouse-shapes/{mouse-shapes.pde, instructions_mouse-shapes.txt}` (new)
- `years/2026-2027/web/{face-exercise,color-house,mouse-shapes}/{index.html,sketch.js}` (new)
- `years/2026-2027/web/{lab.html, lab.css, shared.css, vendor/p5.min.js}` (new)

## Checks Run

- `npm run build:index` and `npm run check` - passed, run after each session was added.
- `npm run smoke:browser` - passed; 2026-2027 was picked up automatically by dynamic year discovery (now `hasLab: true`), correctly treated as a 2-session/3-sketch/0-slide year, and the deep Lab test now runs against it (newest year with a Lab) while the canvas-animation test correctly falls back to 2025-2026 (none of the three new sketches are self-animating by the existing "draws on its own" heuristic - Face Exercise is static, Color House and Mouse Shapes only redraw in response to input).
- Manual Playwright verification beyond the generic suite: confirmed all three faces render at their expected pixel positions; confirmed Color House's house/sky colors change on each click (three consecutive clicks, three distinct colors); confirmed Mouse Shapes' background color changes with mouse position; confirmed the Lab loads and runs all three sketches with no console/page errors; confirmed no horizontal overflow at 390px width on every new page.
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.
- `git diff --check` - clean.
- `node --check` on both modified tool files - passed.

## Remaining Tasks

- Review the quality of Sessions 1-2 in use before building further sessions.
- Session 03: Conditionals, Movement and State
- Session 04: Loops, Grids and Waves
- Session 05: Functions, Parameters and Generative Systems
- Session 06: Noise and Recursion
- Session 07: Arrays, Objects and Particles
- Optional Session 08: Image and Video as Material
- Slide decks for Sessions 01-02 (and future sessions), once a real deck workflow/content is ready
- Assessment/final-project prompts for 2026-2027, once enough sessions exist to write them against
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1)
- Author decision on licensing for the original teaching material
- Possible future Lab execution isolation to remove/constrain the `unsafe-eval` CSP exception

## Known Issues

- No slide decks exist yet for 2026-2027 (by design - see above).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
