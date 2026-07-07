# 2026-07-07 Momenta software order correction

- User flagged that the black device/phone visual (`momenta-software-05.webp`) is a closing/final presentation page in the PPT logic and should not appear in the early flow.
- Updated `momentaSoftwareGallery` to use an explicit static order `[4, 6, 7, 8, 9, 10]`, then keep the 11-21 scroll interaction, followed by images 22, 23, and finally image 05.
- Re-aligned Momenta `mediaNarrative` with the new order and expanded supporting explanations from 6 to 11 concise notes.
- Verification passed: `npm run build`; browser QA confirmed title `Momenta AI Music Interaction`, one intro video, 23 images, two scroll-driven sequences, 11 notes, last figure `/portfolio/momenta-software/momenta-software-05.webp`, no Li Bai/libai residue, overflow `0`, and no page errors.
- Latest local screenshot: `tmp/momenta-order-last-check.png`.
- Order evidence for user review: `tmp/momenta-order-overview/momenta-current-order-overview-en.png` shows the live page sequence, and `tmp/momenta-order-overview/momenta-source-01-23-contact.png` shows the raw source-image numbering.
- Current live-page sequence: intro video -> 01 -> 03->02 animation -> 04 -> 06 -> 07 -> 08 -> 09 -> 10 -> 11->21 animation -> 22 -> 23 -> final 05.
- Follow-up correction: re-checked note/image alignment after the order overview. The "code / preview / simulator" evaluation note now belongs after image 10, the 11-21 sequence note describes the AI state-change loop, image 22 is the signal/context boundary, and image 23 leads into the final restrained product principle.
- Latest browser QA evidence after the note fix is in `tmp/momenta-order-qa-v2/`: 13 rendered media figures, one intro video, two scroll-driven sequences, 11 notes, final figure `/portfolio/momenta-software/momenta-software-05.webp`, no Li Bai/libai residue, overflow `0`, errors `0`.
- After the user could not read the previous order view, generated a clearer live-page storyboard: `tmp/momenta-live-order-storyboard-v1/momenta-live-order-storyboard.png`. It shows 17 captured cards: intro video, image 01, 03->02 start/mid/end, images 04/06/07/08/09/10, 11->21 start/mid/end, images 22/23, and final image 05.
- Reverse interaction QA passed using the page's own immediate Lenis scroll path: 03->02 progresses 0 -> 0.5486 -> 0.9986 and reverses to 0; 11->21 progresses frame 1 -> 5 -> 11 and reverses to frame 1. Evidence: `tmp/momenta-interaction-reverse-qa-v2/reverse-metrics.json`.
- Generated clean full-detail scroll preview video after the order storyboard: `tmp/momenta-clean-scroll-video-v1/momenta-clean-scroll-preview-v1.mp4` (1600x750, 224 frames, ~14.9s). It starts directly on the Momenta detail page and shows the full current order through final image 05. Contact sheet: `tmp/momenta-clean-scroll-video-v1/momenta-clean-scroll-contact-v1.jpg`.
- User confirmed the temporary engineering labels in the order storyboard are acceptable as non-site QA artifacts and approved push/deploy as long as the two interactions are smooth and normal.
- Final pre-release QA passed locally: `npm run build`; Momenta detail has 13 media figures, 1 normal intro video, 2 scroll-driven image interactions, 0 sequence videos, 11 narrative notes, no forbidden visible text (`Li Bai`, `libai`, `Image 09`, `trust logic`, resource paths), no horizontal overflow, and no browser errors.
- The two interaction checks passed: the 03 -> 02 radial-wave sequence progresses `0.0000 -> 0.5190 -> 1.0000` and reverses to `0.0000`; the 11 -> 21 crossfade sequence progresses frame `1 -> 6 -> 11` and reverses to frame `1`.
- Runtime commit `116b95a` was pushed to GitHub `main`.
- Vercel production deployment `dpl_GbCizw6z9jJtJ69454UT8mTg6JRS` is `Ready` and aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Public QA against the fixed production URL passed with the same animation samples: radial-wave `0.0000 -> 0.5190 -> 1.0000 -> 0.0000`, crossfade frame `1 -> 6 -> 11 -> 1`, no forbidden visible text, no sequence videos, no horizontal overflow, and no browser errors.
- Status: deployed and verified.

# 2026-07-07 Momenta replaces Li Bai release QA

- User approved replacing the former `Li Bai Interactive Website` project with the software/app `Momenta` case and requested push/deploy.
- The green cover visual is preserved, but the live project now references `public/portfolio/momenta-green-cover.png`; visible title/copy/category are Momenta, not Li Bai.
- Local build passed with `npm run build`.
- Browser QA passed from the Work menu: `Momenta AI Music` opens the detail page, title is `Momenta AI Music Interaction`, page has no `Li Bai`/`李白`/`libai` residue, one intro video, two scroll-driven frame-sequence interactions, 23 Momenta images, and horizontal overflow `0`.
- `.vercelignore` now excludes old untracked `public/portfolio/libai-detail-*.png` and rejected temporary `public/portfolio/momenta-source-*` files so local Vercel deploys cannot accidentally upload them.
- Status: release approved locally; ready to push to GitHub and deploy to Vercel production.

# 2026-07-06 Momenta opening reveal speed and reverse preview v17

