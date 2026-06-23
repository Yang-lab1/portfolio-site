# 当前任务进度

## 2026-06-18 Tresmares Seven-Card Orbit Geometry
- Completed the stricter desktop orbit correction: exactly seven visible cards, with one centered card and three mirrored cards on each side.
- The cards now use a shared bottom-center circle origin. Their rotation is calculated from each card center back to that origin, so the visible cards read as tangent to one semicircle.
- Local and deployed QA both passed. Desktop `1440px` showed seven visible cards at progress `0.38`, `0.42`, `0.62`, and `0.82`; horizontal overflow stayed `0`.
- At progress `0.42`, measured card centers were symmetric around x `720`: `116 / 276 / 486 / 720 / 954 / 1164 / 1324`.
- GitHub `main` includes the code work at commit `3264d7c`; production deployment `dpl_2UpeNFJ7Uf5Kby16sXBMyC4vqs5R` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

## 2026-06-19 Tresmares Seven-Card White-Erase Fix
- Updated the Expansion orbit so the seven desktop cards remain visibly present instead of fading edge cards below readability.
- Replaced the whole-card blur/fade impression with white edge/bottom wash overlays. This keeps the card image itself sharp while making bottom/edge cards look partially erased by white.
- `cmd /c npm run build` passed.
- Local and deployed Playwright QA passed: desktop `1440x900` has seven visible cards at progress `0.32`, `0.38`, `0.42`, `0.62`, and `0.82`; mobile `390x844` keeps five visible cards from progress `0.32` through `0.82`.
- Visible cards all report `blur(0px)`, horizontal overflow stays `0`, and the edge/bottom disappearance is handled by white wash overlays rather than Gaussian blur.
- Vercel production deployment `dpl_98VtvFfq5xvdg2wB6g5BQgMAV2EF` is aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Follow-up title-area correction: desktop cards no longer use title-proximity wash, because it made a mid-orbit card appear blurred near `further`. Desktop spacing is handled by lowering the orbit origin; white wash remains only for edge/bottom erasure.

## 2026-06-19 Tresmares Center Image Clarity Guard
- The centered Expansion card looked blurred because the `holland` image URL was broken (`404`), not because the orbit should use blur.
- Replaced the `holland` image URL with a valid source and kept visible Expansion card filters at `blur(0px)`.
- `tmp/verify-tresmares-orbit.mjs` now checks `imageLoaded` for visible cards, so future QA catches broken external image sources.
- Latest deployment `dpl_6cSzBzGeeGQGxcjPoErDgBW1rAmU` is aliased to `https://portfolio-site-three-rose.vercel.app/`.

## 2026-06-19 Tresmares Orbit Smooth Scroll Experiment
- Protected the current accepted version with Git tag `fallback-tresmares-orbit-2026-06-19` at commit `2232277`.
- Implemented a GSAP scrubbed proxy progress tween so the pinned orbit feels less stepped during fast wheel input.
- Moved active country label updates to a DOM ref to avoid React re-renders during continuous scroll movement.
- `cmd /c npm run build` passed.
- Local Playwright QA passed for desktop/mobile card counts, image-loaded checks, `blur(0px)`, title overlap, and horizontal overflow.
- Production deployment `dpl_Dd24jd7oDvcBAgUZ6Q726W7ZZQjR` completed and is aliased to `https://portfolio-site-three-rose.vercel.app/`.
- Deployed Playwright QA passed with the same desktop/mobile checks.

## 2026-06-20 Next Agent Handoff
- Added `NEXT_AGENT_HANDOFF.md` at the repository root.
- The handoff records URLs, version anchors, accepted UI states, guardrails, blockers, validation commands, and rollback instructions for the next AI window.
- The handoff package is intended to be committed and pushed to GitHub `main` with this documentation update.

## 2026-06-20 Agent Entry Cleanup + Local Search
- Removed the Agent panel title, explanatory text, preset suggestion chips, and hide-entry row.
- Replaced the old floating/restore icon with a single Apple AssistiveTouch-style dot.
- Added local project alias matching and profile-question replies inside `AgentOrb`.
- Verified locally that `帮我找一下拍立食` opens the matched project.
- `cmd /c npm run build` passed.
- Pushed to GitHub `main`, deployed to Vercel production, and verified `https://portfolio-site-three-rose.vercel.app/` with public Playwright QA.

