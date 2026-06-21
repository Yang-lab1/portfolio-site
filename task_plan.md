# Portfolio Site Recovery Plan

## Goal
Restore the portfolio homepage and work section to the user's confirmed direction: an independent black/white dynamic hero, a white-background work area with dense horizontal multi-card carousels, complete project hierarchy, and process-style project detail pages.

## Current Stage
Phase 45 is in progress as a focused Tresmares orbit smoothness experiment. The current approved visual state has been preserved as fallback tag `fallback-tresmares-orbit-2026-06-19`; this pass may only tune scroll-progress smoothing and label update smoothness, without changing the accepted seven-card geometry, white erase treatment, copy, or layout.

## Phases

### Phase 1: Planning and Requirement Recovery
- [x] Create persistent planning files: `task_plan.md`, `findings.md`, `progress.md`
- [x] Record rejected directions: centered spotlight carousel, vertical wheel switching, dark work section, sparse project data
- [x] Confirm known local project sources
- [x] Mark `momenta` GitHub source as blocked until the user provides a link
- [x] Record local `Momenta Keynote.key` evidence without treating it as confirmed GitHub data
- **Status:** complete

### Phase 2: Project Data Rebuild
- [x] Re-read recovery notes from `tmp/thread_019dbe53_full_conversation.md` and `tmp/portfolio_recovery_plan_019dbe53.md`
- [x] Copy confirmed visual evidence into `public/portfolio`
- [x] Compress large copied images to browser-safe JPG assets
- [x] Rebuild project data around four categories: Digital / Web, Concept / Hardware, Production / CMF, Research / Systems
- [x] Give each project a process sequence: background, thinking, sketch/structure, modelling/interface/system, render/effect, result/value
- [x] Remove full-slide `industrial-overview.png` from live cards/details and replace missing clean images with explicit pending states
- **Status:** complete

### Phase 3: Work Section Interaction Rebuild
- [x] Remove vertical wheel-to-project switching
- [x] Replace centered feature-card carousel with full-width horizontal multi-card rails
- [x] Ensure each category shows multiple cards in one row and supports pointer drag, arrows, and looped browsing
- [x] Rework carousel drag so continuous left/right dragging is responsive, loop remapping is seamless, and release inertia continues briefly after mouse-up
- [x] Keep work section white-background / black-text, separate from hero's black visual language
- **Status:** complete

### Phase 4: Hero and Global Visual Alignment
- [x] Keep the black/white ribbon video hero
- [x] Reduce hero copy to one main title and one subtitle
- [x] Use Apple-like system typography, restrained colors, and consistent spacing
- [x] Keep language toggle and floating Agent entry available across the site
- [x] Change Chinese hero title to four characters and remove visible/page-title name references
- [x] Make Chinese the default homepage language and separate the four hero characters so they do not visually stick together
- **Status:** complete

### Phase 5: Verification
- [x] Run `npm run build`
- [x] Start the Vite app
- [x] Validate desktop and mobile views with Playwright fallback because Browser plugin is not available
- [x] Check: not blank, no framework overlay, no console errors, horizontal carousel drag, vertical scroll behavior, language toggle, detail open/close
- [x] Check: default Chinese four-character hero, one-line hero layout, immediate drag response, release inertia, repeated carousel drags without visible loop failure
- [x] Record visual and interaction findings in `findings.md`
- **Status:** complete

### Phase 6: Handoff
- [x] Update `progress.md` with completed changes and verification results
- [x] Report preview URL, screenshots, remaining risks, and blocked `momenta` GitHub source
- **Status:** complete

### Phase 7: Source-Preserving Cover Refinement
- [x] Correct the image-generation rule after user feedback: do not invent or redesign products.
- [x] Locate real source product images from local folders or portfolio PDF pages before any cover editing.
- [x] For each confirmed source image, preserve product geometry, color, material, proportions, and visible details; edit only background, scene, lighting, and crop.
- [x] Use found PDF source images for smart waste tank and compression baling press instead of keeping them as missing-cover cards.
- [x] Copy only source-based images into `public/portfolio` and update project data.
- [x] Re-run build and browser QA after asset/code changes.
- **Status:** complete

### Phase 8: v1.0 Visual Upgrade
- [x] Strengthen the black/white Hero with denser lightfield/ribbon motion and a clearer title integration.
- [x] Reduce work-card text density to type, project name, and one short value sentence.
- [x] Preserve the white work section and current looped horizontal carousel behavior.
- [x] Replace generic detail-page process copy with project-type case-study narratives.
- [x] Prioritize deeper detail treatment for Miro, Pai Li Shi, Li Bai, smart waste tank, compression baling press, and Xiaomi CMF.
- [x] Add a low-key capability summary layer after the work section.
- [x] Make Agent behave more like AssistiveTouch: small, semi-transparent, and quieter during scroll/drag.
- [x] Re-run build and browser QA on desktop and mobile.
- **Status:** complete

### Phase 9: Work Section Copy and Product Cover Correction
- [x] Remove the `Work, organized by direction` / `按方向组织作品` heading and explanatory sentence so the section starts directly with categories.
- [x] Create source-preserving studio cover composites for smart waste tank and compression baling press from original product renders.
- [x] Keep product pixels/form/color/material unchanged; only background, shadow, scale, crop, and card presentation may change.
- [x] Update card image references and fit rules so product covers feel centered and consistent.
- [x] Confirm and integrate the newly provided public Momenta GitHub source if readable.
- [x] Re-run build and browser QA for desktop/mobile work-section cards.
- **Status:** complete

