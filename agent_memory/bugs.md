# 问题与风险

## 当前风险
- 未绑定真实自定义域名，无法完成最终上线目标。
- 未有香港与深圳/内地无 VPN 实测证据，不能声明一域名目标完成。
- 本机模板目录 `C:\Users\Yang\.codex\templates\agent_memory` 缺失，`agent_memory` 文件不是从模板复制而来。
- 示例域名和平台默认预览域名必须保持不能通过最终门禁。
- 当前 Codex shell 下后台启动本地预览服务不稳定；前台 `preview:static` 可用，但命令运行期间需要保持会话打开。

## 已知环境问题
- PowerShell 下直接运行 `npm` 可能触发 `npm.ps1` 执行策略问题；使用 `cmd /c npm ...`。

## 已修复问题
- 2026-06-01：`Compress-Archive` 曾返回但没有生成 zip；`package-china-dist.mjs` 已增加 zip 存在性检查和 `.NET ZipFile` fallback。
- 2026-06-01：`deployment_evidence.json` 输出到子目录时报告路径可能解析错误；`generate-deployment-evidence.mjs` 已按 evidence 文件位置生成相对路径，同时保留项目根目录命令输出。
## Aircenter 迁移问题与风险
- 当前 hero 螺旋梯视频仍然待补。此前生成版本已被用户明确否定，不能使用。
- 当前 hero 螺旋梯视频已由用户提供的 25 帧生成并接入；此前生成版本仍然不能使用。
- 如果后续替换新帧，仍需复测首尾循环、桌面/移动构图和视频体积。
- 数字案例模块曾因 GSAP pin 导致 offset 异常，已改为 CSS sticky + ScrollTrigger 切换；后续如再改滚动结构，需要复测定位。
- 产品透视卡曾因父容器 pointer capture 导致点击不进详情，已修复；后续如改拖拽逻辑，需要复测点击/拖拽分离。

## Aircenter 产品轮播风险
- 后续不要把产品三卡段改回多卡堆叠、紧贴、带大标题、带说明文案或带底部切换按钮。
- 当前目标是严格接近 aircenter 参考：桌面只看三张，中心最大，左右侧卡缩小、分离并做透视后退；本轮实测左右间距为 `204px / 204px`。
- 如果后续修改拖动逻辑，必须复测侧卡点击、横向拖动、中心卡打开详情、移动端横向溢出。

## Aircenter 产品三卡透视方向风险
- 不要再把产品三卡侧卡旋转改回 `-offset * 29`；那会让两边卡片的透视方向反掉。
- 当前正确方向是：左侧卡 `rotateY(-29deg)`，右侧卡 `rotateY(29deg)`，视觉上必须是靠中心的一侧更大、越往屏幕边缘越小。
- 后续如果调整 `translate3d`、`rotateY`、`scale` 或 `transform-origin`，必须重新截图确认左右两边都是“内侧大、外侧小”。

## Aircenter 产品三卡风险
- 不要再把侧卡改成完全显示在视口内；用户明确要求左右两张只露出约四分之三。
- 不要把侧卡折叠成很窄的薄片；当前倾斜为 14deg，保持浅透视。
- 后续若调整 product orbit，必须复测 visibleCount、side visibleRatioX、noOverlap、centerIsLargest 和移动端 overflow。

## 2026-06-03 Current Risks
- 不要再把产品三卡侧卡改成完整露出；用户明确要求左右两张只露出约四分之三。
- 不要再把侧卡折叠角度加大；当前用户要求倾斜更克制，最新值为 rotateY(8deg)。
- Vercel 部署必须保留 .vercelignore，否则 remotion-hero、release、node_modules、source-helix-frames 等目录会导致上传包过大。
- Supabase 仍未真正连接：当前只有代码脚手架和 SQL，缺少用户项目环境变量。
## 2026-06-04 Current Risks
- Do not reintroduce a separate Hero wordmark element for collected `YANG`; the current correct implementation uses only four `.air-letter` nodes.
- Do not enlarge the collected `YANG` again without checking the visible collected screenshot; current desktop target is about `264px` wide at `1920px`.
- Do not remove the side-card `clip-path` geometry unless replacing it with an equally precise way to keep side-card corners on continuous shallow extension lines.
- Product orbit regression checks must include: exactly 3 visible cards, side visible ratio around `0.74`, center largest, no overlap, and no product title/copy/controls.
- Supabase is still not a real runtime connection until valid Vercel/local env vars are configured.

## 2026-06-05 Current Supabase Blocker
- The database connection is not complete. Current authoritative status is `missing-env`.
- Do not mark the active goal complete until `npm run verify:supabase` reports `ready=true` and the deployed browser status reports `connected`.
- Required user/external inputs: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`, and execution of `supabase/portfolio_health.sql` in the target Supabase project.

## 2026-06-05 Hero YANG Stability Risk
- Fixed: Hero scroll collection no longer uses staggered letter motion or transformed-position measurements.
- Do not reintroduce stagger on `.air-letter` scroll collection unless verifying every mid-scroll checkpoint for overlap.
- Do not measure collected targets from active transformed `getBoundingClientRect()` values; reset GSAP `x/y/scale` before measuring the base layout.
- Regression check: run `node tmp\verify-air-hero-yang-midstates.mjs https://portfolio-site-three-rose.vercel.app`.

## 2026-06-16 Product Orbit Guardrails
- Do not restore the old oversized center-card sizing (`clamp(900px, 44.5vw, 950px)`); that layout leaves no room for readable side cards on common desktop widths.
- Do not push side cards back to extreme outward offsets or heavy `rotateY` angles. The rejected symptom is: center card dominates the viewport and left/right cards are reduced to narrow edge strips.
- Do not collapse the three-card layout back into overlap. The accepted direction is: center largest, left/right smaller, visible, and separated by white gaps.
- Do not use broad side-card `rotateY` as the primary perspective method. The latest accepted direction uses side-specific `clip-path` trapezoids so the edge facing the center stays fixed and the outer edge shrinks inward.
- If this section is retuned again, compare directly against the Aircenter reference screenshot and re-check these four points together:
  1. only three cards are visible,
  2. center card is largest,
  3. side cards are still mostly visible,
  4. side cards do not touch or slide under the center card.
