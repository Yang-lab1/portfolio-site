# 2026-07-03 Pai Li Shi Four-Column App Wall + v2 Hand QA

- Current target: the Pai Li Shi detail showcase should follow the AWSMD-style structure with real app-screen background columns and the user-provided hand image.
- Required visual constraints:
  - Left/right background must be complete phone-app screenshots, not cropped food photos, loose pictures, or stitched wall bitmaps.
  - Background DOM must render four equal columns of app screenshots: two left of the hand and two right of the hand.
  - Each background card must have the same rendered width, height, corner radius, and vertical gap.
  - Center hand image must be the user-provided v2 black-screen hand source, normalized to the existing `1817x866` coordinate system.
  - Center phone content must stay aligned to the measured phone opening: `x=714`, `y=28`, `w=354`, `h=731`.
  - The left-bottom workbench screenshot must not show the original iOS home-indicator line.
  - The outer background columns must not be cropped by the viewport; at `1920x900`, the first column should start at `x=0` and the fourth column should end at `x=1920`.
  - At the `1920x900` QA viewport, side app-screen cards should follow the measured reference rhythm: `360px` rendered card width and `24px` rendered column gap.
  - Center phone should sit in the reference-like upper vertical band now that the site header is hidden during the showcase: screen top should stay within about `28px-52px`.
- Latest verification:
  - `npm run build` passed.
  - `node tmp\verify-palifood-continuous-wall.mjs` passed.
  - Metrics: `.palifood-background-wall=0`, `.palifood-background-column=4`, `.palifood-background-screen=32`, first column `x=0`, fourth column `right=1920`, card width `360px`, column gap `24px`, center screen top `34px-49px`, center screen delta about `0px`, `overflowX=0`.
- Latest screenshots:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/02-mid.png`
  - `tmp/palifood-continuous-wall-qa/03-late.png`
  - `tmp/palifood-continuous-wall-qa/24-entry-left-wall-clean-check.png`
  - `tmp/palifood-continuous-wall-qa/25-reference-vs-current-edge-aligned.png`
  - `tmp/palifood-continuous-wall-qa/26-reference-vs-current-measured-360-24.png`
  - `tmp/palifood-continuous-wall-qa/27-reference-vs-current-raised-phone.png`
- Status: pending user visual approval before push/deploy.

## 2026-07-03 Update: Result Background Card Recapture

- User flagged the `Result / 生成结果` background card on the right side as visually different from the other seven P2 app screenshots, like it had been cropped or enlarged.
- Confirmed the page layout was not applying a different rendered size to that card. The rendered card remains the same `360px` width and `24px` column gap at the `1920x900` QA viewport.
- Re-captured the local P2 runtime result page (`艺术的诞生`) as a full mobile screenshot and replaced `public/portfolio/palifood-showcase/p2-right-top-result.webp` with the normalized `430x940` WebP.
- Latest visual evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\32-result-recapture-before-after.png`
- Verification:
  - `node tmp\verify-palifood-continuous-wall.mjs` passed.
  - `npm run build` passed.
- Release status remains blocked until user approval; do not push/deploy yet.

# 2026-07-03 Update: Pink-Frame Measured Center Fit

- User clarified that the center phone screen must be measured from the pink/red phone body frame, not from the transparent visible aperture alone.
- Source geometry from `hand-user-black-mask.png` (`1817x866`):
  - pink/front phone frame: `x=700..1081`, `y=14..772`
  - final inner content frame and PNG transparent cutout: `x=714`, `y=28`, `w=354`, `h=731`
  - rendered black-bezel margins at `1920x900`: about `L 14px / R 13px / T 14px / B 13px`
- Fix applied:
  - Recut the transparent screen opening inside `hand-user-black-mask.png`; this is the key fix, because moving only the DOM layer still left the PNG black bezel blocking the left side.
  - Updated `.palifood-hand-screen` to `354x731` source-ratio geometry.
  - Regenerated `p2-center-fit-onboarding-1.webp`, `p2-center-fit-onboarding-2.webp`, and `p2-center-fit-onboarding-3.webp` to `708x1462` 2x WebP.
  - Recentered `.palifood-hand-dynamic-island`.
  - Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` as `914x3922` wall assets using `430x940` cards, `54px` radius, `54px` gaps, and subtle rounded-card borders.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\17-center-frame-proof.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\metrics.json`