### Phase 10: GSAP Homepage Motion Pass
- [x] Add `gsap` and use timeline-based animation, not ad hoc CSS-only sequencing.
- [x] Hero entrance: title rises from below, subtitle fades in slightly later; no Hero buttons are added.
- [x] Existing buttons get small-range magnetic behavior only on pointer-capable devices.
- [x] Work cards retain subtle hover lift and image scale without becoming flashy.
- [x] Add a pinned section after the work rails and before the capability summary; internal capability content changes while the section is pinned.
- [x] Add light parallax: background moves slower than foreground.
- [x] Respect `prefers-reduced-motion` and avoid pinned/scroll-heavy motion on mobile or reduced-motion users.
- [x] Re-run build and browser QA for desktop/mobile/reduced-motion.
- **Status:** complete

### Phase 11: Three-Row Showcase Wall
- [x] Replace the homepage category rails with one compact three-row image wall.
- [x] Make the first row auto-scroll left, the second auto-scroll right, and the third auto-scroll left.
- [x] Keep the three rows visually grouped and slightly staggered instead of separated into text-heavy sections.
- [x] Remove homepage work-section explanatory copy, counters, arrows, and other extra text so the wall is image-led.
- [x] Make each card flip on hover/focus and show only the project title on the back face.
- [x] Preserve click-through into the existing detail pages.
- [x] Re-run build and browser QA for desktop/mobile.
- **Status:** complete

### Phase 12: Showcase Drag Takeover and Speed Tuning
- [x] Pause the affected showcase row when the user presses and drags with a mouse.
- [x] Make dragged rows follow pointer movement instead of continuing auto-scroll under the cursor.
- [x] Resume the row's previous auto-scroll direction after mouse release.
- [x] Prevent drag gestures from accidentally opening project detail pages.
- [x] Keep normal click-through to project detail pages when the user clicks without dragging.
- [x] Reduce auto-scroll speed from the previous pass while preserving the left/right/left direction pattern.
- [x] Re-run build and browser QA for desktop drag, click, resume behavior, and mobile overflow.
- **Status:** complete

### Phase 13: Mainland China / Hong Kong Deployment Strategy
- [x] Treat this as a strategy discussion only; do not deploy because the website is still being refined.
- [x] Audit the current app shape: React/Vite static site, no backend requirement, no obvious blocked external runtime dependencies in checked app source.
- [x] Record the main technical risk: heavy media assets should be compressed before public launch.
- [x] Verify the key infrastructure constraint: Vercel is not a reliable primary Mainland China interview link, and Mainland CDN/hosting generally requires ICP filing.
- [x] Recommend one public domain on Hong Kong static hosting as the first low-cost path.
- [x] Record the more reliable later path: same domain plus ICP filing and Mainland static hosting/CDN or GeoDNS routing.
- [x] Add `deployment_china_hk_strategy.md` as the persistent handoff note.
- **Status:** complete

### Phase 14: China / Hong Kong Readiness Audit Tooling
- [x] Add `tools/china-readiness-audit.mjs` to scan deploy output for blocked/risky runtime URLs and oversized deploy assets.
- [x] Add `npm run audit:china` for report-only checks.
- [x] Add `npm run predeploy:china` for build plus strict audit.
- [x] Update the deployment strategy with EdgeOne as a candidate that still depends on selected region and ICP status.
- [x] Run `npm run build`.
- [x] Run `npm run audit:china`.
- [x] Run strict audit directly and confirm the current site is not launch-ready for the Mainland stability target because of high-risk asset size.
- **Status:** complete, with strict predeploy blocked by asset compression work

### Phase 15: China / Hong Kong Asset Weight Reduction
- [x] Back up original heavyweight deployment assets to `tmp/portfolio-china-assets-backup-20260531-192026`.
- [x] Re-render Hero ribbon video from the existing Remotion source at 1280x720 / CRF 30 for deployment use.
- [x] Replace `public/hero-ribbon-loop.mp4` with the lighter Remotion output.
- [x] Convert referenced heavy PNG screenshots to JPG variants:
  - `palifood-stage-china.jpg`
  - `palifood-login-china.jpg`
  - `momenta-github-compose-china.jpg`
  - `offer-quest-china.jpg`
  - `miro-home-china.jpg`
  - `hydrotherapy-detail-china.jpg`
- [x] Move unreferenced heavy public assets out of `public` so Vite no longer copies them into `dist`.
- [x] Update `src/main.jsx` references to the lightweight China-ready assets.
- [x] Run `npm run predeploy:china`; strict audit now passes.
- [x] Run local preview browser QA for desktop home, detail page, mobile home, video readiness, broken images, HTTP errors, console errors, and horizontal overflow.
- **Status:** complete

### Phase 16: One-Domain Release Package and Live URL Verification
- [x] Add `tools/package-china-dist.mjs` to package the audited `dist` output into a release folder and zip file with a SHA-256 manifest.
- [x] Add `tools/verify-live-url.mjs` to check a public URL's homepage, critical JS/CSS assets, and Hero video.
- [x] Add `npm run package:china`.
- [x] Add `npm run verify:url -- <url>`.
- [x] Generate a release package under `release/`.
- [x] Verify the live URL script against local preview at `http://127.0.0.1:5182/`.
- [x] Update the deployment strategy with the package and post-domain verification workflow.
- **Status:** complete

