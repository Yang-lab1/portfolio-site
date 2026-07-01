# NEXT_AGENT_HANDOFF.md

## 0. 本次交接状态

- 更新时间：2026-07-01
- 当前任务：网站加载慢的首轮性能修复已提交/推送/部署；本轮最新追加修复是提前预取 Product Language 圆形转盘图片、把 Cup's Cup 本地素材更新到圆盘和详情页，并让鼠标停留在圆盘区域时滚轮持续旋转圆盘而不继续翻页。本地桌面/移动验证已通过，发布结果以最新 `git log` 与 Vercel 状态为准。
- 当前工作目录：`C:\Users\Yang\Documents\New project\portfolio-site`
- GitHub 仓库：`https://github.com/Yang-lab1/portfolio-site.git`
- 固定线上地址：`https://portfolio-site-three-rose.vercel.app/`
- 当前分支：`main`
- 本轮开始时最新提交：`9130d94 Update agent handoff documentation`
- 本轮开始前 Git 状态：干净；接手后先检查 `git status`、最新提交和 Vercel 部署状态。
- 当前线程深度链接：`codex://threads/019e0d28-475a-79d1-8bc3-1e8b18096c23`

本文件的目的不是写一份漂亮摘要，而是让下一个窗口可以不重走弯路。请下一位 agent 先读完本文件，再读 `AGENTS.md`、`agent_memory/`、`task_plan.md`、`findings.md`、`progress.md` 和核心代码。

## 1. 接手后第一顺序

1. 读取 `AGENTS.md`。
2. 读取 `agent_memory/context.md`、`agent_memory/progress.md`、`agent_memory/bugs.md`。
3. 读取 `task_plan.md`、`findings.md`、`progress.md`、`NEXT_AGENT_HANDOFF.md`。
4. 检查 `git status`，不要覆盖用户或前一个 agent 未提交的修改。
5. 检查 `git remote -v`，origin 应为 `https://github.com/Yang-lab1/portfolio-site.git`。
6. 如有重要视觉或交互修改，优先使用 Product Design / clone-website 相关能力，再落地到现有 React + CSS。
7. 非简单任务先读 `src/main.jsx`、`src/styles.css`、相关项目数据和图片引用，不要直接重写。
8. 使用 shell 时按 `AGENTS.md` 规则优先用 `C:\Users\Yang\.local\bin\rtk.exe` 包装 `git`、`npm`、大范围 `rg` 等命令。

## 2. 已完成的首轮性能修复：网站加载变慢

用户曾提出“现在网站打开有点慢，之前是一打开所有图片都出来，现在感觉加载很慢”。本轮已继续完成可以本地闭环的首轮排查和最小修复：

- 先用本地生产构建 + Playwright 测量资源瀑布，没有凭感觉压图或改动画。
- 定位到首屏 5 秒内会提前加载页面底部 Product Language 圆盘的 8 张 1254x1254 方图，约 `10.3MB`。
- 每个圆盘 item 渲染两层图片：`.expansion-card-bg` 和 `.expansion-card-img`；两层原本都是 `loading="eager"`。
- 已把这两层改为 `loading="lazy"` + `fetchPriority="low"`，不改图片源、圆盘几何、点击、拖拽、GSAP scroll 行为或详情页数据。
- 已新增页面 `load` 后的低优先级空闲预加载队列：按 3 张一批预热 Daima 后续图、实体产品图、图片墙前段和圆盘图；省流量或 2G 连接时跳过。
- 已新增圆盘段接近视口触发器：`.expansion-section` 接近视口约 1800px 内时提前预热圆盘图，解决快速滚到圆盘区域时图片还没加载的问题。
- 已生成 `640x640` WebP 圆盘首页展示版，文件名为 `*-orbit-fast.webp`；Watsu 接入后当前圆盘为 9 张轻量图。首页圆盘使用这些轻量图，原 1254 方图保留但不再作为首页圆盘首选加载资源。
- 最终实现不是单纯依赖 `img loading`：圆盘图片节点初始不挂载，页面空闲后用同源 `fetch` 预取 WebP 为 blob URL，圆盘接近视口后再挂载真实图片节点并优先使用 blob。
- 2026-07-01 追加优化：用户反馈快速下滑时图片显现仍慢于滚动速度，因此 `expansionCards` 的 9 张圆盘轻量图已提前到首页 warmup 队列前段，并在圆盘组件自身加了约 650ms 的后台 blob 预取保险；仍遵守省流量 / 2G 跳过策略。