## 进行中
- Supabase 真实连接仍未完成，当前权威状态是 `missing-env`。
- 需要真实 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY` 或 `VITE_SUPABASE_ANON_KEY`，并在目标 Supabase 项目执行 `supabase/portfolio_health.sql`。
- Vercel 当前没有任何环境变量，已通过 `cmd /c npx vercel env ls` 确认。

## 已完成
- Aircenter 风格首页迁移已完成：白底 `YANG` Hero、螺旋视频位、成就数字卡、三卡产品展示、数字案例区、三排作品墙、黑底 `YANG` footer。
- Hero 螺旋视频管线已完成：可从 `source-helix-frames/` 或 `C:\Users\Yang\Desktop\job\web` 渲染 `public/hero-yang-helix-loop.mp4`。
- 产品三卡展示已按 aircenter 方向完成：桌面只显示左/中/右三张，中心最大，左右浅透视并视口裁切，无标题、说明和底部控制按钮。
- Vercel 生产部署已完成，公开 alias 为 `https://portfolio-site-three-rose.vercel.app`。
- Supabase 校验门已添加：`npm run verify:supabase`，当前因缺少环境变量按预期失败。
- 2026-06-05 修复 Hero `YANG` 滚动收拢错位：
  - `src/main.jsx` 收拢目标测量先临时重置 GSAP `x/y/scale`，以静态基准排版计算目标，再恢复当前 transform。
  - 移除 `.air-letter` 滚动收拢 tween 的 stagger，四个原始字母同步收拢。
  - 本地与线上八个滚动检查点验证通过，顺序稳定为 `YANG`，无重叠，无第二套 wordmark。
  - 最新 Vercel 部署 id：`dpl_Cktjs1AGHxp5yx9Bih3xyL4wRoQG`。
- 2026-06-05 补齐 Supabase 交接：
  - 新增 `supabase/README.md`，写清 SQL、`.env.local`、本地验证、Vercel env 和 redeploy 步骤。
  - 整理 `src/lib/supabaseClient.js` 缩进，不改逻辑。

## 最近验证
- `cmd /c npm run build` 通过。
- `node tmp\verify-air-hero-collected.mjs` 通过：四个原始 `.air-letter`，`.air-hero-wordmark` 数量为 `0`，收拢态居中。
- `node tmp\verify-air-hero-yang-midstates.mjs` 本地通过：八个滚动检查点全部无重叠。
- `node tmp\verify-air-hero-yang-midstates.mjs https://portfolio-site-three-rose.vercel.app` 线上通过。
- `Invoke-WebRequest https://portfolio-site-three-rose.vercel.app` 返回 `200`。
- `cmd /c npx vercel env ls` 显示当前 Vercel 项目无环境变量。
- `cmd /c npm run verify:supabase` 仍按预期失败：`reason=missing-env`。

## 下一步
- 如果继续处理 Supabase：先拿到真实 URL/key，在 Supabase SQL editor 运行 `supabase/portfolio_health.sql`，再配置 Vercel 环境变量并 redeploy。
- 如果继续视觉修正：优先对照 aircenter 逐段截图，不扩大无关改动。

## 2026-06-15 GitHub 同步
- 已为 `portfolio-site` 初始化独立 Git 仓库，默认分支为 `main`。
- 已补充仓库级 `README.md`、`AGENTS.md` 和完整 `.gitignore`。
- `npm run build` 已通过。
- 已创建公开仓库 `https://github.com/Yang-lab1/portfolio-site`，并将本地 `main` 完整推送到 `origin/main`。

## 2026-06-16 云端归档
- 已建立 `archive/`、`docs/` 和 `CHANGELOG.md`，补齐恢复、交接、资产与隐私边界。
- 已归档 10 个旧部署包、两卷历史 QA 证据和用户生成的 Hero 候选视频。
- 已生成 SHA-256 校验清单。
- 已提交、推送并建立 `v1.0-handoff`、`v1.1-archive` 版本标签。
- GitHub 全新克隆后归档哈希校验无错误，`npm install` 与 `npm run build` 通过。
- 验收时发现 Vite 8.0.14 安全公告，已升级到 8.0.16；`npm audit` 返回 0 漏洞。