- Adjusted only the Momenta software 03 -> 02 opening reveal timing and short sequence scroll distance.
- The short radial-wave section height is now `128svh` on desktop (`132svh` on small screens), giving a measured desktop travel distance of `320px` at `1920x900`.
- The radial reveal curve now starts after `0.08` progress and completes by roughly `0.66`, using an ease-out curve so the colored final state opens quickly but still settles softly.
- Kept the sequence as image/CSS page interaction: no video controls, no sequence video element, and no new generated assets.
- Re-checked the 23 Momenta images: confirmed grouped interactions remain `03 -> 02` and `11 -> 21`; other images currently stay static to avoid inventing animations.
- Verification passed: `npm run build`; Playwright real-wheel QA shows the reveal reaches final state by the third down-wheel sample and reverses back to the wireframe state by the eighth up-wheel sample after scrolling below the section.
- Latest evidence:
  - `tmp/momenta-wave-sequence-v17-fast-reverse/01-before-wireframe.png`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/02-fast-wave-opening.png`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/03-final-colored.png`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/04-after-scroll-back.png`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/momenta-wave-fast-down-up.webm`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/video-contact-sheet.jpg`
  - `tmp/momenta-wave-sequence-v17-fast-reverse/metrics.json`
- Status: local preview only; not pushed and not deployed. Wait for user approval.

# 2026-07-06 Momenta narrative and scroll preview v7

- Updated only the Momenta software detail copy and one scoped caption rule.
- `momenta` now frames the case as an AI product loop: situation + emotion + memory inputs, AI composition, SwiftUI/native constraints, privacy/data trust boundaries, output timing, and restrained interface behavior.
- Kept the user-provided 23 finished 21:9 images unchanged: static images remain in PPT/source order and frames 11-21 remain the scroll-driven image sequence.
- Hid the technical `Scroll interaction frames` caption from the frame-sequence section.
- Verification passed: `npm run build`; Playwright confirmed start/mid/end active frames `1/6/11`, and wheel testing increased frames up to `11` then reversed back to `1`.
- Latest preview evidence:
  - `tmp/momenta-software-story-v7/01-hero-and-video-start.png`
  - `tmp/momenta-software-story-v7/02-first-narrative-note.png`
  - `tmp/momenta-software-story-v7/03-trust-and-data-note.png`
  - `tmp/momenta-software-story-v7/04-frame-sequence-start.png`
  - `tmp/momenta-software-story-v7/05-frame-sequence-mid.png`
  - `tmp/momenta-software-story-v7/06-frame-sequence-end.png`
  - `tmp/momenta-software-story-v7/momenta-scroll-down-up-preview.webm`
  - `tmp/momenta-software-story-v7/metrics.json`
- Status: local preview only; not pushed and not deployed. Wait for user approval.

# 2026-07-06 Momenta User-Provided 21:9 Assets Preview

- User provided the final Momenta software image/frame assets at `C:\Users\Yang\Desktop\作品集\旋转圆盘\momenta\软件`.
- Converted and connected 23 user-provided PNGs into `public/portfolio/momenta-software/momenta-software-01.webp` through `momenta-software-23.webp`.
- Current Momenta software detail order: confirmed intro video first, static 21:9 visuals in source/PPT order, a scroll-driven frame-sequence section built from frames 11-21, then final static visuals.
- The frame-sequence section is not a video player: it has no controls and switches images based on page scroll.
- Sticky positioning failed inside the current page/scroll structure, so the implementation now uses explicit `before / active / after` states: the frame sequence is fixed below the header while active, then released at the end.
- Verification passed: `npm run build`; Playwright confirmed 11 frames, no browser errors, and the frame layer remains fixed at `top=68` / `bottom=900` at start, middle, and end.
- Latest preview evidence:
  - `tmp/momenta-software-final-assets-preview-v4/01-momenta-detail-video-first.png`
  - `tmp/momenta-software-final-assets-preview-v4/02-momenta-first-static-image.png`
  - `tmp/momenta-software-final-assets-preview-v4/03-frame-sequence-start.png`
  - `tmp/momenta-software-final-assets-preview-v4/04-frame-sequence-mid.png`
  - `tmp/momenta-software-final-assets-preview-v4/05-frame-sequence-end.png`
  - `tmp/momenta-software-final-assets-preview-v4/momenta-frame-sequence-scroll-preview.webm`
- Status: local preview only; not pushed and not deployed. Wait for user approval.

# 2026-07-06 Momenta Image2 correction state

- User corrected the Momenta direction again: static PPT/source visuals must be Image2-expanded to true 21:9 / 4K while preserving the original PPT composition, not simply placed inside a 21:9 frame.
- The visible video-control problem has been addressed for the PPT interaction section: it now uses a `scrollVideo` gallery type with no controls and scroll-mapped playback.
- Removed the rejected static `momenta-source-01..06.webp` references from the Momenta detail gallery so those visuals are not treated as final.
- Current local gallery state for `momenta`: confirmed intro video first, then the source-derived scroll interaction motion only. The real Image2-expanded still sequence is pending.
- Build passed after the correction. Playwright verified the scroll interaction has no controls and changes frame with scroll.
- Blocker: local `OPENAI_API_KEY` is missing, so real Image2/outpaint generation cannot honestly be completed yet.
- Status: local only; not pushed and not deployed.

# 2026-07-06 Momenta source-preserving preview v2

- Rebuilt the Momenta software detail page preview from original source assets, not generated/recomposed images.
- Static page visuals now come from selected original PPT/Keynote/final-render/process screenshots and are exported to `3840x1646` 21:9 WebP assets.
- Original animation/video clips were converted to browser-safe 21:9 H.264 page assets: `momenta-source-light.mp4` and `momenta-source-photo-sequence.mp4`.
- `ProjectDetail` now supports mixed gallery entries (`image` and `video`) while keeping old string-only galleries compatible.
- Momenta software detail order is: confirmed intro video first, then source app system render, prototype render, Light animation, Memory/Share render, capture animation, native implementation/process images, and short explanatory text between sections.
- Verification passed: `npm run build`; all new Momenta source assets were measured at `3840x1646`; Playwright generated local screenshot/video evidence.
- Latest evidence for user approval:
  - `tmp/momenta-source-preserving-preview/momenta-detail-top.png`
  - `tmp/momenta-source-preserving-preview/momenta-detail-intro-video.png`
  - `tmp/momenta-source-preserving-preview/momenta-source-overview-clean.png`
  - `tmp/momenta-source-preserving-preview/momenta-software-preview.mp4`
- Status: local preview only; not pushed and not deployed.

# 2026-07-06 Momenta source-preserving correction

- User clarified that the previous Momenta preview direction was wrong: do not recreate new 21:9 images from PPT/PDF material, and do not redesign/recompose the visuals.
- Correct requirement: use original PPT/PDF/Keynote slide/page content, reframe/export it to 21:9 4K while preserving content, and preserve or faithfully reconstruct original continuous animations.
- Local cleanup completed:
  - `momenta` no longer references the generated `momenta-software-01..06.webp` assets.
  - Daima/Momenta temporary cover now uses existing source-backed `momenta-phone-wall.jpg` instead of the generated `momenta-software-daima-cover.webp`.
  - The generated Momenta WebP files were removed from `public/portfolio`.
  - The H.264 intro video remains because it is the user-confirmed intro video transcode.
- Next step is source audit and preview rebuild from `Slide.key`, local `Momenta Keynote.key`, Drive animation/video folders, UI/prototype/final render folders, and relevant PDFs only.
- Status: local cleanup only; not pushed and not deployed.

# 2026-07-06 Momenta software source audit for Li Bai replacement

- User changed direction: the Li Bai Interactive Website module should be replaced by the software/app Momenta project, not the `momenta-touch` hardware project.
- No formal page replacement has been made yet. Current work is source discovery only.
- Local source folder found: `C:\Users\Yang\Desktop\semester1\COMP5571-周一早\final project`.
- Key local files found in `文档`: `Momenta Keynote.key`, `PROGRESS REPORT.pdf`, `Lin Yang_25124747G.pdf`, `one more thing.pdf`, plus PRD/reflection/task/speech DOCX files.
- Preview sheets generated:
  - `tmp/momenta-materials-audit/keynote-preview/keynote-media-contact-sheet.png`
  - `tmp/momenta-materials-audit/pdf-preview/PROGRESS REPORT-contact-sheet.jpg`
  - `tmp/momenta-materials-audit/pdf-preview/Lin Yang_25124747G-contact-sheet.jpg`
  - `tmp/momenta-materials-audit/pdf-preview/one more thing-contact-sheet.jpg`
  - `tmp/momenta-materials-audit/github-preview/github-image-contact-sheet.jpg`
- Public GitHub source `https://github.com/JosicZhou/MOMENTA` was cloned into `tmp/momenta-materials-audit/JosicZhou-MOMENTA`. It is a SwiftUI/iOS software project with Memories, Light, Share, Profile, Supabase, Suno, OpenAI lyrics, HealthKit, WeatherKit, widgets, and Live Activity code.
- Initial broad Google Drive searches did not find Momenta because the shared material uses generic file names rather than `Momenta`.
- User provided the exact Drive folder `https://drive.google.com/drive/folders/1IEVOmJeBydTla_2sIqyGa0j6Cmi2hwr3`; listing it directly found `Slide.key` (443.7 MB), plus folders for prototype images, UI images, final renders, videos, and animation clips.
- Status: ready to show the user source previews and ask which source set should drive the replacement design before editing the website.