本地验证结果：

1. `npm run build` 通过。
2. 桌面 1440x1100 本地生产版：打开 1 秒仍只加载 `6.76MB` 核心资源，圆盘图初始加载数 `0`。
3. 桌面等待约 10 秒后：后续图片开始后台预热，圆盘图仍不抢初始加载。
4. 桌面接近圆盘区后：当前 9 张 WebP 圆盘图全部加载完成，横向溢出 `0`，控制台错误 `0`。
5. 移动端 390x844：初始圆盘图片节点数 `0`，接近圆盘区后当前 9/9 WebP 圆盘图加载完成，横向溢出 `0`，控制台错误 `0`。

仍然未处理的性能候选项：

- `momenta-detail-video.m4v` 体积约 103MB，虽然详情页才会用，但仍是资产和 GitHub/Vercel 风险。
- `miro-hardware-detail-video.mp4` 和 `watsu-detail-video.mp4` 仍可单独检查体积和播放策略。
- 首页横向图片墙完整滚动后图片总量仍较大，后续优化要先看新的 waterfall，再决定是否生成小尺寸衍生图或替换格式。
- 真实线上公网 / 国内网络 waterfall 仍需单独测量；不要只凭本地结果声明国内访问目标完成。

## 3. 技术栈与核心文件

- React 19 + Vite 8。
- 普通 CSS，主要样式在 `src/styles.css`。
- 主要页面、项目数据、组件逻辑集中在 `src/main.jsx`。
- GSAP / ScrollTrigger 用于 Hero、Daima、产品 orbit、圆盘 pinned scroll 等交互。
- Lenis 用于平滑滚动。
- `motion/react` 用于成就数字 CountUp。
- Vercel 部署。
- GitHub 作为代码版本来源。
- AGNES API 已接入 `/api/agent`，不要重接 OpenAI，不要换 provider。
- 环境变量参考 `.env.example` 和 `api/agent.js`，不要把 API key 写入前端或 GitHub。

常用命令：

```powershell
cd "C:\Users\Yang\Documents\New project\portfolio-site"
C:\Users\Yang\.local\bin\rtk.exe cmd /c npm run build
C:\Users\Yang\.local\bin\rtk.exe git status --short
C:\Users\Yang\.local\bin\rtk.exe git log --oneline -12
```

## 4. 首页当前模块顺序

当前首页顺序已经按用户要求调整为：

1. Hero 首屏。
2. Achievement cards / 数字统计。
3. `ModuleIntro` dark variant，AI / Web / App 四联大屏前导语。
4. Daima 四联 fullscreen 作品展示段。
5. `ModuleIntro` 实体产品导语。
6. Physical Product Foundations，三卡实体产品旋转模块。
7. `ModuleIntro` Project Archive 导语。
8. Project Archive，三排横向移动图片墙。
9. Product Language & Sensibility，最后圆形圆盘模块。
10. Footer / Contact / Agent / Email floating controls。

不要把四联大屏和实体产品三卡再换回旧顺序，除非用户明确要求。

## 5. Hero 规则

当前 Hero 是 Aircenter 风格：

- 白底或浅底。
- `YANG` 字母收拢动效。
- 螺旋结构视频来自用户提供帧和本地处理，不是最终完全满意，但当前可用。
- Hero 不要按钮。
- Hero 不要搜索框、聊天框、营销页文案。
- Hero 不要把“林杨”或姓名作为首页主视觉。
- 不要新增第二套 `.air-hero-wordmark`。当前正确实现只用四个 `.air-letter`。

回归重点：

