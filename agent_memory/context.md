# 项目上下文

## 当前有效背景
- 项目目录：`C:\Users\Yang\Documents\New project\portfolio-site`
- 当前任务：为作品集的中国内地 / 香港一域名发布路径补齐可执行证据生成、验证与发布交接。
- 目标不能只靠 Vercel 预览或默认平台域名完成；必须是一个真实自定义 HTTPS 域名，并且有香港与深圳/内地无 VPN 访问证据。
- 当前推荐路径：EdgeOne Pages 全球可用区不含中国大陆作为低成本首测；香港 COS/OSS 为备选；若必须保证深圳稳定，则同域名后续走 ICP + 内地静态托管/CDN。
- 最新 release 包：`C:\Users\Yang\Documents\New project\portfolio-site\release\portfolio-site-china-20260601-043944.zip`
- 当前新增工具：`npm run generate:evidence` 用于从真实自定义域名生成 `deployment_evidence.json` 脚手架。
- 当前新增工具：`npm run verify:release` 用于上传前验证 release 包完整性、manifest、必需文档和大小预算。

## 重要约束
- 不要把发布目标标记为完成，直到 `verify:launch-goal` 基于真实证据通过。
- 本地可做的是打包、脚本、文档和证据门禁；真实域名、DNS、HTTPS、香港/深圳网络测试仍需外部执行。
- PowerShell 直接运行 `npm` 可能被执行策略拦截；需要使用 `cmd /c npm ...`。
- `deployment_evidence.json` 生成后仍必须补真实区域证据；包含 TODO 或 example 域名时，门禁必须失败。
- `cmd /c npm run package:china` 现在会自动执行 release verification。

## 记忆文件状态
- 2026-06-01 开始本轮任务时，项目根目录缺少 `agent_memory/`。
- `C:\Users\Yang\.codex\templates\agent_memory` 未找到，因此无法原样复制模板；本目录先用最小结构补齐。
## Aircenter 风格迁移上下文
- 当前首页方向已切换为 aircenter 式白底滚动作品集：白底首屏、巨型 `YANG` 字母、短标题 `智能成形`、成就数字带、产品透视展示、数字案例 sticky 展示、三排作品墙、黑底 `YANG` footer。
- 之前生成的 Remotion 螺旋体资产不符合用户要求，不能作为正式 hero 背景使用。
- 用户会后续提供 25 帧螺旋梯图片；收到后只做帧序列合成视频并接入，不再自行改造产品/结构形态。
- 当前已新增帧序列管线：把确认帧图放入 `source-helix-frames/`，运行 `cmd /c npm run render:helix`，输出 `public/hero-yang-helix-loop.mp4`。
- 用户已提供本地帧目录 `C:\Users\Yang\Desktop\job\web`；25 帧已同步进 `source-helix-frames/` 和 `remotion-hero/public/helix-frames/`。
- 当前正式 Hero 背景视频是 `public/hero-yang-helix-loop.mp4`，由 Remotion `HeroHelixFrames` 生成，使用 ping-pong + crossfade 保证首尾自然。

## Aircenter 产品轮播当前约束
- 产品展示段当前按 aircenter 三图轮播参考执行：桌面只显示左/中/右三张，中心卡最大，左右侧卡向边缘缩小并做透视变形。
- 该段不显示大标题、不显示说明文字、不显示底部上一张/下一张按钮；交互依靠侧卡点击和横向拖动。
- 当前 QA 截图与数据在 `C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-match-20260602-v2`。

## Aircenter 产品三卡透视方向
- 产品三卡的当前正确目标不是单纯把卡片缩小，而是按参考图做透视方向：左右侧卡靠近中心的一边更大，越往屏幕边缘越小。
- 当前实现使用 `offset * 29` 作为 `rotateY` 角度：左卡 offset `-1` 为 `rotateY(-29deg)`，右卡 offset `1` 为 `rotateY(29deg)`。
- 当前验证截图在 `C:\Users\Yang\Documents\New project\tmp\product-orbit-perspective-direction-20260602-v1`。

## Aircenter 产品三卡最新裁切规则
- 当前产品三卡只显示三张：左侧、中心、右侧。
- 中心卡最大；左右侧卡浅透视，不要折成薄片。
- 左右侧卡不是完整显示，而是被视口裁掉一部分，目标接近只露出四分之三。
- 当前参数：侧卡 translate 约 48.5vw、rotateY(14deg)、scale(0.86)、depth -50px；桌面实测侧卡可见比例约 0.78。
- QA 输出：C:\Users\Yang\Documents\New project\portfolio-site\tmp\product-orbit-aircenter-separated-20260602-v1。

## 2026-06-03 Product Orbit + Vercel Current State
- 产品三卡轮播当前按 aircenter 参考执行：桌面只显示左/中/右三张卡，中心最大，左右侧卡由视口裁切，不显示标题、说明文字或底部控制按钮。
- 最新产品轮播参数：侧卡 translate 约 48.5vw，rotateY(8deg)，scale(0.86)，depth -50px；Playwright 实测侧卡可见比例约 0.72 / 0.72，左右间距 26px / 26px，无重叠。
- Vercel 已部署成功，公开别名为 https://portfolio-site-three-rose.vercel.app，并已验证返回 200 OK。
- Supabase 代码已接入懒加载客户端与 health check，但当前运行状态是 missing-env；需要 VITE_SUPABASE_URL 和 VITE_SUPABASE_PUBLISHABLE_KEY 或 VITE_SUPABASE_ANON_KEY 才能真正连库。
## 2026-06-04 Aircenter Hero/Product Current State
- Hero collected YANG is built only from the four original `.air-letter` nodes; no separate `.air-hero-wordmark` element remains.
- Desktop collected YANG scale is now `0.30`; Playwright measured visible collected width `264px`, top `75px`, center `960px` on a `1920px` viewport.
- Product orbit side cards now use shallow `clip-path` diagonal edges to keep the four corner extension-line geometry clean. Latest local/deployed metrics: visible cards `3`, side visible ratio `0.74 / 0.74`, gaps `9px / 9px`, no overlap.
- Latest Vercel production deployment is aliased to `https://portfolio-site-three-rose.vercel.app` and returns `200 OK`.
- Supabase remains scaffolded but not actually connected until `VITE_SUPABASE_URL` plus a publishable/anon key are configured.