- Verification:
  - `npm run build` passed.
- Final result: blocked

Blocker: user visual approval is required before push/deploy.

# 2026-07-02 Update: Staggered Continuous App Screenshot Walls

- User's continuing objective: the left/right AWSMD-style background should read as continuous app-screen walls, not loose images or broken rows.
- Fix applied:
  - Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` from real P2 full-screen app screenshots.
  - Changed wall composition from aligned rows to staggered two-column walls: each screenshot card remains `430x940`, radius `54px`, gap `54px`, with the second column offset by `497px`.
  - Reduced the page overlay and increased the background wall image brightness/contrast/saturation so the cards remain readable on the black stage.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\10-reference-vs-current-brighter-staggered-wall.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\metrics.json`
- Latest metrics:
  - `.palifood-background-wall=2`
  - `.palifood-background-column=0`
  - `.palifood-background-screen=0`
  - wall natural size: `914x4970`
  - horizontal overflow: `0`
  - center screen target-vs-actual delta: about `0px`
- Verification:
  - `npm run build` passed.
- Final result: blocked

Blocker: user visual approval is required before push/deploy.

# 2026-07-02 Update: Reference-Like Wall Gap Correction

- Follow-up comparison showed the staggered wall was structurally correct but the black seams were still too wide, making the background read as broken.
- Fix applied:
  - Restored the rendered wall gap token to `clamp(28px, 1.7vw, 36px)`.
  - Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` with natural gap `32px` and radius `42px`.
  - Current wall natural size: `892x4860`.
  - At the `1920x900` QA viewport, each wall renders about `752.6px` wide; app cards render about `363px` wide with about `27px` gaps.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\11-reference-vs-current-measured-gap-wall.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\metrics.json`
- Latest metrics:
  - `.palifood-background-wall=2`
  - `.palifood-background-column=0`
  - `.palifood-background-screen=0`
  - horizontal overflow: `0`
  - center screen target-vs-actual delta: about `0px`
- Verification:
  - `npm run build` passed.
- Final result: blocked

Blocker: user visual approval is required before push/deploy.

# Design QA: Pai Li Shi AWSMD Scroll Showcase

- source visual truth path: `C:\Users\Yang\AppData\Local\Temp\codex-clipboard-eabbd328-755b-47f6-bbb8-1c285864494b.png`
- implementation screenshot path: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\01-onboarding-a.png`
- viewport: `1920x900`
- state: Pai Li Shi detail page, AWSMD-style pinned scroll showcase, early visible state
- full-view comparison evidence: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\06-reference-current-side-by-side.png`
- focused region comparison evidence: not separately cropped yet; the current user feedback targets the full center-phone and background-wall geometry.

## Findings
- [P2] Previous background wall cards were not visibly rounded and did not read as a strict equal-grid phone wall.
  - Fix applied: regenerated left/right wall images from real P2 screenshots with uniform 430x940 sizing, 38px rounded clipping, 28px gaps, and a subtle border.
- [P2] Previous center phone video layer did not match the transparent screen aperture tightly enough.
  - Fix applied: adjusted `.palifood-hand-screen` to match the hand-mask screen aperture so the video sits inside the phone edge.

## Patches Made
- Regenerated `public/portfolio/palifood-showcase/palifood-left-app-wall.webp`.
- Regenerated `public/portfolio/palifood-showcase/palifood-right-app-wall.webp`.
- Updated `src/styles.css` for the center phone screen aperture.
- Updated `src/main.jsx` wall scroll timing so the wall does not appear pre-shifted on entry.

## Verification
- `npm run build`: passed.
- Desktop Playwright screenshots: `tmp/palifood-rounded-wall-qa/01-start.png`, `tmp/palifood-rounded-wall-qa/02-mid.png`.
- DOM check: the current implementation renders four `.palifood-background-column` columns of real P2 phone screenshots; old `.palifood-background-wall` composite images are no longer referenced in `src/main.jsx` / `src/styles.css`.

## Final Result
blocked

Blocker: user visual approval is required before push/deploy, and no production deployment should happen until the user confirms the latest screenshots.

## 2026-07-02 Update: Red-Box Vertical Bar Check