- Hero 中应只有四个原始 `.air-letter`。
- 收拢态 `YANG` 不重叠、不飞散。
- 移动端无横向溢出。

## 6. Achievement Cards

成就数字区当前值：

- Works / 作品入口：`51`
- Clients / 客户协作：`20+`
- Honors / 奖项荣誉：`12+`
- Directions / 能力方向：`4`

已接受行为：

- CountUp 进视口播放，离开再回来会重新播放。
- 不要把奖项问题回答成 51，Agent 问“林杨得过多少奖”应回答 `12+`。
- 当前四联大屏前的黑底导语和成就区之间曾有一条线，已去掉。

## 7. Daima 四联大屏模块

当前 Daima 四联大屏模块是用户长期反复要求复刻的重点，不能退化成普通卡片。

当前四屏：

1. `miro` - Miro AI Rehearsal System
2. `palifood` - Pai Li Shi
3. `libai` - Li Bai Interactive Website
4. `sport` - Home Form Coach

重要历史：

- 最早第四个是 Offer Quest，后来用户要求改为 sport 项目。
- 这里的 sport GitHub：`https://github.com/Yang-lab1/sport`
- sport 线上参考：用户给过 `https://frontend-flame-one-rgedpp5pu4.vercel.app/` 是拍立食，不是 sport。sport 有单独部署记录在旧进度中，接手时不要混。

已接受交互方向：

- fullscreen / 100svh 视觉。
- 四屏滚动过渡。
- 保留本站导航、语言切换、Agent、Email 浮动按钮。
- 点击每屏进入站内项目详情页，不直接跳外部站。
- 标题、分类、过渡、图片切换尽量按 `https://wearedaima.framer.website/` 的交互学习。
- 当前文案支持中英文切换。英文默认，中文切换后四联也显示中文。

严禁：

- 不要把四联大屏图片替换成用户没有要求的新图。
- 不要把四联大屏改成普通项目卡片堆叠。
- 不要恢复 Offer Quest 为第四屏，除非用户明确要求。

## 8. Physical Product Foundations 三卡模块

当前实体产品三卡模块来自 Aircenter / React Bits circular gallery 风格：

- 桌面只显示 3 张：中心最大，左右两张分离并部分出画。
- 拖拽是连续的，带惯性和吸附。
- 左右卡可点击切换，中心卡可打开详情页。
- 移动端只保留主卡，避免横向溢出。

用户已经多次认可该段“可以作为保底”，不要随意退化。

不要做：

- 不要加大标题、说明文、普通按钮。
- 不要把左右卡片完全露出来。
- 不要把侧卡折成很薄。
- 不要让左右卡贴住或压到中心卡。

## 9. Project Archive 横向图片墙

当前图片墙用于两个位置：

- 首页 Project Archive。
- 每个项目详情页最底部，替代旧的“证据 / 同方向作品”模块。

用户明确要求：

- 详情页底部不再出现“证据”和“同方向作品”。
- 详情页底部应复用首页横向移动图片墙。
- 首页原图片墙继续保留。
- 图片墙里的每张图都要可点击进入对应项目详情。
- 图片要铺满卡片，不要四边留白。
- 同一项目或同组项目不要在同一屏挨得太近，避免显得项目很少。

当前实现关键词：

- `DetailShowcaseFooter`
- `ShowcaseRow`
- `buildShowcaseRows`
- `wallGroup`
- `wallImage`
- `wallImageFit`

重要已做图源替换：

- Miro AI 相关图片墙卡片使用 Daima Miro 图：`/portfolio/daima-work-cover-01.png`
- Pai Li Shi / Food Health 相关图片墙卡片使用用户确认的手持手机浅绿图或 Daima 拍立食图，不能随便生成深蓝多文案风格。
- Li Bai 相关卡片使用对应四联图或水墨视觉。
- Sport / Home Form Coach 相关卡片使用运动速度图，注意裁切不能切掉主体脸部。
- Watsu / Cross-ripple 卡片换成用户给的水疗横图，必须铺满卡片。
- Offer Quest 卡片换成用户给的键盘小岛图。
- Feel Disambiguation NLP 卡片换成橙色光圈人物图。
- Capstone / Watch 类卡片有黑底手表图。
- Cup's Cup 卡片换成用户给的杯子水光图。
- Opera 绘画尺卡片已改成满铺，不要四边留白。