# 2026-07-06 Li Bai detail white 21:9 gallery

- User asked the Li Bai detail page media section to stop showing a black stage around the website screenshots and instead use a white, full-width 21:9 presentation.
- Source search:
  - GitHub checked: `1849083010n-cell/libaifinal.github.io`, `Yang-lab1/CHC-final`, and `seblee424/libai_emotin_data`; no PPT/PDF was found.
  - Google Drive checked after connector reinstall: no Li Bai final PPT/PDF/Slides found. Search hits were unrelated CHC5904 XI YOU JI files, CBS5504 TCM final PPT, and older design decks.
  - Local `C:\Users\Yang\Desktop\semester1\CHC5904-周二下午\final project` checked; after excluding user-rejected `data.pdf` and the two `总结-大结论` Word files, no PPT/PDF/Keynote deck was found.
- User explicitly rejected adding screenshots of `关于我们 / 成员组成` and `诗仙生平`; those pages are not included in the live gallery.
- Local implementation updates `libai.gallery` to six selected 3840x1646 PNG captures from the source Li Bai site: home, emotion map, emotion stats, network, footprint, and drink.
- CSS scope is limited to `.detail-media-project-libai`: white background, full-width 21:9 figures, no black stage; first digital media keeps the existing perspective/flatten transform.
- Verification passed: `npm run build`; local Playwright QA confirmed 6 images, all `3840x1646`, white background, and horizontal overflow `0`.
- Latest evidence for user approval: `tmp/libai-detail-white-v1/libai-first-media-white.png`, `tmp/libai-detail-white-v1/libai-gallery-lower-white.png`, and `tmp/libai-detail-white-v1/libai-detail-scroll-white.webm`.
- Status: local only; not pushed and not deployed. Wait for user visual approval.

# 2026-07-05 Product Showcase card/image morph

- User clarified that the Product Showcase three-card carousel should not only skew/clip the outer card frame; the image itself should morph with the frame as a side card moves into the front position.
- Local code change keeps the existing carousel structure, project data, click behavior, drag behavior, and mobile fallback unchanged.
- The side-card visual state is now driven by one continuous progress value: clip path, shallow `rotateY`, depth, image padding, and image scale all interpolate together.
- Removed the abrupt side-card image override that forced `contain` images to switch to `cover`; contain assets now keep stable fitting while padding eases between side and front states.
- Verification passed: `npm run build`; desktop Playwright screenshots/video generated; mobile QA confirmed one visible card, horizontal overflow `0`, and error count `0`.
- The first click-to-change proof video was not clear enough for the user, so a slow-drag proof pass was generated. An intermediate mouse-event recording attempt failed to move the carousel and should not be used as evidence; the final v4 proof uses direct pointer events and records real continuous card movement.
- Latest evidence:
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-normal-v4.webm`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-guide-v4.webm`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-guide-frame-00.png`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-guide-frame-02.png`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-guide-frame-04.png`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-guide-frame-06.png`
  - `tmp/product-orbit-slow-drag-v4/product-orbit-slow-drag-metrics-v4.json`
- User approved the v4 slow-drag proof and requested push/deploy.
- GitHub push completed with runtime commit `ce87990`.
- Vercel production deployment completed: `dpl_9DtW7Tk77UjdB6BUaP1if4kVR3HE`, aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Vercel inspect reports target `production`, status `Ready`, and aliases include the fixed production URL.
- Status: complete and deployed.

# 2026-07-05 About metrics bottom transition cleanup

- User flagged that the bottom of the metric cards also needs to be handled: the area below the cards had a subtle gray horizontal glow before the next dark intro text.
- Local CSS change removed the lower radial glow from `.achievement-section` while preserving the card styling, the no-glow top transition, and the dark module intro below.
- Verification passed: `npm run build`; local browser screenshots generated at `tmp/about-metrics-bottom-clean-v1/about-metrics-bottom-clean-v1.png` and `tmp/about-metrics-bottom-clean-v1/about-metrics-bottom-clean-match-user-v1.png`; horizontal overflow is `0`.
- GitHub push completed with commit `40aa540`.
- Vercel production deployment completed: `dpl_ESPAPb6wNsNrW3SFTHBFjxFVD86W`, aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Public QA passed on the fixed production URL: deployed CSS asset is `index-BeFfQURw.css`, transition screenshot is `tmp/about-metrics-bottom-clean-production/about-metrics-bottom-clean-production.png`, horizontal overflow is `0`, and browser error count is `0`.
- Status: complete and deployed.

# 2026-07-05 About intro to metrics black transition

- User flagged two visible horizontal seams between the black About portrait intro and the black metric cards.
- User then decided not to keep the additional lamp/glow treatment, and approved returning to the cleaner no-glow transition shown in the provided screenshot.
- Minimal local CSS fix: keep the extended About intro bottom fade, metrics-section `1px` overlap, and softened top edge; remove the added radial lamp layer from the transition overlay.
- Verification passed: `npm run build`; local browser screenshot generated at `tmp/about-transition-no-glow-final/about-transition-no-glow-final.png`; horizontal overflow is `0`.
- GitHub push completed with runtime commit `7e133e3`.
- Vercel production deployment completed: `dpl_FhXX9Zf7QXtn8j3MFshtf4EUUEZ1`, aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Public QA passed on the fixed production URL: deployed CSS asset is `index-Z0S6uCY2.css`, transition screenshot is `tmp/about-transition-no-glow-production-final/about-transition-no-glow-production-final.png`, horizontal overflow is `0`, and browser error count is `0`.
- Status: complete and deployed.

# 2026-07-04 About portrait intro

- User approved the Option 02 / Cinematic Offset direction and selected the discrete/hidden-order copy direction.
- Implemented the new About intro section on the real homepage, placed between the Hero and the existing metric cards.
- Added optimized portrait asset `public/portfolio/yang-lin-portrait.webp` from the user-provided portrait.
- `About / 关于` now scrolls to the new portrait intro section (`#about`); the existing metrics block remains directly below as `#about-metrics`.
- Copy is single-language by site language state:
  - EN: `I look for hidden order in behavior, technology, and form, / then shape it into usable products.`
  - ZH: `我寻找行为、技术与形态中的隐藏秩序，/ 并把它转化为可用的产品。`
