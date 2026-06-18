# Findings

## Requirements
- The site needs persistent planning files and every stage should update `task_plan.md`, `findings.md`, and `progress.md`.
- The work section should be a light portfolio browsing area, not an extension of the dark hero.
- The correct work interaction is a full horizontal rail with many cards, pointer drag, arrows, and loop behavior.
- Vertical page scroll must remain normal page scroll and must not change the selected work.
- Project detail pages should show process, not isolated cards.
- v1.0 should read more like a professional visual portfolio: image-first, short card copy, stronger hero, and details that vary by project type.
- PPT/PDF extracted images should be treated carefully: slide-layout labels and explanatory text are not source-image content and should not be embedded in the website as screenshots.
- `momenta` must not be invented from memory; source status must be explicit.
- User provided `https://github.com/JosicZhou/MOMENTA`; the GitHub page is publicly visible and identifies the repository as `JosicZhou/MOMENTA`.
- Product cover generation must preserve the user's original product image exactly. The product's shape, color, material, proportion, and visible details are locked; only the background, scene, lighting, crop, and presentation mood may change.
- If a project lacks reliable source product views, do not generate a new product form. Keep it source-pending and ask for source images.
- Agent should stay available but visually step back during page scroll and carousel dragging.
- The work section should not explain the interaction with large intro copy; after the Hero it should enter the category rails directly.
- Product-card covers should not look like raw slide crops. When reliable original product renders exist, use source-preserving compositing to put the same product form on a cleaner, more unified background.
- GSAP motion pass is confirmed: use `gsap` with timeline/ScrollTrigger, do not add Hero buttons, place the pinned section after work rails and before the capability summary, and keep parallax subtle.
- Motion should stay restrained and portfolio-grade; avoid playful bouncy easing, large magnetic displacement, or heavy parallax.

## Confirmed Local Sources
- Main app: `C:\Users\Yang\Documents\New project\portfolio-site`
- Miro: `C:\Users\Yang\Desktop\miro`
- Pai Li Shi: `C:\Users\Yang\Desktop\拍立食`
- Semester 1: `C:\Users\Yang\Desktop\semester1`
- Semester 2: `C:\Users\Yang\Desktop\semester2`
- Offer Quest: `C:\Users\Yang\Documents\New project\job-learning-quest`
- Recovery notes:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio_recovery_plan_019dbe53.md`
  - `C:\Users\Yang\Documents\New project\tmp\thread_019dbe53_full_conversation.md`
  - `C:\Users\Yang\Documents\New project\tmp\thread_019dbe53_tool_event_inventory.md`

## Project Evidence
- Miro is a cross-cultural AI rehearsal / RAG / web and backend project with screenshots, PRD, architecture, and deployment evidence.
- Pai Li Shi is a mobile-first food recognition / health feedback / H5 prototype with formal UI screenshots.
- Li Bai is a digital humanities interactive site with map, network, chart, bilingual content, and Ask Li Bai flow; original HTML may include API key-like values and should not be published directly.
- CBS5504 TCM is a knowledge graph / data visualization project and must be framed as digital humanities / educational visualization, not medical advice.
- CBS5502 is an NLP data cleaning / feel-disambiguation project with dataset and presentation evidence.
- Industrial work includes Cross-ripple hydrotherapy wearable, cup-in-cup drinking aid, heart disease bracelet kit, Sichuan opera drawing ruler, Xiaomi bone-conduction earphones CMF, composite turntable pet toy, smart waste tank, and compression baling press.
- Local Momenta evidence found: `C:\Users\Yang\Desktop\semester1\COMP5571-周一早\final project\文档\Momenta Keynote.key` plus related device/mobile renders.
- Public Momenta GitHub source found: `https://github.com/JosicZhou/MOMENTA`, visible as a SwiftUI iOS / AI music project with root assets including `compose.png` and `share.png`.

## Assets Added / Optimized
- Added Miro screenshots: `miro-hifi-overview.jpg`, `miro-review-dashboard.jpg`, `miro-device-ui.png`
- Added Pai Li Shi screenshots: `palifood-stage.png`, `palifood-login.png`
- Added Momenta local evidence images: `momenta-phone-wall.jpg`, `momenta-device-detail.jpg`, `momenta-exploded.png`
- Added Momenta GitHub source assets: `momenta-github-compose.png`, `momenta-github-share.png`
- Added Capstone device images: `capstone-device-render.jpg`, `capstone-device-export.jpg`
- Added Offer Quest screenshots: `offer-quest-desktop.png`, `offer-quest-map.png`
- Removed oversized copied PNG versions after creating compressed JPG files.
- Cropped a clean `cat-turntable-clean.jpg` from the industrial overview source, removing the slide layout text.
- Removed `industrial-overview.png` from live cards/details. Smart waste tank and compression baling press now show an explicit clean-source-pending state instead of a misleading slide screenshot.

## Image Generation Correction
- The previous text-prompt concept-cover direction is rejected because it can change product form.
- Do not use any generated concept images that were made without an original product image as the edit target.
- New rule: every product cover edit must start from a confirmed local product image or an extracted PDF product image.
- Smart waste tank and compression baling press remain blocked unless real source product images are found.
- Source images were found in the portfolio PDF for smart waste tank, compression baling press, Sichuan opera drawing ruler, composite turntable cat toy, Xiaomi bone-conduction earphones CMF, and electronics CMF.
- No reliable original source image was found for `Heart Disease Bracelet Kit`; its incorrect cover has been removed and the project remains source-pending.

## Source-Preserving Assets Added
- `smart-waste-source-cover.jpg`, `smart-waste-original-source.jpg`, `smart-waste-detail-source.jpg`, `smart-waste-panel-source.jpg`
- `baling-press-source-cover.jpg`, `baling-press-original-source.jpg`, `baling-press-detail-source.jpg`, `baling-press-vi-source.jpg`, `baling-press-panel-source.jpg`
- `opera-ruler-source-cover.jpg`, `opera-ruler-kit-source.jpg`, `opera-ruler-use-source.jpg`
- `cat-turntable-source-cover.jpg`, `cat-turntable-hero-source.jpg`, `cat-turntable-render-source.jpg`, `cat-turntable-detail-source.jpg`
- `xiaomi-cmf-source-cover.jpg`, `xiaomi-cmf-breakdown-source.jpg`, `xiaomi-cmf-detail-source.jpg`
- `cmf-electronics-source-cover.jpg`, `cmf-earbuds-source.jpg`, `cmf-material-source.jpg`

