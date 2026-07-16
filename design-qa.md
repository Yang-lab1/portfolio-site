# Design QA: Portable Business Case Scroll Annotation Option 1

- source visual direction: Product Design option 1, precision edge-rail callouts with small dots, fine connector lines, and no card-like label boxes.
- panel placement reference: `C:\Users\Yang\AppData\Local\Temp\codex-clipboard-836ffb1a-2cb6-4227-9a9d-cb755ec122c8.png`
- latch placement reference: `C:\Users\Yang\AppData\Local\Temp\codex-clipboard-f86d0ec3-235b-441d-a5ac-27b1d45a2123.png`
- implementation screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\desktop-panel-final.png`
- latch screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\desktop-locks-final.png`
- Chinese screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\desktop-panel-zh-final.png`
- mobile screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\mobile-panel-final.png`
- scroll preview path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\desktop-panel-scroll.webm`
- panel comparison evidence: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\panel-latest-reference-vs-current.png`
- latch comparison evidence: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-annotation-option1-qa\locks-latest-reference-vs-current.png`
- viewport: desktop `1920x1080`; mobile `390x844`
- state: Portable Business Case detail page, latch/opening image and operation-panel image with scroll-triggered callouts.

## Findings

- No actionable P0/P1/P2 visual mismatch remains for the selected option 1 direction.
- Labels are bilingual through the existing language toggle: English and Chinese screenshots both render translated callout titles/body copy.
- Mobile keeps the same image-anchored callout concept as desktop, with body copy hidden to avoid overflow.
- Browser QA reported `overflowX: 0` on mobile.

## Comparison History

- The first option-1 pass still placed several labels over the product body, reducing legibility and weakening the user's intended edge-rail composition.
- The final pass moved the touchscreen, work-phone, simulated-weighing, side-output, RFID, and both latch labels into the surrounding white field while preserving their exact component anchors.
- The remaining short/broken-line appearance came from a fixed `200px` SVG dash animation length, which clipped connectors longer than that value. The animation range is now `1000px`, so every connector remains continuous from label edge to component target.
- Combined reference/current comparisons show the requested external label placement, clear target endpoints, and full continuous connector runs without covering the product.

## Verification

- `npm run build`: passed.
- `git diff --check`: passed.
- Browser QA script: `tmp/portable-annotation-option1-qa.mjs`.
- Production deployment: not performed for this annotation pass; pending user visual confirmation.

final result: passed

---

# Design QA: Portable Business Case Replacement

- source visual truth path: `C:\Users\Yang\Desktop\作品集\旋转圆盘\便携式业务手提箱\1.png`
- implementation screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-case-qa\desktop-detail.png`
- viewport: desktop `1920x900`; mobile `390x844`
- state: product showcase card and `smart-waste` detail page after replacing the industrial compressor with the portable business case
- full-view comparison evidence: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\portable-case-qa\source-vs-detail-side-by-side.png`
- focused region comparison evidence: not required; the implementation uses the exact supplied source file rather than a recreated asset

## Findings

- No actionable P0/P1/P2 visual mismatch remains.
- The showcase uses the first supplied image and fills the complete perspective card without internal padding or a separate border.
- The detail page uses the six supplied images in numeric order and preserves their approximately 21:9 presentation.
- Desktop and mobile keep the established three-card showcase behavior without horizontal overflow.

## Required Fidelity Surfaces

- Fonts and typography: existing portfolio typography is unchanged.
- Spacing and layout rhythm: existing showcase geometry is preserved; the replacement image fills the card.
- Colors and visual tokens: no palette or component-token changes were introduced.
- Image quality and asset fidelity: exact user-supplied PNG assets are used; no regeneration or structural edits were made.
- Copy and content: project title, category, summary, and detail metadata now describe the portable business case.

## Verification

- `npm run build`: passed.
- `git diff --check`: passed.
- Desktop and mobile screenshots: `tmp/portable-case-qa/`.
- Detail image order: `portable-business-case-01.png` through `portable-business-case-06.png`.
- Browser QA: no horizontal overflow or page errors were observed in the captured desktop/mobile runs.
- Production deployment: `https://portfolio-site-three-rose.vercel.app/`.

## Comparison History

- Initial implementation already matched the supplied source because the exact asset was copied into the site and rendered with full-bleed cover behavior. No P0/P1/P2 correction loop was required.

final result: passed