近期用户仍在细调图片墙：

- 某些重复项目仍可能太近，后续如用户指出，优先调 `buildShowcaseRows` 分布和 `wallGroup`，不要把同一图随便删掉。
- 用户会继续给图替换卡片。

## 10. Product Language & Sensibility 圆形圆盘模块

这是最后的圆形圆盘模块，定位是 Product Language & Sensibility / 产品语言与感知。

当前 `expansionCards` 精确为：

1. `xiaomi-cmf`，projectId `xiaomi-cmf`，label `Xiaomi`，图 `/portfolio/xiaomi-cmf-orbit-fast.webp`
2. `cat-turntable`，projectId `cat-turntable`，label `CatToy`，图 `/portfolio/cat-toy-orbit-fast.webp`
3. `cup-cup`，projectId `cup-cup`，label `Cup's Cup`，图 `/portfolio/cup-cup-orbit-fast.webp`
4. `opera-ruler`，projectId `opera-ruler`，label `Opera`，图 `/portfolio/opera-ruler-orbit-fast.webp`
5. `watsu`，projectId `cross-ripple`，label `Watsu`，图 `/portfolio/watsu-orbit-fast.webp`
6. `miro-hardware`，projectId `miro-hardware`，label `Miro`，图 `/portfolio/miro-hardware-orbit-fast.webp`
7. `momenta-touch`，projectId `momenta-touch`，label `Momenta`，图 `/portfolio/momenta-orbit-fast.webp`
8. `capstone-device`，projectId `capstone-device`，label `Capstone`，图 `/portfolio/capstone-device-orbit-fast.webp`
9. `cmf-electronics`，projectId `cmf-electronics`，label `Watch`，图 `/portfolio/capstone-watch-orbit-fast.webp`

当前圆盘滚轮交互规则：
- 圆盘仍是 GSAP ScrollTrigger pinned section + scrub 的主结构，不要改成普通静态卡片墙。
- 当页面已进入圆盘阶段，且鼠标位于圆盘图片或下方圆盘区域内时，wheel 事件会被捕获并转化为圆盘旋转；此时页面 `scrollY` 不应继续向下。
- 鼠标离开圆盘图片/圆盘区域，移动到旁边或上方空白处后再滚轮，页面应恢复正常向下滚动。
- 这个行为来自用户 2026-07-01 的明确要求：只要鼠标还在整个圆盘外围区域内，滚轮就可以无限循环旋转圆盘；不要在未复测前删除或弱化。

这里有几个非常容易搞错的点：

- `miro` 是 AI / Web 演练系统。
- `miro-hardware` 是用户后面给的 Miro 硬件设备，只用于圆盘和硬件详情页。
- `momenta` 是 UI / App 项目。
- `momenta-touch` 是硬件项目，正式叫 `Momenta Touch`，只用于圆盘和硬件详情页。
- `cross-ripple` 是 Watsu / 水疗训练穿戴项目，圆盘短名为 `Watsu`。
- 不要把 `momenta-touch` 的图或视频塞进旧 `momenta` UI 项目。
- 不要把 `miro-hardware` 覆盖原 `miro`。

当前圆盘文本：

- EN 小标题：`Product Language`
- EN 主标题：`Language grows from / use and feeling / and moves toward / clear identity`
- ZH 小标题：`产品语言`
- ZH 主标题：`产品语言来自 / 使用与感受 / 并走向 / 清晰的识别`
- 红色强调词：`use and feeling` / `使用与感受`

当前圆盘图片规则：

