# NEXT_AGENT_HANDOFF.md

## 交接目的

这份文件是给下一个 Codex / AI 窗口的第一入口。当前项目已经上传到 GitHub，公开站点也已经部署；后续开发应优先从 GitHub 仓库、本文档、计划文件和 `agent_memory/` 读取上下文，尽量减少对原电脑散落资料的依赖。

## 必读顺序

1. `AGENTS.md`：项目级协作规则、中文沟通、Headroom、Product Design、RTK、agent_memory 规则。
2. `NEXT_AGENT_HANDOFF.md`：当前交接入口，也就是本文件。
3. `task_plan.md`：阶段计划和已完成阶段。
4. `findings.md`：重要发现、坑点和验证结论。
5. `progress.md`：最近执行进度。
6. `agent_memory/context.md`、`agent_memory/progress.md`、`agent_memory/bugs.md`：当前有效项目记忆、进度和风险。
7. `package.json`、`src/main.jsx`、`src/styles.css`：主技术栈、脚本和当前核心实现。

## 入口链接

- 生产网站：[https://portfolio-site-three-rose.vercel.app](https://portfolio-site-three-rose.vercel.app)
- GitHub 仓库：[https://github.com/Yang-lab1/portfolio-site](https://github.com/Yang-lab1/portfolio-site)
- 当前主分支：`main`
- 当前最新生产部署：`dpl_Dd24jd7oDvcBAgUZ6Q726W7ZZQjR`
- Tresmares 交互保底版本 tag：`fallback-tresmares-orbit-2026-06-19`
- 保底版本对应 commit：`2232277`

## 当前技术栈

- React 19 + Vite 8：单页作品集前端。
- 普通 CSS：主要样式集中在 `src/styles.css`，未使用 Tailwind / shadcn / Next.js。
- GSAP + ScrollTrigger：Hero、sticky/pinned、scroll-driven parallax、Tresmares Expansion 交互。
- `motion/react`：Achievement CountUp 数字动效。
- Remotion 工具链：Hero 螺旋视频生成和素材处理相关工具仍在仓库内。
- Playwright：本地和线上 UI 回归验证。
- Supabase：代码和 SQL 已准备，但真实环境变量尚未配置完成。
- Agent / RAG 方案见 `docs/PORTFOLIO_RAG_AGENT_PLAN.md`。当前前端只做本地动态检索和跳转，尚未接入真实 LLM API。

## 当前已接受的关键状态

### Aircenter 首页方向

- 首页走 aircenter 风格迁移：白底、巨型 `YANG`、螺旋结构体视频、成就数字区、产品三卡区、数字案例、作品墙、黑底 footer。
- Hero 不能出现用户真实姓名，也不要加搜索框、对话框、营销按钮。
- 最底部 footer 无论中文/英文都应保持 `YANG`，不要翻译成中文。
- Hero 螺旋视频目前不是最终满意版本。用户可能会继续提供更好的视频或帧序列；接入时要验证循环、清晰度和不卡顿。

### 产品三卡区

- 当前目标是严格接近 aircenter 三卡参考。
- 桌面只看三张：中间最大，两侧较小、分离、有浅透视/裁切，不叠压到中间。
- 交互应连续拖拽、惯性滑动、松手吸附最近卡片；不要回到阈值切换后卡住的旧逻辑。
- 不要加大标题、大段说明或底部切换按钮。
- 如果用 React Bits 代码，当前项目应粘贴 React 组件源码 + CSS，不要使用 `npx shadcn add`，因为这不是 shadcn/Next/Tailwind 项目。

### Agent 入口

- 右下角入口是 AssistiveTouch 风格浮球，默认可见但不抢主视觉。
- 打开面板后只保留底部搜索/对话输入和回答/结果区域；不要恢复标题、说明文、预设 chips、隐藏入口行或右上角关闭叉。
- 关闭方式：点击浮球切换，或点击面板外空白区域关闭。
- 当前回答必须使用“林杨”，不要写成“羚羊”。
- 当前只是本地站内检索助手：可用项目别名、项目数据和作品入口做动态回答与跳转。真正 API 版应按 `docs/PORTFOLIO_RAG_AGENT_PLAN.md` 的 RAG + 可解释摘要 + 置信度评估方案接入。

### Tresmares Expansion 区

- 该区块替换了原 About 灰底说明区，参考 Tresmares 首页 `Our expansion / We join forces with Banco Santander to reach further`。
- 必须是 pinned/sticky + scroll progress scrub，不是自动播放，也不是普通静态照片墙。
- 现在接受的基线：桌面 7 张可见图，一张正中间，左右各三张，围绕底部中心形成半圆轨道；移动端可减少为 5 张避免横向溢出。
- 图片旋转必须由同一个底部圆心推导，卡片边缘要读作同一半圆的切线关系。
- 可见图片必须保持 `blur(0px)`。底部/边缘消失效果使用白色 wash/erase，不要用整张图高斯模糊。
- 中间图如果看起来灰或糊，先检查图片 URL 是否 404。QA 已加入 `imageLoaded` 检查。
- 当前 smoothness 版本使用 GSAP scrubbed proxy tween 驱动 `renderExpansion(progressState.value)`，并用 DOM ref 更新 active country label，避免滚动时 React 高频 re-render。
- 如果后续 smoothness 改坏，回退到 `fallback-tresmares-orbit-2026-06-19`。

## 最高优先级禁忌

- 不要把作品区改回黑底白字；作品浏览区应保持白底/浅底。
- 不要用上下滚动切换作品卡；上下滚动只滚页面。
- 不要把产品图片 AI 改成新产品。所有 AI 图像处理必须保留原产品形态、颜色、材质、比例和结构，只能改背景、光影、场景、裁切、构图。
- 不要把 PDF/PPT 里为了版式临时加上的文字当成图片内容原样搬进网站；文字应在网页里重新排。
- 不要重新引入 Hero `YANG` 字母重叠、飞散或第二套 wordmark。
- 不要提交密钥、账号、`.env.local`、Vercel 本地元数据、聊天导出或敏感原始第三方资料。

## 当前未完成 / 阻塞项

- Supabase 仍是 `missing-env`。需要用户提供：
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY` 或 `VITE_SUPABASE_ANON_KEY`
  - 并在目标 Supabase 项目执行 `supabase/portfolio_health.sql`
- 国内/香港最终低成本部署方案已有文档和工具，但还没有绑定最终自定义域名，也没有香港/深圳无 VPN 实测证据。
- 作品封面和详情图还会继续替换。用户计划整理一个文件夹，把封面和详情图分门别类后再统一更新。
- 原始聊天全文没有完整进入 GitHub。GitHub 已包含代码、资产、计划、发现、进度和 agent memory，但不包含所有历史对话原文。

## 重要命令

```powershell
cd "C:\Users\Yang\Documents\New project\portfolio-site"
cmd /c npm install
cmd /c npm run build
cmd /c npm run verify:supabase
cmd /c npm run predeploy:china
cmd /c npm run package:china
cmd /c npm run verify:release -- --latest
```

本地 Tresmares QA：

```powershell
C:\Users\Yang\.local\bin\rtk.exe node tmp\verify-tresmares-orbit.mjs
```

线上 Tresmares QA：

```powershell
$env:BASE_URL='https://portfolio-site-three-rose.vercel.app'
C:\Users\Yang\.local\bin\rtk.exe node tmp\verify-tresmares-orbit.mjs
```

Vercel 生产部署：

```powershell
cmd /c npx vercel deploy --prod --yes
```

## 回退方式

如果 Tresmares smoothness 或七卡半圆交互被改坏，先不要盲目重写。可从保底 tag 建分支检查：

```powershell
git switch -c recover/tresmares-baseline fallback-tresmares-orbit-2026-06-19
```

如果只是想看保底版本：

```powershell
git checkout fallback-tresmares-orbit-2026-06-19
```

看完后回主分支：

```powershell
git switch main
```

## 给下一个窗口的启动提示

可以把下面这段直接发给新的 Codex 窗口：

```text
请继续开发这个作品集网站。GitHub 仓库是 https://github.com/Yang-lab1/portfolio-site ，线上站点是 https://portfolio-site-three-rose.vercel.app 。请先读取 AGENTS.md、NEXT_AGENT_HANDOFF.md、task_plan.md、findings.md、progress.md、docs/PORTFOLIO_RAG_AGENT_PLAN.md 和 agent_memory/ 下的 context/progress/bugs，再开始任何修改。当前重点是延续已接受的 Aircenter 首页、产品三卡区、Tresmares Expansion 七卡半圆滚动交互，以及右下角 Agent 的本地检索/RAG 规划，不要破坏 fallback-tresmares-orbit-2026-06-19 之后的已验证状态。任何 UI 修改都要构建并用 Playwright/现有 QA 脚本验证。
```

## 关于本地文件夹是否能删除

不建议现在立刻删除本地项目文件夹。GitHub 已经是代码和已提交资产的权威来源，但本地仍可能有：

- 未整理进仓库的原始设计素材。
- 用户即将补充的封面/详情图文件夹。
- 本地登录状态、Vercel/Supabase 配置上下文。
- 临时 QA 截图或录屏。

更稳的做法是：先从 GitHub 在另一个目录完整 clone 一次，运行 `cmd /c npm install` 和 `cmd /c npm run build` 成功，再确认需要的图片、视频、文档、历史 tag 都在 GitHub 或 archive 文档里，最后再考虑清理旧本地目录。