## 2026-06-05 Aircenter Hero YANG Stability Current State
- Hero scroll collection now measures letter targets from a reset base transform state and moves all four `.air-letter` nodes together without stagger.
- Do not reintroduce a separate collected wordmark. The intended implementation remains exactly four original letters.
- Local and deployed verification both passed across eight mid-scroll checkpoints: order stayed `YANG`, gaps stayed positive, and no overlap occurred.
- Latest Vercel production alias remains `https://portfolio-site-three-rose.vercel.app` and returns `200 OK`.
- Supabase remains `missing-env`; database connection is not complete.

## 2026-06-15 GitHub Handoff
- `portfolio-site` is now an independent Git repository intended for GitHub handoff.
- Repository target: `https://github.com/Yang-lab1/portfolio-site`.
- Production site: `https://portfolio-site-three-rose.vercel.app`.
- The repository includes website source, public portfolio assets, Hero video, 25 Hero source frames, Remotion source, deployment tools, planning files and AI memory.
- Generated dependencies, build output, caches, logs, local Vercel metadata and environment secrets are excluded.

## 2026-06-16 Cloud-First Archive
- GitHub `main` is the authoritative source for the current website.
- Historical deployment packages are stored in `archive/legacy-builds/`.
- Historical QA screenshots and verification output are stored in two archives under `archive/qa-evidence/`.
- The user-generated Hero candidate video is stored under `archive/source-assets/`.
- A fresh clone must be able to install and build without the original workstation.
- Sensitive conversation exports, account data and third-party reference recordings must remain private; see `docs/PRIVATE_ARCHIVE_MANIFEST.md`.

## 2026-06-16 Aircenter Product Orbit Tuning
- Homepage product showcase was retuned again against the Aircenter three-card reference.
- Current intended geometry: center card visibly smaller than the previous oversized build, left/right cards separated from the center with clear white gaps, and side cards remain mostly visible instead of collapsing into thin edge slivers.
- Current implementation uses a smaller center width, lighter side-card `rotateY`, shallower negative depth, and a moderate outward offset so side cards feel cropped by the viewport rather than stacked under the center card.
- Temporary `orbit-shot` scroll helper and local screenshot test artifacts were removed after verification; they must not be reintroduced unless needed for one-off QA.
- Latest refinement changed side-card perspective from card-wide rotation to trapezoid clipping: the inner edge toward the center stays full height, while the outer edge is vertically inset so each side card narrows toward the screen edge.

## 2026-06-16 React Bits Interaction Pass
- Product showcase interaction now follows the React Bits carousel model conceptually: continuous floating scroll position, `requestAnimationFrame` easing, pointer velocity inertia, and snap-to-nearest item after release.
- Do not restore the old discrete behavior where dragging only switches one card after a threshold and then freezes.
- Header navigation uses an in-repo React/Vite adaptation of React Bits GooeyNav for the Work/About links. The project is not a shadcn/Next/Tailwind app, so React Bits snippets should be pasted as React component + CSS source, not installed with `npx shadcn add`.
- Keep the language toggle outside GooeyNav so it remains a direct state button instead of an anchor-style nav item.

## 2026-06-17 Achievement CountUp
- The achievement cards now use a local React Bits-style `CountUp` component backed by `motion/react`.
- The counters are intentionally configured with `useInView(... once: false ...)`: scrolling into the section from either direction should replay the count-up.
- The spring animation is forced to the exact final text at the end of the duration so the cards settle on `21`, `10+`, `9+`, and `4`.

## 2026-06-17 Achievement CountUp Timing Update
- Current CountUp duration is `1.3s`.
- `playwright` is installed as a dev dependency for local browser verification.

## 2026-06-18 Tresmares Expansion Interaction
- About block is being replaced by a Tresmares-inspired pinned scroll section: white background, centered `Our expansion` headline, red `Banco Santander`, parallax photo cards, active `Norway` marker, and bottom explanatory copy.
- Implementation uses the existing React/Vite/GSAP stack with `ScrollTrigger` pin + scrub. Keep the animation scroll-driven; do not turn it into autoplay or static layout.
- Desktop and mobile must keep `overflow-x` at zero. Headline rows need explicit spacing so the `j` descender does not collide with the red `Banco Santander` row.

## 2026-06-18 Tresmares Semicircle Orbit Update
- The Tresmares-inspired About/expansion section now uses a bottom-center semicircle orbit instead of scattered independent card paths.
- Scroll progress advances the active card along the arc; current sampled active sequence is `Norway` -> `Denmark` -> `Sweden` -> `Finland`.
- Bottom/edge cards intentionally fade and blur as they leave the readable arc. The active marker/country label follows the active card instead of staying static.
- Verification artifacts for this pass are under `tmp/tresmares-video-frames/` and `tmp/tresmares-orbit-qa/`; these are temporary QA outputs and should not become committed product assets.
