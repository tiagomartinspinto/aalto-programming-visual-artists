# Changelog

## 2026-09-08 (sessions 5-6)

- Added 2026-2027 Sessions 5 and 6 covering functions/parameters/generative systems (Shapes Function) and noise/recursion (Noise Grid, Recursive Tree), each with a Processing comparison, an independent worksheet, and a debugging moment. Recursion is now first-class runnable material with an explicitly taught base case. 2026-2027 now has 6 sessions and 11 web sketches; Session 7 and the optional media session remain unbuilt.
- Discovered and fixed a real safety risk in Recursive Tree: an aggressive branch-length multiplier could make the length-based base case take an intractable number of calls to trigger. Added a call-count safety net independent of the length check, verified with a stress test and a new pinned regression.

## 2026-09-08 (sessions 3-4)

- Added 2026-2027 Sessions 3 and 4 covering conditionals/movement/state (Hover Color, Bouncing Ball Color) and loops/grids/waves (Loop Row, Hover Grid, Simple Waves), each with a Processing comparison, an independent worksheet, and a debugging moment. 2026-2027 now has 4 sessions and 8 web sketches; Sessions 5-7 and noise/recursion remain unbuilt.
- Extended the browser smoke suite with a generic check that every Lab sketch for the newest year loads and runs cleanly, and a pinned regression guarding Bouncing Ball's mutable state variables against the same const/let mistake class fixed in Mouse Shapes.

## 2026-09-08 (correction pass)

- Fixed a Mouse Shapes bug where `circleSize`/`squareSize` were declared `const` in the p5.js sketch while the worksheet instructed students to reassign them; both are now `let`.
- Added a short Color House instruction sheet with a plain-language variable definition, the only Session 2 sketch previously missing one.
- Added an explicit Session 1 -> Session 2 bridge to the Session 02 page, with one short echo in the Mouse Shapes worksheet.
- Reworded the Face Exercise debugging moment so it no longer promises one exact error string.
- Added a Mouse Shapes worksheet step asking students to focus on the background/mouseX relationship before the rest of the sketch, to reduce first-run overload.
- Fixed the Sketch Lab (`assets/lab.js`) so runtime errors thrown inside `draw()`, `setup()`, `preload()`, `mousePressed()`, or `keyPressed()` are now reported in the status bar instead of failing silently; removed a dead, unused `postMessage` error-reporting path from the same file.
- Added browser regression coverage for both the runtime-error reporting fix and the historical Mouse Shapes reassignment bug.

## 2026-09-08

- Hardened repository validation and browser smoke testing ahead of adding a new academic year: narrowed the legacy-content check to exact filenames/links instead of ordinary vocabulary, made year checks exact per year, strengthened `course-data.js` integrity checks, made the browser smoke suite discover published years automatically, and made `npm run smoke:browser` start its own local server. No visible site changes.
- Added the initial 2026-2027 academic-year scaffold and linked it from the course archive as the current year. It intentionally has no sessions, sketches, slides, or Lab yet.
- Added the first two 2026-2027 sessions (Drawing/Coordinates/Functions, Variables/Mouse/Mapping) with browser-first exercises, Processing comparisons, and a Sketch Lab. No slide decks yet.

## 2026-05-05

- Reworked the public site into a white, black-text ASCII / old-OS interface.
- Normalized favicons so every page uses the root `favicon.svg`.
- Removed duplicate year-level favicon and site preview assets.
- Preserved color in Processing works and PDF material.
- Improved landing page copy and reduced oversized headings.
- Fixed 2024-2025 web sketch previews by attaching p5 canvases to the sketch container.
- Extracted repeated inline CSS into shared stylesheet files.
- Added a matching `404.html` page.
- Centralized the ASCII skin in `assets/ascii-skin.css`.
- Fixed contrast in source-code panels.
- Added media and maintenance notes for future cleanup.
- Added accessibility polish for skip links, source-panel state, and Lab controls.
- Removed nested scrolling chrome from web sketch previews.
