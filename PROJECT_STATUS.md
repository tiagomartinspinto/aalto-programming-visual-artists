# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Refined the archive hierarchy without changing the overall visual identity.
- Standardized both year pages to this order: current session/search, web sketches, Lab, sessions, slide decks, projects, technical note.
- Renamed the PDF section to "Slide Decks" across the year pages, generator, tests, and checks.
- Kept the Slide Decks interface identical across `2024-2025` and `2025-2026`: select/dropdown, Previous, Next, Open PDF, fallback PDF panel, and no-JavaScript PDF list.
- Kept direct PDF links with `target="_blank" rel="noopener noreferrer"`.
- Kept the Vivaldi-compatible no-iframe PDF behavior.
- Moved the homepage authorship/responsibility note into compact footer metadata.
- Tightened visible labels: "Current Session", "Search Materials", "Slide Decks", and shorter Lab/search/slide text.
- Updated the new-year generator so future years inherit the same hierarchy and language.
- Strengthened checks for section order, Slide Decks labeling, compact footer authorship, no PDF iframes, and shared year structure.

## Files Changed

- `PROJECT_STATUS.md`
- `assets/home.css`
- `assets/year.js`
- `index.html`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `years/2024-2025/course-data.js`
- `years/2024-2025/index.html`
- `years/2025-2026/course-data.js`
- `years/2025-2026/index.html`

## Checks Run

- `npm run check` - passed:
  - `npm run build:index`
  - `npm run check:site`
  - `npm run check:assets`
- `npm run smoke:browser` - passed against `http://127.0.0.1:8123/`.
- Browser-side rendered comparison - passed:
  - Homepage has footer metadata authorship note and no `.site-note` block.
  - Both year pages use the same section order.
  - Both year pages show "Slide Decks".
  - Both year pages use the same enhanced slide controls.
  - No horizontal overflow was detected.
- Coursework trace scan - no matches outside allowed status/vendor exclusions.
- PDF iframe scan across year HTML files - no matches.

## Visual Comparison Results

- Homepage: the first action remains the Course Directory; the authorship note now reads as quiet footer metadata.
- `2024-2025` and `2025-2026`: same hierarchy, same navigation logic, same Slide Decks controls, same Lab card pattern, same footer behavior.
- Year-specific differences are limited to content and counts: 8 decks for `2024-2025`, 6 decks for `2025-2026`.

## Remaining Tasks

- After pushing, wait for GitHub Pages to deploy and check the live site.
- If possible, open the live site in Vivaldi and confirm that PDFs open through the normal browser reader.

## Known Issues

- Slide decks intentionally open as direct PDFs instead of inline embedded readers for browser compatibility.
- `PROJECT_STATUS.md` cannot contain the hash of the commit that creates it without changing that hash. The final response records the exact pushed hash.

## Latest Commit Hash

- Pending final commit. The final response records the exact pushed hash.