- Verification passed locally: `npm run build`; browser QA confirmed two-line EN/ZH text, right-edge alignment, `42px` name-to-copy gap, loaded portrait, final CountUp metrics, and no horizontal overflow on desktop/mobile.
- Latest local evidence: `tmp/about-intro-final/about-intro-en-final.png`, `tmp/about-intro-final/about-intro-zh-desktop.png`, `tmp/about-intro-final/about-intro-mobile.png`, and metrics JSON.
- Status: user approved push/deploy; GitHub push and Vercel production deployment are the next step.

# 2026-07-04 Product Language orbit wheel smoothness

- User asked for the bottom Product Language orbit to respond faster and more smoothly to mouse-wheel rotation.
- Local-only code change in `src/main.jsx` keeps the current wheel capture boundary unchanged: only visible orbit cards and their nearby area capture the wheel; blank areas still scroll the page normally.
- Wheel input now accumulates into a target orbit offset, so repeated/fast wheel gestures keep their full momentum instead of being clipped by the previous in-progress tween.
- Desktop wheel movement scale increased from `0.01` to `0.018`, per-event clamp increased from `300` to `520`, and easing changed to a slightly longer `power3.out` tween for smoother motion. Mobile uses a lighter `0.014` scale with a `380` clamp.
- Verification passed: `npm run build`; local browser QA at `1920x900` recorded screenshot/video evidence.
- QA metrics: visible orbit cards `7`; active label changed from `Opera` to `Xiaomi` after four wheel ticks on a visible image; image-wheel page scroll delta stayed `0`; blank-area wheel scroll delta was `647px`; page errors `0`.
- Latest evidence: `tmp/product-orbit-wheel-smoothness-v1/orbit-wheel-before-v1.png`, `tmp/product-orbit-wheel-smoothness-v1/orbit-wheel-after-v1.png`, `tmp/product-orbit-wheel-smoothness-v1/orbit-wheel-smoothness-v1.webm`, and `tmp/product-orbit-wheel-smoothness-v1/orbit-wheel-smoothness-metrics-v1.json`.
- User confirmed the preview and approved push/deploy.
- GitHub push completed with commit `e2626e6`.
- Vercel production deployment completed: `dpl_HjAaBjXamBhiiymJMKjwRvFXkZ6Z`, aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Public QA passed on the fixed production URL: visible orbit cards `7`, active label changed from `Opera` to `Xiaomi`, image-wheel page scroll delta `0`, blank-area wheel scroll delta `647px`, page errors `0`.
- Status: complete and deployed.

# 2026-07-04 detail page bottom module removal

- User asked to remove the bottom “title/headline + four numbered cards” module from every detail page.
- Local code change removes the shared `case-study-section` render from `ProjectDetail`.
- Scope guard: keep detail media, live-link bridge, project data, and bottom work showcase unchanged.
- Verification passed: `npm run build`; local browser QA shows `caseSection=0`, `caseCards=0`, and the old Cup’s Cup card labels are absent.
- Latest screenshots: `tmp/detail-bottom-module-removal-v1/cup-cup-boundary-after-removal.png` and `tmp/detail-bottom-module-removal-v1/cup-cup-bottom-after-removal.png`.
- User confirmed the screenshot and approved push/deploy.
- Important scope: this is a shared detail-template removal, not a Cup’s Cup-only removal; future projects using `ProjectDetail` should not show the removed module.
- GitHub push completed with commit `b9bd5c6`.
- Vercel production deployment completed: `dpl_GBif3EoDZ66sC7ycQSghvk4qXpTe`, aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Public QA passed: homepage returned `200 OK`; deployed Cup’s Cup detail page reports `caseSection=0`, `caseCards=0`, and no old card labels.
- Status: complete and deployed.

# 2026-07-04 Work mega menu typography step-down

- User said the Work dropdown text still feels too large and asked to shrink the latest version by another half step.
- Local-only change: reduced Work menu category headings to about `10.5px` at `1920x900`, and project names to about `16.5px`.
- Scope guard: do not change the approved dark translucent menu, six-column layout, project routing, hover dimming, text-near hitbox, or blank-click close rule.
- Verification passed: `npm run build`; Playwright local screenshot/metrics confirmed heading font `10.496px`, item font `16.512px`, column-gap hover `null`, near-text hover `Pai Li Shi`, and top blank click closes the menu.
- Latest evidence: `tmp/work-menu-font-v2/work-menu-font-open-v2.png`, `tmp/work-menu-font-v2/work-menu-font-hover-v2.png`, and `tmp/work-menu-font-v2/work-menu-font-metrics-v2.json`.
- Status: user approved this v2 typography; ready for GitHub push and Vercel production deployment.

# 2026-07-04 Work mega menu hitbox and close-rule refinement

- User clarified that project hover should trigger only when the cursor is on or very near a project name, not across the whole row, whole column, or column-gap area.
- User also clarified that after the Work dropdown opens, every click outside a project text hot area should close the menu; only clicking a project should navigate to detail.
- Local code changes:
  - menu root now closes on any non-project click;
  - project buttons stop propagation and keep the existing detail opener;
  - project item hitboxes changed from full-width rows to fit-content text buttons with a small invisible `3px 6px` near-text perimeter.
- Verification passed:
  - `npm run build`
  - local Playwright QA for column-gap hover, same-row blank hover, near-text hover, top blank close, heading close, lower-page close, and project click-through.
- Latest evidence:
  - `tmp/work-menu-hitbox-v1/work-menu-hitbox-open-v1.png`
  - `tmp/work-menu-hitbox-v1/work-menu-hitbox-hover-v1.png`
  - `tmp/work-menu-hitbox-v1/work-menu-hitbox-project-click-v1.png`
  - `tmp/work-menu-hitbox-v1/work-menu-hitbox-interaction-v1.webm`
  - `tmp/work-menu-hitbox-v1/work-menu-hitbox-metrics-v1.json`
- Key metrics at 1920x900: column gap hover `null`, same-row blank hover `null`, near-text hover `Pai Li Shi`, top blank/heading/lower-page clicks all close the menu, and `Pai Li Shi` click opens its detail page.
- Status: user approved publishing; ready for GitHub push and Vercel production deployment.

# 2026-07-04 Work mega menu real project wiring

- User approved the dark translucent v5 Work menu visual direction and asked to continue.
- Replaced the `XXX` placeholders with real existing project entries under the six approved categories.
- Used real project short names in the menu so the larger approved typography stays readable and the panel remains exactly about `40%` viewport height.
- Project clicks now use the existing `openProject` detail-page flow; clicking `Pai Li Shi` opened its detail page and closed the menu.
- Verification passed:
  - `npm run build`
  - local Playwright screenshot, hover screenshot, and click-through recording
- Latest evidence:
  - `tmp/work-menu-real-preview-v7.png`
  - `tmp/work-menu-real-hover-v7.png`
  - `tmp/work-menu-real-hover-click-v7.webm`
  - `tmp/work-menu-real-v7-metrics.json`