## Current Implementation Findings
- `src/main.jsx` contains all project data and UI composition.
- `src/styles.css` has been consolidated around Apple-system typography, dark hero, light work section, horizontal rails, details, and Agent controls.
- Hero video asset exists at `/hero-ribbon-loop.mp4`.
- Browser plugin is not available in the active tool list, so rendered validation used Playwright from `job-learning-quest`.
- Chinese hero title is now four characters: `智能成形`.
- Browser title and meta description no longer include the user's name.
- Homepage now defaults to Chinese so the first open state shows the four-character hero instead of the English headline.
- Chinese hero characters are rendered as separated inline spans with native spacing, avoiding the previous visually compressed title.
- v1.0 implementation should avoid adding new image assets unless they are source-preserving edits. Current safe path is to improve cover presentation, not invent missing product views.

## QA Findings
- `npm run build` passes after the final interaction fix.
- Playwright desktop/mobile QA passes with no console or page errors.
- Verified title/body omit the user's name, hero video loads, work section remains white, four categories render, rails contain looped multi-card sets, drag changes horizontal scroll, vertical wheel does not open/switch projects, language toggle changes to `智能成形`, project click opens a six-step detail page, Agent orb opens, and mobile has no page-level horizontal overflow.
- Found and fixed one real interaction bug: `setPointerCapture` on rail `pointerdown` prevented normal card clicks from reaching buttons. Pointer capture is now delayed until actual drag movement.
- Found and fixed a carousel loop-quality issue: using `scrollWidth / 3` included row padding, so loop remapping was not aligned with the repeated card sequence and could feel like rebound. The rail now measures one true card sequence from card width plus gap.
- Carousel drag now uses per-frame delta movement and release inertia; CSS row scrolling is `auto` during drag so it no longer fights the pointer.
- Latest Playwright check verified default Chinese four-character hero, one-line title, immediate drag response, release inertia, repeated left drags through the loop, and visible cards after continuous dragging.
- QA screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-site-qa-20260518`.
- 2026-05-20 source-cover QA verified the new source-based covers load for smart waste tank, compression baling press, Sichuan opera drawing ruler, composite turntable cat toy, Xiaomi CMF, and electronics CMF.
- 2026-05-20 QA found and fixed detail-page image cropping: detail media now uses `object-fit: contain` so product/process images are not cut by CSS.
- 2026-05-20 QA verified carousel horizontal scroll, source-pending card presence, smart waste detail gallery, mobile no horizontal overflow, and no console/page errors.
- Latest source-cover screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-source-cover-qa-20260520-cssfix`.
- Follow-up QA refined the card-fit rule: only equipment/technical source covers that are easily cropped use card-level `contain`; wide visual covers keep `cover` for stronger portfolio rhythm.
- Mobile Agent orb is now smaller and lower-opacity by default while retaining drag/open/hide behavior.
- Follow-up screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-contain-agent-qa-20260520-final`.
- 2026-05-21 v1.0 QA passed: Hero title is `智能成形`, no hero input/search box, no visible personal-name headline, work section remains white, four categories render, 63 looped cards exist, card text is clamped to two lines, and the capability layer exists.
- v1.0 carousel QA verified the horizontal rail can still scroll and loop after the visual/card changes.
- v1.0 detail QA verified Miro now uses project-specific case-study sections (`沟通缺口`, `核心闭环`, `界面系统`, `结果证据`) instead of generic process text.
- v1.0 product detail QA verified smart waste tank detail images use `object-fit: contain`, preserving the source product form in the detail gallery.
- v1.0 Agent QA verified the orb enters a subtle state during scroll/drag and restores after interaction stops.
- v1.0 mobile QA verified no page-level horizontal overflow and mobile detail case-study cards stack correctly.
- v1.0 screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-v1-qa-20260521`.
- Phase 9 QA passed: work-section intro heading is removed, first category starts directly at `数字 / Web / AI`, desktop/mobile have no page-level horizontal overflow, and there are no console/page errors.
- Phase 9 cover QA passed: smart waste tank and compression baling press now use `edited-smart-waste-cover.jpg` and `edited-baling-press-cover.jpg` with darker industrial atmosphere backgrounds while preserving the source product form.
- Phase 9 Momenta QA passed: Momenta detail page now displays `Momenta AI 音乐交互`, includes `momenta-github-compose.png` and `momenta-github-share.png` in the gallery, and no longer shows GitHub pending text.
- Phase 9 screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-phase9-momenta-qa-20260521`.

 - Phase 10 build passed after GSAP integration.
 - Phase 10 Hero QA passed: desktop Hero has no buttons, entrance motion is timeline-based, and the parallax remains restrained.
 - Phase 10 magnetic QA passed: `.language-toggle` shows small pointer-follow displacement on desktop fine-pointer devices and resets on leave.
 - Phase 10 pinned-section QA passed: the new section sits after the work rails and before the capability summary, stays pinned around `72px` from the top during the narrative span, and its active content changes from `AI 产品` to `工业设计`, `CMF / 量产`, and `系统设计` as scrolling progresses.
- Phase 10 mobile QA passed: the pinned layer falls back to four static cards and page-level horizontal overflow remains `0`.
- Phase 10 reduced-motion QA passed: the pinned layer renders as `pin-story-section is-static`, with no scroll-heavy pin behavior.
- Phase 10 screenshots and JSON results are in `C:\Users\Yang\Documents\New project\tmp\portfolio-gsap-qa-20260527`.
- Phase 11 showcase QA passed: the homepage work section now renders exactly three auto-scrolling rows with alternating directions.
- Phase 11 desktop motion QA verified row transforms change in opposite directions over time: row 1 and row 3 move left, row 2 moves right.
- Phase 11 copy-density QA passed: the showcase section contains `0` heading/body/control text blocks; it is image-led.
- Phase 11 flip QA passed: after pausing the moving row, card hover produces a `matrix3d(...)` transform on `.showcase-card-inner`, confirming the flip animation, and the back face shows the project title only.
- Phase 11 mobile QA passed: the new showcase wall still renders three rows and page-level horizontal overflow remains `0`.
- Phase 11 screenshots and JSON results are in `C:\Users\Yang\Documents\New project\tmp\portfolio-showcase-qa-20260527`.
- Phase 12 build passed after adding drag takeover.
- Phase 12 speed QA passed: after tuning the row duration, desktop row motion over 1.2 seconds measured about `-68px`, `+68px`, `-68px`, preserving left/right/left while moving slower than the earlier version.
- Phase 12 drag QA passed: mouse drag pauses the active row and the row follows pointer movement; transform may wrap across one duplicated sequence boundary, which is visually continuous because the row uses repeated groups.
- Phase 12 resume QA passed: after release, the row resumes automatic motion in its original direction.
- Phase 12 click/drag separation QA passed: a drag gesture did not open a detail page, while a normal click still opened the detail page.
- Phase 12 mobile QA passed: mobile page-level horizontal overflow remains `0`.
- Phase 12 screenshots and JSON results are in `C:\Users\Yang\Documents\New project\tmp\portfolio-showcase-drag-qa-20260527`.

## Open / Blocked
- `momenta` GitHub source is no longer missing; API/clone access was unreliable from the local shell, but the GitHub page and raw root image assets were readable.
- Some industrial projects only have aggregated evidence from `industrial-overview.png`; deeper detail pages can be expanded once the original portfolio PDF/page assets are available.

## Deployment Findings: Mainland China / Hong Kong
- The current portfolio is suitable for static deployment in principle: it is a Vite/React app, and checked source files do not require a backend at runtime.
- Checked app source does not show Google Fonts, gstatic, YouTube, unpkg, jsdelivr, or external CDN script dependencies. This is good for Mainland China access.
- The main deployment risk in the current build is asset weight, not app architecture. `hero-ribbon-loop.mp4` and several large PNG assets should be compressed before final public deployment.
- Vercel should not be used as the only primary interview link for Mainland China. Vercel's own guidance says it has no Mainland China infrastructure/CDN nodes and cannot guarantee Mainland availability.
- Mainland China CDN or Mainland-hosted acceleration generally requires ICP filing for the domain. This is the stable path for Shenzhen reliability, but it is not the lowest-friction first launch.
- Hong Kong hosting does not carry the same Mainland ICP filing requirement and is the best first low-cost compromise for one public domain, but it still cannot guarantee Mainland routing stability.
- Recommended route: one custom domain to Hong Kong static hosting first; later use the same domain with ICP + Mainland static hosting/CDN or GeoDNS if Mainland interview reliability becomes critical.
- Strategy note added: `deployment_china_hk_strategy.md`.

## China / Hong Kong Readiness Audit Findings
- Added `tools/china-readiness-audit.mjs`.
- Added `npm run audit:china` for report-only readiness checks.
- Added `npm run predeploy:china` for `npm run build` plus strict readiness checks.
- EdgeOne Pages/EdgeOne should be treated as a candidate, not a guaranteed no-ICP solution. The current checked documentation says Chinese mainland or global availability zones including Chinese mainland require ICP registration for custom domains; the global zone excluding Chinese mainland does not require ICP but does not prove Shenzhen stability.
- `npm run build` passed after adding the audit script.
- `npm run audit:china` passed in report-only mode.
- Runtime URL check found no known blocked runtime URL hosts.
- Runtime URL review items remain non-critical references: Momenta GitHub source text, React error docs string, and GSAP license/docs string.
- Deploy asset basis is `dist`; deploy asset total is about 32.69 MB.
- Strict audit currently fails with 5 high-risk oversized assets:
  - `dist/hero-ribbon-loop.mp4` at about 6.05 MB.
  - `dist/portfolio/hydrotherapy-direction.png` at about 2.78 MB.
  - `dist/portfolio/momenta-exploded.png` at about 2.29 MB.
  - `dist/portfolio/palifood-stage.png` at about 2.08 MB.
  - `dist/portfolio/palifood-login.png` at about 2.01 MB.
- Additional warn-level assets should be compressed before public launch, especially hero ribbon PNG frames and large portfolio PNGs.

## China / Hong Kong Asset Reduction Findings
- Original heavy deployment assets were backed up to `C:\Users\Yang\Documents\New project\tmp\portfolio-china-assets-backup-20260531-192026`.
- The Hero ribbon video was re-rendered from the existing Remotion composition as `remotion-hero/out/HeroRibbon-china.mp4` and copied to `public/hero-ribbon-loop.mp4`.
- `public/hero-ribbon-loop.mp4` was reduced from about 6.05 MB to about 0.93 MB.
- The previously blocking Pai Li Shi PNG assets were converted to deployment JPGs:
  - `palifood-stage-china.jpg` at about 219 KB.
  - `palifood-login-china.jpg` at about 200 KB.
- Additional heavy referenced PNGs were converted to deployment JPGs:
  - `momenta-github-compose-china.jpg` at about 104 KB.
  - `offer-quest-china.jpg` at about 178 KB.
  - `miro-home-china.jpg` at about 307 KB.
  - `hydrotherapy-detail-china.jpg` at about 131 KB.
- Unreferenced heavy public assets were moved out of `public`, including `hydrotherapy-direction.png`, `momenta-exploded.png`, `industrial-overview.png`, `miro-screen-home.png`, and the old `public/hero-ribbon` frame PNGs.
- `npm run predeploy:china` now passes.
- Latest deploy asset total is about 8.19 MB, down from about 32.69 MB.
- Strict audit now reports no high-risk assets; only the built JS bundle remains as a warn-level size review item at about 360 KB.
- Local preview QA at `http://127.0.0.1:5182/` passed:
  - Hero video source loaded and reached ready state 4.
  - Desktop homepage images had no broken image loads.
  - Miro detail page opened and had no broken images.
  - No console/page errors and no HTTP 400+ responses were captured.
  - Mobile 390px view had no page-level horizontal overflow and kept three showcase rows.
  - Screenshots saved to `C:\Users\Yang\Documents\New project\tmp\portfolio-china-predeploy-qa-20260531`.

