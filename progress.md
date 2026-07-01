# Progress Log

## Session: 2026-07-01 Homepage Image Loading Fix
- **Status:** complete; publishing through GitHub/Vercel.
- User direction:
  - Continue the unfinished work from the handoff package.
  - Treat the paused site-speed complaint as the local task that can be completed without new user assets or credentials.
- Actions completed:
  - Re-read the handoff context and measured the production build with Playwright before making changes.
  - Confirmed the first five seconds previously pulled in the bottom Product Language orbit images even though the section is far below the first viewport.
  - Updated only the two repeated orbit image layers, `.expansion-card-bg` and `.expansion-card-img`, from eager loading to lazy loading with low fetch priority.
  - Added a low-priority idle warmup queue for post-load images, so the homepage keeps first-paint resources prioritized while Daima follow-up images, product images, the front of the image wall, and later orbit images can be prepared quietly after load.
  - Added an intersection-triggered warmup for the Product Language orbit section, so fast scrolling near the bottom still prepares the 8 orbit images before they are needed.
  - Generated 8 lightweight `640x640` WebP orbit display images and pointed the homepage Product Language orbit to those files instead of the original `1254x1254` assets.
  - Preserved the existing image sources, orbit geometry, copy, click targets, drag behavior, GSAP scroll behavior, and detail-page data.
- Verification:
  - `npm run build` passed.
  - Desktop local production check at `1440x1100`: after one second the page still keeps orbit loading at `0`; near the orbit section, the 8 WebP orbit images switch to active loading and complete in about `2.5s`, with `overflowX=0` and no console messages.
  - Mobile local production check at `390x844`: initial orbit loading remains `0`; near the orbit section, `orbitLoaded=8/8`, `overflowX=0`, and console messages are empty.
- Remaining risks:
  - `momenta-detail-video.m4v` remains about `103MB`.
  - The image wall still accounts for much of the full-page image weight and should be optimized only after another waterfall confirms the next bottleneck.
  - No Vercel redeploy or public-network waterfall was run in this session.

## Session: 2026-07-01 Handoff Documentation
- **Status:** complete.
- User direction:
  - Temporarily stop the site speed / image loading diagnosis.
  - Write a comprehensive handoff document for the next window, covering chat context, completed work, current state, risks, and unfinished tasks.
- Actions completed:
  - Checked the latest repository state and recent commits; the codebase was clean before the handoff documentation update.
  - Re-read the current implementation around `ModuleIntro`, `DetailShowcaseFooter`, `expansionCards`, the homepage order, and the product language orbit so the handoff would reflect the actual code rather than memory alone.
  - Rewrote `NEXT_AGENT_HANDOFF.md` as the current first-read document for the next agent.
  - Added the current exact product language orbit list, the `miro` vs `miro-hardware` distinction, the `momenta` vs `momenta-touch` distinction, the Project Archive / detail-footer image-wall rules, Agent / AGNES behavior, visual guardrails, and paused performance concerns.
  - Updated `agent_memory/progress.md` with the handoff status and the paused performance investigation.
- Verification:
  - Documentation-only change; no runtime build was required.

## Session: 2026-05-18

### Phase 1: Superpowers Plan Review
- **Status:** complete
- Actions:
  - Read `superpowers:executing-plans`.
  - Confirmed user chose current-directory execution, single-thread execution, and `momenta` GitHub wait-for-link behavior.
  - Re-read `task_plan.md`, `findings.md`, and `progress.md`.
  - Found that prior plan files contained encoding damage and needed rewriting.

### Phase 2: Evidence Recovery and Asset Preparation
- **Status:** complete
- Actions completed:
  - Re-read old recovery notes from `tmp`.
  - Confirmed source categories and known project list.
  - Found local Momenta Keynote evidence but no GitHub source.
  - Copied confirmed project images into `public/portfolio`.
  - Compressed large copied images to JPG and removed oversized PNG duplicates.
  - Recorded user clarification that PPT/PDF slide text should be removed or rebuilt as native site copy, not embedded as image text.
- Next actions:
  - Verify rendered behavior in browser.

### Phase 3: Implementation Rebuild
- **Status:** complete
- Actions completed:
  - Rebuilt `src/main.jsx` around four category rails: Digital / Web / AI, Concept / Hardware, Production / CMF, Research / Systems.
  - Added multi-card horizontal rail behavior with pointer drag, arrows, looped browsing, and no vertical wheel project switching.
  - Rebuilt project detail pages with background, thinking, structure, interface/model/system, render/effect, and result/value process rows.
  - Rebuilt floating Agent entry with drag, open/close, hide/restore, suggestions, and search routing.
  - Rewrote `src/styles.css` as a clean Apple-system typography and spacing layer with dark hero and light work section.
  - Preserved clean image usage by cropping PPT/PDF-like slide assets and rebuilding explanatory copy in native HTML.

### Phase 4: Build Verification
- **Status:** complete
- Command:
  - `npm run build`
- Result:
  - Vite build passed.

### Corrective Pass: Copy, Images, and Pending Evidence
- **Status:** complete
- Actions completed:
  - Changed the Chinese hero title from five characters to four characters: `智能成形`.
  - Removed the user's name from the browser title and meta description.
  - Cropped `cat-turntable-clean.jpg` from the recovered industrial overview while removing slide-layout text.
  - Replaced incorrect production-card image reuse with explicit clean-source-pending states for smart waste tank and compression baling press.
  - Confirmed `industrial-overview.png` is no longer referenced by live React code.
  - Re-ran `npm run build`; Vite build passed.

### Phase 5: Rendered QA
- **Status:** complete
- Actions completed:
  - Confirmed Vite dev server is running at `http://127.0.0.1:5177/`.
  - Used Playwright from `C:\Users\Yang\Documents\New project\job-learning-quest\node_modules`.
  - Captured QA screenshots to `C:\Users\Yang\Documents\New project\tmp\portfolio-site-qa-20260518`.
  - Verified desktop home, desktop work, desktop detail, mobile home, and mobile work states.
  - Fixed rail click behavior by delaying pointer capture until real drag movement.
  - Re-ran `npm run build`; Vite build passed.
  - Re-ran Playwright QA; all checks passed.

### Corrective Pass: Hero Default and Carousel Feel
- **Status:** complete
- Actions completed:
  - Changed the default app language to Chinese so the first-open hero is `智能成形`.
  - Rendered the four Chinese hero characters as separated inline spans to avoid visual crowding while keeping the title as one line.
  - Replaced `scrollWidth / 3` loop math with true sequence measurement based on card width plus gap, preventing padding drift at loop boundaries.
  - Reworked carousel dragging to use per-frame pointer deltas, delayed pointer capture, and release inertia.
  - Set rail CSS scroll behavior to `auto` during drag so smooth scrolling no longer fights the pointer.
  - Re-ran `npm run build`; Vite build passed.
  - Re-ran Playwright checks for default hero, one-line title, immediate drag response, inertia after mouse-up, repeated left drags through the loop, and visible cards after continuous dragging; all passed.

## Test Results
| Test | Expected | Actual | Status |
|---|---|---|---|
| Planning files readable | Clean UTF-8 planning files | Rewritten this session | pass |
| Momenta source scan | Identify whether local/GitHub evidence exists | Found local `Momenta Keynote.key`; later user provided public GitHub source and it was integrated | pass |
| Asset prep | Real project images copied and optimized | Added and compressed confirmed assets | pass |
| Production build | `npm run build` passes | Passed with Vite 7.3.3 | pass |
| Corrective build | Post-fix `npm run build` passes | Passed with Vite 7.3.3 | pass |
| Rendered QA | Desktop/mobile Playwright checks pass | 18 checks passed, 0 issues | pass |
| Carousel drag | Horizontal drag changes scroll position | Passed | pass |
| Vertical scroll | Wheel does not switch/open projects | Passed | pass |
| Card click | Physical mouse click opens detail page | Passed after pointer-capture fix | pass |
| Detail process | Detail page has six process rows | Passed | pass |
| Default hero | First open shows four Chinese characters on one line | Passed | pass |
| Carousel inertia | Release after left drag keeps moving briefly | Passed | pass |
| Carousel loop | Repeated left drags keep progressing without stuck boundary | Passed | pass |
| Source cover assets | New product-source covers load in browser | Passed on 2026-05-20 | pass |
| Source-pending card | Projects without real source image stay pending | Heart bracelet pending card present | pass |
| Detail media preservation | Detail images should not be CSS-cropped | Fixed with `object-fit: contain`; QA passed | pass |
| Mobile source-cover QA | No page-level horizontal overflow | Passed on 390px viewport | pass |
| Card source-fit QA | Equipment/technical source cards should not crop key product form | `smart-waste`, `baling-press`, and `cmf-electronics` use card-level `contain`; QA passed | pass |
| Mobile Agent QA | Agent should be less intrusive on work cards | 46px orb, opacity 0.64, no mobile overflow | pass |

