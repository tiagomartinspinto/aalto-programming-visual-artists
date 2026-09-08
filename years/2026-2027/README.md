# 2026-2027

Programming for Visual Artists course material for 2026-2027.

This year is in progress. Sessions are added deliberately, one at a time.

## Start Here

1. Open the [year landing page](index.html).
2. Choose a session from the course path.
3. Use the [Sketch Lab](web/lab.html) to edit p5.js code directly in the browser.
4. Compare the p5.js web sketch with the original Processing `.pde` file when useful.

## Course Map

| Session | Topics | Exercises and Sketches |
| --- | --- | --- |
| 01 | Coordinates, shapes, color, and one reusable function | [Face exercise](source/session-01/face-exercise/face-exercise.pde) |
| 02 | Variables, mouse input, and map() | [Color house](source/session-02/color-house/color-house.pde), [mouse shapes](source/session-02/mouse-shapes/mouse-shapes.pde) |
| 03 | Conditionals, movement, and state | [Hover color](source/session-03/hover-color/hover-color.pde), [bouncing ball color](source/session-03/bouncing-ball/bouncing-ball.pde) |
| 04 | Loops, grids, and waves | [Loop row](source/session-04/loop-row/loop-row.pde), [hover grid](source/session-04/hover-grid/hover-grid.pde), [simple waves](source/session-04/simple-waves/simple-waves.pde) |

## Web Sketches

- [Face exercise](web/face-exercise/)
- [Color house](web/color-house/)
- [Mouse shapes](web/mouse-shapes/)
- [Hover color](web/hover-color/)
- [Bouncing ball color](web/bouncing-ball/)
- [Loop row](web/loop-row/)
- [Hover grid](web/hover-grid/)
- [Simple waves](web/simple-waves/)

## Repository Structure

- `source/session-XX/` contains Processing `.pde` files and instruction text files.
- `web/` contains browser-friendly p5.js companion sketches.
- `web/lab.html` contains the in-browser code editor.
- `sessions/` contains focused landing pages for each session.
- `preview-assets/` contains guidance and a place for exported screenshots or GIFs.

No slide decks have been added yet.

Run `npm run build:index` after adding sessions, slides, or sketches.
