# Project Status

## Completed This Pass

- Replaced the broad "removed coursework trace" word ban in `tools/check-site.mjs` (which rejected ordinary prose containing "student", "study", "gallery", etc.) with two narrow checks: a literal `source.txt` legacy filename, and a literal `openprocessing.org` reference.
- Made root-page year validation exact: for each `years/YYYY-YYYY/` folder, `check-site.mjs` now checks that specific year's own list entry in `index.html` (not the whole document), and requires `README.md` and the generated `COURSE_INDEX.md` to reference that exact year. A stale count for one year can no longer pass by coincidentally matching another year's count.
- Strengthened `course-data.js` validation: `data.year` must match its folder, session/sketch ids must be non-empty and unique, `currentSession.id`/`lab.defaultSketch`/every `sketch.related` id must resolve, and required titles must be non-empty. A freshly generated empty year still validates cleanly.
- Extracted course-data.js loading into `tools/course-data-loader.mjs`, shared by `check-site.mjs` and `smoke-test.mjs`.
- Refactored `tools/smoke-test.mjs` to discover published academic years from `years/` and derive expected counts from each year's own `course-data.js`, instead of hard-coding `2024-2025`/`2025-2026` and their counts. Generic checks run for every published year and correctly distinguish an empty scaffolded year from a mature one. Deep behavioral checks (canvas animation, Lab editing) dynamically pick the newest year with the needed feature. One narrow, explicitly historical regression test (the 2025-2026 `bouncing-ball` Lab edit) stays pinned and documented as such.
- Made `npm run smoke:browser` self-contained: added `tools/static-server.mjs`, a small `node:http` static file server that `smoke-test.mjs` starts automatically on `127.0.0.1:8123` (falling back to a free port) when `PVA_SITE_URL` is not set, and closes afterward. `PVA_SITE_URL=https://...` still works unchanged.
- Fixed a pre-existing bug in `tools/new-year.mjs`: the generated scaffold's Slide Decks markup was missing the `.slide-fallback-list` element `check-site.mjs` requires, so a freshly generated year failed `npm run check` immediately.
- Added a `browser-smoke` job to `.github/workflows/quality.yml` (installs Playwright Chromium, runs `npm run smoke:browser`, after the existing `check` job). `pages.yml` was left unchanged - see "Design Decisions".
- Declared the Node runtime expectation: `"engines": {"node": ">=22"}` in `package.json` and a `.node-version` file containing `22`.
- Investigated the open Dependabot Playwright update (1.60.0 -> 1.62.1): verified in a throwaway copy that the smoke suite passes unchanged under 1.62.1; left the dependency unchanged in this diff (see "Remaining Tasks").

## Files Changed

- `.github/workflows/quality.yml`
- `CHANGELOG.md`
- `PROJECT_STATUS.md`
- `package.json`
- `tools/check-site.mjs`
- `tools/course-data-loader.mjs` (new)
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `tools/static-server.mjs` (new)
- `.node-version` (new)

`.github/workflows/pages.yml` was reviewed but left unchanged - see "Design Decisions". No content under `years/` was changed.

## Checks Run

- `npm ci`, `npm run check` (`build:index`/`check:site`/`check:assets`), `npm run smoke:browser` - all passed against current `2024-2025`/`2025-2026` content, including a fresh `rm -rf node_modules && npm ci` run.
- `npm run smoke:browser` also passed with port 8123 pre-occupied (confirmed fallback to a free port) and with `PVA_SITE_URL` pointed at a manually started server.
- `node --check` on every modified/added `.mjs` tool file - passed.
- Targeted regressions against `check-site.mjs` (each reverted afterward): ordinary prose with "student"/"study"/"gallery"/"mirror" now passes; a `source.txt` file and an `openprocessing.org` reference are still caught; a duplicate sketch id and an unresolved `related` id are caught by name; a stale year-specific session count matching another year's real count is now caught.
- `npm run new:year -- 2099-2100` generated, linked temporarily, verified with `npm run check` and `npm run smoke:browser`, then fully removed with all temporary root-file edits reverted.
- `git diff --check` - clean.

## Design Decisions

- **Trace checks over word bans:** legacy-content detection targets exact filenames/external hosts, not dictionary words. New entries should follow the same pattern.
- **Exact per-year checks:** homepage/README/COURSE_INDEX checks are scoped to each year's own entry so two years sharing a count can't mask a stale one.
- **Dynamic smoke-test discovery, one pinned historical test:** generic per-year checks are data-driven; only the known `bouncing-ball` Lab interaction stays pinned to `2025-2026`, isolated and commented as historical.
- **Local static server, no framework:** `tools/static-server.mjs` uses only `node:http`/`node:fs`.
- **`pages.yml` left unchanged:** the browser smoke job lives in `quality.yml` (PRs, pushes, manual runs) and does not gate Pages deployment, so deployment stays fast and immune to browser-test flakiness; the static `npm run check` already covers most structural regressions. This needed no functional change to `pages.yml` itself, so the file was left untouched rather than adding an explanatory comment there.
- **Playwright left at `^1.60.0`:** the Dependabot bump was verified compatible but not required, so it stays a separate follow-up.

## Remaining Tasks

- Separately review/merge the Dependabot Playwright update (1.60.0 -> 1.62.1); verified compatible with the current smoke suite in this pass.
- Author decision on licensing for the original teaching material; no licence file is added in this pass.
- Explicit third-party licensing/attribution review for vendored `p5.js` if still needed.
- Possible future Lab execution isolation (e.g. iframe + `postMessage`) to remove or constrain the Lab's `unsafe-eval` CSP exception.
- Creating `years/2026-2027/`, but only after this maintenance commit lands: scaffold with `npm run new:year`, add content, link it from root `index.html`/`README.md`, then run `npm run check` and `npm run smoke:browser`.

## Known Issues

- Slide decks intentionally open as direct PDFs instead of inline embedded readers, for browser compatibility (unchanged from before this pass).
- No licence file exists yet.
- The Lab's `unsafe-eval` CSP exception is a known, accepted trade-off pending future isolation work.

## Latest Commit Hash

Pending final commit. The final handoff records the pushed commit hash.