## Session: 2026-05-20

### Corrective Pass: Source-Preserving Image Editing
- **Status:** complete
- User correction:
  - Product images must not be re-invented from text prompts.
  - Original product form, color, material, proportions, and visible details must stay unchanged.
  - Image generation/editing may only adjust background, scene, lighting, crop, and presentation mood.
- Actions completed:
  - Updated `task_plan.md`, `findings.md`, and `progress.md` with the corrected rule.
  - Marked text-only generated concept covers as rejected for project use.
  - Extracted product images from the 77-page portfolio PDF into `tmp/portfolio-pdf-images-20260520`.
  - Created source-preserving cover assets in `public/portfolio` for smart waste tank, compression baling press, Sichuan opera drawing ruler, composite turntable cat toy, Xiaomi CMF, and electronics CMF.
  - Updated `src/main.jsx` to use the source-based assets.
  - Removed the incorrect `Heart Disease Bracelet Kit` cover and kept it as source-pending because no reliable original product image was found.
  - Changed detail-page media from `object-fit: cover` to `object-fit: contain` so source images are not visually cropped in detail pages.
  - Added scroll padding/margins to reduce fixed-header overlap when jumping to sections.
  - Re-ran `npm run build`; build passed.
  - Started a fresh Vite dev server at `http://127.0.0.1:5178/` for current-source QA.
  - Ran Playwright QA and captured screenshots to `tmp/portfolio-source-cover-qa-20260520-cssfix`.
  - Verified six source-based covers load, source-pending cards exist, horizontal carousel scroll works, smart waste detail gallery opens, mobile has no horizontal overflow, and there are no console/page errors.
  - Added card-level `imageFit: contain` only for equipment/technical source covers that should not be cropped in card previews.
  - Kept wider visual covers as `cover` so the work rails do not become visually weak.
  - Reduced mobile Agent orb size to 46px and lowered default opacity to 0.64.
  - Re-ran `npm run build`; build passed.
  - Re-ran Playwright QA and captured screenshots to `tmp/portfolio-contain-agent-qa-20260520-final`.
- Next actions:
  - User review in browser at `http://127.0.0.1:5178/`.
  - If a real Heart Disease Bracelet Kit product image is provided, add it using the same source-preserving workflow.

## Session: 2026-05-21

### Phase 8: v1.0 Visual Upgrade
- **Status:** complete
- Actions completed:
  - Strengthened the black/white Hero with a denser CSS lightfield/ribbon layer over the existing video while keeping only one title and one subtitle.
  - Kept the Hero free of search boxes, dialogue boxes, marketing buttons, and personal-name headlines.
  - Added short project-card copy so cards show type, project name, and one value sentence instead of long summaries.
  - Added subtle category color accents for Digital/Web, Concept/Hardware, Production/CMF, and Research/Systems without changing the white work-section direction.
  - Reworked detail pages from a uniform six-step template into project-type case-study cards.
  - Added deeper hand-written case-study copy for Miro, Pai Li Shi, Li Bai, smart waste tank, compression baling press, and Xiaomi CMF.
  - Added a capability summary layer after the work rails with a restrained radar chart and project evidence tags.
  - Made the Agent orb become smaller and more transparent during scroll/drag, then restore after interaction stops.
  - Did not generate any new product form. Existing product covers remain source-preserving; Heart Disease Bracelet Kit remains source-pending.
  - Re-ran `npm run build`; build passed.
  - Ran Playwright QA on desktop and mobile; screenshots saved to `C:\Users\Yang\Documents\New project\tmp\portfolio-v1-qa-20260521`.

## Error Log
| Time | Error | Attempt Count | Resolution |
|---|---|---:|---|
| 2026-05-18 | Initial JPG compression produced 1x1 images because PowerShell integer division made scale zero | 1 | Regenerated using explicit double division |
| 2026-05-18 | Playwright package in bundled runtime was missing `playwright-core` | 1 | Used complete Playwright install from `job-learning-quest` |
| 2026-05-18 | Rail pointer capture on `pointerdown` blocked physical mouse clicks on project cards | 1 | Delayed pointer capture until movement exceeds the drag threshold |
| 2026-05-18 | Carousel loop felt like rebound because `scrollWidth / 3` included row padding | 1 | Measure one true sequence from card width plus gap and remap by that value |

## Session: 2026-05-21 Follow-up

### Phase 9: Work Section Copy and Product Cover Correction
- **Status:** complete
- User correction:
  - Remove the explanatory heading/copy above the category rails.
  - Product covers should not look like raw cropped slides or empty backgrounds.
  - For product images, preserve the product form exactly and improve only background, crop, scale, and presentation.
- Plan:
  - Start the work section directly at category rows.
  - Build source-preserving studio composites for smart waste tank and compression baling press using the original black-background renders as the product source.
  - Update production-card covers to use those composites.
  - Tune card fit/positioning and verify with Playwright.
  - Integrate the provided public Momenta GitHub source if accessible.
- Actions completed so far:
  - Removed the explanatory heading above the work category rails.
  - Generated source-preserving dark industrial atmosphere covers for smart waste tank and compression baling press.
  - Downloaded GitHub-visible Momenta root assets: `momenta-github-compose.png` and `momenta-github-share.png`.
  - Updated Momenta from GitHub-pending to public GitHub source plus local Keynote evidence.
  - Updated smart waste and baling press galleries to prioritize clean composite/source images and avoid black-background raw crops in the main detail flow.
  - Re-ran `npm run build`; build passed.
  - Ran Playwright QA for work-section top, production cards, Momenta detail, smart waste detail, and mobile work view.
  - Saved screenshots to `C:\Users\Yang\Documents\New project\tmp\portfolio-phase9-momenta-qa-20260521`.

## Session: 2026-05-27

### Phase 10: GSAP Homepage Motion Pass
- **Status:** complete
- User confirmations:
  - `gsap` dependency is allowed.
  - Hero should not add buttons.
  - Pin section should be placed after the work rails and before the capability summary.
  - Parallax should be light and restrained.
- Actions completed:
  - Installed `gsap`.
  - Recorded Phase 10 scope in planning files.
  - Added GSAP timeline-based Hero entrance for header, title wake, title, subtitle, and bottom marquee.
  - Added restrained Hero parallax so background layers move slower than foreground copy.
  - Added small-range magnetic behavior to existing homepage controls on desktop fine-pointer devices.
  - Tuned work-card hover lift and image scaling to stay subtle.
  - Inserted a new pinned capability narrative section after the work rails and before the capability summary.
  - Added mobile and reduced-motion fallback so the capability narrative becomes static cards instead of pinned scroll behavior.
  - Re-ran `npm run build`; build passed.
  - Started a fresh Vite dev server at `http://127.0.0.1:5179/`.
  - Ran Playwright desktop/mobile/reduced-motion QA and saved outputs to `C:\Users\Yang\Documents\New project\tmp\portfolio-gsap-qa-20260527`.

### Phase 11: Three-Row Showcase Wall
- **Status:** complete
- User direction:
  - The homepage work area should become three rows grouped together.
  - Row directions should alternate: left, right, left.
  - The section should be image-led, without extra explanatory copy or controls.
  - Hovering a card should flip it and show only the project name.
- Actions completed:
  - Replaced the homepage category-rail rendering with a three-row showcase wall built from image-bearing projects.
  - Distributed projects across three rows and offset the middle/bottom rows so the wall feels staggered rather than grid-rigid.
  - Added GSAP-powered endless horizontal motion per row with alternating directions.
  - Removed homepage work-section headings, summaries, counters, arrows, and card body copy from the showcase area.
  - Built flip cards with image front, title-only back, and preserved click-through to existing detail pages.
  - Kept reduced-motion users on a static wall by disabling the auto-scrolling timeline for that mode.
  - Re-ran `npm run build`; build passed.
  - Started a fresh Vite dev server at `http://127.0.0.1:5180/`.
  - Ran Playwright desktop/mobile QA and saved outputs to `C:\Users\Yang\Documents\New project\tmp\portfolio-showcase-qa-20260527`.

### Phase 12: Showcase Drag Takeover and Speed Tuning
- **Status:** complete
- User correction:
  - The three rows can keep automatic left/right/left motion, but when the mouse presses and drags a card, the row must follow the mouse.
  - After mouse release, the row should resume its previous automatic movement.
  - The automatic speed should be slightly slower.
