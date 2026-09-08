# Changelog

## 2026-09-08

- Hardened repository validation and browser smoke testing ahead of adding a new academic year: narrowed the legacy-content check to exact filenames/links instead of ordinary vocabulary, made year checks exact per year, strengthened `course-data.js` integrity checks, made the browser smoke suite discover published years automatically, and made `npm run smoke:browser` start its own local server. No visible site changes.
- Added the initial 2026-2027 academic-year scaffold and linked it from the course archive as the current year. It intentionally has no sessions, sketches, slides, or Lab yet.

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
