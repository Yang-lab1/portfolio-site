# 当前任务进度

## 进行中
- Phase 25：本地 URL 打不开的原因已定位为预览服务没有监听端口；已新增 `preview:static`，但当前 Codex shell 下后台常驻启动还不稳定。

## 已完成
- Phase 22 已完成：EdgeOne Pages 中文执行清单已加入最新 release 包。
- Phase 23 已完成：新增 `generate:evidence`，更新 launch gate 和发布文档，并生成最新 release 包 `portfolio-site-china-20260601-042829.zip`。
- Phase 24 已完成：新增 `verify:release`，接入 `package:china`，修复 zip 生成兜底，并生成最新 release 包 `portfolio-site-china-20260601-043944.zip`。
- Phase 25 部分完成：新增 `tools/serve-dist.mjs` 和 `npm run preview:static`，前台启动可以打开 `http://127.0.0.1:5182/`。

## 下一步
- 如果进入真实部署：绑定自定义域名后运行 `cmd /c npm run generate:evidence -- --url https://真实域名 --output deployment_evidence.json`。
- 上传前运行 `cmd /c npm run verify:release -- --latest`，确认选中的 release 包完整。
- 跑 `verify:domain`、`verify:url`，再补香港和深圳/内地无 VPN 证据。
- 最后跑 `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json`。
- 本地预览若打不开，先确认是否有服务监听；可运行 `cmd /c npm run preview:static` 并保持该命令运行。
## Aircenter 首页迁移进度
- 已完成：白底 `YANG` 首屏、成就数字带、产品透视展示、数字案例 sticky 展示、三排作品墙、黑底 `YANG` footer。
- 已完成：冻结错误的 Remotion 螺旋体，不接入正式首页；hero 只保留极淡结构插槽，等待用户后续提供 25 帧。
- 已验证：`cmd /c npm run build` 通过；Playwright 桌面/移动 QA 无横向溢出、无控制台错误，产品卡可打开详情，作品墙自动运动正常。
- 下一步：收到用户提供的 25 帧螺旋梯图片后，合成为循环视频并替换 hero 插槽。

## Hero 螺旋帧序列进度
- 已完成：新增 `source-helix-frames/` 输入目录、`prepare:helix`、`render:helix`、Remotion `HeroHelixFrames` 合成，以及首页 Hero 视频接入。
- 已完成：从 `C:\Users\Yang\Desktop\job\web` 读取 25 张 `1672 x 941` PNG 帧，生成 `public/hero-yang-helix-loop.mp4`。
- 已完成：把 25 帧同步进项目 `source-helix-frames/`，默认 `cmd /c npm run render:helix` 后续可直接重渲染。
- 已验证：Remotion lint、Vite build、浏览器桌面/移动 QA、MP4 HTTP 200、首尾帧采样一致。

## Aircenter 产品三卡修正
- 已完成：产品展示段按用户最新截图重调为“只看三张、三张分开、中心最大、左右缩小并透视后退”。
- 已完成：不显示产品段大标题、说明文案和底部切换按钮；切换依靠侧卡点击和横向拖动。
- 已验证：`cmd /c npm run build` 通过；桌面实测 3 张卡、左右间距 `204px / 204px`、中心卡 `900 x 595`、侧卡约 `627 x 398`、横向溢出 `0`。
- 已验证：侧卡点击和横向拖动都能切换当前卡；移动端只显示当前卡且横向溢出 `0`。
- QA 输出：`C:\Users\Yang\Documents\New project\tmp\product-orbit-aircenter-match-20260602-v2`。

## Aircenter 产品三卡透视方向修正
- 已完成：修正产品三卡侧卡透视方向。之前只是拉开了距离，但左右侧卡的视觉缩放方向反了。
- 当前规则：左侧卡 `rotateY(-29deg)`，右侧卡 `rotateY(29deg)`；两侧都应表现为靠近中心的一侧更大，越往屏幕边缘越小。
- 已验证：`cmd /c npm run build` 通过；Playwright 桌面截图和 DOM 数据证明左卡 offset `-1`、右卡 offset `1` 的旋转方向正确。
- 保留约束：桌面只显示 3 张、无产品段标题/说明/底部按钮、侧卡点击可切换、横向拖动可切换、移动端无横向溢出。
- QA 输出：`C:\Users\Yang\Documents\New project\tmp\product-orbit-perspective-direction-20260602-v1`。

## Aircenter 产品三卡裁切修正
- 已完成：侧卡从完整显示/过度折叠改为浅透视并由视口裁切。
- 构建验证：cmd /c npm run build 通过。
- Playwright 验证：桌面可见卡 3 张，中心卡 893x602，侧卡 622x505，侧卡横向可见比例 0.78/0.78，左右间距 26px/26px，无重叠，无 console warning/error。
- QA 输出：C:\Users\Yang\Documents\New project\portfolio-site\tmp\product-orbit-aircenter-separated-20260602-v1。

## 2026-06-03 Product Orbit + Vercel Progress
- 已完成：根据用户最新截图把侧卡透视从 14deg 降到 8deg，保持约四分之三可见和三卡分离。
- 已完成：cmd /c npm run build 通过。
- 已完成：本地与线上 Playwright 验证通过，visibleCount=3，centerIsLargest=true，noOverlap=true，console warnings/errors=0。
- 已完成：新增 .vercelignore，Vercel 上传体积从失败时约 249.1MB 降至 5.5MB。
- 已完成：Vercel 部署成功，公开地址 https://portfolio-site-three-rose.vercel.app 返回 200 OK。
- 待完成：Supabase 真正连库需要用户提供项目 URL/key 并配置到 Vercel 环境变量。
## 2026-06-04 Hero/Product Refinement Progress
- 已完成：缩小 Hero 收拢态 `YANG`，并移除未使用的 `.air-hero-wordmark` 样式残留。
- 已完成：产品三图侧卡改为浅斜线 `clip-path`，保持侧图四角在连续延长线上，同时维持三卡分离。
- 已完成：`cmd /c npm run build` 通过。
- 已完成：Hero Playwright 验证通过，只有 4 个原始字母，收拢态宽 `264px`、居中、无第二套 wordmark。
- 已完成：产品三图本地和线上 Playwright 验证通过，`visibleCount=3`、侧图可见比例 `0.74/0.74`、间距 `9px/9px`、无重叠、无 console 警告或错误。
- 已完成：Vercel 生产部署并重新 alias 到 `https://portfolio-site-three-rose.vercel.app`，公开地址返回 `200 OK`。
- 待完成：Supabase 真实连接仍需要项目 URL/key 环境变量。

## 2026-06-05 Supabase Verification Progress
- 已完成：新增 `tools/verify-supabase-config.mjs` 和 `npm run verify:supabase`。
- 已完成：确认本地缺少 `.env` / `.env.local`，`.env.example` 只是空模板。
- 已完成：确认线上浏览器验证仍为 `supabaseStatus=missing-env`。
- 已完成：`cmd /c npm run verify:supabase` 当前按预期失败，输出 `reason=missing-env`。
- 已完成：`cmd /c npm run build` 通过。
- 待完成：需要真实 `VITE_SUPABASE_URL` 和 publishable/anon key，并在 Supabase 里运行 `supabase/portfolio_health.sql`。