## 2026-06-16 Aircenter 三卡产品段微调
- 已按用户最新反馈修正首页三卡产品段：不再让左右卡片几乎消失，也不再与中间卡片叠压。
- 已完成的具体调整：
  - 缩小中间主卡宽度，恢复与 Aircenter 更接近的版心比例。
  - 降低左右卡片透视倾角与后退深度，避免“折成薄片”。
  - 重算左右卡片水平偏移，让两侧卡片保持可见，同时与中间卡片留出明显空隙。
  - 将左右侧卡从整体 `rotateY` 改为梯形裁切：靠中间的一边保持不变，越往屏幕边缘上下越向内收。
  - 移除临时 `orbit-shot` 自动滚动调试代码。
  - 删除本轮临时截图与 `tmp-product-orbit.spec.ts` 废文件。
- 本轮验证：
  - `npm run build` 通过。
  - 已重新部署到 Vercel production，最新部署 id 为 `dpl_9NLXvXQvSpmTjvNat47N3j6hPD9q`。
  - 当前线上别名仍为 `https://portfolio-site-three-rose.vercel.app`。

## 2026-06-16 React Bits 交互移植
- 已把产品三卡区从阈值切换改为连续拖拽、惯性滑动、松手吸附到最近作品。
- 已把 React Bits GooeyNav 思路移植到当前顶部导航，增强 `作品 / 关于` 的 pill 与粒子反馈；语言切换保持独立按钮。
- 未使用 `npx shadcn add`，因为当前站点是 React + Vite + 普通 CSS 架构，不是 shadcn/Next/Tailwind 项目。
- `cmd /c npm run build` 已通过。
- 已提交并推送到 GitHub `main`，最新提交 `8e86bdc`。
- 已触发 Vercel production 部署，公开别名 `https://portfolio-site-three-rose.vercel.app` 已确认加载新构建资源 `index-CphfTT75.js`。

## 2026-06-17 Achievement CountUp
- 已按用户提供的 React Bits CountUp 思路，为成就数字区接入 `motion/react` 计数动画。
- 成就数字进入视口时从 0 计数到 `51`、`20+`、`12+`、`4`；离开后再次进入会重新播放。
- 已验证 `cmd /c npm run build` 通过，并用本地 Chrome 脚本确认首次进入和二次进入最终数值都能稳定回到目标值。

## 2026-06-17 Achievement CountUp Timing Update
- 已安装 `playwright` 作为 devDependency，用于本地浏览器验证。
- CountUp 时长已从 `1.0s` 调整为 `1.3s`。
- `cmd /c npm run build` 已通过；使用项目内 Playwright + 系统 Chrome 验证本地预览，首次进入和二次进入最终值均为 `51`、`20+`、`12+`、`4`。
## 2026-06-18 Tresmares Expansion Interaction
- 已将原 About 灰底说明区替换为 Tresmares 首页 “Our expansion” 风格的 pinned scroll parallax section。
- 已实现 GSAP ScrollTrigger `pin + scrub`：滚到该区块后 section 固定，标题、图片卡片、Norway 标记、说明文字跟随滚动进度变化。
- 已修复标题行距过紧问题：三行标题之间加入 row-gap，避免 `We join forces with` 中的 `j` 和红色 `Banco Santander` 撞在一起。
- 本地验证：`npm run build` 通过；Playwright 截图确认桌面/移动端无横向溢出，section 中段 pinned，Norway 和说明文字可见。
## 2026-06-18 Tresmares Semicircle Orbit Update
- 已按用户录屏重新校准 expansion 区块：照片卡片改为围绕底部中心点的半圆轨道滚动，不再使用凌乱散点路径。
- 滚动中段会切换 active 国家：本地采样为 `Norway` -> `Denmark` -> `Sweden` -> `Finland`，红点和国家名跟随当前 active 卡片。
- 底部和边缘卡片已加入淡出与 blur，说明文字使用渐变 mask 淡入，标题继续向上裁切。
- 最终验证：`npm run build` 通过；Playwright QA 在 0.22/0.42/0.62/0.82 进度点截图通过，横向 overflow 为 0。
- 已提交并推送到 GitHub `main`：`992e49b`。Vercel production 部署 `dpl_8r9cirCqpbcLuAEuRiNQpYFhDd1v` 已 alias 到 `https://portfolio-site-three-rose.vercel.app/`。