- Actions completed:
  - Added pointer drag state to `ShowcaseRow`.
  - On mouse/pointer down, the affected row pauses its GSAP timeline and captures the pointer.
  - During drag, pointer movement is mapped to the row's `x` transform and synchronized back to the GSAP timeline progress.
  - On pointer up/cancel, the row releases capture and resumes its previous automatic timeline.
  - Added click blocking after drag so dragging does not accidentally open a project.
  - Kept normal non-drag click-through into project details.
  - Reduced auto-scroll speed by increasing row duration from roughly `5.2s` per card to `7s` per card, with a higher minimum duration.
  - Re-ran `npm run build`; build passed.
  - Ran Playwright QA for desktop direction, drag takeover, resume, click behavior, and mobile overflow.
  - Saved QA outputs to `C:\Users\Yang\Documents\New project\tmp\portfolio-showcase-drag-qa-20260527`.

## Restart Check
| Question | Answer |
|---|---|
| Where are we? | GSAP homepage motion pass, the three-row showcase wall, and mouse drag takeover are complete and verified |
| Next step | User review in browser at `http://127.0.0.1:5180/` |
| Blocker | Heart Disease Bracelet Kit still needs a reliable original product image |

## Session: 2026-05-31

### Phase 13: Mainland China / Hong Kong Deployment Strategy
- **Status:** complete as strategy only; no deployment was performed.
- User question:
  - Later the portfolio should open in Mainland China, especially Shenzhen, and Hong Kong without requiring a VPN.
  - The public experience should ideally stay on one domain.
  - User does not want execution yet because the website is still being refined.
- Actions completed:
  - Audited the current `portfolio-site` app shape as a static Vite/React site.
  - Checked source references and found no required Google Fonts, gstatic, YouTube, unpkg, jsdelivr, or external CDN runtime dependencies in the checked app files.
  - Identified asset weight as the main technical launch risk, especially the hero video and large PNG assets.
  - Verified current deployment constraints: Vercel is risky as a primary Mainland China interview link; Mainland CDN/hosting generally requires ICP filing; Hong Kong hosting is lower friction but not a hard Mainland guarantee.
  - Added `deployment_china_hk_strategy.md` with a one-domain staged path: Hong Kong static deployment first, then optional ICP + Mainland hosting/CDN or GeoDNS when Mainland reliability becomes critical.
- Next actions:
  - Keep finishing the website locally.
  - Before public launch, run a China-ready build pass: compress media, inspect production network requests, deploy to Hong Kong static hosting, and test from Hong Kong and Shenzhen networks.

### Phase 14: China / Hong Kong Readiness Audit Tooling
- **Status:** complete, but final deployment readiness is not complete.
- Actions completed:
  - Added `tools/china-readiness-audit.mjs`.
  - Added `npm run audit:china`.
  - Added `npm run predeploy:china`.
  - Updated `deployment_china_hk_strategy.md` with EdgeOne as a candidate and with the new audit commands.
  - Ran `npm run build`; Vite production build passed.
  - Ran `npm run audit:china`; report-only audit completed.
  - Ran strict audit directly; it failed as intended because high-risk oversized assets remain.
- Current audit result:
  - No known blocked runtime URL hosts found.
  - Deploy asset total is about 32.69 MB.
  - Strict blockers: `hero-ribbon-loop.mp4`, `hydrotherapy-direction.png`, `momenta-exploded.png`, `palifood-stage.png`, and `palifood-login.png`.
- Next actions:
  - Keep website design work moving.
  - Before final public deployment, compress or replace the strict-blocking assets and rerun `npm run predeploy:china`.
  - After the domain and hosting provider are chosen, test the same domain from Hong Kong and Shenzhen networks without VPN.

### Phase 15: China / Hong Kong Asset Weight Reduction
- **Status:** complete for local deploy-package readiness; the overall domain/hosting goal is still active.
- Actions completed:
  - Backed up original large assets to `C:\Users\Yang\Documents\New project\tmp\portfolio-china-assets-backup-20260531-192026`.
  - Re-rendered the Hero ribbon video from the existing Remotion source as a lighter 1280x720 / CRF 30 MP4.
  - Replaced the live `public/hero-ribbon-loop.mp4` with the lighter MP4.
  - Converted heavy referenced PNGs to JPG deployment variants and updated `src/main.jsx` references.
  - Moved unreferenced heavyweight public files out of `public` so they are not copied into the production `dist`.
  - Ran `npm run predeploy:china`; build and strict audit passed.
  - Started local preview at `http://127.0.0.1:5182/`.
  - Ran Playwright QA for desktop home, detail page, mobile home, video readiness, broken images, HTTP errors, console errors, and mobile overflow.
- Results:
  - Deploy asset total reduced from about 32.69 MB to about 8.19 MB.
  - Strict audit high-risk blockers reduced from 5 to 0.
  - Browser QA passed with no broken images, no console/page errors, and no HTTP 400+ responses.
  - QA screenshots saved to `C:\Users\Yang\Documents\New project\tmp\portfolio-china-predeploy-qa-20260531`.
- Next actions:
  - Choose the actual one-domain hosting path.
  - For low-cost first launch: test EdgeOne Pages global excluding Mainland China or Hong Kong static hosting with a custom domain.
  - For guaranteed Shenzhen stability: prepare ICP and Mainland static hosting/CDN behind the same domain.
  - Actual completion still requires real Hong Kong and Shenzhen network verification without VPN.

### Phase 16: One-Domain Release Package and Live URL Verification
- **Status:** complete for packaging/verification tooling; the overall domain/hosting goal is still active.
- Actions completed:
  - Added `tools/package-china-dist.mjs`.
  - Added `tools/verify-live-url.mjs`.
  - Added `npm run package:china`.
  - Added `npm run verify:url`.
  - Updated `deployment_china_hk_strategy.md` with the package and post-domain verification workflow.
  - Ran `npm run package:china`; it reran `predeploy:china`, passed strict audit, and generated a release zip.
  - Ran `npm run verify:url -- http://127.0.0.1:5182/`; local preview verification passed.
- Generated release:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-113404`
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-113404.zip`
  - Zip size about 6.90 MB.
- Next actions:
  - Choose one-domain hosting candidate.
  - Upload `release/<package>/dist/` to the chosen host.
  - Bind the custom domain.
  - Run `npm run verify:url -- https://your-domain.example`.
  - Prove the same domain opens from Hong Kong and Shenzhen/Mainland China without VPN.

### Phase 17: Hosting Candidate Matrix and Static Host Compatibility
- **Status:** complete for decision preparation; the overall domain/hosting goal is still active.
- Actions completed:
  - Re-checked current official constraints for EdgeOne Pages, Cloudflare Pages, Alibaba OSS, and Tencent COS.
  - Added `hosting_decision_matrix.md`.
  - Updated `deployment_china_hk_strategy.md` so the first test path is EdgeOne Pages global excluding Mainland, with Hong Kong object storage as the second low-cost path.
  - Updated `tools/package-china-dist.mjs` so generated release packages include `404.html`, `_headers`, and `_redirects`.
  - Regenerated the release package with the updated template.
  - Confirmed release README contains the preferred test order and provider notes.
- Latest release:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-114145`
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-114145.zip`
  - Zip size about 6.90 MB.
- Current recommended external path:
  - First: EdgeOne Pages global excluding Mainland + one custom domain.
  - Second: Tencent COS HK or Alibaba OSS HK static hosting + one custom domain.
  - Final stable: ICP plus Mainland static hosting/CDN behind the same domain.
- Goal remains incomplete until a real domain is bound and verified from Hong Kong and Shenzhen/Mainland without VPN.

## Session: 2026-05-31 Deployment Verification Follow-up

