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

## 2026-06-24 Daima interaction guardrail
- Do not simplify the Daima four-work section back into static fullscreen cards. The accepted target requires Lenis smooth scroll, internal sticky viewport, tall clipped image layer without scale/filter, duplicate-title hover roll, independent category scroll layer, weak transparent header state, and `480px` mobile work panels.
- Regression QA should include desktop `1440x900`, mobile `390x844`, title hover transform, image `transform/filter`, natural panel handoff, four internal detail-page clicks, and horizontal overflow.
- Current Daima panel copy must stay English-only. The fourth panel is now `Home Form Coach` / `sport`, not `Offer Quest`; do not restore `Offer Quest` to the four-screen showcase unless the user explicitly asks.
- Do not add a background/border to `.gooey-nav-container ul` under `body.is-daima-active`; it creates an unwanted rectangular frame around `Work / About`. Only the active item pill should have a visible shape.

## 2026-06-25 Floating contact guardrail
- Keep the email copy control in the Bill Chien-style pattern: black/white `80px` circle, right-anchored white mail icon, `EMAIL COPIED` text revealed by a left-expanding pill around `212px`, and timed retract after copy.
- Keep the Agent floating entry visually paired with the email button, but do not rewrite the existing Agent panel, AGNES API path, fallback logic, or collapse/reset behavior when only changing the icon/button shell.
- Do not use the Bill Chien yellow palette on Yang's site; the adapted contact controls should remain black/white to match the portfolio system.
- When the email pill is already expanded, a second click must not remove the expanded state before replaying. It should only apply the press scale/rebound and restart the retract timer, matching the source site's second-click behavior.

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

## 2026-06-16 Product Orbit Interaction Guardrail
- Do not reintroduce threshold-only drag behavior in the product showcase. The expected behavior is continuous pointer-following drag, velocity-based inertial movement, and snap-to-nearest-card after release.
- If React Bits snippets are pasted later, adapt them to the current React + Vite + CSS architecture unless the user explicitly asks to change the stack.
- Keep GooeyNav scoped to Work/About; language switching must stay a direct button action.

## 2026-06-17 Achievement CountUp Guardrail
- Do not change the achievement counter trigger back to `once: true`; the accepted behavior is replay on section re-entry from either scroll direction.
- Do not rely on the spring alone for final numbers. Keep the explicit final text settlement so the cards end exactly on `51`, `20+`, `12+`, and `4`.
- Keep the accepted CountUp duration at `1.3s` unless the user asks for another timing adjustment.

## 2026-06-18 Tresmares Seven-Card Orbit Guardrail
- Do not expose eight or more desktop cards in the Expansion orbit. The current accepted target is exactly seven: three left, one centered active card, three right.
- Do not use arbitrary per-card rotation. Rotation must be calculated from the card position toward the same bottom-center circle origin so every card reads as tangent to one shared semicircle.
- Regression check: at desktop progress `0.42`, centers should remain symmetric around viewport center. Latest local baseline is `116 / 276 / 486 / 720 / 954 / 1164 / 1324` at `1440px` width.

## 2026-06-19 Tresmares Edge-Erase Guardrail
- Do not weaken edge/bottom cards by applying whole-card Gaussian blur. The user explicitly rejected that look.
- The accepted edge treatment is white erasure/wash at the side and bottom edges, implemented through `.expansion-card::after` gradients.
- Regression check must include desktop visible count `7` at progress `0.32`, `0.38`, `0.42`, `0.62`, and `0.82`, plus visible card filters staying `blur(0px)`.
- Do not use title-proximity wash on desktop cards. It makes mid-orbit cards look blurred/washed near `further`; lower the orbit or delay entry instead.

## 2026-06-19 Tresmares Image Load Guardrail
- Do not judge the Expansion orbit only by geometry. External image URLs can fail and make a centered card look gray/blurred even when CSS is correct.
- Regression QA must check that every visible Expansion card image has `complete === true` and `naturalWidth > 0`.
- If a card looks blurry, first check the actual image URL status before changing orbit math or reintroducing blur/opacity workarounds.

## 2026-06-19 Tresmares Smoothness Guardrail
- Do not revert the smoothness fix back to raw `ScrollTrigger.create(... onUpdate)` progress if the user asks for smoother scroll feel; raw wheel progress was the cause of the slightly stepped handoff.
- Keep the orbit scroll-driven. It should freeze when scrolling stops and move faster only when scroll progress changes faster; do not replace it with autoplay.
- If this experiment feels worse visually, rollback to tag `fallback-tresmares-orbit-2026-06-19`.

## 2026-06-20 Handoff Guardrail
- Do not tell the user that the local folder can be deleted solely because GitHub exists. First verify a fresh clone can build and confirm all user-only source assets have either been archived, committed, or intentionally excluded.
- A future AI should not start from the live URL alone. The authoritative handoff path is GitHub repo + `NEXT_AGENT_HANDOFF.md` + planning files + `agent_memory/`.

## 2026-06-20 Agent Entry Guardrail
- Do not reintroduce the Agent panel title, helper paragraph, preset chips, hidden/restore row, top-right close X, or old black restore icon. The accepted default panel is answer/results plus bottom input only.
- Keep the floating entry visually close to an iPhone AssistiveTouch dot: small and quiet, but visible enough not to be missed.
- Current search is local rule-based matching. Do not claim it is a real LLM agent until an API/model integration is explicitly added and secrets are configured.
- The user's name in assistant answers is `林杨`, not `羚羊`.