- Metrics at 1920x900: panel height `360` (`40%` viewport), grid left/right margin `64/64`, 6 columns, each column `262px`, all gaps `44px`, 24 real project items, `hasXXX=false`, heading top `155px`, first item top `183px`, item font `18.88px`, hover opacity `1`, dimmed opacity `0.18`, project-click leaves menu closed.
- Status: local only; not pushed and not deployed. Waiting for user visual approval before publishing.

# 2026-07-04 Work mega menu dark visual adjustment

- User selected the first/dark translucent Work menu direction.
- Adjusted the local Work mega menu draft only:
  - moved the menu content lower by increasing the top padding;
  - changed the six-column grid from centered max-width to full available width;
  - reduced horizontal padding and column gaps so left/right margins are balanced;
  - kept all project entries as `XXX` placeholders.
- Fixed duplicate React keys for repeated `XXX` placeholders by keying with category id and index.
- Verification passed:
  - `npm run build`
  - local Playwright screenshot and open/close recording
- Latest evidence:
  - `tmp/work-menu-dark-preview-v5.png`
  - `tmp/work-menu-dark-hover-v5.png`
  - `tmp/work-menu-dark-hover-open-close-v5.webm`
- Metrics at 1920x900: panel height `360`, grid left/right margin `64/64`, 6 columns, each column `262px`, all gaps `44px`, directory heading top `155px`, project item top `183px`, heading font `12.288px` / weight `480`, item font `18.88px` / weight `800`, unique item text `XXX`, hovered opacity `1`, dimmed opacity `0.18`, close-on-lower-area click works.
- Status: local only; not pushed and not deployed. Waiting for user visual approval before any commit, upload, deployment, real project data, or detail-link wiring.

# 2026-07-03 Pai Li Shi AWSMD motion direction correction

- User asked to compare the interaction against AWSMD frame-by-frame: the side app screenshots should move upward while the hand/phone reaches the lower end position instead of drifting upward.
- Corrected the Pai Li Shi showcase hand motion from a slight upward movement to a downward scroll-linked movement. The side background wall remains upward-moving.
- Kept the measured phone aperture and horizontal center lock unchanged; the center screen still aligns to the measured phone opening rather than finger edges.
- Verification passed:
  - `node tmp\verify-palifood-continuous-wall.mjs`
  - `npm run build`
- Latest evidence:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/02-mid.png`
  - `tmp/palifood-continuous-wall-qa/03-late.png`
  - `tmp/palifood-continuous-wall-qa/06-continuous-wall-scroll.webm`
- Status: local only; not pushed or deployed. Waiting for user visual approval.

# 2026-07-03 Pai Li Shi result-background recapture

- User flagged the right-side `Result / 生成结果` background card as looking cropped/enlarged versus the other seven P2 app screenshots.
- Re-captured the local P2 runtime result page (`艺术的诞生`) at a true mobile frame and replaced `public/portfolio/palifood-showcase/p2-right-top-result.webp` with a normalized `430x940` WebP.
- Kept the four-column background system unchanged: 4 columns, 32 repeated complete app screenshots, shared rendered card width, gap, and radius.
- Verification passed:
  - `node tmp\verify-palifood-continuous-wall.mjs`
  - `npm run build`
- Latest evidence:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/32-result-recapture-before-after.png`
- Status: local only; not pushed or deployed. Wait for user screenshot approval.

# 2026-07-03 Pai Li Shi edge-fill and smoothness pass

- Followed up on the user's latest comments: scroll should feel smoother, the lower-left second screenshot should fill better, and far left/right edge gaps should be removed.
- Kept the existing four-column real-app-screenshot layout. Only adjusted the Pai Li Shi showcase:
  - `ScrollTrigger` scrub changed to `0.42`.
  - Removed heavy moving-column filter and card shadow.
  - Clipped only the viewport-facing outer card corners to remove edge holes while keeping interior rounded cards.
  - Lightly edge-filled `p2-left-bottom-generation.webp`; backup saved at `tmp/palifood-continuous-wall-qa/p2-left-bottom-generation-before-edge-fill.webp`.
- Verification passed:
  - `node tmp\verify-palifood-continuous-wall.mjs`
  - `npm run build`
- Latest evidence:
  - `tmp/palifood-continuous-wall-qa/01-entry.png`
  - `tmp/palifood-continuous-wall-qa/02-mid.png`
  - `tmp/palifood-continuous-wall-qa/03-late.png`
  - `tmp/palifood-continuous-wall-qa/06-continuous-wall-scroll.webm`
- Status: local only; not pushed or deployed. Wait for user visual approval.

# Session: 2026-07-03 Pai Li Shi v2 Hand Image and Four-Column App Screens
- **Status:** local QA done; waiting for user visual approval. Not pushed and not deployed.
- User provided a clearer replacement hand image at `C:\Users\Yang\AppData\Local\Temp\codex-clipboard-d21b0018-e009-46e4-b1bb-229e47d3d68c.png`.
- Fix applied:
  - Replaced `public/portfolio/palifood-showcase/hand-user-black-mask.png` with the new hand image while preserving the existing `1817x866` coordinate system.
  - Normalized the new source from `1818x865` to `1817x866` so the center screen content and measured aperture do not shift.
  - Kept the transparent screen aperture and DOM screen target at `x=714`, `y=28`, `w=354`, `h=731`.
  - Replaced the side background from stitched wall images to four real app-screen columns rendered in DOM: 4 columns, 32 repeated full app screenshots, equal card size, equal radius, equal gap.
  - Added a subtle inner glass edge on the center phone screen.
  - Re-aligned the four app-screen background columns so the outer columns land exactly on the viewport edges instead of being pushed outside and cropped.
  - Measured the AWSMD reference at the same viewport and tightened the side app-screen geometry to reference-like proportions: `360px` rendered card width and `24px` rendered column gap at `1920x900`.
  - Reduced the center hand layer's old header safety offset so the phone sits higher like the reference; latest screen top range is about `34px` to `49px` across the scroll states.
- Verification:
  - `npm run build` passed.
  - `node tmp\verify-palifood-continuous-wall.mjs` passed.
  - Latest metrics: `.palifood-background-wall=0`, `.palifood-background-column=4`, `.palifood-background-screen=32`, first column `x=0`, fourth column `right=1920`, card width `360px`, column gap `24px`, center screen top `34px-49px`, center screen delta about `0px`, horizontal overflow `0`.