### Phase 18: Live URL Stability Reports and Evidence Template
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Re-read the Superpowers execution skill and the persistent planning files before editing.
  - Extended `tools/verify-live-url.mjs` with repeated sampling and report output:
    - `--repeat`
    - `--interval`
    - `--timeout`
    - `--asset-timeout`
    - `--report`
    - `--markdown`
  - Kept the existing checks for home HTML, React root, critical JS/CSS assets, Hero video, and public HTTPS.
  - Added `deployment_verification_log.md` for final Hong Kong and Shenzhen/Mainland no-VPN evidence.
  - Updated `deployment_china_hk_strategy.md` and `hosting_decision_matrix.md` to use the repeated verification command.
  - Updated `tools/package-china-dist.mjs` so future package README files include the repeated URL verification command.
  - Ran `node tools/verify-live-url.mjs --help`; usage output succeeded.
  - Confirmed local preview was still reachable at `http://127.0.0.1:5182/`.
  - Ran `npm run verify:url -- http://127.0.0.1:5182/ --repeat 2 --interval 250 --report release/live-local-verify.json --markdown release/live-local-verify.md`; 2/2 samples passed with 0 asset failures.
  - Tightened missing-value validation for CLI flags and re-ran `node tools/verify-live-url.mjs --help`, one-sample local verification, and missing-value negative check; all behaved as expected.
  - Ran `npm run package:china`; Vite build, strict China readiness audit, and release packaging passed.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-115215.zip`
  - Zip size: about 6.90 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Bind a real custom domain.
  - Run repeated verification against the HTTPS domain.
  - Record Hong Kong and Shenzhen/Mainland no-VPN checks in `deployment_verification_log.md`.

## Session: 2026-05-31 One-Domain Launch Readiness Follow-up

### Phase 19: Provider Runbook and Domain Readiness Verifier
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Used AnySearch to re-check current official constraints for EdgeOne Pages, Cloudflare Pages, Tencent COS, and Alibaba OSS.
  - Added `one_domain_launch_runbook.md` as the practical one-domain launch playbook.
  - Added `tools/verify-domain-readiness.mjs`.
  - Added `npm run verify:domain`.
  - Updated `tools/package-china-dist.mjs` so generated release README files include both domain-readiness and live-URL verification.
  - Updated `deployment_china_hk_strategy.md`, `hosting_decision_matrix.md`, and `deployment_verification_log.md` with the domain readiness command.
  - Ran `node tools/verify-domain-readiness.mjs --help`; usage output succeeded.
  - Ran `npm run verify:domain -- http://127.0.0.1:5182/ --report release/domain-local-check.json --markdown release/domain-local-check.md`; local domain readiness passed.
  - Ran `npm run verify:domain -- https://example.com --report release/domain-example-tool-check.json --markdown release/domain-example-tool-check.md`; public HTTPS/TLS branch passed for tool validation.
  - Ran `npm run verify:url -- http://127.0.0.1:5182/ --repeat 1 --report release/live-local-goal-check.json --markdown release/live-local-goal-check.md`; local URL verification passed.
  - Ran `npm run package:china`; Vite build, strict China readiness audit, and release packaging passed.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260531-120900.zip`
  - Zip size: about 6.90 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Current next real-world action:
  - Bind one custom domain to EdgeOne Pages global excluding Mainland and run `verify:domain`, `verify:url`, Hong Kong no-VPN check, and Shenzhen no-VPN repeated check.

## Session: 2026-06-01 Release Handoff Package Follow-up

### Phase 20: Release Handoff Package for One-Domain Launch
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Re-read `task_plan.md`, `one_domain_launch_runbook.md`, `hosting_decision_matrix.md`, `deployment_verification_log.md`, and release package state.
  - Searched project files for custom-domain, EdgeOne, COS, OSS, Vercel, Cloudflare, and `.env` deployment clues.
  - Found no real custom domain or deploy credentials/config in the current project workspace.
  - Used AnySearch with escalated network access after sandbox network failure; official-doc search result still supports EdgeOne global excluding Mainland as first test, Cloudflare Pages as not suitable for Shenzhen primary link, and Tencent COS static hosting with custom domain as fallback.
  - Added `domain_dns_template.md`.
  - Fixed the runbook command typo from `npm run verify:url -- --repeat 5` to the correct URL command.
  - Updated `tools/package-china-dist.mjs` so future release folders include the launch runbook, hosting matrix, strategy, verification log, and DNS template.
  - Direct `npm run package:china` was blocked by PowerShell execution policy; reran through `cmd /c npm run package:china`.
  - `cmd /c npm run package:china` passed, including Vite build and strict China readiness audit.
  - Confirmed the regenerated release folder includes `dist/`, `README_DEPLOY.md`, `manifest.json`, and all launch handoff docs.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-034756.zip`
  - Zip size: about 6.91 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Provide or choose the real custom domain.
  - Bind it to EdgeOne Pages global excluding Mainland.
  - Run `verify:domain`, `verify:url`, Hong Kong no-VPN check, and Shenzhen no-VPN repeated check.

## Session: 2026-06-01 Launch Goal Gate Follow-up

### Phase 21: Machine-Readable Launch Goal Gate
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Added `deployment_evidence.template.json`.
  - Added `tools/verify-launch-goal.mjs`.
  - Added `npm run verify:launch-goal`.
  - Updated `deployment_verification_log.md`, `one_domain_launch_runbook.md`, and `hosting_decision_matrix.md` to require the launch gate before calling the goal complete.
  - Updated `tools/package-china-dist.mjs` so release folders include `deployment_evidence.template.json`.
  - Ran `node tools/verify-launch-goal.mjs --help`; usage output succeeded.
  - Ran `node tools/verify-launch-goal.mjs --evidence deployment_evidence.template.json`; it failed as expected because the file is a placeholder template and no real reports exist.
  - Ran `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.template.json`; it failed as expected through the npm script path.
  - Ran `cmd /c npm run package:china`; Vite build, strict China readiness audit, and release packaging passed.
  - Confirmed the regenerated release folder includes `deployment_evidence.template.json`.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-035856.zip`
  - Zip size: about 6.91 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Create `deployment_evidence.json` from the template after the real domain is live.
  - Fill it with the real custom domain, report paths, and Hong Kong/Shenzhen no-VPN evidence.
  - Run `npm run verify:launch-goal -- --evidence deployment_evidence.json` and require it to pass.

## Session: 2026-06-01 EdgeOne Execution Checklist Follow-up

### Phase 22: EdgeOne Pages Chinese Execution Checklist
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Used AnySearch to re-check EdgeOne Pages custom-domain and domain-overview rules.
  - Added `edgeone_pages_setup_zh.md`.
  - Documented why the project/deployment preview domains are not acceptable for the Shenzhen proof and why the custom domain is required.
  - Documented the first-test region: global availability zone excluding Chinese mainland.
  - Documented DNS ownership verification, production CNAME, HTTPS, automated checks, Hong Kong/Shenzhen no-VPN tests, and fallback decisions.
  - Updated `one_domain_launch_runbook.md` to point to the Chinese EdgeOne setup checklist.
  - Updated `tools/package-china-dist.mjs` so release folders include `edgeone_pages_setup_zh.md`.
  - Ran `cmd /c npm run package:china`; Vite build, strict China readiness audit, and release packaging passed.
  - Confirmed the regenerated release folder includes `edgeone_pages_setup_zh.md`.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-040824.zip`
  - Zip size: about 6.91 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Use a real custom domain in EdgeOne Pages global excluding Mainland.
  - Complete DNS/CNAME/HTTPS.
  - Run the automated and regional verification gates.

## Session: 2026-06-01 Deployment Evidence Generator Follow-up