### Phase 17: Hosting Candidate Matrix and Static Host Compatibility
- [x] Re-check current official constraints for EdgeOne Pages, Cloudflare Pages, Alibaba OSS, and Tencent COS.
- [x] Add `hosting_decision_matrix.md` with ranked one-domain hosting candidates.
- [x] Set EdgeOne Pages global excluding Mainland as the first free/low-cost test path.
- [x] Set Hong Kong object storage static hosting as the second low-cost path.
- [x] Keep ICP plus Mainland static hosting/CDN as the final stable route if Shenzhen reliability is mandatory.
- [x] Update `tools/package-china-dist.mjs` so release packages include `404.html`, `_headers`, and `_redirects`.
- [x] Regenerate the latest release package.
- [x] Confirm the release README contains the preferred test order and provider notes.
- **Status:** complete

### Phase 18: Live URL Stability Reports and Evidence Template
- [x] Extend `tools/verify-live-url.mjs` with `--repeat`, `--interval`, `--timeout`, `--asset-timeout`, `--report`, and `--markdown`.
- [x] Keep the original checks: home HTML, React root, critical JS/CSS, Hero video, HTTPS requirement for public URLs.
- [x] Generate a local JSON report and Markdown report from `http://127.0.0.1:5182/`.
- [x] Add `deployment_verification_log.md` for Hong Kong and Shenzhen/Mainland no-VPN evidence.
- [x] Update `deployment_china_hk_strategy.md` and `hosting_decision_matrix.md` with the repeated verification command.
- [x] Update release-package README generation to include repeated URL verification and report paths.
- [x] Run `npm run package:china`; build, strict audit, and package generation passed.
- **Status:** complete, but public launch remains pending real domain/hosting/regional tests

### Phase 19: One-Domain Launch Runbook and Domain Readiness Verifier
- [x] Re-check official hosting constraints for EdgeOne Pages, Cloudflare Pages, Tencent COS, and Alibaba OSS with AnySearch.
- [x] Add `one_domain_launch_runbook.md` with the practical provider sequence: EdgeOne global excluding Mainland, Hong Kong COS/OSS, then ICP plus Mainland hosting/CDN.
- [x] Add `tools/verify-domain-readiness.mjs` to check DNS resolution, TLS certificate state, HTTP status, HTTPS final URL, and React root visibility from the current machine.
- [x] Add `npm run verify:domain`.
- [x] Update deployment strategy, hosting matrix, verification log, and release README generation with `verify:domain`.
- [x] Run `node tools/verify-domain-readiness.mjs --help`.
- [x] Run `npm run verify:domain -- http://127.0.0.1:5182/ --report release/domain-local-check.json --markdown release/domain-local-check.md`; local check passed.
- [x] Run `npm run verify:url -- http://127.0.0.1:5182/ --repeat 1 --report release/live-local-goal-check.json --markdown release/live-local-goal-check.md`; local check passed.
- [x] Run `npm run package:china`; build, strict audit, and package generation passed.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 20: Release Handoff Package for One-Domain Launch
- [x] Search local project files for existing custom-domain, EdgeOne, COS, OSS, Vercel, Cloudflare, or `.env` deployment clues.
- [x] Confirm no real custom domain or deployment credential/config is present in the project workspace.
- [x] Add `domain_dns_template.md` for the real custom domain, CNAME, verification, and fallback hosting records.
- [x] Update `one_domain_launch_runbook.md` typo in the live URL command.
- [x] Update `tools/package-china-dist.mjs` so release folders include:
  - `one_domain_launch_runbook.md`
  - `hosting_decision_matrix.md`
  - `deployment_china_hk_strategy.md`
  - `deployment_verification_log.md`
  - `domain_dns_template.md`