- Latest evidence:
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\01-entry.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\02-mid.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\03-late.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\24-entry-left-wall-clean-check.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\25-reference-vs-current-edge-aligned.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\26-reference-vs-current-measured-360-24.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\27-reference-vs-current-raised-phone.png`
  - `C:\Users\Yang\Documents\New project\portfolio-site\tmp\palifood-continuous-wall-qa\20-v2-hand-left-edge-entry.png`

# Session: 2026-07-03 Pai Li Shi Pink-Frame Center Alignment
- **Status:** local QA done; waiting for user visual approval. Not pushed and not deployed.
- User correction:
  - The center phone content must align to the pink/red phone body frame, not the transparent visible aperture, because the left finger hides part of the real screen.
  - The screen content should keep a realistic black bezel inside the pink phone frame on all four sides.
- Actions completed:
  - Measured `hand-user-black-mask.png` (`1817x866`) and set the source-of-truth frame to pink/front phone frame `x=700..1081`, `y=14..772`.
  - Recut the PNG transparent screen opening itself from `x=720..1073,y=35..765` to `x=714..1067,y=28..758`, so the opening is centered inside the pink phone frame instead of visually drifting right/down.
  - Updated the final inner content frame to `x=714`, `y=28`, `w=354`, `h=731`, giving rendered margins of about `14px / 13px / 14px / 13px` inside the pink phone frame at `1920x900`.
  - Regenerated the three center onboarding images to no-crop `354x731` CSS pixels, saved at `708x1462` WebP.
  - Recentered the dynamic island overlay to the same phone centerline.
  - Regenerated left/right continuous background walls with real P2 app screenshots, `430x940` cards, `54px` rounded corners, `54px` gaps, subtle borders, and black background.
  - Follow-up display tuning: kept the same continuous wall assets (`892x4860`) and slightly brightened the wall filter while reducing the dark overlay so the real app screenshots read less like broken black seams.
- Verification:
  - `npm run build` passed.
  - Playwright screenshot QA regenerated:
    - `tmp/palifood-continuous-wall-qa/01-entry.png`
    - `tmp/palifood-continuous-wall-qa/02-mid.png`
    - `tmp/palifood-continuous-wall-qa/03-late.png`
    - `tmp/palifood-continuous-wall-qa/17-center-frame-proof.png`
  - Metrics show `.palifood-background-wall` count `2`, wall natural size `914x3922`, center frame target-vs-actual delta about `0px`, and horizontal overflow `0`.

# Session: 2026-07-02 Pai Li Shi Staggered Continuous App Walls
- **Status:** local QA done; waiting for user visual approval. Not pushed and not deployed.
- User correction:
  - The side background should not read as disconnected single pictures or broken rows.
  - The side background images must be real App-sized screenshots like the AWSMD reference.
- Actions completed:
  - Regenerated left/right wall assets as staggered continuous two-column walls using real P2 full-screen App screenshots.
  - Each screenshot card is normalized to `430x940`, clipped to `54px` radius, and spaced by `54px`.
  - The second column is offset by half a card period (`497px`) so horizontal gaps do not align into full-width visual breaks.
  - Reduced the showcase dark overlay and brightened the wall display so the App screenshot cards remain readable on black.
- Verification:
  - `npm run build` passed.
  - Playwright QA regenerated `01-entry.png`, `02-mid.png`, `03-late.png`, and `10-reference-vs-current-brighter-staggered-wall.png`.
  - Latest metrics: `.palifood-background-wall=2`, `.palifood-background-column=0`, `.palifood-background-screen=0`, wall natural size `914x4970`, center screen delta about `0px`, `overflowX=0`.

# Session: 2026-07-02 Pai Li Shi Reference-Like Wall Gap
- **Status:** local QA done; waiting for user visual approval. Not pushed and not deployed.
- User correction being addressed:
  - Side walls should not have visible break/seam feeling.
  - The side background must remain app-sized screenshots like the AWSMD reference.
- Actions completed:
  - Regenerated the continuous wall assets again with smaller reference-like seams: natural gap `32px`, radius `42px`, wall size `892x4860`.
  - Restored `.palifood-showcase-stage` card gap token to `clamp(28px, 1.7vw, 36px)`.
  - Kept the user-provided black-screen hand image and measured center phone frame unchanged.
- Verification:
  - `npm run build` passed.
  - Playwright QA regenerated `01-entry.png`, `02-mid.png`, `03-late.png`, and `11-reference-vs-current-measured-gap-wall.png`.
  - Latest metrics: `.palifood-background-wall=2`, old background DOM nodes `0`, wall natural size `892x4860`, rendered app-card width about `363px`, rendered gap about `27px`, center screen delta about `0px`, `overflowX=0`.

# Progress Log

## Session: 2026-07-02 Pai Li Shi Black Background + Center Aperture Fit
- **Status:** local QA done; waiting for user visual approval. Not pushed and not deployed.
- User direction:
  - Revert the white-background trial back to black.
  - Fix the center phone animation by aligning it to the real phone opening, even if that requires remaking the three center images.
- Actions completed:
  - Restored the Pai Li Shi AWSMD-style showcase background to black.
  - Kept the side background as real full P2 app screenshots in equal rounded phone-card columns.
  - Rebuilt the three center onboarding slides to match the measured phone aperture ratio: `354x731`.
  - Updated the center slider to use those new aperture-fit assets and fill the aperture exactly instead of vertically cropping `430x940` screenshots.
- Verification:
  - `npm run build` passed.
  - Playwright screenshots regenerated:
    - `tmp/palifood-continuous-wall-qa/01-entry.png`
    - `tmp/palifood-continuous-wall-qa/02-mid.png`
    - `tmp/palifood-continuous-wall-qa/03-late.png`
    - `tmp/palifood-continuous-wall-qa/04-center-fit-overlay-red-aperture-green-slide.png`
  - Metrics show center slide natural size `354x731`, vertical crop `0px`, aperture delta about `0.016px`, and horizontal overflow `0`.
  - Follow-up QA added a safe vertical hand offset so the fixed header no longer covers the center phone top; the captured aperture top positions are about `84px`, `77px`, and `69px`.
  - Latest comparison pass slightly brightened the black-background app screenshot columns and reduced the overlay strength so the rounded full-phone screenshots read more clearly against the black stage.
  - Latest source-spacing pass tightened the background screenshot columns to source-like geometry: `360px` card width and about `32.64px` card gap at the `1920x900` QA viewport, with `overflowX=0`.

## Session: 2026-07-01 Orbit Speed, Blank Scroll Boundary, and Duplicate Entry Fix
- **Status:** complete locally; publishing through GitHub/Vercel.
- User direction:
  - Make the Product Language circular orbit rotate as quickly as the earlier feel.
  - Let wheel input over the screenshot-marked blank areas continue scrolling down to the black footer.
  - Remove the duplicate adjacent M-looking orbit entry and keep the left entry from the user's supplied file.
- Actions completed:
  - Removed `capstone-device` from `expansionCards` only; the project record/assets remain in the portfolio.
  - Kept `miro-hardware` as the single M hardware orbit entry.
  - Narrowed orbit wheel capture from the broad ellipse to visible `.expansion-card` bounds plus a small padding, ignoring invisible cards.
  - Removed the old `progressState.value < 0.34` gate so visible cards can take wheel input as soon as they are actually under the cursor.
  - Increased wheel response by raising the delta scale from `0.006` to `0.01`, the clamp from `240` to `300`, and shortening the tween from `0.42s` to `0.26s`.
- Verification:
  - `npm run build` passed.
  - Desktop local production check at `1920x900`: 8 orbit cards, 8/8 images loaded, no `capstone-device`, `overflowX=0`.
  - Desktop wheel QA: wheel over a visible card rotated the orbit with `scrollY` unchanged; left blank, right blank, and bottom text/blank coordinates all resumed normal page scrolling.
  - Mobile smoke at `390x844`: 8 cards, 8/8 orbit images load near the section, `overflowX=0`.

## Session: 2026-07-01 Cup's Cup Orbit Assets + Wheel Capture
- **Status:** complete locally; publishing through GitHub/Vercel.
- User direction:
  - Make the Product Language orbit images appear fast enough when scrolling quickly into the section.
  - Update the circular orbit with the supplied Cup's Cup folder at `C:\Users\Yang\Desktop\作品集\旋转圆盘\cup‘s cup`.
  - When the cursor is over the orbit image/outer orbit area, mouse-wheel input should keep rotating the orbit instead of continuing page scroll; page scroll should resume only after the cursor leaves that orbit area.
- Actions completed:
  - Copied the supplied Cup's Cup square image and eight detail images into `public/portfolio`.
  - Regenerated `/portfolio/cup-cup-orbit-fast.webp` from the new square image.
  - Updated the `cup-cup` project to use the new square cover and eight detail images, while leaving the existing image-wall card unchanged.
  - Moved `expansionCards` images earlier in the homepage warmup list and added a matching orbit-component 650ms early prefetch path for orbit blobs.
  - Added wheel capture for the lower orbit/image area once the Product Language section reaches the orbit phase, so wheel input rotates the orbit while keeping page scroll locked inside that zone.
- Verification:
  - `npm run build` passed.
  - Desktop local production check at `1440x1100`: after about 3.2s, 9 orbit image fetches were already observed; fast scroll into the orbit showed 9 cards, 9/9 images loaded, natural widths `640`, and `overflowX=0`.
  - Desktop wheel QA: wheel inside the orbit kept `scrollY` fixed while changing the active orbit card; wheel over the top blank area resumed normal page scrolling.
  - Cup's Cup detail QA: clicking the orbit card opened `The Cup's Cup`, rendered 8 detail media items, and all 8 used the wide-frame detail class.
  - Mobile local production check at `390x844`: 9/9 orbit images loaded, `overflowX=0`, Cup's Cup detail rendered 8 media items, and no console errors were captured.