- 用户要求正方形卡片要铺满，不要四边留白。
- 最近已按 1254x1254 方图处理多张圆盘图片。
- `.expansion-card-img` 当前 padding 为 0，`object-fit: cover`。
- 但如果后续用户给的产品图主体很细或会被裁掉，不能简单放大；应使用用户文件夹里的正方形定稿图，或做不改变主体的正方形适配。
- 不能把 AI/Web 截图、数据图、知识图谱放进这个圆盘模块。

## 11. 详情页当前规则

详情页顶部已按用户要求压缩为较小、克制的信息区：

- 左侧：Back、分类、项目标题、短说明。
- 右侧：Year、Role、Source status。
- 字号不能再变成巨大、满屏、丑的说明页。

首图 / 媒体规则：

- Web / App / 数字产品类可以用黑底透视舞台，滚动时逐渐拉平。
- 工业设计、产品外观、CMF、硬件、资料证据图不要套 Web/App 倾斜模板。
- 工业设计产品详情页可以直接放图片和视频，不需要硬写 case-study 文本模板。
- 用户多次强调：产品图片不能被 AI 改结构、颜色、材质、比例。

详情页底部：

- 旧“证据”和“同方向作品”已删除。
- 现在统一用 `DetailShowcaseFooter` 复用三排横向图片墙。

## 12. 重要项目 slug 与语义

不要凭中文名字新造 slug。优先用现有项目数据。

- `miro`：Miro AI Rehearsal System，AI/Web 演练系统。
- `miro-hardware`：Miro 硬件设备，圆盘短名 Miro。
- `palifood`：拍立食 / Pai Li Shi。
- `libai`：李白互动网站。
- `sport`：Home Form Coach，运动姿态教练，Daima 第四屏。
- `offer-quest`：Offer Quest，仍在项目库和图片墙中，但不在当前四联大屏。
- `momenta`：Momenta UI / App 项目。
- `momenta-touch`：Momenta Touch，硬件设备概念，只用于圆盘和硬件详情。
- `cat-turntable`：复合转盘猫玩具 / CatToy。
- `cross-ripple`：Watsu / 水疗复健方向。
- `xiaomi-cmf`：小米第一代骨传导耳机 CMF。
- `cup-cup`：杯中杯。
- `opera-ruler`：川剧儿童绘画尺。
- `cmf-electronics`：电子产品 CMF 档案，圆盘短名目前显示为 Watch。
- `capstone-device`：Capstone AI 设备概念。
- `ufei-precision-cabinet`：立式高精度柜。
- `heart-bracelet`：心脏病手环套件，目前真实素材仍不完整，注意不要编造。

## 13. 最近接入的产品素材

### Momenta Touch

来源：`C:\Users\Yang\Desktop\作品集\momenta`

当前站内资源：

- `/portfolio/momenta-orbit-square.png`
- `/portfolio/momenta-detail-video.m4v`
- `/portfolio/momenta-detail-01.png` 到 `/portfolio/momenta-detail-08.png`

规则：

- 这是硬件外观项目，正式名 `Momenta Touch`。
- 不要覆盖 `momenta` UI 项目。
- 详情页应先放视频，再放 8 张图。
- 不要写 Web/App case-study 模板。

### CatToy

来源：`C:\Users\Yang\Desktop\作品集\CatToy`

当前站内资源：

- `/portfolio/cat-toy-orbit-square.png`
- `/portfolio/cat-toy-detail-01.png` 到 `/portfolio/cat-toy-detail-05.png`

规则：

- 用户按命名排好顺序，按顺序放。
- 不要再自由生成猫玩具图。
- 详情页使用产品媒体呈现，不用网页倾斜模板。

### Miro Hardware

来源：`C:\Users\Yang\Desktop\作品集\miro`

当前站内资源：

- `/portfolio/miro-hardware-orbit-square.png`
- `/portfolio/miro-hardware-detail-video.mp4`
- `/portfolio/miro-hardware-detail-01.png` 到 `/portfolio/miro-hardware-detail-04.png`

规则：

- 这是硬件设备。
- 不要覆盖 `miro` AI/Web 演练系统。

### Watsu / Cross-ripple