- [x] Regenerate the release package with `cmd /c npm run package:china`.
- [x] Confirm the regenerated release includes the handoff documents and strict audit still passes.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 21: Machine-Readable Launch Goal Gate
- [x] Add `deployment_evidence.template.json` for the real custom domain, hosting plan, automated reports, and Hong Kong/Shenzhen evidence.
- [x] Add `tools/verify-launch-goal.mjs` to verify the full objective evidence.
- [x] Add `npm run verify:launch-goal`.
- [x] Update `deployment_verification_log.md`, `one_domain_launch_runbook.md`, and `hosting_decision_matrix.md` so final completion requires the launch gate.
- [x] Update `tools/package-china-dist.mjs` so release packages include `deployment_evidence.template.json`.
- [x] Run `node tools/verify-launch-goal.mjs --help`; usage output succeeded.
- [x] Run `node tools/verify-launch-goal.mjs --evidence deployment_evidence.template.json`; it failed as expected because the template still contains placeholders and no real reports.
- [x] Run `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.template.json`; it failed as expected via npm script for the same reason.
- [x] Regenerate the release package with `cmd /c npm run package:china` and confirm the evidence template is included.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 22: EdgeOne Pages Chinese Execution Checklist
- [x] Re-check EdgeOne Pages custom-domain and domain-overview rules with AnySearch.
- [x] Add `edgeone_pages_setup_zh.md` with Chinese steps for the first low-cost test path.
- [x] Document why EdgeOne project/deployment preview domains are not acceptable for the Shenzhen test and why a custom domain is required.
- [x] Document the required region: global availability zone excluding Chinese mainland.
- [x] Document DNS ownership verification, production CNAME, HTTPS, automated verification, Hong Kong/Shenzhen no-VPN tests, and fallback decisions.
- [x] Update `one_domain_launch_runbook.md` to point to `edgeone_pages_setup_zh.md`.
- [x] Update `tools/package-china-dist.mjs` so release packages include `edgeone_pages_setup_zh.md`.
- [x] Regenerate the release package with `cmd /c npm run package:china`.
- [x] Confirm the regenerated release includes `edgeone_pages_setup_zh.md` and strict audit still passes.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 23: Deployment Evidence Generator
- [x] Add `tools/generate-deployment-evidence.mjs` to create `deployment_evidence.json` scaffolds from a real custom-domain URL.
- [x] Add `npm run generate:evidence`.
- [x] Keep generated evidence intentionally incomplete until Hong Kong and Shenzhen/Mainland no-VPN proof is filled.
- [x] Tighten `verify-launch-goal` placeholder checks for reserved example domains, TODO, TBD, pending, placeholder, and Chinese placeholder terms.
- [x] Fix the launch gate so normal report names such as `release/domain-check.json` are allowed when the report files and contents are real.
- [x] Update runbook, verification log, strategy, hosting matrix, EdgeOne checklist, and release README generation with the generator workflow.
- [x] Validate generator help output through direct Node and npm script paths.
- [x] Generate a fake-domain sample and confirm `verify:launch-goal` fails as expected.
- [x] Confirm the untouched template still fails as expected.
- [x] Regenerate the release package with `cmd /c npm run package:china`.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 24: Release Package Verification Gate
- [x] Add `tools/verify-release-package.mjs` to validate a generated release folder before upload.
- [x] Add `npm run verify:release`.
- [x] Make `npm run package:china` run release verification automatically after packaging.
- [x] Check required dist files: `index.html`, `404.html`, `_headers`, `_redirects`, and `hero-ribbon-loop.mp4`.
- [x] Check required launch documents and `README_DEPLOY.md`.
- [x] Verify `manifest.json` name, deploy root, file count, total bytes, per-file byte counts, and SHA-256 hashes.
- [x] Verify release size budgets suitable for the China/Hong Kong path.
- [x] Add a zip-creation fallback in `tools/package-china-dist.mjs` for cases where `Compress-Archive` returns without producing the zip file.
- [x] Update launch docs so release verification is part of the upload checklist.
- [x] Re-run `cmd /c npm run package:china`; build, strict audit, packaging, zip fallback, and release verification passed.
- **Status:** complete locally, but public launch remains pending real domain/hosting/regional tests

### Phase 25: Local Preview Diagnosis
- [x] Check whether `http://127.0.0.1:5182/` is listening.
- [x] Check common Vite preview ports.
- [x] Confirm `cmd /c npm run preview -- --host 127.0.0.1 --port 5182` can start in the foreground.
- [x] Confirm `py -m http.server` is not usable because the Windows Python launcher reports no installed Python.
- [x] Add `tools/serve-dist.mjs` as a dependency-free Node static server for `dist`.
- [x] Add `npm run preview:static`.
- [ ] Stabilize background startup in the current Codex desktop shell, or use the foreground static preview command when local review is needed.
- **Status:** in progress; local build is valid, but the background preview process did not persist through the current shell tool.

### Phase 26: Aircenter-Style Homepage Migration
- [x] Freeze the rejected generated helix asset and do not use it as the live hero background.
- [x] Keep a faint reserved hero structure slot only; final helix video waits for the user's 25-frame image sequence.
- [x] Replace the black ribbon hero with a white aircenter-style opening: giant `YANG` letters, centered short title, no hero buttons, no search box, no dialogue UI.
- [x] Add a compact achievement-number band using confirmed CV/project signals.
- [x] Add a product/spatial showcase for hardware, CMF, and equipment projects with center card plus side perspective cards.
- [x] Add a digital case scroller inspired by aircenter's image-plus-number layout, using CSS sticky and ScrollTrigger state switching.
- [x] Keep the three-row image-led showcase wall as the full work index.
- [x] Add a black footer with giant `YANG` letters and minimal metadata.
- [x] Preserve existing project details, language toggle, Agent orb, and product-source preservation rules.
- [x] Re-run production build and Playwright QA for desktop/mobile, click-through, auto-scrolling wall, and horizontal overflow.
- **Status:** complete except final helix video asset, which is intentionally blocked until the user provides the 25 approved frames.

### Phase 27: Hero Helix Frame-Sequence Video Pipeline
- [x] Exclude the explicitly rejected chat screenshot candidate from hero-video use.
- [x] Scan likely local/temp/project folders for the newly pasted 25 helix frames.
- [x] Confirm unrelated screenshot groups are not valid helix source frames.
- [x] Add `source-helix-frames/` as the required local input folder for the approved 25 frames.
- [x] Add `npm run prepare:helix` to normalize ordered source frames into Remotion's public folder.
- [x] Add `npm run render:helix` to render `public/hero-yang-helix-loop.mp4`.
- [x] Add a Remotion frame-sequence composition that uses ping-pong playback plus crossfade to avoid hard start/end jumps.
- [x] Wire the homepage Hero to prefer `/hero-yang-helix-loop.mp4`, with the existing faint placeholder underneath if the video is not generated yet.
- [x] Render the final helix video from the approved 25 local frame files.
- [x] Verify the generated video's first/last transition, desktop/mobile Hero display, and production build.
- **Status:** complete