## Release Package / Live URL Verification Findings
- Added `tools/package-china-dist.mjs`.
- Added `tools/verify-live-url.mjs`.
- Added `npm run package:china`.
- Added `npm run verify:url`.
- `npm run package:china` passed and generated:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-113404`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-113404.zip`
  - File count: 58.
  - Uncompressed deploy size: about 8.19 MB.
  - Zip size: about 6.90 MB.
- The release package includes a `manifest.json` with per-file SHA-256 hashes and `README_DEPLOY.md` with the post-upload checklist.
- `npm run verify:url -- http://127.0.0.1:5182/` passed against local preview:
  - Home returned HTTP 200.
  - Critical JS/CSS returned HTTP 200.
  - `/hero-ribbon-loop.mp4` returned HTTP 200.
  - Localhost HTTP was accepted for preview only; public interview URLs should use HTTPS.
- This verification only proves the current machine's network view. Goal completion still requires one public domain and real Hong Kong/Shenzhen no-VPN tests.
- Phase 18 upgraded `tools/verify-live-url.mjs` from a single-sample checker to a repeated stability checker:
  - Supports `--repeat`, `--interval`, `--timeout`, `--asset-timeout`, `--report`, and `--markdown`.
  - Writes JSON evidence and a readable Markdown report.
  - Keeps HTTPS enforcement for non-localhost public URLs.
  - Keeps explicit warning that current-machine verification is not Hong Kong/Shenzhen proof.