来源：`C:\Users\Yang\Desktop\作品集\旋转圆盘\watsu`

当前站内资源：

- `/portfolio/watsu-orbit-square.png`
- `/portfolio/watsu-orbit-fast.webp`
- `/portfolio/watsu-detail-video.mp4`
- `/portfolio/watsu-detail-01.png` 到 `/portfolio/watsu-detail-08.png`
- 首页图片墙横图：`/portfolio/watsu-hydrotherapy-wall-card.png`

规则：

- 详情页先视频，再按用户更新后的顺序放详情图。
- 图片墙横图和圆盘正方形图是不同用途，不要混。

### Cup's Cup

来源：`C:\Users\Yang\Desktop\作品集\旋转圆盘\cup‘s cup`

当前站内资源：
- `/portfolio/cup-cup-orbit-square.png`
- `/portfolio/cup-cup-orbit-fast.webp`
- `/portfolio/cup-cup-detail-01.png` 到 `/portfolio/cup-cup-detail-08.png`
- 首页图片墙横图仍为：`/portfolio/cup-cup-wall-card.png`

规则：
- `cup-cup-orbit-square.png` 来自用户文件夹内 `正方形.png`，用于项目封面与圆盘源图；`cup-cup-orbit-fast.webp` 是从它生成的 640 圆盘轻量图。
- 详情页 8 张宽幅图按用户文件夹中 `详情页第一张图.png` 到 `详情页第八张图.png` 的顺序接入。
- 图片墙横图 `cup-cup-wall-card.png` 是之前已调好的卡片图，本轮刻意不替换，除非用户明确要求改图片墙。

### Pai Li Shi

用户确认的关键图：

- `C:\Users\Yang\Desktop\作品集\拍立食\1.png`
- 站内对应：`/portfolio/palifood-handheld-fresh.png`

规则：

- 这张图是用户已做好的成品图。
- 不要改色调、排版、风格。
- 只允许做尺寸和比例适配。
- 未来生成拍立食新图时，必须一比一照参考图：浅绿色背景、手机承载 UI、低文字密度、整体简洁。
- 不要把 App 原始截图作为巨大横图直接铺在网页里。

### Xiaomi CMF

规则：

- 这是第一代小米骨传导耳机 CMF。
- 官方官网现在能找到的多是第二代，不能直接替换成第二代产品图。
- 当前 remastered 版本是保留原图 identity 的适配。

## 14. Agent / AGNES 规则

AGNES API 已接入，不要重做 UI，不要换 provider，不要暴露 key。

后端：

- `/api/agent`
- `src/lib/agentClient.js`

前端行为：

- 面板提交时优先请求 `/api/agent`。
- 如果未配置 key 或上游失败，会 fallback 到本地匹配。
- 右侧浮球打开时不隐藏。
- 没有顶部 X。
- 没有语音按钮。
- 点击浮球或面板外空白关闭。
- collapse / re-expand 必须清空旧输入、旧答案、loading、error、按钮、候选。
- loading 时 collapse，旧请求回来不能写回 UI。
- loading 用 Siri 式光圈，不要写“我先理解你的问题”。
- 不展示 CoT、置信度、debug、系统 prompt。

意图模式：

- `navigate`：在哪里 / 找不到 / 打开 / 跳转 / 带我去。唯一匹配时直接跳转，不输出长解释。
- `answer_with_navigation`：是干嘛的 / 介绍 / 痛点 / 服务谁 / 解决什么 / 做得怎么样。先自然回答，同一回答块下面只显示一个黑色按钮。
- `answer`：人物能力、作品数量、招聘视角、闲聊。不显示项目按钮，除非明确要看项目。
- `clarify`：多项目匹配时让用户选择。
- `refusal` / `soft_refusal`：天气、股票、新闻等实时外部问题没有工具时温和拉回作品集。

重点匹配：

- `拍历史`、`拍立食`、`pailishi` 只能匹配 `palifood`，不能混入 Miro。
- `Miro` / `miro` / `AI 演练系统` 匹配 `miro`。
- “林杨得过多少奖”应回答 `12+`。