### Phase 28: Hero Smoothness Guidance and Letter Spacing Fix
- [x] Confirm the current 25-frame source sequence is too sparse for a fully smooth 8-12s Hero loop; CSS/Remotion crossfade cannot invent true high-frame-rate motion.
- [x] Provide a Seedance/Cedance prompt for generating a clean HD seamless-loop stepped-helix video with first and last frames visually aligned.
- [x] Keep `/hero-yang-helix-loop.mp4` as a temporary source until the user provides a higher-frame-rate H.264 MP4 or a denser frame sequence.
- [x] Fix the oversized `YANG` letter layout so `A` and `N` no longer overlap or read as stuck together.
- [x] Re-run production build and browser QA for desktop/tablet/mobile letter spacing, video loading, console errors, and horizontal overflow.
- **Status:** complete for layout; video smoothness remains pending new generated source.

## Explicit Requirements
- Homepage must not show the user's name as the hero headline.
- Hero should be an independent black/white dynamic visual, not a project screenshot.
- Hero copy should be minimal: one large title and one subtitle.
- Images extracted from PPT/PDF should not preserve slide-layout text as if it were part of the image; use clean image content and rebuild captions/copy in the website layout.
- AI image work must be edit-target based when a product is involved: keep the original product form, color, material, proportions, and details unchanged; do not generate a new product from a text prompt.
- Work section must not be a centered big-card carousel.
- Work section must be white-background / black-text.
- Each category should show a horizontal row with multiple works and support left/right drag or looped browsing.
- Carousel rows should feel like continuous rails: no hard rebound, no stuck drag, and a short inertial glide after release.
- Page vertical scrolling must not switch projects.
- Work details should read like a portfolio process page.
- Agent entry is a small floating orb that can open, close, move, and not block the content.
- `momenta` GitHub source has been provided and is publicly visible at `https://github.com/JosicZhou/MOMENTA`; local Keynote evidence is kept as supporting material.
- Public deployment should eventually use one clean custom domain that can open in both Hong Kong and Mainland China without relying on VPN access.
- China/Hong Kong deployment readiness must be checked with `npm run audit:china`; final launch should pass `npm run predeploy:china`.
- Before uploading a release package, `cmd /c npm run verify:release -- --latest` must pass for the selected package.
- After binding a real one-domain URL, run `npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`; goal completion still requires Hong Kong and Shenzhen/Mainland no-VPN verification.
- After binding a real one-domain URL, run `cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json`, fill the real Hong Kong/Shenzhen evidence, then require `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json` to pass.

## Decisions
| Decision | Reason |
|---|---|
| Execute in `portfolio-site` without worktree | User chose current-directory execution and the project is currently an untracked directory under the parent repo |
| Rebuild `src/main.jsx` and `src/styles.css` instead of stacking overrides | Existing CSS has repeated carousel selectors and is difficult to make reliable by additive overrides |
| Use confirmed local images only | Avoid misleading placeholder images |
| Include Momenta as public GitHub source plus local Keynote evidence | User provided the public repo link; local Keynote/device evidence remains useful supporting material |
| Avoid slide-text screenshots as main artwork | User clarified that PPT/PDF text overlays are layout text and should be removed or replaced by site-native copy |
| Use Hong Kong static hosting as first deployment path | It is lower friction than ICP filing and more Mainland-friendly than Vercel-only, while keeping one public domain |
| Use ICP + Mainland hosting/CDN only when Shenzhen reliability must be guaranteed | Mainland infrastructure is the stable route, but it adds filing time and operational overhead |

## Known Mistakes To Avoid
| Mistake | Resolution |
|---|---|
| Sparse work rows with only two cards | Build multi-card category rails with 5 or more items where enough evidence exists |
| Vertical wheel switching | Do not attach `onWheel` project-changing handlers |
| Dark work section | Keep the work section light and separate from hero |
| Reusing irrelevant images | Use actual local project assets or mark missing evidence as blocked |
| Publishing sensitive project files | Do not publish Li Bai HTML or any file that may contain API keys |
| Generating a different product form | Only edit from a real source product image, and change background/scene only |

### Phase 29: Aircenter Interaction Correction
- [x] Re-check the aircenter-style requirements from user screenshots: staged wordmark reveal, delayed helix/video reveal, upward letter collection on scroll, dark metric cards, and fixed `YANG` footer.
- [x] Fix the Air Hero sticky failure caused by inherited `.hero-section { overflow: hidden; }` by allowing `.air-hero` to keep the sticky child in the viewport.
- [x] Add CSS initial hidden states and GSAP `fromTo` timing so the hero starts blank, then reveals `YANG` left-to-right, then reveals the helix video and copy.
- [x] Adjust ScrollTrigger timing so the large scattered letters quickly move upward and fade out while the collected top `YANG` remains visible.
- [x] Rework the achievement cards toward the aircenter black-card rhythm: large number, restrained small note, bottom-right label, dark background.
- [x] Confirm the footer always renders `YANG` in both Chinese and English.
- [x] Run production build and Playwright screenshots for intro timing, mid-scroll sticky, achievement cards, footer language switch, console errors, and horizontal overflow.
- **Status:** complete