- Local repeated check passed:
  - Command: `npm run verify:url -- http://127.0.0.1:5182/ --repeat 2 --interval 250 --report release/live-local-verify.json --markdown release/live-local-verify.md`.
  - Result: 2/2 samples passed, 0 asset failures.
  - Checked assets: built JS, built CSS, and `/hero-ribbon-loop.mp4`.
- Follow-up CLI validation passed:
  - `node tools/verify-live-url.mjs --help` prints usage.
  - `npm run verify:url -- http://127.0.0.1:5182/ --repeat 1 --report release/live-local-verify-latest.json --markdown release/live-local-verify-latest.md` passed.
  - Missing `--report` value exits with code 1.
- Added `deployment_verification_log.md` as the required manual evidence template for the final custom-domain stage.

## Hosting Candidate Matrix Findings
- Added `hosting_decision_matrix.md`.
- Current ranked recommendation:
  - First test: EdgeOne Pages, global availability zone excluding Chinese mainland, one custom domain.
  - Second test: Hong Kong object storage static hosting, preferably Tencent COS HK or Alibaba OSS HK, one custom domain.
  - Stable final route: same domain plus ICP filing and Mainland static hosting/CDN.
- EdgeOne Pages is the best zero/low-cost first test, but not a guarantee:
  - EdgeOne Pages custom domains require ICP when using Chinese mainland availability zone or global availability zone including Chinese mainland.
  - EdgeOne global excluding Mainland does not require ICP, but Shenzhen stability still needs real custom-domain testing.
- Cloudflare Pages should not be the main Shenzhen interview link:
  - Cloudflare docs say Pages is not available in Mainland China through the normal Pages path because of `pages.dev` certificate placement.
- Alibaba OSS and Tencent COS Hong Kong are valid low-cost static hosting candidates:
  - They support static website hosting and custom domains.
  - Mainland CDN/China acceleration requires ICP, but Hong Kong/static origin paths avoid the first-step ICP burden.
- Updated `tools/package-china-dist.mjs` to include static-host compatibility files inside packaged `dist`:
  - `404.html`, copied from `index.html`.
  - `_headers`, with conservative security headers and cache hints for assets.
  - `_redirects`, with SPA fallback to `index.html`.
- Latest Phase 18 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-115215`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-115215.zip`
  - `npm run package:china` passed, including Vite build and strict China readiness audit.
  - Strict audit still has only one warn-level review item: built JS bundle at about 360 KB.
  - `_headers`, for platforms that support static header rules.
  - `_redirects`, for platforms that support SPA fallback rules.
- Earlier Phase 17 regenerated release:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-114145`
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-114145.zip`
  - Zip size: 7,234,182 bytes, about 6.90 MB.

## One-Domain Launch Readiness Findings
- AnySearch official-doc recheck on 2026-05-31 kept the same provider conclusion:
  - EdgeOne Pages custom domains require ICP for Chinese mainland availability zone or global including Chinese mainland; global excluding Mainland is the lowest-friction first test but still needs real Shenzhen testing.
  - EdgeOne preview/project domains can return 401 depending on access context; a custom domain is the meaningful test target.
  - Cloudflare Pages remains unsuitable as the main Shenzhen interview link because Cloudflare docs say Pages is not available in Mainland China through the normal Pages path.
  - Tencent COS and Alibaba OSS support static website/custom-domain flows; Mainland CDN/China acceleration requires ICP, while Hong Kong/outside-Mainland paths avoid the first-step ICP burden.
- Added `one_domain_launch_runbook.md`:
  - First test: EdgeOne Pages global excluding Mainland with one custom domain.
  - Second test: Hong Kong object storage through Tencent COS HK or Alibaba OSS HK.
  - Final stable route: same domain plus ICP and Mainland static hosting/CDN.
- Added `tools/verify-domain-readiness.mjs` and `npm run verify:domain`.
  - Checks DNS lookup/CNAME/A/AAAA.
  - Checks TLS certificate trust and expiration for HTTPS targets.
  - Checks HTTP status, final URL, content type, and React root visibility.
  - Writes JSON and Markdown reports.
- Local domain-readiness check passed:
  - Command: `npm run verify:domain -- http://127.0.0.1:5182/ --report release/domain-local-check.json --markdown release/domain-local-check.md`.
  - Result: DNS lookup resolved to `127.0.0.1`, HTTP 200, React root present. TLS was skipped because localhost HTTP preview is accepted.
- Public HTTPS tool check passed:
  - Command: `npm run verify:domain -- https://example.com --report release/domain-example-tool-check.json --markdown release/domain-example-tool-check.md`.
  - Result: DNS/TLS/HTTP branch executed and passed from the current machine. This validates the script path only; it is not portfolio deployment evidence.
- Local live URL goal check also passed:
  - Command: `npm run verify:url -- http://127.0.0.1:5182/ --repeat 1 --report release/live-local-goal-check.json --markdown release/live-local-goal-check.md`.
  - Result: 1/1 sample passed, 0 asset failures.
- Latest Phase 19 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-120900`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-120900.zip`
  - `npm run package:china` passed with strict audit.

## Release Handoff Package Findings
- Local domain/deployment clue scan did not find a real custom domain, EdgeOne project config, COS/OSS config, or `.env` deployment credentials in `portfolio-site`.
- Direct `npm run package:china` failed under PowerShell because `npm.ps1` is blocked by Execution Policy; `cmd /c npm run package:china` succeeded.
- Added `domain_dns_template.md` to capture the real domain, DNS provider, EdgeOne ownership verification, production CNAME, HTTPS status, and Hong Kong-object-storage fallback records.
- Updated `tools/package-china-dist.mjs` so release folders copy these handoff documents beside `dist/`:
  - `one_domain_launch_runbook.md`
  - `hosting_decision_matrix.md`
  - `deployment_china_hk_strategy.md`
  - `deployment_verification_log.md`
  - `domain_dns_template.md`