## 15. 语言与导航

当前默认语言：英文。

Header：

- 圆圈里写 `YANG`。
- 旁边写 `Portfolio` / `作品集`。
- 不要写 `AI Portfolio` / `AI 作品集`。

语言：

- 英文默认应尽量全英文。
- 切换中文后对应 UI 和四联大屏应显示中文。
- 图片里的中文属于项目视觉内容，不算语言状态错误。

GooeyNav：

- 不要让 Work / About 外层出现矩形框。
- 只允许 active pill 有黑色胶囊视觉。

## 16. Email / Agent 浮动按钮

Email 按钮参考 Bill Chien，但适配黑白系统：

- 默认黑色圆形。
- 点击后向左展开黑色 pill。
- 文案 `EMAIL COPIED`。
- 邮件图标右侧保留。
- 第二次点击展开状态时应是按压反馈，不应缩回再展开。
- 不要使用黄色主题。

Agent 浮球：

- 样式与邮箱按钮成对。
- 图标可替换，但弹出的面板仍保持之前 AGNES 面板逻辑。

## 17. 用户对文案的偏好

用户非常反感第三人称硬夸、AI 味、长说明、营销话术。

更适合的文案风格：

- 克制。
- 第一人称或无主语都可以，不要所有句子都用“我”开头。
- 字数要对齐原模块排版，不能忽长忽短。
- 高端作品集 / 建筑事务所 / 展览文案感。
- 图片是主体，文字只是辅助。

已选中的实体产品段文案曾为：

EN:

```text
Product form grows from
Use and Feeling into
clarity
```

ZH:

```text
产品形态来自
使用与感受 并走向
清晰
```

Bottom EN:

```text
The work is about shaping what people see, touch, understand, and remember through form language, surface treatment, ergonomics, and product identity.
```

Bottom ZH:

```text
这些作品关注人们看见、触摸、理解和记住的部分，并通过形态语言、表面处理、人机与产品识别去塑造它们。
```

后来圆盘模块已经更新为 Product Language & Sensibility 的新文案，但这个偏好仍然有参考价值。

## 18. 图片生成与产品图处理红线

用户多次强调：

- 产品图片不能被 AI 改结构、颜色、材质、比例。
- 可以改背景、光影、场景、裁切、构图。
- 已经给出的成品图不要重新生成。
- 如果尺寸不对，只做尺寸适配。
- 生成新图必须跟项目原有风格、色调、排版思路一致。
- 不要凭感觉加深蓝、加一堆文字、加新构图。
- App 截图应放进手机屏幕里，不应作为一张大横图铺满详情页。
- 工业设计产品详情页直接放图和视频即可，不要强行套 Web/App 案例说明模板。

## 19. 已删除模块

首页曾有“不是堆项目，而是能力组合。”能力雷达 / 能力组合板块。

用户要求删除，当前应已删除。

不要再加回来。

## 20. 已知风险与未完成项

### 性能风险

- 首轮加载问题已本地修复：底部圆盘双层图片不再 eager 抢首屏网络，首页圆盘使用 640 WebP 展示版，并在圆盘组件自身约 650ms 后提前后台预取 9 张圆盘 blob。
- 快速滚到圆盘时图片空白/慢显的问题已本地缓解并验证：桌面/移动本地生产版进入圆盘前可观察到 9 张圆盘轻量图预取，圆盘区 9/9 图片加载完成。
- 大视频资源仍需要单独测量，尤其是 `momenta-detail-video.m4v` 约 103MB。
- 图片墙完整滚动后的总图片体积仍较大，后续要先测 waterfall 再优化。

### HeartKit / heart-bracelet

- `heart-bracelet` 仍缺可靠真实素材。
- 不要把 `bracelet-kit-clean.jpg` 当真实心脏病手环素材，历史检查显示它不可靠。
- 用户后续可能会单独提供素材。

### Momenta Touch 视频

- `momenta-detail-video.m4v` 约 103MB，有 GitHub / Vercel / 首次播放风险。
- 若后续 push 或加载出问题，优先转码压缩，但要先和用户确认画质目标。