## 2026-06-20 Agent RAG Plan + UI Correction
- 已把 Agent 个人回答从 `羚羊` 改为 `林杨`，并从当前项目数据动态组织能力/定位回答。
- 已移除 Agent 面板右上角关闭 X；现在通过点击浮球或面板外空白关闭。
- 已提高 AssistiveTouch 浮球可见度，避免过暗导致访客忽略。
- 已新增 `docs/PORTFOLIO_RAG_AGENT_PLAN.md`，明确未来 API 版使用 RAG 证据检索、可解释推理摘要和综合置信度/自我怀疑机制；不展示原始隐藏 CoT。
- `cmd /c npm run build` 已通过；`node tmp\verify-agent-panel.mjs` 已验证 Agent 打开、无关闭叉、外部点击关闭、`林杨` 回答和 `拍立食` 跳转。
- 已提交并推送 GitHub `main`（commit `5569c0e`），Vercel production 部署 `dpl_5xgotJtgyMiRqPkqvDxrNd8hqQNk` 已 alias 到 `https://portfolio-site-three-rose.vercel.app/`；线上 QA 确认 Agent 无关闭叉、外部点击关闭、`林杨` 动态回答和 `拍立食` 跳转均通过。

## 2026-06-21 Agent Project Evaluation Answers
- 已新增评价意图判断：当用户问 `你觉得拍立食做得怎么样` 这类问题时，Agent 会输出项目评价，而不是固定搜索提示。
- 已加入 `拍历史`、`派历史` 等拍立食误识别别名。
- 项目结果卡片已增加 `查看项目` / `View case` 的可点击提示，并保留点击跳转详情页。
- `cmd /c npm run build` 已通过；本地 Playwright QA 已验证评价回答、卡片提示和拍立食详情页跳转。
- 已提交并推送 GitHub `main`（commit `359c67d`）；Vercel production 部署 `dpl_CyUSw8w1Ds9T9tMFogDGrkLNwpZK` 已 alias 到 `https://portfolio-site-three-rose.vercel.app/`。
- 线上 Playwright QA 已通过：Agent 评价回答、`查看项目` 提示和拍立食详情页跳转均正常。

## 2026-06-22 Agent API 语义接入
- 新增 `/api/agent` 与 `src/lib/agentClient.js`，面板提交时会先请求服务端模型判断用户意图；缺少 `OPENAI_API_KEY` 或上游失败时自动回退到本地语义匹配。
- Agent 现在按“先回答，再给可点击项目入口”的方式处理项目解释、评价和位置类问题；只有用户明确要求“打开/进入/跳转”时才直接进入详情页。
- 用户更新约束：打开 Agent 面板时浮球不隐藏，仍显示在面板下方；点击浮球或面板外空白可收回。
- 本轮验证：`cmd /c npm run build` 通过。

## 2026-06-22 Agent API Release Candidate
- `cmd /c npm run build` 已通过。
- Vercel production 部署已完成：`dpl_6xJkSpVsSXLs3WktCvL9xphNWF99`。
- 固定线上地址已更新到最新部署：`https://portfolio-site-three-rose.vercel.app/`。
- 本次版本准备保存到 GitHub 并打标签 `v1.2-agent-api-20260622`，用于后续回滚。
- Agent API 通道代码已准备好；真实 AGNES/API 回答仍需要在 Vercel 配置 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_MODEL`。

## 2026-06-22 Agent Siri Thinking Animation
- 已将 Agent 思考状态从文字提示改为 Siri/Apple 唤醒感的环形动态光晕；等待期间不再显示“我先理解你的问题”这类文字。
- 面板打开和思考时 AssistiveTouch 浮球继续显示，符合用户最新要求。
- 已清理拍立食回答：回答会覆盖项目是什么、服务用户、用户痛点和解决问题，不再输出重复话术或 `。，` 这类异常标点。
- 已收紧项目匹配：`帮我找一下拍立食` 只返回拍立食，不再混出 Miro。
- `cmd /c npm run build` 已通过；本地 Playwright QA 已验证 Siri loader 可见、旧思考文字不存在、浮球思考时仍可见、拍立食只返回 1 个结果并可进入详情。
- 已推送 GitHub `main`，提交 `946bd2a`，并建立版本标签 `v1.3-agent-siri-20260622`。Vercel production 部署 `dpl_5G3Mk7hz7UPg9Rs3QEEbd4mQy5ix` 已 alias 到 `https://portfolio-site-three-rose.vercel.app/`；线上 Playwright QA 同样通过。

