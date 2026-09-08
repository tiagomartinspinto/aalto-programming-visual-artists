# Project Status

## Completed This Pass (Session 07 Build)

Implemented Session 7, the final currently-planned core programming session,
reusing the established teaching pattern (one concept, an opener only when
it isolates something cleanly, one canonical p5.js-first sketch with a
Processing comparison, one independent worksheet per sketch, an explicit
bridge from the previous session, one organically-caused debugging moment,
and Lab exposure).

- **Session 07: Arrays, Objects and Particles.** Two sketches: **Array of Dots** (new, opener - an empty array grows by one `{x, y}` object per click, a loop always draws whatever it currently holds; no class, no constructor, isolating the array concept before Particles Follow bundles it with a class) and **Particles Follow** (adapted from 2025-2026, the strongest historical candidate - a `Particle` class with `constructor`/`update()`/`display()`/`isDead()`, stored in an array, created at the mouse position every frame, updated/drawn/removed via one reverse loop). Variable names (`speedX`/`speedY`) match Session 03's Bouncing Ball vocabulary; the worksheet explicitly calls back to Session 01 (`class` = "a recipe for one particle," the same idea as a function) and Session 03 (one ball's `x`/`y`/`speedX`/`speedY` -> many particles each keeping their own). No vectors, no inheritance/polymorphism vocabulary, no multiple particle systems, no noise required.
- **A real technical risk was found and fixed during implementation**: the historical particle count is naturally bounded (~85 at steady state), but the worksheet's own suggested edits (slower fade, more emission) can push that arbitrarily high. Both `particles-follow` implementations now gate particle creation behind `MAX_PARTICLES`/`maxParticles` (400), named and commented, verified by deliberately stress-testing a combined slow-fade + 20x-emission edit in the Lab (stays responsive) and covered by a new pinned regression test - the same pattern used for Session 06's Recursive Tree safety net.
- **The debugging moment was tested, found misleading, and corrected before committing**: the first candidate (`particles[0]` instead of `particles[i]`) produced a confusing, hard-to-explain cascading effect under actual testing rather than the clean "one particle jitters while the rest freeze" behavior the wording claimed. It was replaced with a verified-accurate alternative: deleting the `update()` call, leaving `display()` in place - particles then appear and stay frozen forever, confirmed by screenshot to match its description exactly.
- Arrays are kept explicitly visible rather than disappearing behind the class: the worksheet asks directly where particles are stored, what adds one, and what loop visits them, before it asks about the class's methods.
- **Particles with Noise** (2025-2026) was deliberately **not** copied as a new sketch - it trades away the array-growth/removal lifecycle (particles are only ever created once in `setup()`) to add `noise()`, which is not this session's lesson. Instead, an optional stretch step in the worksheet suggests steering `speedX`/`speedY` with `noise()`, transferring the concept from Session 06 without a new file. **Sparkles** (2024-2025) was inspected and retired from the active course - it adds a second class (`ParticleSystem` containing `Particle`), `p5.Vector`, and multiple simultaneous systems, none of which serves Session 7's core lesson any better than Particles Follow already does.
- `currentSession` in `course-data.js` now points to `session-07` (the newest session), matching the existing convention.
- No slide decks were added (none exist for 2026-2027 yet, by design).
- Session 08 (optional media session) was **not** built - it should be decided after a full review of Sessions 1-7, not assumed.
- `years/2024-2025/` and `years/2025-2026/` are unchanged (verified with `git diff`).

## Previously Completed

- **Sessions 01-02** (Drawing/Coordinates/Functions; Variables/Mouse/Mapping): Face Exercise, Color House, Mouse Shapes - plus a correction pass that fixed a `const`/`let` reassignment bug, added a missing instruction sheet, and fixed the Lab's silent runtime-error reporting gap (`assets/lab.js` now reports errors thrown inside `draw()`/`setup()`/etc. instead of freezing silently).
- **Sessions 03-04** (Conditionals/Movement/State; Loops/Grids/Waves): Hover Color, Bouncing Ball Color, Loop Row, Hover Grid, Simple Waves.
- **Sessions 05-06** (Functions/Parameters/Generative Systems; Noise/Recursion): Shapes Function, Noise Grid, Recursive Tree - the latter with a call-count safety net guarding against runaway recursive blowup from an aggressive branch multiplier.
- Every session above has an explicit bridge from the one before it, a behavioral (non-error) debugging moment, and Lab exposure via the shared `assets/lab.js` runtime.
- No slide decks exist yet: no editable slide-source workflow exists in the repository, and the 2026-2027 session boundaries do not match the historical ones closely enough to reuse them honestly.

## Files Changed (This Pass)

- `years/2026-2027/course-data.js` (added `session-07`, 2 new sketches; `currentSession` now points to `session-07`)
- `years/2026-2027/sessions/session-07/index.html` (new)
- `years/2026-2027/source/session-07/array-of-dots/{array-of-dots.pde, instructions_array-of-dots.txt}` (new)
- `years/2026-2027/source/session-07/particles-follow/{particles-follow.pde, instructions_particles-follow.txt}` (new)
- `years/2026-2027/web/{array-of-dots,particles-follow}/{index.html,sketch.js}` (new)
- `years/2026-2027/README.md` (course map + web sketch list)
- `index.html`, `README.md`, `COURSE_INDEX.md` (2026-2027 now shows 7 sessions)
- `tools/smoke-test.mjs` (pinned Particles Follow emission/safety-net regression, timeout-guarded)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets).
- `npm run smoke:browser` - passed, including the new pinned Particles Follow safety-net regression and the existing generic "every Lab sketch for the newest year loads cleanly" check (now covering all 13 sketches).
- Fresh-install verification: `rm -rf node_modules && npm ci` followed by `npm run check` and `npm run smoke:browser` - both passed.
- `node --check` on `tools/smoke-test.mjs` and `years/2026-2027/course-data.js` - passed. `git diff --check` - clean.
- Manual Playwright verification of literal worksheet edits for both new sketches (starting values, movement, lifetime, display, and the debugging moment) - all ran cleanly with no page errors.
- Manual verification by screenshot, including catching and correcting a misleading debugging-moment description (see above) - final version confirmed exactly as worded.
- Manual stress test: emitting 20 particles/frame with a near-zero fade rate was run in the Lab and confirmed the page stays responsive, verifying the `MAX_PARTICLES` safety net.
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- Full review of the complete Sessions 1-7 core curriculum before deciding what comes next
- Assessment/final-project structure for 2026-2027
- Decide whether optional Session 08 (Image and Video as Material) is needed, after the Sessions 1-7 review
- Optional lightweight teaching diagrams (not slide decks): one per session, e.g. one-object-vs-array-of-objects and the particle create/update/draw/remove lifecycle for Session 07
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1)
- Author decision on licensing for the original teaching material
- Possible future optional/stretch additions (kept historical for now, not part of any required session): Spiral Spins, Particles with Noise

## Known Issues

- No slide decks exist yet for 2026-2027 (by design - see above).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