## Session: 2026-07-01 Watsu Product Language Orbit
- **Status:** complete; publishing through GitHub/Vercel.
- User direction:
  - Check whether `C:\Users\Yang\Desktop\作品集\旋转圆盘\watsu` had already been added to the circular Product Language orbit.
  - If it was missing, add it without rewriting the existing React + Vite + CSS + GSAP structure.
- Actions completed:
  - Confirmed `cross-ripple` / Watsu already existed in the project data and detail media, with assets copied into `public/portfolio`.
  - Confirmed Watsu was missing from `expansionCards`, so it did not appear in the final circular orbit.
  - Generated `/portfolio/watsu-orbit-fast.webp` as a 640x640 lightweight WebP orbit image from the existing Watsu square image.
  - Added Watsu to `expansionCards` as `id: 'watsu'`, `projectId: 'cross-ripple'`, label `Watsu`, preserving the current orbit geometry, click behavior, GSAP scroll behavior, and blob prefetch path.
- Verification:
  - `npm run build` passed.
  - Desktop local production check at `1440x1200`: 9 orbit cards, 9/9 orbit images loaded, natural widths `640`, `overflowX=0`, console errors empty, and Watsu click opened the Cross-ripple detail media.
  - Mobile local production check at `390x844`: 9 orbit cards, 9/9 orbit images loaded, natural widths `640`, `overflowX=0`, console errors empty.

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
  - Changed the Product Language orbit to mount image nodes only when the section approaches the viewport, using same-origin fetched blob URLs when available.
  - Preserved the existing image sources, orbit geometry, copy, click targets, drag behavior, GSAP scroll behavior, and detail-page data.