### Phase 23: Deployment Evidence Generator
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Re-read Superpowers execution instructions and the persistent planning files.
  - Created missing `agent_memory/` files because the project had no local agent memory directory; the expected template directory was not present on disk.
  - Added `tools/generate-deployment-evidence.mjs`.
  - Added `npm run generate:evidence`.
  - Updated `tools/verify-launch-goal.mjs` to reject reserved example domains and stronger placeholder text.
  - Fixed the launch gate so real reports can still be named `release/domain-check.json` and `release/live-domain-check.json`.
  - Updated `one_domain_launch_runbook.md`, `deployment_verification_log.md`, `hosting_decision_matrix.md`, `deployment_china_hk_strategy.md`, `edgeone_pages_setup_zh.md`, and release README generation.
  - Ran generator help checks through direct Node and npm script paths; both passed.
  - Generated `tmp\deployment-evidence-sample.json` for a fake example domain.
  - Confirmed `verify:launch-goal` fails for the fake sample and for `deployment_evidence.template.json`, as expected.
  - Ran `cmd /c npm run package:china`; build, strict audit, and package generation passed.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-042829.zip`
  - Zip size: about 6.91 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Use a real custom domain.
  - Run `generate:evidence`, `verify:domain`, `verify:url`, and `verify:launch-goal` with real report files and Hong Kong/Shenzhen no-VPN evidence.

## Session: 2026-06-01 Release Package Verification Follow-up

### Phase 24: Release Package Verification Gate
- **Status:** complete locally; public deployment goal still pending real domain and regional no-VPN tests.
- Actions completed:
  - Re-read current planning files and launch scripts.
  - Added `tools/verify-release-package.mjs`.
  - Added `npm run verify:release`.
  - Updated `npm run package:china` so release verification runs automatically after package generation.
  - Fixed `tools/generate-deployment-evidence.mjs` so evidence-file paths are relative to the evidence file, while printed verifier commands remain project-root-relative.
  - Updated `tools/verify-launch-goal.mjs` so `hosting.package` zip paths are checked for existence when they point to local zip files.
  - Found a packaging reliability failure: one `Compress-Archive` run produced a staging folder but no zip.
  - Added a `.NET ZipFile.CreateFromDirectory` fallback in `tools/package-china-dist.mjs` when `Compress-Archive` returns without creating the zip.
  - Updated runbook, verification log, hosting matrix, deployment strategy, EdgeOne checklist, and generated release README flow to include release verification.
  - Ran release verifier help and `verify:release -- --latest`; both passed.
  - Ran `cmd /c npm run package:china`; build, strict audit, packaging, and release verification passed.
  - Generated release verification reports in `release\release-package-check.json` and `release\release-package-check.md`.
  - Re-generated fake sample evidence and confirmed `verify:launch-goal` still fails as expected without a real domain/reports/regional evidence.
- Latest release package:
  - `C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-043944.zip`
  - Zip size: about 6.91 MB.
  - Uncompressed deploy size: about 8.19 MB.
- Remaining launch requirement:
  - Bind one real custom domain to the chosen host.
  - Run `verify:release`, `verify:domain`, `verify:url`, and `verify:launch-goal` with real evidence.
  - Record Hong Kong and Shenzhen/Mainland no-VPN access evidence.

## Session: 2026-06-01 Local URL Diagnosis

### Phase 25: Local Preview Diagnosis
- **Status:** in progress; local preview foreground startup works, background persistence is not stable in the current shell tool.
- User symptom:
  - "现在这个网址为什么打不开呀?"
- Findings:
  - Port `5182` was not listening.
  - Common Vite ports `5173-5190` were not listening.
  - Foreground `cmd /c npm run preview -- --host 127.0.0.1 --port 5182` successfully starts the Vite preview server.
  - `py -m http.server` fallback failed because no installed Python is available through `py`.
- Actions completed:
  - Added `tools/serve-dist.mjs`, a Node-only static server for `dist`.
  - Added `npm run preview:static`.
  - Foreground `cmd /c npm run preview:static` successfully starts and prints `http://127.0.0.1:5182/`.
- Next action:
  - For immediate local review, run `cmd /c npm run preview:static` and keep that terminal/session open.
  - For public URL diagnosis, inspect the exact URL with `verify:domain` and `verify:url`.

## Session: 2026-06-01 Aircenter-Style Homepage Migration

### Phase 26: Homepage Structure and Interaction
- **Status:** complete, with helix video intentionally deferred.
- User correction:
  - The generated helix did not match aircenter's stepped spiral. Do not proceed with that asset.
  - The user will provide 25 approved frames later; the current task is to finish the other homepage work first.
- Actions completed:
  - Froze the rejected generated helix asset and did not use it as the live hero background.
  - Removed the rejected generated public video `public/hero-yang-helix-loop.mp4` so it will not be packaged by mistake.
  - Replaced the old black ribbon hero with a white `YANG` hero structure, centered `智能成形` title, and no hero buttons/search/dialogue UI.
  - Added a compact achievement-number band from confirmed portfolio/CV signals.
  - Added a product showcase with center card plus side perspective cards for hardware/CMF/equipment work.
  - Added a digital case scroller using the aircenter-style large image plus numbered copy layout.
  - Kept the three-row moving showcase wall as the full work index.
  - Added a black `YANG` footer.
  - Fixed product-card click-through by removing parent pointer capture.
  - Reworked the digital scroller from GSAP pin to CSS sticky plus ScrollTrigger active-index switching.
  - Removed a GSAP magnetic scale tween that produced a console warning.
  - Re-ran `cmd /c npm run build`; build passed.
  - Ran Playwright QA against `http://127.0.0.1:5182/`.
- Verification:
  - Desktop: `YANG` hero letters present, hero has 0 buttons/inputs, 5 product cards, 5 digital cases, 3 showcase rows, and `YANG` footer letters.
  - Product active card opens a detail page.
  - Showcase row auto motion still changes over time.
  - Desktop and 390px mobile have no page-level horizontal overflow.
  - No console warnings, page errors, or HTTP 400+ responses were captured.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-qa-20260601-v3`
- Remaining:
  - Wait for the user's 25-frame helix image sequence, then compose it into the final hero video and replace the faint placeholder slot.

## Session: 2026-06-01 Hero Helix Frame Pipeline

### Phase 27: Frame-Sequence Video Pipeline
- **Status:** complete.
- User correction:
  - The unrelated chat screenshot is not a valid helix frame and must be excluded.
  - The desired source is the white stepped spiral/helix sequence provided as approved frame images.
- Actions completed:
  - Searched project, temp, downloads, desktop, and Codex-related cache locations for the newly pasted frame files.
  - Excluded `C:\Users\Yang\AppData\Local\Temp\ScreenShot_2026-06-01_205019_735.png` per user instruction.
  - Inspected the 2026-05-31 continuous temp screenshots and confirmed they are unrelated fitness-video screenshots, not helix frames.
  - Added `source-helix-frames/README.md` with the expected local frame-file contract.
  - Added `npm run prepare:helix` and `npm run render:helix`.
  - Added `tools/prepare-helix-frames.mjs` to sort source frames, copy them into `remotion-hero/public/helix-frames`, and generate the Remotion frame manifest.
  - Added `tools/render-helix-video.mjs` to render `public/hero-yang-helix-loop.mp4`.
  - Added the Remotion `HeroHelixFrames` composition with ping-pong playback and adjacent-frame crossfade for a softer loop.
  - Updated the homepage Hero to use `/hero-yang-helix-loop.mp4` when present while keeping the existing faint placeholder underneath.
  - Fixed the Windows direct-run check in `tools/prepare-helix-frames.mjs`; `cmd /c npm run prepare:helix` now correctly reports that there are currently 0 local helix frames instead of silently exiting.
  - Re-ran `cmd /c npm run build`; production build passes after the pipeline and Hero video hook changes.
  - Read the approved source folder `C:\Users\Yang\Desktop\job\web`: 25 PNG files, all `1672 x 941`.
  - Rendered `public\hero-yang-helix-loop.mp4` with `cmd /c npm run render:helix -- --input "C:\Users\Yang\Desktop\job\web"`.
  - Copied the approved frames into `source-helix-frames/` and confirmed default `cmd /c npm run prepare:helix` prepares 25 frames.
  - Confirmed Remotion frame `0` and frame `359` are identical at sampled pixels, so the loop point does not hard-jump.
  - Re-ran `cmd /c npm --prefix remotion-hero run lint`; Remotion TypeScript/ESLint passed.
  - Re-ran `cmd /c npm run build`; Vite production build passed and copied the MP4 into `dist`.
  - Ran Playwright QA on desktop and mobile; the hero video loads, plays, has no console/page errors, has no horizontal overflow, and the Hero still has no buttons/inputs.
- Confirmed `http://127.0.0.1:5182/hero-yang-helix-loop.mp4` returns HTTP 200 with `video/mp4`.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio-helix-video-qa-20260601`

## Session: 2026-06-02 Hero Smoothness Guidance and Letter Spacing Fix

### Phase 28: Video Source Guidance + Hero Letter Layout
- **Status:** complete for layout; video smoothness pending a better generated source.
- User symptom:
  - The current Hero video feels very choppy.
  - The oversized Hero letters visually stick together around the middle letters.
- Decision:
  - Do not keep trying to solve smooth motion from only 25 frames. The next best input is a complete Seedance/Cedance-generated H.264 MP4, 1920x1080 or 4K, 30fps/60fps, 8-12s, seamless-loop aligned.
  - Keep the current 25-frame Remotion output only as a temporary placeholder until the better video source is available.
- Actions completed:
  - Wrote a Seedance/Cedance prompt for a clean white stepped-helix architectural video, including seamless-loop and first/last-frame alignment requirements.
  - Updated `src/main.jsx` so the Hero letters have explicit `air-letter-y`, `air-letter-a`, `air-letter-n`, and `air-letter-g` classes.
  - Updated `src/styles.css` to reduce the maximum Hero letter scale and move the `A` and `N` further apart across desktop, tablet, and mobile breakpoints.
  - Ran `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build`; Vite build passed.
  - Started `npm run preview:static` at `http://127.0.0.1:5182/` for QA.
  - Ran Playwright desktop/tablet/mobile checks for letter bounding boxes, Hero video readiness, console/page errors, and horizontal overflow.