- User-marked red vertical bars were checked against the eight selected P2 screenshots D/E/G/H/I/J/K/L.
- Conclusion: this was not an app bug. The source app screenshots are complete opaque phone screenshots; the visible bars came from the background-wall composition, where transparent/black column gaps visually merged with dark screenshot edges while the center hand covered part of the wall.
- Fix applied:
  - Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` as solid black RGB wall images, removing transparent gaps.
  - Kept the real P2 app screenshots as full phone-screen assets, with a small side inset crop only in the generated wall to hide captured dark edge strips.
  - Historical note: this composite-wall approach has since been superseded by the current four DOM-column implementation.
- Layout check result at 1920x900:
  - Current `.palifood-background-column` count is 4.
  - current `.palifood-background-wall` count is 0.
  - current center slider count is 3 onboarding screenshots.
  - horizontal overflow is 0.
- Latest visual evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-wall-seam-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-wall-seam-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-wall-seam-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-wall-seam-qa\metrics.json`
- Verification:
  - `npm run build` passed.
- Release status:
  - Not pushed.
  - Not deployed.
  - Waiting for user screenshot approval.

## 2026-07-02 Update: Center Onboarding Slider And Aperture Measurement

- User asked to stop relying on visual/manual pixel nudging for the hand-held phone screen.
- The old center video preview was extracted for comparison and then replaced with a simpler three-slide onboarding sequence.
- New center assets:
  - `public/portfolio/palifood-showcase/p2-center-onboarding-1.webp`
  - `public/portfolio/palifood-showcase/p2-center-onboarding-2.webp`
  - `public/portfolio/palifood-showcase/p2-center-onboarding-3.webp`
- Implementation:
  - `src/main.jsx` now renders a scroll-driven `.palifood-hand-screen-track` with the three onboarding slides.
  - `src/styles.css` sets the screen frame from the measured transparent aperture in `hand-user-black-mask.png`.
- Measurement source:
  - hand image size: `1817x866`
  - transparent screen aperture: `x=720`, `y=35`, `w=354`, `h=731`
- Playwright measured actual screen frame vs target aperture at 1920x900:
  - left delta: `0`
  - top delta: about `-0.016px`
  - width delta: about `-0.016px`
  - height delta: `0`
  - horizontal overflow: `0`
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\01-onboarding-a.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\02-onboarding-b.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\03-onboarding-c.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\04-fit-overlay-red-actual-green-target.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\05-onboarding-slider-scroll.webm`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\06-reference-current-side-by-side.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-onboarding-slider-qa\metrics.json`
- Verification:
  - `npm run build` passed.
- Release status:
  - Not pushed.
  - Not deployed.
  - Waiting for user visual approval.

## 2026-07-03 Update: Side Wall Readability Tuning

- User feedback still flagged the side background as visually broken/too dark in places.
- Kept the current two continuous wall-image structure:
  - `.palifood-background-wall`: `2`
  - old `.palifood-background-column`: `0`
  - old `.palifood-background-screen`: `0`
  - wall assets: `892x4860`
- Display-only tuning applied:
  - `.palifood-background-wall` filter: `brightness(1.12) contrast(1.08) saturate(1.1)`
  - showcase overlay edge opacity reduced from `0.2` to `0.12`
  - radial overlay reduced from `0.05` to `0.03`
- Verification:
  - `npm run build` passed.
  - `tmp/verify-palifood-continuous-wall.mjs` regenerated current screenshots and metrics.
  - `overflowX=0`; center screen target-vs-actual delta remains about `0px`.
