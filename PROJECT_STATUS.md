# Project Status

## Completed This Pass

- Generated the `years/2026-2027/` scaffold with `npm run new:year -- 2026-2027` (no manual directory creation).
- Adjusted the generated `year.css` accent colors so 2026-2027 doesn't literally duplicate 2025-2026's palette; kept the shared `accent-3` gold and the same set of variables, no new layout selectors.
- Linked 2026-2027 as the newest year, first in order, in the root `index.html` nav/homepage list and `README.md`.
- Regenerated `COURSE_INDEX.md`; it lists all three years, with 0 sessions/sketches/slides for 2026-2027.
- Fixed a bug found in `tools/build-course-index.mjs`: it linked to `web/lab.html` for any year with a `web/` directory, without checking the file itself exists - producing a dead Lab link for 2026-2027 (whose `web/` folder is empty). Now checks for `web/lab.html` directly.
- The new year intentionally has zero sessions/sketches/slides and no Lab; no 2025-2026 content was copied.
- `years/2024-2025/` and `years/2025-2026/` are unchanged.

## Files Changed

- `index.html`, `README.md`, `COURSE_INDEX.md`, `CHANGELOG.md`, `PROJECT_STATUS.md`
- `tools/build-course-index.mjs` (bug fix, see above)
- `years/2026-2027/README.md`, `course-data.js`, `index.html`, `year.css` (new)

## Checks Run

- `npm run check` (`build:index`/`check:site`/`check:assets`) - passed with 2026-2027 present and empty.
- `npm run smoke:browser` - passed; 2026-2027 was picked up automatically by the dynamic year discovery with no test-code changes, and was correctly treated as an empty scaffold (no session/sketch/slide cards, no Lab, no slide selector expected).
- `node --check tools/build-course-index.mjs` - passed.
- `git diff --check` - clean.
- Manual local review of `/`, `years/2026-2027/`, `years/2025-2026/`, `years/2024-2025/` against a local server: no broken links, no dead Lab link, no fabricated course content, no-JS fallback intact, no horizontal overflow.

## Remaining Tasks

- Plan and selectively build the actual 2026-2027 curriculum (sessions, slides, sketches, source, Lab) as a deliberate follow-up, using prior years as reference rather than copying them.
- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1).
- Author decision on licensing for the original teaching material.
- Explicit third-party licensing/attribution review for vendored `p5.js` if still needed.
- Possible future Lab execution isolation to remove or constrain the Lab's `unsafe-eval` CSP exception.

## Known Issues

- Slide decks intentionally open as direct PDFs instead of inline embedded readers, for browser compatibility.
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