- Verification:
  - `npm run build` passed.
  - Desktop local production check at `1440x1100`: initial orbit image nodes are not mounted; after idle blob prefetch and entering the orbit section, `orbitLoaded=8/8`, `overflowX=0`, and console messages are empty.
  - Mobile local production check at `390x844`: initial orbit image nodes are not mounted; near the orbit section, `orbitLoaded=8/8`, `overflowX=0`, and console messages are empty.
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
## 2026-07-01 拍立食详情页滚动交互
- 已完成 AWSMD 参考式滚动展示段：左右素材列随滚动上移，中心手机内的拍立食界面按进度切换。
- 已从 Instant-Food 仓库提取项目界面和食物背景素材，生成 `public/portfolio/palifood-showcase/` 下的 WebP 资源。
- 已按用户最新要求排除绿色手持手机图，不把它用于该交互。
- 已通过生产构建、桌面端 Playwright 滚动验证、移动端响应式验证。
- 未执行推送或 Vercel 部署，等待用户确认是否发布。
## 2026-07-02 拍立食滚动交互纠偏
- 已确认上一批英文/GASTRONOMIA App 截图属于错误旧版本，不再作为背景候选。
- 已从用户提供的本地 `C:\Users\Yang\Desktop\拍立食\frontend\p2\` 版本抓取真实 A-L 手机整屏截图候选。
- 已新增 `docs/research/palifood-awsmd-scroll-showcase-spec.md`，明确左右背景必须是用户确认过的整屏 App 截图，且不能再使用零散食物图或旧英文原型。
- 用户已确认中心 C、左上 D/E、左下 G/H、右上 I/J、右下 K/L；已接入拍立食详情页滚动交互。
- 已按用户最新反馈重做两侧背景布局：从散点式上下四组改为四条等宽竖列，D/G、E/H、I/K、J/L 分别同列堆叠，桌面端实测每张背景卡一致为 364x795px，列 x 坐标为 0、392、1165、1556，横向溢出为 0。
- 已把中心手持手机底图换成用户提供的纯黑屏母版；该阶段曾生成 `palifood-center-flow.mp4`，但已被后续三张导览页 A/B/C 横向滑动方案取代。当前未推送、未部署，等待用户看截图确认。
# 2026-07-02 Pai Li Shi AWSMD 圆角与对齐返工
- 按用户最新截图反馈，重新生成 `palifood-left-app-wall.webp` / `palifood-right-app-wall.webp`：每张真实 P2 手机截图统一为 430x940、38px 圆角、28px 横纵间距，并合成左右两面背景墙，避免之前散图/方角/间距不齐的问题。
- 调整 `.palifood-hand-screen` 的屏幕洞位置和尺寸，使中心滚动视频层收回到用户提供的纯黑屏手持手机边框内，避免屏幕内容超过手机边缘。
- 重新跑 `npm run build` 通过；最新桌面截图保存于 `tmp/palifood-rounded-wall-qa/01-start.png`、`02-mid.png`，并生成并排对照 `tmp/palifood-rounded-wall-qa/compare-reference-current.png`。
- 当前仍未推送、未部署；等待用户确认截图后再决定是否继续微调或发布。
## 2026-07-02 Pai Li Shi onboarding slider correction
- Replaced the previous complex center phone recording with a three-page onboarding slider using real P2 screenshots A/B/C.
- Measured the hand-held phone's transparent screen aperture from `hand-user-black-mask.png` and set the center screen layer from that measured geometry instead of manual nudging.
- Playwright QA at 1920x900 measured target-vs-actual screen deltas around `0.016px`, all three center images loaded at `430x940`, and horizontal overflow stayed `0`.
- Latest visual evidence is in `tmp/palifood-onboarding-slider-qa/`, including three scroll-state screenshots, a red/green aperture overlay, a short `.webm` scroll recording, and a reference/current side-by-side comparison.
- `npm run build` passed.
- Not pushed and not deployed. Waiting for user approval of the screenshots/video.

## 2026-07-02 Pai Li Shi continuous background wall correction
- Replaced the Pai Li Shi AWSMD-style side background renderer from four independent DOM columns to two continuous wall images made from real P2 full-phone screenshots.
- Current QA confirms `2` `.palifood-background-wall` images, `0` old `.palifood-background-column` nodes, and `0` `.palifood-background-screen` nodes.
- Each wall asset is `888x3844` and renders as a `748px` wide left/right wall at a `1920px` viewport, matching the two-column side-wall structure of the reference.
- Verified the hand layer is the user-provided black-screen hand image: visible-pixel RGB comparison returned `changedVisiblePixels=0` and `maxVisibleRgbDiff=0`.
- Latest visual evidence is in `tmp/palifood-continuous-wall-qa/`, including three screenshots, a reference/current comparison, hand-source proof, metrics, and `06-continuous-wall-scroll.webm`.
- Build passed before QA. Not pushed and not deployed. Waiting for user approval.

## 2026-07-02 Pai Li Shi measured center alignment + rounded wall refresh
- User called out that previous center-phone adjustments were too manual. The latest pass changed the validation standard from visual nudging to measured geometry.
- `.palifood-hand-screen` remains locked to the transparent aperture measured from `hand-user-black-mask.png`: `1817x866` source image, aperture `x=720`, `y=35`, `w=354`, `h=731`.
- `.palifood-hand-screen-track` now aligns by center: it is placed at the aperture center, uses the real `430/940` slide aspect ratio, covers by width, and crops evenly top/bottom.
- `tmp/verify-palifood-continuous-wall.mjs` now records the active slide rect, active slide center delta from the aperture center, expected slide frame, and equal vertical crop amount.
- Regenerated `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp` with `430x940` cards, `46px` rounded clipping, `28px` gaps, and a solid black wall background.
- `npm run build` passed.
- Latest Playwright QA at `1920x900`:
  - screen aperture delta remains effectively exact: about `0.016px`;
  - active slide center delta is about `0.008px`, `1.621px`, and `2.966px` across the three captured scroll states;
  - wall images are `888x3844`, render `748px` wide on both sides, and page `overflowX=0`.
- Latest screenshots/video are in `tmp/palifood-continuous-wall-qa/`: `01-entry.png`, `02-mid.png`, `03-late.png`, `04-reference-vs-current-mid.png`, and `06-continuous-wall-scroll.webm`.
- Not pushed and not deployed. Waiting for user visual approval.

## 2026-07-02 Pai Li Shi white-background trial
- User suggested trying a white background because the eight selected P2 app screenshots are mostly black, making their rounded corners and gaps hard to see on a black stage.
- Changed the Pai Li Shi AWSMD-style showcase stage from black to warm white for a local preview only.
- Replaced the two composite wall images in the rendered page with four live columns of full P2 phone screenshots. The eight unique screenshots are repeated once for scroll continuity, so the visual stays based on the confirmed D/E/G/H/I/J/K/L app screens while avoiding composite-wall corner loss.
- Increased desktop screenshot gaps to about `42.24px` at `1920x900`; each visible phone screenshot renders `360x787px` with a computed `39.36px` border radius.
- `npm run build` passed. Latest screenshots are in `tmp/palifood-continuous-wall-qa/01-entry.png`, `02-mid.png`, and `03-late.png`.
- Not pushed and not deployed. Awaiting user visual feedback on the white-background trial.
## 2026-07-03 Pai Li Shi center phone no-crop correction
- Fixed the latest user-reported center-phone issues in the Pai Li Shi AWSMD-style scroll section.
- The site header is now fully hidden while this showcase is active, so it no longer covers the center phone's top login button.
- Replaced the previous cropped center onboarding assets with no-crop captures from the local P2 onboarding pages. The active center assets are `p2-center-fit-onboarding-1/2/3.webp`, each saved at `708x1462` for a `354x731` CSS screen frame.
- Updated the center screen geometry and the PNG transparent cutout to the pink/red phone-frame baseline from `hand-user-black-mask.png`: source `1817x866`, frame `x=714,y=28,w=354,h=731`.
- Build passed and Playwright QA regenerated screenshots in `tmp/palifood-continuous-wall-qa/`: `01-entry.png`, `02-mid.png`, `03-late.png`, and `16-reference-scroll-vs-current-entry.png`.
- Not pushed or deployed; waiting for user visual approval.

## 2026-07-06 Momenta software detail page preview
- Built the first local version of the Momenta software detail page: intro video first, followed by six 21:9 visuals and short explanatory copy between visuals.
- Replaced the Daima digital-panel Li Bai entry with Momenta software, while keeping the separate Momenta Touch hardware project unchanged.
- Converted the user-confirmed intro video from HEVC to H.264 as `public/portfolio/momenta-software-intro-h264.mp4` so browser playback and screenshot QA do not black-screen.
- `npm run build` passed. Local preview screenshots and scroll recording are in `tmp/momenta-software-detail-v3/`.
- Not pushed or deployed; waiting for user visual approval.

# 2026-07-06 Momenta opening interface animation correction
- User clarified that several Momenta 21:9 images are not independent static pages. Some are states of the same PPT/interface animation and must be grouped into scroll-driven interactions.
- Current corrected grouping: `momenta-software-03.webp` -> `momenta-software-02.webp` is one opening app-system reveal, implemented as a scroll-driven radial/center wave transition, not two separate static images.
- `momenta-software-11.webp` -> `momenta-software-21.webp` remains one separate scroll-driven frame sequence for the capture/generation flow.
- Other final images currently remain static unless the user identifies another source animation group.
- Verification passed after correction: `npm run build`; Playwright captured active animation states in `tmp/momenta-wave-sequence-v15/`, with `radialWaveCount=1`, `crossfadeSequenceCount=1`, `normalVideos=1`, `sequenceVideos=0`, and `overflowX=0`.
- Status: local preview only. Show `tmp/momenta-wave-sequence-v15/` screenshot/video evidence to the user; do not push/deploy until explicit approval.