### Phase 30: Aircenter Typography and Footer Position Correction
- [x] Reduce the digital case-panel headline scale so Chinese project titles fit as a single controlled line on desktop.
- [x] Add the aircenter-like dual progress rules and `/ total` index to the digital case panel.
- [x] Reduce digital case body copy size and prevent horizontal text overflow.
- [x] Restyle the case button as a restrained gray bottom bar instead of a large pill.
- [x] Reduce the black footer `YANG` scale and keep all letters fully visible on desktop and mobile.
- [x] Run build plus desktop/mobile Playwright screenshots for the digital case panel and footer.
- **Status:** complete

### Phase 31: Generated Helix Video Motion Audit
- [x] Inspect the user's generated MP4 at `C:\Users\Yang\Desktop\job\web\6月2日 (2).mp4`.
- [x] Extract a one-frame-per-second contact sheet with local ffmpeg for visual motion review.
- [x] Compare against the user's reference recording `QQ20260601-231219-HD.mp4` and the live aircenter page.
- [x] Record that the generated video is not acceptable because it behaves like a back-and-forth/ping-pong camera orbit rather than one continuous counterclockwise upward rotation.
- [x] Produce a revised generation prompt that locks the camera, forbids reverse rotation, and requires continuous counterclockwise upward helix motion.
- **Status:** complete

### Phase 32: Hero Letter Gap and Air Footer Position Pass
- [x] Re-check the current local preview after the user asked whether the remaining bad areas were fixed.
- [x] Confirm the digital case panel is now controlled: one-line desktop title, dual progress rules, `/ total` index, restrained copy, and bottom gray action bar.
- [x] Fix the Air Hero `YANG` positions again so `A` and `N` no longer visually stick together over the helix.
- [x] Reposition the black footer letters with absolute aircenter-like placements instead of evenly distributed flex spacing.
- [x] Run production build and Playwright desktop/mobile screenshots for hero, digital case panel, footer, console errors, and horizontal overflow.
- **Status:** complete for the known layout issues; pending replacement of the temporary helix video with the user's new generated MP4.

### Phase 33: Aircenter Three-Card Product Orbit Correction
- [x] Remove the incorrect product-showcase title, explanatory copy, and bottom previous/next controls.
- [x] Change the product showcase so desktop only renders three cards at a time: left, center, and right.
- [x] Keep the cards separated with visible gaps, matching the aircenter-style three-panel orbit more closely.
- [x] Preserve interactions: side-card click changes active card, center-card click opens the project, horizontal drag changes the active card.
- [x] Run production build and Playwright interaction QA for visible card count, missing controls/copy, side click, drag, console errors, and overflow.
- **Status:** complete.

### Phase 34: Aircenter Product Orbit Visual Match Pass
- [x] Re-check the user's latest reference requirement: exactly three separated cards, center largest, side cards smaller and perspective-deformed toward the edges.
- [x] Increase side-card distance from the center card and reduce side-card scale so the three modules no longer visually crowd together.
- [x] Increase side-card `rotateY` perspective so the edge cards read as receding panels rather than flat adjacent cards.
- [x] Keep the product orbit free of visible section title, explanatory copy, and bottom controls.
- [x] Run production build and Playwright QA for desktop spacing, visible card count, side click, drag switch, console errors, and mobile overflow.
- **Status:** complete.

### Phase 35: Product Orbit Perspective Direction Fix
- [x] Re-derive the user's correction: side cards must be larger toward the center and shrink toward the viewport edges.
- [x] Reverse the side-card `rotateY` sign so the left card uses negative rotation and the right card uses positive rotation.
- [x] Preserve the existing separated three-card layout, no copy, no controls, side-card click, and drag switching.
- [x] Run build plus desktop/mobile Playwright QA for rotation direction, card count, gaps, interaction, console errors, and overflow.
- **Status:** complete.

### Phase 36: Product Orbit Aircenter Separation Refit
- [x] Re-check the user's latest reference: the three visible images must be separate panels, the center image must be the largest, and side images should recede toward the viewport edges without touching the center image.
- [x] Replace the temporary tight transform with an aircenter-like stage: center card stays large, side cards move to `58vw`, keep near-full height, and use stronger `rotateY(48deg)` perspective instead of shrinking into small flat cards.
- [x] Preserve the existing interaction model: no visible title/copy/controls, side-card click switches, center-card click opens the project, and horizontal drag still controls the carousel.
- [x] Run production build and Playwright desktop measurement for visible card count, center/side sizing, gaps, overlap, console errors, and screenshot evidence.
- **Status:** complete.

### Phase 37: Product Orbit Shallow Angle + Vercel Deploy
- [x] Re-check the latest user correction: side cards should be cropped by the viewport at roughly three-quarters visibility, but the side perspective should be shallow and not over-folded.
- [x] Reduce side-card `rotateY` from `14deg` to `8deg` while preserving the three-card-only layout, separated gaps, center dominance, side-card click, center open, and drag switching.
- [x] Add `.vercelignore` so Vercel does not upload local generated artifacts such as `remotion-hero`, `release`, `node_modules`, `source-helix-frames`, `dist`, and `tmp`.
- [x] Run production build and local Playwright measurement.
- [x] Deploy to Vercel and verify the public alias returns `200 OK`.
- [x] Run Playwright measurement against the deployed URL.
- [ ] Supabase real connection remains blocked until project env vars are provided: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
- **Status:** product orbit and Vercel deployment complete; Supabase runtime connection pending credentials.

