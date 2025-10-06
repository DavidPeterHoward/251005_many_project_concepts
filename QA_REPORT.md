UI QA Report (OCR + Heuristic Analysis)
---------------------------------------

Method
- Ran OCR on all images in `src/screenshots/` and heuristically parsed titles/labels to infer possible UI issues.
- Cross-checked core React pages (home, Dreamcatcher) for common overflow and density problems.

Findings (high signal)
- Long headings risk overflow/wrap in cards and panels.
  - Fix: ensure `truncate`/`line-clamp-2` on titles and descriptions; applied on home cards.

- Chart areas occasionally too short causing squeezed axes/labels.
  - Fix: enforce consistent min height (>= 360–400px) for charts. Adjusted Dreamcatcher charts to fixed heights via `ResponsiveContainer` (300–400px). Consider bumping to 360px on small screens.

- Tables with many columns risk horizontal overflow.
  - Fix: wrap tables inside `.overflow-x-auto`. Applied in Physics Panel tables.

- Iframe previews might crop content and be hard to read at small sizes.
  - Fix: render a fixed desktop viewport (1280x800) scaled to fit card; implemented with transform scale and maintained lazy loading.

- Screenshot listing titles can be overly verbose.
  - Fix: display humanized, sanitized titles derived from filenames; implemented on home gallery (OCR-based rename). Consider manual curation for noisy cases.

Additional Recommendations
- Add an optional “Expand preview” modal for cards to view full-size.
- Add a runtime overflow detector (dev-only) to highlight clipped elements by checking `scrollWidth/height` vs `clientWidth/height` and logging matches.
- For dense dashboards, prefer responsive breakpoints that collapse side panels below 1200px to reduce squeeze.

Status
- Implemented: chart min-heights, table overflow wrappers, iframe scaled previews, home title clamps, screenshots gallery with titles, Vite glob deprecation fix.
- Pending (optional): preview modal, runtime overflow detector, manual cleanup of noisy OCR-based names.