- Verification:
  - Desktop `A` to `N` gap: 159px.
  - Tablet `A` to `N` gap: 128px.
  - Mobile `A` to `N` gap: 55px.
  - Video `readyState` is 4 in all tested viewports.
  - Page-level horizontal overflow is 0 and no console/page errors were captured.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio-hero-letter-fix-qa-20260602`

## Session: 2026-06-02 Aircenter Interaction Correction

### Phase 29: Aircenter Intro, Scroll Collection, Metrics, Footer
- **Status:** complete.
- Actions completed:
  - Fixed the Air Hero sticky failure by overriding `.air-hero` overflow while keeping the sticky hero content clipped inside `.air-hero-sticky`.
  - Reworked the intro timeline so the page starts blank, reveals `YANG` left-to-right, then brings in the helix video and short copy.
  - Reworked the scroll timeline so large letters move upward and fade out early, while a collected top `YANG` remains visible.
  - Rebuilt the achievement cards as black aircenter-style metric cards and loosened small-copy width to avoid awkward one-character wrapping.
  - Kept footer text as `YANG` across Chinese and English modes.
- Verification:
  - `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed.
  - Playwright QA passed at `http://127.0.0.1:5182/`.
  - Mid-scroll checks: `stickyY=0`, `wordmarkOpacity=1`, large letter opacities `0`, hero copy opacity `0`, `overflowX=0`.
  - Footer language check: Chinese and English both contain `YANG`.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-fix-qa-20260602-v8`

## Session: 2026-06-02 Aircenter Typography and Video Motion Audit

### Phase 30: Digital Case Panel and Footer Typography
- **Status:** complete.
- Actions completed:
  - Added dual progress rules and `/ total` index to the digital case panel.
  - Reduced digital case title/body/button scale so the right panel follows the aircenter reference more closely.
  - Reworked the case button into a restrained bottom gray bar.
  - Reduced black footer `YANG` scale and kept all letters visible on desktop/mobile.
  - Ran `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build`; Vite build passed.
  - Ran desktop/mobile Playwright QA for digital panel and footer typography.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\portfolio-aircenter-type-fix-qa-20260602-v2`

### Phase 31: Generated Helix Video Motion Audit
- **Status:** complete.
- Actions completed:
  - Inspected `C:\Users\Yang\Desktop\job\web\6月2日 (2).mp4`.
  - Used JianyingPro's local `ffmpeg.exe` to extract one-frame-per-second stills and a contact sheet.
  - Compared the generated contact sheet against `QQ20260601-231219-HD.mp4` and a live Playwright capture of `https://aircenter.space/`.
  - Confirmed the generated video behaves like a back-and-forth/ping-pong orbit instead of a continuous counterclockwise upward helix rotation.
  - Wrote a corrected concise video-generation prompt that locks direction, axis, camera, and loop behavior.
- Evidence:
  - Generated video contact sheet: `C:\Users\Yang\Documents\New project\tmp\seedance-video-ffmpeg-audit-20260602\contact-sheet.jpg`
  - Reference video contact sheet: `C:\Users\Yang\Documents\New project\tmp\aircenter-reference-video-ffmpeg-audit-20260602\contact-sheet.jpg`
  - Live site screenshots: `C:\Users\Yang\Documents\New project\tmp\aircenter-live-reference-20260602`

### Phase 32: Hero Letter Gap and Footer Position Follow-up
- **Status:** complete for current layout fixes.
- Actions completed:
  - Rechecked the local preview at `http://127.0.0.1:5182/` after the user asked whether the previously bad areas were fixed.
  - Confirmed the digital case panel is currently controlled: progress rules, `/ 5`, smaller title/body, and bottom gray action bar are present.
  - Updated `src/styles.css` to widen the Hero middle-letter positions from the previous tight `A/N` spacing.
  - Updated `src/styles.css` to reposition footer `YANG` letters with absolute placements, closer to the aircenter black ending rhythm.
  - Ran `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build`; Vite build passed.
  - Ran desktop and mobile Playwright QA for hero, digital panel, footer, console errors, and horizontal overflow.
- Verification:
  - No console/page errors captured.
  - Desktop and mobile page-level horizontal overflow: `0`.
  - Hero `A` and `N` no longer visually stick together in the late intro screenshot.
  - Footer `YANG` stays English and uses a lower scattered black-background layout.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\current-aircenter-status-20260602-v2`
- Remaining:
  - Replace the temporary Hero MP4 once the user provides the new Seedance/Cedance video.
- Preview:
  - Restarted `npm run preview:static`; `http://127.0.0.1:5182/` now returns HTTP `200`.
  - Rechecked hero after restart: video readyState `4`, no horizontal overflow.
  - Fresh quick screenshot output: `C:\Users\Yang\Documents\New project\tmp\current-aircenter-status-20260602-v3`.

### Phase 33: Aircenter Three-Card Product Orbit Correction
- **Status:** complete.
- Actions completed:
  - Removed the incorrect visible `product-orbit-copy` block from the product showcase.
  - Removed the bottom previous/next product controls.
  - Changed `ProductShowcase3D` so desktop only renders three cards at a time: left, active center, and right.
  - Added global pointer move/up handling so drag switching still works when the pointer moves across cards.
  - Increased left/right offsets so the three modules no longer touch; measured desktop gaps are about `31px`.
  - Kept active-card click opening the project and side-card click changing the active card.
- Verification:
  - `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed.
  - Playwright desktop QA: `product-orbit-controls=0`, `product-orbit-copy=0`, visible card count `3`, overflowX `0`.
  - Playwright interaction QA: side-card click changed active image; horizontal drag changed active image again.
  - No console/page errors captured.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-fix-20260602-v3`

### Phase 34: Aircenter Product Orbit Visual Match Pass
- **Status:** complete.
- Actions completed:
  - Rechecked the user's latest reference screenshot and treated the target as: three cards only, no title/copy/controls, center card largest, side cards smaller and perspective-deformed toward the edges.
  - Adjusted the product orbit transform to push side cards farther out, reduce their scale, and increase `rotateY` perspective.
  - Preserved existing side-card click, center-card open, and horizontal drag behavior.
- Verification:
  - `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed.
  - Playwright desktop QA: visible cards `3`, product copy blocks `0`, product controls `0`, card gaps `204px / 204px`, active card `900 x 595`, side cards about `627 x 398`, overflowX `0`.
  - Playwright interaction QA: side-card click changed the active image; horizontal drag changed it again.
  - Playwright mobile QA: only the active card is visible, product copy blocks `0`, product controls `0`, overflowX `0`.
  - No console/page errors captured.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-match-20260602-v2`

### Phase 35: Product Orbit Perspective Direction Fix
- **Status:** complete.
- Actions completed:
  - Reinterpreted the latest user correction as a perspective-direction problem: both side cards should be visually larger toward the center and smaller toward the viewport edge.
  - Fixed the `rotateY` sign in `ProductShowcase3D` from `-offset * 29` to `offset * 29`.
  - Kept the existing three-card separation, no title/copy/controls, side-card click switching, center-card open, and horizontal drag behavior.
- Verification:
  - `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed.
  - Playwright desktop QA: visible cards `3`, product copy blocks `0`, product controls `0`, gaps `204px / 204px`, overflowX `0`.
  - Direction proof: left card offset `-1` renders `rotateY(-29deg)`, right card offset `1` renders `rotateY(29deg)`.
  - Interaction QA: side-card click changed the active image; horizontal drag changed it again.
  - Playwright mobile QA: one active card visible, product copy blocks `0`, product controls `0`, overflowX `0`.
  - No console/page errors captured.
- QA output:
  - `C:\Users\Yang\Documents\New project\tmp\product-orbit-perspective-direction-20260602-v1`

### Phase 36: Product Orbit Aircenter Separation Refit
- **Status:** complete.
- Actions completed:
  - Refit the three-card product orbit to match the latest aircenter reference: center card remains dominant, side cards are separate panels, side panels use shallow perspective, and the viewport crops each side panel instead of showing the full side images.
  - Tuned side-card transform to `48.5vw` side displacement, `14deg` side `rotateY`, `0.86` side scale, and `-50px` depth.
  - Kept the product section free of visible title, explanatory copy, and bottom controls.
- Verification:
  - `cmd /c npm run build` passed.
  - Playwright desktop QA at `1920 x 941`: visible cards `3`, active card `893 x 602`, side cards `622 x 505`, side visible ratio `0.78 / 0.78`, gaps `26px / 26px`, no overlap, center is largest, console warnings/errors `0`.
- QA output:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\product-orbit-aircenter-separated-20260602-v1`