### Phase 38: Product Orbit Corner-Line + Hero Collected Wordmark Refinement
- [x] Re-check the latest user correction: side-card corners must visually sit on continuous extension lines, and the collected `YANG` should be slightly smaller.
- [x] Replace the remaining strong 3D fold with explicit shallow side-card `clip-path` geometry so the top and bottom edges form clean straight diagonal lines.
- [x] Keep only three visible product cards on desktop, with the center card largest and the side cards cropped by the viewport at about three-quarters visibility.
- [x] Shrink the Hero collected `YANG` state and remove unused `.air-hero-wordmark` CSS so there is no second wordmark implementation left in the code.
- [x] Run production build.
- [x] Run local Playwright verification for visible Hero collected state and final Hero state.
- [x] Run local and deployed Playwright verification for product orbit separation, side visible ratio, gaps, no overlap, and console warnings/errors.
- [x] Redeploy to Vercel production and verify the public alias returns `200 OK`.
- [ ] Supabase real connection remains blocked until project env vars are provided: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
- **Status:** layout and Vercel deployment complete; Supabase runtime connection pending credentials.

### Phase 39: Supabase Connection Gate
- [x] Re-audit the current Supabase client implementation.
- [x] Confirm `.env.example` is only an empty template and there is no local `.env` / `.env.local` with real Supabase values.
- [x] Confirm the deployed site still reports `supabaseStatus: missing-env` through browser verification.
- [x] Add `tools/verify-supabase-config.mjs`.
- [x] Add `npm run verify:supabase`.
- [x] Run `cmd /c npm run verify:supabase`; it correctly fails with `reason: missing-env`.
- [x] Run `cmd /c npm run build`; build passes after adding the verifier.
- [ ] Configure real Supabase env vars locally and on Vercel.
- [ ] Run `supabase/portfolio_health.sql` in the target Supabase project.
- [ ] Re-run `cmd /c npm run verify:supabase` and deployed browser verification until both report connected.
- **Status:** verification gate added; real database connection remains blocked by missing Supabase URL/key.

### Phase 40: Aircenter Hero YANG Mid-Scroll Stability Fix
- [x] Diagnose the reported regression where `YANG` letters could overlap or fly apart during the scroll collection state.
- [x] Remove stagger from the scroll-collection tween so the four original letters move as one coherent word.
- [x] Change Hero letter target measurement to use a temporarily reset base transform state, instead of measuring already animated x/y/scale values.
- [x] Keep the implementation to only four `.air-letter` nodes; do not reintroduce a separate collected wordmark element.
- [x] Run `cmd /c npm run build`.
- [x] Run local Hero verification for expanded, visible collected, and collected states.
- [x] Run local and deployed mid-scroll verification across eight checkpoints to confirm order, spacing, and no overlap.
- [x] Redeploy to Vercel production and verify `https://portfolio-site-three-rose.vercel.app` returns `200`.
- [ ] Supabase real connection remains blocked until project env vars are provided.
- **Status:** Hero letter stability and Vercel deployment complete; Supabase runtime connection still pending credentials.

### Phase 41: Supabase Handoff Hardening
- [x] Run `cmd /c npx vercel env ls` to confirm whether production already has Supabase env vars.
- [x] Confirm Vercel project currently has no environment variables.
- [x] Add `supabase/README.md` with exact Supabase SQL, local `.env.local`, verification, and Vercel env setup steps.
- [x] Keep `.env.example` as the local variable template.
- [x] Re-run `cmd /c npm run build`.
- [x] Re-run `cmd /c npm run verify:supabase` and confirm the remaining failure is still `missing-env`.
- [ ] Configure real Supabase URL/key locally and on Vercel.
- [ ] Run `supabase/portfolio_health.sql` in the target Supabase project.
- [ ] Redeploy after env vars are configured and verify browser status becomes `connected`.
- **Status:** handoff hardened; real connection remains blocked by missing Supabase credentials.

### Phase 42: Tresmares Expansion Seven-Card Orbit Geometry
- [x] Re-check the latest user correction: desktop should expose exactly seven cards, with one centered active card and three cards on each side.
- [x] Change the expansion orbit from a loose/scattered continuous layout to fixed visible semicircle slots driven by a bottom-center circle origin.
- [x] Keep left and right cards symmetric around the viewport center and rotate each card so its local vertical normal points toward the bottom circle center.
- [x] Hide cards outside the three-left/three-right visible slots so the section no longer shows eight or more images at once.
- [x] Preserve GSAP ScrollTrigger pinned + scrub behavior, active country label, red dot, bottom copy fade, and no horizontal overflow.
- [x] Run `cmd /c npm run build`.
- [x] Run Playwright orbit QA locally at desktop/mobile progress checkpoints.
- [x] Redeploy to Vercel production and verify the public alias.
- **Status:** complete.

### Phase 43: Tresmares Seven-Card + White Erase Edge Fix
- [x] Re-check the latest user correction: treat seven-card count and edge erasure as primary acceptance criteria.
- [x] Keep the desktop orbit at exactly seven visible cards: one active center card, three cards on the left, and three cards on the right.
- [x] Preserve continuous scroll-driven orbit motion rather than discrete card switching.
- [x] Remove whole-card Gaussian blur from the expansion cards.
- [x] Add white gradient wash overlays on side/bottom edge cards so they look partially erased by white, matching the reference more closely than blur.
- [x] Run `cmd /c npm run build`.
- [x] Run Playwright orbit QA locally at desktop/mobile progress checkpoints.
- [x] Redeploy to Vercel production and verify the public alias.
- **Status:** complete. Latest production deployment `dpl_ASjZbz5GHEVyrPYCMmroDHsfS6Us` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