- Latest Phase 20 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-034756`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-034756.zip`
  - `cmd /c npm run package:china` passed with Vite build and strict China readiness audit.
  - Uncompressed deploy size remains about 8.19 MB.
  - Zip size is about 6.91 MB because launch documents are now included.

## Launch Goal Gate Findings
- Added `deployment_evidence.template.json`.
  - It captures the real public URL, hosting provider/region/cost plan, automated domain/live reports, Hong Kong no-VPN check, and Shenzhen/Mainland repeated no-VPN check.
- Added `tools/verify-launch-goal.mjs` and `npm run verify:launch-goal`.
  - The gate rejects placeholder domains such as `your-domain.example`.
  - The gate rejects provider default preview domains such as `vercel.app`, `pages.dev`, `netlify.app`, and `github.io`.
  - The gate requires HTTPS, a non-preview custom domain, domain readiness report pass, live URL report pass with at least 5 samples, Hong Kong pass evidence, and Shenzhen/Mainland repeated pass evidence.
- Gate validation:
  - `node tools/verify-launch-goal.mjs --help` passed.
  - `node tools/verify-launch-goal.mjs --evidence deployment_evidence.template.json` failed as expected because the template has placeholders and no real public reports.
  - `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.template.json` also failed as expected, proving the npm script path works and does not falsely mark the goal complete.
- Latest Phase 21 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-035856`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-035856.zip`
  - `cmd /c npm run package:china` passed with Vite build and strict China readiness audit.
  - Release README and manifest include `deployment_evidence.template.json`.

## EdgeOne Pages Execution Checklist Findings
- AnySearch recheck on 2026-06-01 confirmed the same EdgeOne rules:
  - Chinese mainland availability zone or global availability zone including Chinese mainland requires ICP for custom domains.
  - Global availability zone excluding Chinese mainland does not require ICP for the custom domain path.
  - Project/deployment preview domains can return 401 in Chinese mainland contexts, so a custom domain is the meaningful Shenzhen test target.
- Added `edgeone_pages_setup_zh.md`.
  - It explains the first-test configuration: EdgeOne Pages, global excluding Mainland, custom domain, HTTPS, upload/build output as `dist`.
  - It includes DNS ownership verification and production CNAME fields to copy into `domain_dns_template.md`.
  - It includes the required `verify:domain`, `verify:url`, and `verify:launch-goal` commands.
  - It explains how to decide when to fall back to Hong Kong COS/OSS or ICP plus Mainland static hosting/CDN.
- Updated `one_domain_launch_runbook.md` to reference `edgeone_pages_setup_zh.md`.
- Updated `tools/package-china-dist.mjs` so the release package includes `edgeone_pages_setup_zh.md`.
- Latest Phase 22 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-040824`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-040824.zip`
  - `cmd /c npm run package:china` passed with Vite build and strict China readiness audit.
  - Release README and manifest include `edgeone_pages_setup_zh.md`.

## Deployment Evidence Generator Findings
- Added `tools/generate-deployment-evidence.mjs`.
  - Required input: `--url` with the final custom-domain URL.
  - Default output: `deployment_evidence.json`.
  - Default hosting values match the first low-cost path: EdgeOne Pages, global excluding Chinese mainland, free or low-cost, ICP status none.
  - It auto-selects the newest `release/portfolio-site-china-*.zip` when no package is supplied.
  - It detects provider default preview hosts such as `vercel.app`, `pages.dev`, `netlify.app`, and `github.io` and marks them as preview-domain evidence.
  - It intentionally leaves Hong Kong and Shenzhen/Mainland evidence as TODO values unless real manual proof is supplied.
- Added `npm run generate:evidence`.
- Tightened `tools/verify-launch-goal.mjs`:
  - Reserved example domains such as `portfolio.example.com` are rejected.
  - Placeholder text checks now cover TODO, TBD, pending, placeholder, `待填`, and `示例`.
  - Normal report file names such as `release/domain-check.json` are no longer rejected by name alone; the gate now depends on file existence and report content.
- Validation:
  - `node tools/generate-deployment-evidence.mjs --help` passed.
  - `cmd /c npm run generate:evidence -- --help` passed.
  - Fake evidence generated at `tmp/deployment-evidence-sample.json`.
  - `cmd /c npm run verify:launch-goal -- --evidence tmp\deployment-evidence-sample.json` failed as expected because it used a reserved example domain, missing report files, and TODO/no-VPN evidence gaps.
  - `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.template.json` still failed as expected.
  - `cmd /c npm run package:china` passed with strict audit.
- Latest Phase 23 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-042829`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-042829.zip`
  - Uncompressed deploy size remains about 8.19 MB.
  - Zip size is about 6.91 MB.

## Release Package Verification Findings
- Added `tools/verify-release-package.mjs`.
  - It verifies the newest release package with `--latest`, or a specific release folder/zip path.
  - It checks required `dist` files, required launch documents, `README_DEPLOY.md`, and `manifest.json`.
  - It recomputes per-file SHA-256 hashes and byte counts from the release folder and compares them against `manifest.json`.
  - It checks upload-oriented size budgets: total dist size, single asset size, JS bundle size warning, and Hero video size.
  - It can write JSON and Markdown verification reports.
- Added `npm run verify:release`.
- Updated `npm run package:china` so every package run now performs:
  - Vite build.
  - Strict China readiness audit.
  - Release folder and zip generation.
  - Release-package verification.
- Found and fixed a real packaging reliability issue:
  - `Compress-Archive` returned without producing `portfolio-site-china-20260601-043809.zip`.
  - `tools/package-china-dist.mjs` now checks whether the zip exists and falls back to `.NET ZipFile.CreateFromDirectory` if needed.
- Validation:
  - `node tools/verify-release-package.mjs --help` passed.
  - `cmd /c npm run verify:release -- --latest` passed.
  - `cmd /c npm run verify:release -- --latest --report release\release-package-check.json --markdown release\release-package-check.md` passed and wrote reports.
  - `cmd /c npm run package:china` passed end-to-end with the new verifier attached.
  - `cmd /c npm run generate:evidence -- --url https://portfolio.example.com --output tmp\deployment-evidence-sample.json --force` now writes package/report paths relative to the evidence file when needed, while console commands remain project-root-relative.
  - `cmd /c npm run verify:launch-goal -- --evidence tmp\deployment-evidence-sample.json` still fails as expected because there is no real domain/report/regional evidence.