### Phase 37: Product Orbit Shallow Angle + Vercel Deploy
- **Status:** product orbit and Vercel deployment complete; Supabase runtime connection pending credentials.
- Actions completed:
  - Reduced side-card perspective from `14deg` to `8deg` so the side cards no longer look over-folded.
  - Preserved the aircenter-like desktop behavior: only three cards are visible, side cards are viewport-cropped, no title/copy/controls are shown, side-card click switches active project, and center click opens the case.
  - Added `.vercelignore` to exclude large local artifacts from Vercel upload.
  - Deployed the current site to Vercel.
- Verification:
  - `cmd /c npm run build` passed.
  - Local Playwright QA at `1920 x 941`: visible cards `3`, active card `893 x 602`, side cards `678 x 505`, side visible ratio `0.72 / 0.72`, gaps `26px / 26px`, no overlap, center is largest, console warnings/errors `0`.
  - Vercel upload size dropped from the previous failed `249.1MB` to `5.5MB`.
  - Public alias returned `200 OK`: `https://portfolio-site-three-rose.vercel.app`.
- Deployed Playwright QA matched local metrics: visible cards `3`, side visible ratio `0.72 / 0.72`, gaps `26px / 26px`, no console warnings/errors.
- Supabase runtime status remains `missing-env`, because no Supabase URL/key has been provided yet.
- QA output:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\product-orbit-aircenter-separated-20260602-v1`

## Session: 2026-06-04 Product Orbit Corner-Line + Hero YANG Refinement
- **Status:** complete for UI and Vercel deployment; Supabase runtime env remains pending.
- Actions completed:
  - Reduced the Hero collected `YANG` scale from desktop `0.33` to `0.30` and adjusted tablet/mobile collection scales proportionally.
  - Removed unused `.air-hero-wordmark` CSS so the page keeps only the four existing `.air-letter` nodes for the collected `YANG` effect.
  - Changed product orbit side panels to use explicit shallow `clip-path` edge geometry, so the side-card top/bottom edges form continuous diagonal lines instead of looking like disconnected transforms.
  - Preserved the three-card-only product orbit: left, center, right; no section title, explanatory copy, or bottom controls.
  - Re-ran `cmd /c npm run build`; Vite build passed.
  - Re-ran local Hero Playwright verification and captured `hero-expanded.png`, `hero-visible-collected.png`, and `hero-collected.png` in `tmp/air-hero-collected-20260604-v1`.
  - Re-ran local and deployed product-orbit Playwright verification.
  - Redeployed Vercel production; public alias remains `https://portfolio-site-three-rose.vercel.app`.
- Verification:
  - Hero DOM: `letterCount=4`, `wordmarkCount=0`.
  - Hero visible collected state: `groupWidth=264`, `groupTop=75`, `groupCenterX=960`, centered check passed.
  - Product orbit local/deployed: `visibleCount=3`, `visibleRatioX=0.74 / 0.74`, `leftGap=9`, `rightGap=9`, `centerIsLargest=true`, `noOverlap=true`, console warnings/errors `0`.
  - Public alias `https://portfolio-site-three-rose.vercel.app` returned `200 OK`.
  - Supabase runtime status remains `missing-env`; real connection still needs Vercel/local env vars.

## Session: 2026-06-05 Supabase Connection Gate
- **Status:** verifier added; real Supabase connection still pending credentials.
- Actions completed:
  - Re-read `src/lib/supabaseClient.js`; the app expects `VITE_SUPABASE_URL` plus `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
  - Re-read `.env.example`; it is an empty template only.
  - Confirmed no local `.env` / `.env.local` exists with real Supabase values.
  - Re-read `supabase/portfolio_health.sql`; it creates a public-readable `portfolio_health` table for a simple connection check.
  - Added `tools/verify-supabase-config.mjs`.
  - Added `npm run verify:supabase`.
- Verification:
  - `cmd /c npm run verify:supabase` fails as expected with `ready=false`, `reason=missing-env`.
  - `cmd /c npm run build` passes.
  - Public product-orbit browser verification still reports `supabaseStatus=missing-env`.
- Remaining:
  - Need real Supabase project URL/key.
  - Need to run `supabase/portfolio_health.sql` in that Supabase project.
  - Need to add the same env vars to Vercel production and redeploy.

## Session: 2026-06-05 Hero YANG Mid-Scroll Stability
- **Status:** Hero fix deployed; Supabase remains pending credentials.
- User symptom:
  - During the Aircenter-style Hero scroll collection, `YANG` could render as overlapping letters on the left while `G` stayed far away.
- Actions completed:
  - Updated `src/main.jsx` so collected-letter target calculation resets GSAP `x`, `y`, and `scale` before measuring the base letter rects, then restores the active transforms.
  - Removed the scroll-collection stagger from the `.air-letter` tween, keeping the four original letters coherent while they shrink and move upward.
  - Added `tmp/verify-air-hero-yang-midstates.mjs` to measure the Hero across eight scroll checkpoints locally or on a provided URL.
  - Re-ran `cmd /c npm run build`; Vite build passed.
  - Ran local collected-state verification and local mid-scroll verification; both passed.
  - Deployed to Vercel production. Deployment id: `dpl_Cktjs1AGHxp5yx9Bih3xyL4wRoQG`.
  - Confirmed the production alias `https://portfolio-site-three-rose.vercel.app` returns HTTP `200`.
  - Ran deployed mid-scroll verification against the public alias; it passed.
- Verification:
  - Local and deployed Hero states use exactly four `.air-letter` nodes and zero `.air-hero-wordmark` nodes.
  - Across eight scroll checkpoints, rendered order stayed `YANG`, all gaps stayed positive, and no overlap occurred.
  - No console warnings or errors were captured.
- Remaining:
  - Supabase runtime connection is still `missing-env` until real Supabase URL/key are configured.

## Session: 2026-06-05 Supabase Handoff Hardening
- **Status:** handoff complete; real connection still blocked by missing credentials.
- Actions completed:
  - Ran `cmd /c npx vercel env ls`; Vercel reported no environment variables for the current project.
  - Added `supabase/README.md` with the exact SQL, `.env.local`, local verification, Vercel env, and redeploy steps.
  - Confirmed `.env.example` already contains the expected variable names.
  - Cleaned formatting in `src/lib/supabaseClient.js` without changing behavior.
- Verification:
  - `cmd /c npm run build` passed.
  - `cmd /c npm run verify:supabase` still fails with `ready=false`, `reason=missing-env`.
- Remaining:
  - Need real Supabase URL/key.
  - Need to run `supabase/portfolio_health.sql` in the target Supabase project.
  - Need to configure Vercel production env vars and redeploy.

## Session: 2026-06-18 Tresmares Seven-Card Orbit Geometry
- **Status:** complete and deployed.
- Actions completed:
  - Reworked the Expansion photo orbit to show one centered active card plus three cards on each side on desktop.
  - Locked the visible orbit to seven slots so the layout no longer exposes eight or more images.
  - Recomputed card rotation from the shared bottom-center circle origin so each image follows the same tangent relationship.
  - Preserved the pinned scroll/scrub section, active label/red dot, faded lower cards, and bottom explanatory copy.
- Verification:
  - `cmd /c npm run build` passed.
  - Playwright local QA passed at desktop/mobile checkpoints with `overflowX=0`.
  - Desktop `1440px` QA showed seven visible cards at progress `0.38`, `0.42`, `0.62`, and `0.82`.
  - At progress `0.42`, the card centers were symmetric around center x `720`: `116 / 276 / 486 / 720 / 954 / 1164 / 1324`.
  - Vercel production deployment `dpl_2UpeNFJ7Uf5Kby16sXBMyC4vqs5R` completed and alias `https://portfolio-site-three-rose.vercel.app/` returned `200`.
  - Deployed Playwright QA confirmed desktop visible card count `7` at progress `0.38`, `0.42`, `0.62`, and `0.82`, with `overflowX=0`.

## Session: 2026-06-19 Tresmares Seven-Card White-Erase Fix
- **Status:** complete; deployed and verified on production.
- Actions completed:
  - Rechecked the user's latest correction: the Expansion orbit must prioritize exactly seven desktop images and edge erasure, not whole-image blur.
  - Updated `src/main.jsx` so visible desktop cards keep enough opacity to actually show all seven images: one active center card plus three on each side.
  - Kept the scroll-driven continuous orbit behavior; this is still GSAP ScrollTrigger pin + scrub, not card-by-card snapping.
  - Removed opacity/blur as the main edge treatment. Edge and lower cards now use CSS white wash overlays through `--edge-wash-opacity` and `--bottom-wash-opacity`.