### Phase 44: Tresmares Center Image Clarity Guard
- [x] Re-check the reported issue: the centered Expansion orbit image still looked blurred/gray.
- [x] Identify the root cause: the active centered `holland` card image URL returned `404`, so the card could render as a soft gray block even when CSS blur was disabled.
- [x] Replace the broken `holland` image URL with a loadable image source.
- [x] Keep visible Expansion cards at `blur(0px)` and preserve the white edge/bottom erase treatment only through overlays.
- [x] Extend `tmp/verify-tresmares-orbit.mjs` so QA checks whether each visible card image is actually loaded.
- [x] Run `cmd /c npm run build`.
- [x] Run local Playwright orbit QA and deployed Playwright orbit QA.
- [x] Redeploy to Vercel production and verify the public alias.
- **Status:** complete. Latest production deployment `dpl_6cSzBzGeeGQGxcjPoErDgBW1rAmU` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

### Phase 45: Tresmares Orbit Smooth Scroll Experiment
- [x] Preserve the current accepted version as fallback tag `fallback-tresmares-orbit-2026-06-19`.
- [x] Keep the accepted seven-card semicircle geometry, sharp center image, white edge erase, and pinned Tresmares section unchanged.
- [x] Replace raw `ScrollTrigger.create(... onUpdate)` progress handling with a scrubbed GSAP proxy tween so scroll progress eases continuously instead of stepping directly with wheel events.
- [x] Move active country label updates out of React state during scroll, preventing re-renders while the orbit is moving.
- [x] Soften active label opacity around card handoff without changing the visible card positions.
- [x] Run production build.
- [x] Run local Playwright orbit QA for desktop/mobile card count, image-loaded checks, title overlap, blur state, and horizontal overflow.
- [x] Redeploy to Vercel production and verify the public alias.
- [x] Run deployed Playwright orbit QA.
- **Status:** complete. Latest production deployment `dpl_Dd24jd7oDvcBAgUZ6Q726W7ZZQjR` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

### Phase 46: Next Agent Handoff Package
- [x] Create `NEXT_AGENT_HANDOFF.md` as the first-read document for the next Codex / AI window.
- [x] Record authoritative links: GitHub repository, production site, latest deployment, and Tresmares fallback tag.
- [x] Summarize accepted visual states, strict guardrails, current blockers, validation commands, and rollback path.
- [x] Update planning and agent memory files so the handoff is discoverable from both root docs and `agent_memory/`.
- [x] Push the handoff package to GitHub `main`.
- **Status:** complete.

### Phase 47: Agent Entry Cleanup + Local Portfolio Search
- [x] Remove the Agent panel title, explainer text, preset suggestion chips, and hide-entry row.
- [x] Keep only the bottom search/chat input in the initial open panel.
- [x] Replace the old black icon/restore affordance with an Apple AssistiveTouch-style floating dot.
- [x] Add local rule-based project/profile search so queries can either answer briefly or open a matched project.
- [x] Verify `拍立食` search opens the project and the initial panel has no unwanted helper content.
- [x] Run `cmd /c npm run build`.
- [x] Push to GitHub `main` and deploy to Vercel production.
- **Status:** complete. Public alias verified at `https://portfolio-site-three-rose.vercel.app/`.

### Phase 48: Agent RAG Product Plan + UI Correction
- [x] Correct profile replies from `羚羊` to `林杨`.
- [x] Replace the fixed profile answer with a dynamic answer assembled from current portfolio project data.
- [x] Remove the Agent panel close `X`; the panel now closes by clicking the orb again or clicking outside the panel.
- [x] Increase the AssistiveTouch orb visibility while preserving its quiet Apple-like floating control feel.
- [x] Add `docs/PORTFOLIO_RAG_AGENT_PLAN.md` documenting the future RAG evidence chain, explainable reasoning summary, and confidence/self-doubt scoring layer.
- [x] Run `cmd /c npm run build`.
- [x] Run minimal browser QA for Agent open, outside-click close, `林杨` profile answer, and project search.
- [x] Push and deploy after validation.
- **Status:** complete. GitHub `main` includes commit `5569c0e`; latest production deployment `dpl_5xgotJtgyMiRqPkqvDxrNd8hqQNk` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

## Phase 49 - Agent Project Evaluation Answers
- [x] Detect evaluation-style Agent queries such as `你觉得拍立食做得怎么样`.
- [x] Add common speech-to-text aliases for Pai Li Shi, including `拍历史` and `派历史`.
- [x] Replace the generic project-discovery reply with a project-specific evaluation when the query asks for judgement or opinion.
- [x] Make Agent result cards visibly clickable with a `查看项目` / `View case` affordance and arrow icon.
- [x] Run `cmd /c npm run build`.
- [x] Run local browser QA for the Agent evaluation answer, clickable card affordance, and Pai Li Shi detail navigation.
- [ ] Push to GitHub and deploy production.
- **Status:** implementation and local QA complete; GitHub/Vercel publishing is next.