## 2026-06-18 Tresmares Expansion Guardrails
- 不要把 Tresmares expansion section 改成普通静态 About 排版；核心验收是 pinned section + scroll progress scrub。
- 标题行距不能再回到 `gap: 0` / `line-height: 0.92`，否则 `j` 会和下一行红色标题碰撞。
- 当前照片使用外链临时欧洲城市图，后续若替换成作品图或自有资产，只应替换 `expansionCards` 的 `image` 字段，不要破坏 scroll timeline。
## 2026-06-18 Tresmares Semicircle Orbit Guardrails
- 不要再把 expansion 卡片改回随机散点或普通照片墙；用户明确要求按参考视频做“底部中心点半圆轨道”。
- 不要把该段改成自动播放；核心验收仍然是 GSAP ScrollTrigger pinned section + scrub，用户停止滚动时动画停在当前状态。
- 后续如果替换图片，只替换 `expansionCards` 的图片资源和国家/标签文本，不要破坏 `renderExpansion(progress)` 的轨道公式。
- 回归检查至少要覆盖 0.22、0.42、0.62、0.82 四个滚动进度点，并确认 active label、红点、底部 blur、说明文字淡入和 `overflow-x = 0`。

## 2026-06-21 Agent Evaluation Guardrail
- 不要把评价类问题退回成通用搜索提示。比如 `你觉得拍立食做得怎么样` 必须给出对拍立食的实际评价。
- 项目结果卡片必须保持明显可点击，至少包含 `查看项目` / `View case` 这类行动提示。
- 当前实现仍是本地规则层，不要在页面或文档中声称它已经是接入外部模型的真实 RAG Agent。

## 2026-06-22 Agent API + Orb Guardrail
- Agent 面板打开时不要隐藏 AssistiveTouch 浮球；浮球应继续显示，并可点击收回面板。
- 当前实现包含 `/api/agent` 模型通道和本地 fallback。只有配置 `OPENAI_API_KEY` 后才是真实 API 语义判断；未配置时会自动退回本地匹配。
- 对“项目是干嘛的/做得怎么样/服务谁/在哪里”这类混合意图，优先先回答，再给可点击项目卡片；只有明确“打开/进入/跳转”才直接导航。
- 2026-06-22 生产部署 `dpl_6xJkSpVsSXLs3WktCvL9xphNWF99` 已更新线上地址，但 AGNES API 是否可用取决于 Vercel 环境变量是否配置为 OpenAI-compatible endpoint；不要把未配置环境变量的 fallback 状态说成真实模型接入。

## 2026-06-22 Agent Siri Loading Guardrail
- 不要再把 Agent 等待状态改回文字提示。用户明确要 Apple Siri 式唤醒/思考动画：等待时只显示动态光晕，结果出来后再显示文本。
- 拍立食相关查询必须优先命中 `palifood`，并且清晰项目匹配时只显示拍立食一张结果卡；不要再因为“AI/移动/H5”等宽泛词混出 Miro。
- 拍立食回答必须讲清楚：食物识别 / 移动 H5、日常饮食记录用户、手动记录慢或识别后缺少健康反馈的痛点、拍摄到健康反馈的流程。
- 回归检查至少覆盖：旧思考文字不存在、`.siri-loader` 可见、浮球面板打开时仍可见、`帮我找一下拍立食` 不返回 Miro、点击结果能进入拍立食详情页。

## 2026-06-22 Agent Intent Split Guardrail
- 不要恢复独立项目结果卡片区域。项目信息类回答只能在同一个回答块里放一个 `点击进入项目页` 按钮。
- 不要恢复语音按钮；当前没有接语音能力，输入栏只保留搜索图标、输入框和发送按钮。
- 纯导航意图如 `Miro在哪里`、`拍历史在哪里我找不到了` 应直接跳转；信息意图如 `Miro项目介绍一下`、`拍立食是干嘛的` 应先回答再给按钮。
- 混合意图优先回答信息，不要因为出现 `在哪里/找不到` 就立刻跳走。
## 2026-06-22 Agent RAG 行为守卫
- 不要用候选旧 `score` 直接判断强项目；项目模式必须有标题、别名、slug/id 等明确项目身份信号。
- `拍立食` / `拍历史` 明确别名只能命中 `palifood`，不得被 `AI`、`移动`、`H5` 等泛词带到 `Miro AI 演练系统`。
- collapse / re-expand 必须清空当前会话，并通过请求序号忽略旧请求返回，避免旧答案重新写回 UI。
- AGNES API 接入方式和环境变量保持现状；后续只允许调整站内 prompt、知识库输入、fallback 和 response parsing，不要替换 provider。

## 2026-06-24 Agent 成就统计守卫
- “林杨得过多少奖 / awards / honors / scholarship”必须回答站内成就卡“奖项荣誉 12+”，不能被“作品入口 51”抢答。
- 成就类 fallback 不要只依赖四张成就卡共用的泛化关键词；需要按卡片标题和说明优先匹配奖项、客户、作品、能力四类统计。
- 回归检查至少覆盖：`林杨得过多少奖` 包含 `12+`，`拍立食是干嘛的` 不包含 `Miro` 且只显示一个进入项目按钮。