- Verification:
  - `cmd /c npm run build` passed.
  - Playwright local QA passed at desktop/mobile checkpoints.
  - Desktop `1440x900` shows seven visible cards at progress `0.32`, `0.38`, `0.42`, `0.62`, and `0.82`; horizontal overflow is `0`, title overlap is `false`, and visible cards report `blur(0px)`.
  - Mobile keeps five visible cards to avoid horizontal overflow.
  - Vercel production deployment `dpl_98VtvFfq5xvdg2wB6g5BQgMAV2EF` completed and `https://portfolio-site-three-rose.vercel.app/` returned `200`.
  - Deployed Playwright QA matches local: desktop `1440x900` keeps seven visible cards from progress `0.32` through `0.82`; mobile `390x844` keeps five visible cards from progress `0.32` through `0.82`; all visible cards report `blur(0px)`.
  - Follow-up correction: removed the desktop title-proximity wash that made a mid-orbit card look blurred/washed near `further`; desktop cards now avoid the title by a lower orbit origin, while white wash remains limited to edge/bottom erasure.

## Session: 2026-06-19 Tresmares Center Image Clarity Guard
- **Status:** complete; deployed and verified on production.
- User symptom:
  - The centered image in the Tresmares Expansion orbit still looked blurry/gray.
- Actions completed:
  - Checked the active centered card image source and found the `holland` image URL returned `404`.
  - Replaced the broken `holland` URL with a valid image source.
  - Kept visible card CSS filters at `blur(0px)` and left the edge/bottom disappearance to white wash overlays only.
  - Extended `tmp/verify-tresmares-orbit.mjs` to record `imageLoaded` for visible card images.
- Verification:
  - `cmd /c npm run build` passed.
  - Local Playwright QA passed: at desktop progress `0.32`, the center card is `holland`, `centerLoaded=true`, `broken=none`, `blur=none`, `visible=7`, `overflow=0`, and `overlap=false`.
  - Deployed Playwright QA passed with the same image-loaded checks.
  - Vercel production deployment `dpl_6cSzBzGeeGQGxcjPoErDgBW1rAmU` completed and the public alias remains `https://portfolio-site-three-rose.vercel.app/`.

## Session: 2026-06-19 Tresmares Orbit Smooth Scroll Experiment
- **Status:** complete; deployed and verified on production.
- Fallback:
  - Created and pushed Git tag `fallback-tresmares-orbit-2026-06-19` at commit `2232277` before changing the scroll feel.
- Actions completed:
  - Kept the accepted seven-card semicircle geometry unchanged.
  - Replaced raw ScrollTrigger `onUpdate` progress with a GSAP scrubbed proxy tween, so the orbit follows eased scroll progress instead of raw wheel steps.
  - Updated the active country label through a DOM ref during scroll to avoid React re-render churn.
  - Softened label/dot opacity around active-card handoff while preserving card positions.
- Verification:
  - `cmd /c npm run build` passed.
  - Local Playwright QA passed on desktop and mobile: desktop keeps seven visible loaded cards, mobile keeps five, visible card filters stay at `blur(0px)`, title overlap is `false`, and horizontal overflow is `0`.
  - Vercel production deployment `dpl_Dd24jd7oDvcBAgUZ6Q726W7ZZQjR` completed and is aliased to `https://portfolio-site-three-rose.vercel.app/`.
  - Deployed Playwright QA passed with the same desktop/mobile orbit checks.

## Session: 2026-06-20 Next Agent Handoff Package
- **Status:** complete.
- Actions completed:
  - Added `NEXT_AGENT_HANDOFF.md` as the first-read handoff document for the next Codex / AI window.
  - Recorded the production site, GitHub repository, current deployment id, fallback tag, core architecture, accepted visual states, and strict guardrails.
  - Documented the exact startup prompt that can be pasted into a new chat.
- GitHub:
  - Handoff package is intended to be committed and pushed to GitHub `main` with this documentation update.

## Session: 2026-06-20 Agent Entry Cleanup + Local Search
- **Status:** complete; pushed to GitHub and deployed to production.
- Actions completed:
  - Removed the Agent panel's visible title, guidance paragraph, preset chips, and hide-entry control.
  - Replaced the old floating/restore icon behavior with a single AssistiveTouch-style dot button.
  - Added local rule-based search for portfolio projects and profile-style questions.
  - Project-intent queries such as `帮我找一下拍立食` now open the matched project directly.
  - Profile questions now return a short portfolio summary in the panel.
- Verification:
  - `cmd /c npm run build` passed.
  - Local Playwright QA passed: initial Agent panel contains close/search only, no suggestion chips/hide row/old SVG icon, and `拍立食` search opened the project.
  - Production deployment completed and was aliased to `https://portfolio-site-three-rose.vercel.app/`.
  - Public Playwright QA passed with the same Agent panel and `拍立食` project-open checks.

## Session: 2026-06-20 Agent RAG Plan + UI Correction
- **Status:** complete; pushed to GitHub and deployed to production.
- Actions completed:
  - Corrected profile matching and replies from `羚羊` to `林杨`.
  - Replaced the fixed profile answer with a dynamic answer assembled from current portfolio project data.
  - Removed the Agent panel top-right close X.
  - Added outside-click close behavior while keeping the AssistiveTouch orb as the panel toggle.
  - Increased the orb's visibility so it remains discoverable.
  - Added `docs/PORTFOLIO_RAG_AGENT_PLAN.md` for future API integration: RAG evidence retrieval, explainable reasoning summary, confidence/self-doubt scoring, API shape, environment variables, and acceptance criteria.
- Verification:
  - `cmd /c npm run build` passed.
  - `node tmp\verify-agent-panel.mjs` passed against local preview: Agent opens, close X is absent, outside click closes the panel, `林杨的能力怎么样` returns a dynamic answer containing `林杨` and not `羚羊`, and `帮我找一下拍立食` opens the project detail page.
  - Pushed commit `5569c0e` to GitHub `main`.
  - Vercel production deployment `dpl_5xgotJtgyMiRqPkqvDxrNd8hqQNk` completed and is aliased to `https://portfolio-site-three-rose.vercel.app/`.
  - Public Playwright QA passed against `https://portfolio-site-three-rose.vercel.app`: Agent opens, close X is absent, outside click closes the panel, `林杨` profile answer is dynamic, and `拍立食` opens the project detail page.

## 2026-06-21 Agent Project Evaluation Answers
- Implemented evaluation-intent handling for Agent questions like `你觉得拍立食做得怎么样`.
- Added Pai Li Shi speech/typing aliases including `拍历史` and `派历史`.
- Replaced the generic discovery sentence with a project-specific Pai Li Shi evaluation paragraph when the visitor asks for judgement.
- Added a visible clickable affordance on result cards: `查看项目` / `View case` with an arrow icon.
- Verification:
  - `cmd /c npm run build` passed.
  - Local Playwright QA passed: the Agent answer contains `拍立食整体`, does not show the old generic discovery copy, shows `查看项目`, and opens the Pai Li Shi detail page.
  - Pushed commit `359c67d` to GitHub `main`.
  - Vercel production deployment `dpl_CyUSw8w1Ds9T9tMFogDGrkLNwpZK` completed and is aliased to `https://portfolio-site-three-rose.vercel.app/`.
  - Public Playwright QA passed against `https://portfolio-site-three-rose.vercel.app/`: Agent evaluation answer, visible `查看项目`, and Pai Li Shi detail navigation all passed.

## Session: 2026-06-24 Daima Work Panels + Agent Achievement QA
- **Status:** complete.
- Actions completed:
  - Refined the Daima-style four fullscreen work panels to better match the source typography: Manrope-like 52px / 600 titles and Geist Mono-like 16px / 500 categories, with zero letter spacing per current UI rules.
  - Kept the four internal click targets: Miro, 拍立食, 李白互动网站, and Offer Quest.
  - Fixed Agent achievement-stat fallback selection so award questions answer from the `12+` honors card instead of the `51` works card.
- Verification:
  - `C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build` passed.
  - Local Playwright QA passed: 4 fullscreen Daima panels, loaded images, all 4 project detail bridges, Pai Li Shi single-button Agent answer without Miro, collapse/reopen cleared state, awards answer includes `12+`, and mobile overflow is `0`.
  - QA output: `tmp/daima-focused-qa/`.
  - GitHub and Vercel release details are recorded in the final handoff for this session.