- Latest Phase 24 release package:
  - Staging folder: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-043944`
  - Zip package: `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-043944.zip`
  - Release verification report: `C:\Users\Yang\Documents\New project\portfolio-site\release\release-package-check.json`
  - Release verification markdown: `C:\Users\Yang\Documents\New project\portfolio-site\release\release-package-check.md`
  - Uncompressed deploy size remains about 8.19 MB.
  - Zip size is about 6.91 MB.

## Local Preview Diagnosis Findings
- `http://127.0.0.1:5182/` was not listening when the user reported that the URL could not open.
- No common Vite ports from 5173 to 5190 were listening.
- `cmd /c npm run preview -- --host 127.0.0.1 --port 5182` started successfully in the foreground and printed `Local: http://127.0.0.1:5182/`; the shell command timed out because preview servers run continuously.
- Background attempts through `Start-Process` did not result in a listening port in the current Codex desktop shell.
- `py -m http.server` is not a viable fallback on this machine because `py` reports `No installed Python found!`.
- Added `tools/serve-dist.mjs`, a Node-only static server that serves the built `dist` folder with SPA fallback.
- Added `npm run preview:static`.
- `cmd /c npm run preview:static` starts successfully in the foreground and prints `Local: http://127.0.0.1:5182/`.
- Practical conclusion: if the local URL is closed or expired, run the foreground preview command again; if the user means a public URL, the exact URL is required for diagnosis.

## Aircenter-Style Homepage Findings
- The generated Remotion helix versions were rejected because they looked like a ribbon/fan, not a thick stepped architectural spiral. The live homepage must not use those rejected assets.
- The rejected generated public video `public/hero-yang-helix-loop.mp4` was removed so it cannot be accidentally packaged or referenced.
- The final helix video is blocked by source approval: the user will provide 25 frames, and the site currently keeps only a faint layout slot for that future video.
- The new homepage uses the aircenter-inspired structure without copying the original asset: white first screen, giant `YANG` letters, centered short title, no hero buttons, no search box, and no dialogue UI.
- Product heading copy had to be shortened from a long sentence to `产品形态`; the long Chinese sentence broke the large-type layout.
- The digital case section initially used GSAP `pin`, which made the section offset unreliable. It was changed to CSS sticky layout with ScrollTrigger used only for active-case switching.
- Product showcase click initially failed because parent pointer capture stole the click from the transformed card. Removing parent pointer capture fixed product-detail click-through while preserving drag switching.
- A GSAP scale warning came from magnetic control scaling. Removing the scale tween kept the interaction subtle and cleared console warnings.
- Final QA results for this phase:
  - `cmd /c npm run build` passes.
  - Desktop has `YANG` hero letters, zero hero buttons/inputs, 5 product cards, 5 digital cases, 3 showcase rows, and `YANG` footer letters.
  - Product active card opens a detail page.
  - Three-row showcase auto motion still changes over time.
  - Desktop and 390px mobile have no page-level horizontal overflow.
  - No console warnings, page errors, or HTTP 400+ responses were captured.
- QA screenshots are in `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-qa-20260601-v3`.

## Hero Helix Frame-Sequence Findings
- The screenshot `C:\Users\Yang\AppData\Local\Temp\ScreenShot_2026-06-01_205019_735.png` is explicitly rejected by the user and must not be used for the helix background.
- The 2026-05-31 18:41-18:44 temp screenshot group is also not a helix source sequence; visual inspection showed unrelated fitness-video screenshots.
- The helix images pasted directly into the chat are visible in the conversation, but they are not available to shell/Remotion as local files in the scanned project, downloads, desktop, temp, or Codex cache locations.
- Added a local source contract: approved helix frames should be placed in `source-helix-frames/` with naturally sorted filenames such as `01.png` through `25.png`.
- Added `tools/prepare-helix-frames.mjs` and `tools/render-helix-video.mjs` so frame preparation and video rendering are repeatable.
- The Remotion composition `HeroHelixFrames` uses ping-pong playback plus crossfading between adjacent frames to reduce visible start/end jumps when the provided sequence is not an exact loop.
- The homepage now references `/hero-yang-helix-loop.mp4` in the Aircenter hero, while keeping the faint placeholder underneath until the real video exists.
- `cmd /c npm run prepare:helix` now fails clearly with `Found 0` when no local helix frame images exist, which confirms the current blocker is missing local frame files rather than a hidden script failure.
- User provided the approved frame folder: `C:\Users\Yang\Desktop\job\web`.
- The folder contains 25 PNG files, all `1672 x 941`.
- The 25 frames were copied into `source-helix-frames/` with normalized names and prepared into `remotion-hero/public/helix-frames/`.
- Rendered final video: `public/hero-yang-helix-loop.mp4`, 12.05 seconds, 1920 x 1080, about 2.93 MB.
- The generated video is also present in `dist/hero-yang-helix-loop.mp4` after production build.
- Start/end loop check passed through Remotion stills: frame `0` and frame `359` have sampled mean absolute pixel difference `0`, so the seam is visually identical at the loop point.
- Browser QA passed at `http://127.0.0.1:5182/`: video `readyState` is `4`, `paused` is `false`, desktop and mobile load the same 1920 x 1080 video, there are no Hero buttons/inputs, no horizontal overflow, no console warnings/errors, and the MP4 returns HTTP `200 video/mp4`.
- QA screenshots and JSON are in `C:\Users\Yang\Documents\New project\tmp\portfolio-helix-video-qa-20260601`.

## Hero Smoothness and Letter Spacing Findings
- The current Hero video is technically loopable, but the source only has 25 frames. Over an 8-12s loop this cannot feel fluid; Remotion ping-pong and crossfade can soften the seam but cannot create real intermediate motion.
- Best source for the next pass is a complete H.264 MP4 generated externally at 1920x1080 or 4K, 30fps or 60fps, 8-12 seconds, with first and last frame visually aligned for seamless looping.
- A denser frame sequence is the fallback option: 180+ frames minimum, preferably 240-360 frames, with naturally sorted filenames.
- The oversized `YANG` letters were overlapping because the middle letters used tight absolute percentage positions under a large viewport-scaled font. The layout now uses explicit `air-letter-y/a/n/g` classes and wider responsive positions.
- Browser QA after the letter fix measured positive `A` to `N` gaps: desktop 159px, tablet 128px, mobile 55px. No page-level horizontal overflow or console/page errors were found, and the temporary Hero video still reaches readyState 4.
- QA screenshots and JSON are in `C:\Users\Yang\Documents\New project\tmp\portfolio-hero-letter-fix-qa-20260602`.