### Supabase

- Supabase 仍是 `missing-env`，需要真实 `VITE_SUPABASE_URL` 和 publishable/anon key。
- 不要要求用户把密钥贴在聊天里。让用户放到 Vercel Environment Variables 或本地 `.env.local`。

### 国内访问

- 中国大陆 / 香港访问方案已有旧文档和审计脚本，但没有最终域名、香港/深圳实测。
- 不要声明中国访问目标已完成。

### 图片墙重复与裁切

- 图片墙仍可能被用户继续指出某些项目重复太近、裁切不准、没有铺满。
- 后续处理优先读项目数据和 `wallGroup`，不要乱换详情页图。

### 圆盘方图

- 用户明确要求圆盘正方形卡片不要四边留白，主体要保留。
- 对已提供产品文件夹的项目，优先使用文件夹内正方形图。

## 21. 验证清单

做任何视觉 / UI / 交互修改后至少检查：

1. `npm run build` 通过。
2. 首页可打开。
3. 默认英文，中文切换正常。
4. Header 显示 `YANG` / `Portfolio`，中文为 `作品集`。
5. Agent 浮球和邮箱浮球仍在。
6. Daima 四联仍是 fullscreen，不是普通卡片。
7. Daima 四屏点击能进对应详情页。
8. 产品三卡拖拽、惯性、点击仍正常。
9. 图片墙自动移动、拖拽、点击仍正常。
10. 详情页底部没有“证据 / 同方向作品”，而是图片墙。
11. 圆盘模块 9 个 item 可点击，且进入正确详情页；其中 Watsu 必须进入 `cross-ripple`，Cup's Cup 必须进入 `cup-cup` 并显示 8 张详情图。
12. 快速滚到圆盘区域时 9/9 圆盘图加载完成；鼠标在圆盘图片/下方圆盘区域内滚轮应旋转圆盘且不继续翻页，鼠标移到圆盘区域外空白处滚轮应恢复页面滚动。
13. `miro` 和 `miro-hardware` 不混。
14. `momenta` 和 `momenta-touch` 不混。
15. 桌面端和 390px 左右移动端无横向溢出。
16. Agent 回归：拍立食不混 Miro，奖项回答 12+，collapse 后清空旧会话。

## 22. 部署与版本规则

重要可展示版本应：

1. `npm run build`
2. 浏览器 / Playwright 检查桌面和移动端关键页面
3. `git status`
4. commit
5. push 到 GitHub
6. deploy 到 Vercel
7. 给用户固定线上地址、commit、分支、验证项

本轮已经包含一处运行时代码修改和记录文件更新，用户已要求提交、推送并触发 Vercel 重新部署；发布结果以最新 `git log`、GitHub/Vercel 状态和线上验证为准。

## 23. 给下一个窗口的建议启动提示

可以直接把下面这段给新的 Codex：

```text
你现在接手的是林杨 / Yang 的个人作品集网站。工作目录是 C:\Users\Yang\Documents\New project\portfolio-site，GitHub 是 https://github.com/Yang-lab1/portfolio-site.git，线上固定地址是 https://portfolio-site-three-rose.vercel.app/。请先读取 AGENTS.md、NEXT_AGENT_HANDOFF.md、agent_memory/context.md、agent_memory/progress.md、agent_memory/bugs.md、task_plan.md、findings.md、progress.md，再开始任何修改。当前最新提交从 9130d94 之后继续，首页结构、Daima 四联、实体产品三卡、横向图片墙、产品语言圆盘、AGNES Agent 和邮箱浮球都已有大量确认规则，不要重写。网站加载慢的首轮修复已完成：底部圆盘首页展示图改为 640 WebP，圆盘双层图片初始 lazy + low，接近圆盘区后 eager + high，并新增页面稳定后的低优先级图片预热队列；已通过本地生产构建和桌面/移动 Playwright 验证。接手后先看 git status、最新提交和 Vercel 部署状态。
```