- Latest evidence:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/02-mid.png`
  - `tmp/palifood-continuous-wall-qa/03-late.png`
  - `tmp/palifood-continuous-wall-qa/14-reference-vs-current-brighter-wall-narrow-bezel.png`

## 2026-07-02 Update: Black Background Restored + Center Slides Rebuilt To Aperture Ratio

- User asked to abandon the white background trial and restore the whole interaction background to black.
- User also asked to stop relying on visual nudging for the center phone animation and, if needed, remake the three center images to match the phone opening.
- Fix applied:
  - Restored `.palifood-scroll-showcase` and `.palifood-showcase-stage` to black.
  - Kept the side background as real full P2 app screenshots in four equal DOM columns with rounded corners.
  - Rebuilt the three center onboarding slides from `430x940` to exact aperture-ratio assets:
    - `p2-center-fit-onboarding-1.webp`
    - `p2-center-fit-onboarding-2.webp`
    - `p2-center-fit-onboarding-3.webp`
  - Each new center slide is `354x731`, matching the measured transparent phone aperture from `hand-user-black-mask.png`.
  - Updated the center screen track to fill the aperture height directly instead of using a `430/940` aspect ratio and cropping vertically.
- Latest 1920x900 QA metrics from `tmp/palifood-continuous-wall-qa/metrics.json`:
  - screen aperture delta remains about `0.016px`.
  - center slide natural size is now `354x731`.
  - vertical crop is now `0px`.
  - active slide height delta is `0px`.
  - background remains 16 full phone screenshots, not loose food images.
  - horizontal overflow is `0`.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\04-center-fit-overlay-red-aperture-green-slide.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\06-continuous-wall-scroll.webm`
- Verification:
  - `npm run build` passed.
- Release status:
  - Not pushed.
  - Not deployed.
  - Waiting for user visual approval.

## 2026-07-02 Update: Header-Aware Hand Position

- Follow-up local QA found the fixed portfolio header could visually cover the top of the center phone at some scroll states.
- Fix applied:
  - Added a desktop-only safe vertical offset to `.palifood-hand-stage` through `--palifood-hand-safe-y`, while keeping the measured aperture and the center slide fit unchanged.
- Latest 1920x900 QA metrics:
  - center aperture top positions across captured states: about `84px`, `77px`, and `69px`, safely below the `68px` fixed header.
  - aperture-vs-slide geometry still overlaps; center slides remain `354x731` with vertical crop `0px`.
- Latest close-up evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid-center-closeup.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid-center-closeup-overlay.png`

## 2026-07-02 Update: Brighter Black-Background App Columns

- Follow-up comparison against `tmp/awsmd-live-reference/04-6058.png` showed the black-background trial made the P2 app screenshot columns too dark, which reduced the visible rounded-card structure.
- Fix applied:
  - Increased `.palifood-background-column` brightness and saturation slightly.
  - Reduced the black overlay strength in `.palifood-showcase-stage::after`.
  - Increased the subtle inset outline on `.palifood-background-screen`.
- Center phone geometry was not changed in this pass.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\08-reference-vs-current-black-aperture-fit.png`
- Verification:
  - `npm run build` passed.
  - Playwright screenshot regeneration passed.

## 2026-07-02 Update: Source-Like Column Spacing

- Follow-up comparison showed the previous black-background columns were still looser than the AWSMD reference, making the left/right background feel more separated than a continuous phone-screenshot wall.
- Fix applied:
  - Adjusted desktop background card width to `360px` at the 1920px QA viewport.
  - Adjusted background card gap to about `32.64px`.
  - Kept every background card as a full `430x940` P2 app screenshot with rounded corners.
- Latest 1920x900 QA metrics:
  - columns: `[-3.91..356.09]`, `[392.62..752.62]`, `[1167.38..1527.38]`, `[1563.91..1923.91]`.
  - gap: `32.64px`.
  - horizontal overflow: `0`.
  - center slide remains `354x731`, vertical crop `0px`.
- Latest comparison evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\08-reference-vs-current-black-aperture-fit.png`

## 2026-07-02 Update: Continuous P2 App Screenshot Walls

- User objected that the side background still felt like scattered/single images with visible breaks.
- Implementation now renders two continuous wall assets instead of four independent background columns:
  - Left wall: `public/portfolio/palifood-showcase/palifood-left-app-wall.webp`
  - Right wall: `public/portfolio/palifood-showcase/palifood-right-app-wall.webp`
- QA metrics from `tmp/palifood-continuous-wall-qa/metrics.json`:
  - `.palifood-background-wall`: `2`
  - `.palifood-background-column`: `0`
  - `.palifood-background-screen`: `0`
  - each wall natural size: `888x3844`
  - rendered wall width at 1920px viewport: `748px`
  - left wall x-range: `0..748`
  - right wall x-range: `1172..1920`
  - horizontal overflow: `0`
- Center hand verification:
  - current source: `hand-user-black-mask.png`
  - visible RGB comparison against the user-provided black-screen hand image: `changedVisiblePixels=0`, `maxVisibleRgbDiff=0`
  - aperture fit remains measured from `x=720`, `y=35`, `w=354`, `h=731` within the `1817x866` hand image.
- Latest evidence:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/02-mid.png`
  - `tmp/palifood-continuous-wall-qa/03-late.png`
  - `tmp/palifood-continuous-wall-qa/04-reference-current-mid.png`
  - `tmp/palifood-continuous-wall-qa/05-hand-source-proof.png`
  - `tmp/palifood-continuous-wall-qa/06-continuous-wall-scroll.webm`