## Aircenter Interaction Correction Findings
- The target interaction pattern is now treated as: blank white start, left-to-right `YANG` reveal, delayed helix/video appearance, then large letters collect upward during scroll.
- The local sticky scroll failure came from `.air-hero` inheriting `.hero-section { overflow: hidden; }`; `.air-hero { overflow: visible; }` restores sticky behavior while `.air-hero-sticky` still clips the hero content.
- Adding `overwrite: true` to the `.air-letter` scroll tween suppresses the intro reveal by overwriting the active intro timeline. Keep the fast scroll tween, but do not overwrite it.
- The achievement cards needed stronger aircenter-style hierarchy: oversized numeric value, very short gray note, and large bottom-right label on dark cards.
- Footer branding must remain `YANG` in both Chinese and English modes.
- Final QA at `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-fix-qa-20260602-v8`: build passed, mid-scroll stickyY is 0, top wordmark opacity is 1, large letter opacities are 0, hero copy opacity is 0, page overflowX is 0, footer keeps `YANG` in Chinese and English, and no console/page errors were captured.

## Aircenter Typography and Footer Position Findings
- The digital case title scale was too large for the aircenter-style panel. It caused Chinese titles such as `李白互动网站` to break awkwardly into multiple lines.
- Added the missing two-line progress rule and `/ total` index to the right case panel.
- After the type correction, Playwright measured `李白互动网站` as a single line on desktop: height 54px, line-height 54px, body copy within the panel, and no page-level horizontal overflow.
- Footer `YANG` was previously too large and mechanically centered. The scale was reduced so all four letters are fully visible and closer to the black aircenter ending rhythm.
- QA output: `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-type-fix-qa-20260602-v2`.

## Generated Helix Video Motion Findings
- User-provided generated video inspected: `C:\Users\Yang\Desktop\job\web\6月2日 (2).mp4`.
- Local Chromium could read the MP4 duration but not decode the picture (`videoWidth=0`), so frame extraction used `C:\Users\Yang\AppData\Local\JianyingPro\Apps\10.7.0.14095\ffmpeg.exe`.
- Generated-video contact sheet: `C:\Users\Yang\Documents\New project\tmp\seedance-video-ffmpeg-audit-20260602\contact-sheet.jpg`.
- The generated video is not acceptable for the Hero reference: the structure appears to swing/reverse and recompose through the sequence instead of rotating continuously in one counterclockwise direction with a slight upward rise.
- Reference recording contact sheet: `C:\Users\Yang\Documents\New project\tmp\aircenter-reference-video-ffmpeg-audit-20260602\contact-sheet.jpg`.
- Live aircenter page also loaded successfully through Playwright on 2026-06-02 with title `AIR business center`; screenshots are in `C:\Users\Yang\Documents\New project\tmp\aircenter-live-reference-20260602`.
- Correct generation direction: locked camera, one stepped white-gray architectural helix, all stair slabs rotating counterclockwise around one vertical axis, slow continuous upward drift, no ping-pong, no reverse rotation, no camera orbit, no morphing, no shape regeneration.

## Aircenter Current Layout Recheck Findings
- The digital case panel is no longer in the previous broken state: desktop titles are controlled, `李白互动网站` stays on one line, the two progress rules and `/ 5` index are visible, and the action is a restrained bottom gray bar.
- The first post-intro hero screenshot still showed `A` and `N` too close over the helix. The middle letter positions were widened again in CSS.
- Footer `YANG` needed another pass because the earlier fix only made it visible; it did not yet match the aircenter-like scattered black ending closely enough. Footer letters now use absolute placements instead of flex spacing.
- Verification after the latest pass: `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed, desktop and mobile Playwright screenshots were captured, no console/page errors were found, and page-level horizontal overflow remained `0`.
- Latest QA screenshots: `C:\Users\Yang\Documents\New project\tmp\current-aircenter-status-20260602-v2`.
- Remaining known blocker: the current hero MP4 is still the temporary/generated placeholder. The final visual depends on replacing it with the user's newly generated smooth counterclockwise helix video.

## Aircenter Product Orbit Findings
- The previous product orbit implementation was not close enough to the reference: it showed a large section title, explanatory copy, bottom previous/next controls, and more exposed neighboring cards than the user wanted.
- The corrected product orbit now renders only three cards on desktop at a time: left side, center active, and right side.
- Visible text inside the product orbit section was removed; the section no longer shows the large product-heading copy or explanatory text.
- The previous bottom controls were removed; switching now happens through side-card click or horizontal drag.
- Interaction QA passed: side-card click changed the active image, horizontal drag changed it again, `product-orbit-controls` count is `0`, `product-orbit-copy` count is `0`, visible product card count is `3`, desktop card gaps are about `31px`, and page-level horizontal overflow is `0`.
- QA screenshots: `C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-fix-20260602-v3`.

## Aircenter Product Orbit Visual Match Findings
- The latest user reference requires stronger separation than the first three-card fix: the center card should dominate, and the side cards should shrink and recede toward the viewport edges.
- Updated the orbit transform from a tight side layout to `57.5vw` side displacement, `0.58` side scale, and `29deg` side `rotateY`.
- Desktop QA now measures exactly `3` visible cards, `0` visible product copy blocks, `0` product controls, `204px` gaps between left/center and center/right, active card `900 x 595`, and side cards about `627 x 398`.
- Side-card click still changes the active image, horizontal drag changes it again, no console/page errors were captured, and desktop page-level horizontal overflow remains `0`.
- Mobile QA keeps only the active product card visible, with `0` horizontal overflow, `0` product controls, and `0` product copy blocks.
- QA screenshots: `C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-match-20260602-v2`.

## Product Orbit Perspective Direction Findings
- The previous Phase 34 spacing was correct, but the side-card perspective direction was reversed relative to the user's wording: the cards needed to be large near the center and smaller toward the viewport edges.
- Fixed the side-card rotation sign from `-offset * 29` to `offset * 29`.
- Current direction proof from rendered DOM: left side card offset `-1` uses `rotateY(-29deg)`, right side card offset `1` uses `rotateY(29deg)`.
- Desktop QA still shows exactly `3` cards, no product copy block, no product controls, `204px / 204px` gaps, no console/page errors, and page-level overflowX `0`.
- Interaction QA still passes: side-card click changes the active image, and horizontal drag changes it again.
- Mobile QA still shows one active card, no product copy block, no product controls, and overflowX `0`.
- QA screenshots: `C:\Users\Yang\Documents\New project\tmp\product-orbit-perspective-direction-20260602-v1`.

## Product Orbit Side Crop Findings
- The latest side-card correction is about cropping and angle, not just separation.
- The aircenter-like target is: only three product cards are visible, the center card is largest, side cards remain separate, side cards use shallow perspective, and each side card is partially cropped by the viewport instead of being fully visible.
- Previous over-correction showed the full side cards or folded them too aggressively.
- Current rendered values: side-card `rotateY` is `14deg`, side scale is `0.86`, side displacement is `48.5vw`, side-card visible ratio is `0.78 / 0.78`, and the center/side gap remains `26px / 26px` with no overlap.
- Build and Playwright QA passed with no console warnings/errors.
- QA screenshots: `C:\Users\Yang\Documents\New project\portfolio-site\tmp\product-orbit-aircenter-separated-20260602-v1`.

## Product Orbit Shallow Angle Findings
- The user clarified that the side-card crop was correct in principle, but the folding/tilt still read too strong.
- Reducing side-card `rotateY` from `14deg` to `8deg` produced a shallower side panel while keeping the cards separate.
- Latest local and deployed metrics: exactly `3` visible cards, active card `893 x 602`, side cards `678 x 505`, side visible ratio `0.72 / 0.72`, gaps `26px / 26px`, `centerIsLargest=true`, `noOverlap=true`, console warnings/errors `0`.
- The public deployed alias `https://portfolio-site-three-rose.vercel.app` returns `200 OK`.