## 2026-06-22 Agent Intent Split Refinement
- 已按最新规则修正 Agent 意图分流：纯位置/找不到/打开/跳转类问题直接进入项目详情页；项目介绍、痛点、服务对象、解决问题、评价类问题先回答，再给一个 `点击进入项目页` 按钮。
- 混合意图按“先回答信息，再给按钮”处理，避免用户问项目内容时被直接跳走。
- 已删除独立项目结果卡片区域；回答文本和进入按钮现在在同一个回答块里，只显示一个黑色按钮，不再显示项目标题、项目摘要或第二张结果卡。
- 已移除输入栏语音按钮，当前只保留搜索图标、输入框和发送按钮。
- 已更新 `/api/agent` prompt 和本地 fallback：模型/本地逻辑统一返回 `navigate`、`answer_with_navigation`、`answer` 等模式，并在清晰项目匹配时只保留一个目标项目。
- `cmd /c npm run build` 已通过。
- 本地 Playwright 关键用例已通过：`拍立食是干嘛的` 显示回答 + 单个进入按钮且不混入 Miro；`拍历史在哪里我找不到了` 直接进入拍立食详情页；`miro项目介绍一下` 显示回答 + 单个进入按钮；`Miro在哪里` 直接进入 Miro 详情页；`林杨的能力怎么样` 只回答能力总结且不显示项目按钮。
- 已推送 GitHub `main`，代码提交 `767b464`；准备建立版本标签 `v1.4-agent-intent-split-20260622`。
- Vercel production 部署已完成：`https://portfolio-site-krs13ffo3-yangs-projects-d2ad4c9e.vercel.app`，固定线上地址 `https://portfolio-site-three-rose.vercel.app/` 已验证为最新行为。
- 线上 Playwright 关键用例同样通过，验证内容与本地一致。
## 2026-06-22 Agent 作品集助手行为修正
- 本次只修正当前已接入 AGNES 的站内 Agent 行为，没有替换模型供应商、没有新增 OpenAI provider，也没有暴露 API key 到前端。
- Agent 定位为“林杨 / Yang 个人网站 AI 作品集助手”：优先基于当前网站项目数据、成就数字和站内知识库回答，回答风格自然、积极但克制。
- 模式已统一为 `navigate`、`answer_with_navigation`、`answer`、`clarify`、`refusal`：纯导航直接跳转；项目介绍/评价先回答再给一个 `点击进入项目页` 黑色按钮；人物/能力/统计/闲聊只回答；外部实时问题温和拒答。
- 前端提交时会把当前站内项目、成就数字和个人能力概览组织为 `knowledgeBase` 传给 `/api/agent`，本地 fallback 也使用同一份知识库，避免每个新问题都要手工补规则。
- 项目匹配已收紧：`拍立食`、`拍历史`、`Pai Li Shi`、`pailishi` 等明确别名只命中 `palifood`，不会再被候选旧分数带到 `Miro AI 演练系统`。
- 搜索框 collapse / re-expand 会清空 input、reply、results、loading 等当前会话状态；请求中 collapse 会递增 request id，旧请求返回后不会写回 UI。
- 当前输入框继续只保留搜索图标、输入框和发送按钮；不恢复语音按钮，不恢复独立项目结果卡片，不显示 CoT、置信度分数或 debug。
- 本地验证：`node --check api/agent.js`、`node --check src/lib/agentClient.js`、`npm run build` 均通过；临时意图测试覆盖了拍立食介绍/导航、Miro 介绍/导航、林杨奖项、股票实时问题。

## 2026-06-23 删除能力组合板块
- 已从首页移除“不是堆项目，而是能力组合。”能力雷达板块。
- 本次只删除该板块及其专用 `capabilityAreas` 数据，不改动 Hero、作品区、Agent、About 和 Footer。
- `npm run build` 已通过。
- 已提交并推送 GitHub：`1cc76ce`，标签 `v1.6-remove-capability-section-20260623`。
- Vercel production 部署已完成：`https://portfolio-site-o09y9m1fy-yangs-projects-d2ad4c9e.vercel.app`。
- 固定线上地址已验证可访问：`https://portfolio-site-three-rose.vercel.app/`。