- Release status:
  - Not pushed.
  - Not deployed.
  - Waiting for user visual approval.

## 2026-07-02 Update: Geometry-Based Center Fit + Rounded Wall QA

- User explicitly rejected further manual/eyeballed pixel nudging for the center phone content.
- Current method:
  - The phone screen frame is still derived from the transparent aperture in `hand-user-black-mask.png`: source image `1817x866`, aperture `x=720`, `y=35`, `w=354`, `h=731`.
  - The inner onboarding slide is now center-aligned to that aperture by CSS geometry: screen aperture center and active slide center are compared in Playwright metrics.
  - The slide uses a `430/940` aspect ratio and covers the aperture by width, giving an equal top/bottom crop of about `21.413px` at the 1920x900 QA viewport.
- Rounded background walls:
  - Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` from real P2 phone screenshots.
  - Each source card is normalized to `430x940`, clipped with `46px` rounded corners, spaced by `28px`, and composited into a solid black wall.
- Latest 1920x900 QA metrics from `tmp/palifood-continuous-wall-qa/metrics.json`:
  - screen aperture delta: `0px left`, about `-0.016px top`, about `-0.016px width`, `0px height`
  - active slide center delta: about `0.008px` at entry, `1.621px` at mid scroll, `2.966px` at late scroll
  - wall assets: two images, natural `888x3844`, rendered `748px` wide
  - horizontal overflow: `0`
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\04-reference-vs-current-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\06-continuous-wall-scroll.webm`
- Verification:
  - `npm run build` passed.
- Release status:
  - Not pushed.
  - Not deployed.
  - Waiting for user visual approval.
## 2026-07-03 Pai Li Shi No-Crop Center QA

- User issue addressed: the center phone was visually right-shifted and the top login button was partly hidden.
- Fixes verified:
  - Showcase-active header is hidden, so no navigation UI overlays the center phone.
  - Center onboarding screenshots are regenerated at the actual target screen ratio, not cropped from older `430x940` captures.
  - `.palifood-hand-screen` target and the PNG transparent cutout are now the pink-frame-derived `x=714,y=28,w=354,h=731` within `hand-user-black-mask.png` (`1817x866`).
  - QA metrics at `1920x900`: screen target-vs-actual delta is `0px`; active slide center delta is `0px`; `overflowX=0`.
  - Side background remains two continuous app screenshot wall images, not loose DOM screenshots.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\16-reference-scroll-vs-current-entry.png`
- Release status: local only; wait for user approval before push/deploy.

## 2026-07-03 Pai Li Shi Edge And Smoothness QA

- User issue addressed: the scroll felt less smooth, the lower-left second app card looked underfilled, and the far side edges still showed gaps.
- Current implementation baseline supersedes the older two-wall-image note above: this pass uses four DOM app-screen columns (`.palifood-background-column=4`, `.palifood-background-screen=32`, `.palifood-background-wall=0`).
- Fixes verified:
  - Moving background filters/heavy shadows were removed and the section scrub was tightened to `0.42`.
  - The leftmost and rightmost columns now clip only their viewport-facing corners, keeping internal rounded cards while avoiding black edge holes.
  - `p2-left-bottom-generation.webp` was lightly edge-filled by 10px per side; the backup is stored at `tmp\palifood-continuous-wall-qa\p2-left-bottom-generation-before-edge-fill.webp`.
- Latest QA metrics at `1920x900`:
  - columns: `[0..360]`, `[384..744]`, `[1176..1536]`, `[1560..1920]`
  - column gap: `24px`
  - horizontal overflow: `0`
  - center screen still matches the measured phone frame.
- Verification:
  - `node tmp\verify-palifood-continuous-wall.mjs` passed.
  - `npm run build` passed.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\06-continuous-wall-scroll.webm`
- Release status: local only; wait for user approval before push/deploy.