## Deployment Findings
- The previous Vercel upload failed after trying to upload about `249.1MB`. Root cause was local-only generated/development folders being included in the upload.
- Large local folders found: `remotion-hero` about `679.95MB`, `release` about `159.42MB`, `node_modules` about `113.99MB`, and `source-helix-frames` about `27.33MB`.
- Added `.vercelignore`; the successful Vercel upload was reduced to `5.5MB`.
- Supabase is scaffolded in code, but runtime status is still `missing-env` until `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY` are configured.

## 2026-06-04 Hero and Product Orbit Findings
- The live Hero does not render a second `YANG` wordmark. Current DOM verification reports `letterCount=4` and `.air-hero-wordmark` count `0`; the unused wordmark CSS has been removed.
- The visible collected Hero state now measures `YANG` at `264px` wide on a `1920px` viewport, top `75px`, centered at `960px`.
- The final Hero state keeps the same `264px` collected width and then scrolls upward out of view, matching the intended upward collection behavior.
- The product orbit now uses explicit side-card clipping rather than relying only on 3D fold. This keeps side-card top and bottom edges as continuous shallow diagonal lines.
- Local and deployed product-orbit QA both measure exactly three visible cards, center largest, side-card visible ratio `0.74 / 0.74`, `9px / 9px` center gaps, no overlap, and no console warnings/errors.
- Latest deployed production alias is still `https://portfolio-site-three-rose.vercel.app`, and it returned `200 OK` after the 2026-06-04 redeploy.

## 2026-06-05 Supabase Findings
- The app has a Supabase lazy client in `src/lib/supabaseClient.js`, and it checks `portfolio_health` to set `document.documentElement.dataset.supabase`.
- The required env vars are `VITE_SUPABASE_URL` plus either `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
- `.env.example` is an empty template; no local real env file exists in the project.
- The deployed browser verification reports `supabaseStatus: missing-env`, proving the current production deployment is not actually connected to Supabase.
- `supabase/portfolio_health.sql` is ready to run in Supabase SQL editor and grants anon/authenticated read access for the connection health check.
- Added `npm run verify:supabase`; current result is a deliberate failing gate with `reason: missing-env` until real credentials are supplied.

## 2026-06-05 Hero YANG Stability Findings
- The reported `YANG` overlap/fly-away bug came from using `getBoundingClientRect()` while the letters already had active GSAP transforms, then reusing those transformed positions as the basis for a new scroll target.
- The scroll collection tween also used a small stagger, which made intermediate scroll positions vulnerable to incoherent states where one letter was already collected and another was still far away.
- The fix measures the Hero letters after temporarily resetting GSAP `x`, `y`, and `scale`, then restores the active values immediately. This keeps target calculations based on the static layout.
- The scroll collection tween now moves all four original letters together and does not create or depend on a second `.air-hero-wordmark`.
- Local verification:
  - `cmd /c npm run build` passed.
  - `tmp/verify-air-hero-collected.mjs` passed: `letterCount=4`, `wordmarkCount=0`, collected width `264px`, centered at `960px`, no console warnings/errors.
  - `tmp/verify-air-hero-yang-midstates.mjs` passed eight scroll checkpoints: sequence remained `YANG`, all minimum gaps were positive, and no overlap occurred.
- Deployed verification:
  - Vercel production alias `https://portfolio-site-three-rose.vercel.app` returned `200`.
  - Deployed mid-scroll verification passed the same eight checkpoints with `onlyFourLetters=true`, `keepsOrder=true`, `noOverlap=true`, and no console warnings/errors.

## 2026-06-05 Supabase Handoff Findings
- `cmd /c npx vercel env ls` reports no environment variables for `yangs-projects-d2ad4c9e/portfolio-site`.
- The remaining Supabase blocker is not code wiring; it is missing runtime credentials and an unconfirmed target Supabase table.
- Added `supabase/README.md` with the required setup sequence:
  - Run `supabase/portfolio_health.sql` in Supabase SQL Editor.
  - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` locally.
  - Run `cmd /c npm run verify:supabase`.
  - Add the same vars to Vercel production and redeploy.
- `cmd /c npm run build` still passes after the handoff update.
- `cmd /c npm run verify:supabase` still fails with `reason=missing-env`, which is correct until real URL/key values are provided.

## 2026-06-18 Tresmares Seven-Card Orbit Findings
- The latest user correction is geometry-specific: desktop should show exactly seven cards at once, not eight or more, and the visible set must be symmetric: three left, one center, three right.
- Updated `renderExpansion(progress)` so the desktop orbit uses fixed visible semicircle slots around a bottom-center origin. Cards outside `delta = -3...3` are hidden.
- Each visible card now computes rotation from its card center back to the bottom circle center, so the card edge reads as tangent to the same semicircle instead of using arbitrary individual angles.
- Local QA at `1440px` width confirms visible card count is `7` at progress `0.38`, `0.42`, `0.62`, and `0.82`; horizontal overflow is `0` and title overlap is `false`.
- At progress `0.42`, measured card center x positions are `116 / 276 / 486 / 720 / 954 / 1164 / 1324`, proving left/right symmetry around the `720px` viewport center.
- Mobile intentionally keeps fewer visible cards to avoid horizontal overflow; QA measured overflow `0`.
