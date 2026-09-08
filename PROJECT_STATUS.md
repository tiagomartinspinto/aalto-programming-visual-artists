# Project Status

## Completed This Pass (Projects and Assessment)

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

- `years/2026-2027/projects/index.html` (new - Project Brief 1, Project Brief 2, Final Project, assessment framework, project-studio note)
- `years/2026-2027/index.html` (`#assignments` now links to the new page; lede text updated to reflect the current, real state)
- `years/2026-2027/course-data.js` (3 `searchExtras` entries for the new project sections)
- `years/2026-2027/sessions/session-06/index.html` (hero bridge now names noise's lineage as well as recursion's)
- `years/2026-2027/README.md` (new "Projects" section, `projects/` added to Repository Structure)
- `PROJECT_STATUS.md`, `CHANGELOG.md`

## Checks Run (This Pass)

- `npm run check` - passed (build:index, check:site, check:assets) on the first run.
- `npm run smoke:browser` - passed, no changes needed.
- Fresh-install verification: `rm -rf node_modules && npm ci` followed by `npm run check` and `npm run smoke:browser` - both passed.
- `node --check` on `years/2026-2027/course-data.js` - passed. `git diff --check` - clean.
- Manual Playwright verification: the projects page renders with all 7 sections and no horizontal overflow at 390px; all 4 project card links on the year page resolve (200); site search returns the new project entries; the Session 06 hero renders the corrected bridge text.
- Manual read-through of all new project/assessment text as a student, confirming it answers: what am I making, how big should it be, which techniques do I need, can I adapt examples, do I need advanced code, what matters in assessment, what must I be able to explain.
- `git diff -- years/2024-2025` and `git diff -- years/2025-2026` - both empty.

## Remaining Tasks

- **Teacher/institution decisions** (deliberately not invented in this pass): actual scheduling/deadlines for each project stage, the submission mechanism, and any grading-scale or weighting beyond the qualitative framework already published.
- Optional lightweight teaching diagrams (not slide decks): canvas coordinates (01), `map()` range (02), row/column nested-loop (04), parameter-flow (05), random-vs-noise + recursion base-case (06), particle lifecycle (07).
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
