# 当前任务进度

## 2026-07-01 圆盘加载、Cup's Cup 素材与滚轮交互修复
- 已按用户紧急反馈继续处理最后 Product Language 圆形转盘：用户指出快速下滑到圆盘时图片显现速度仍跟不上滚动速度，同时要求接入 `C:\Users\Yang\Desktop\作品集\旋转圆盘\cup‘s cup` 中的 Cup's Cup 素材，并修正鼠标停留在圆盘区域时滚轮应持续旋转圆盘而不是继续翻页的问题。
- 已把 Cup's Cup 文件夹素材更新到站内：`正方形.png` 覆盖为 `/portfolio/cup-cup-orbit-square.png`，并重新生成 `/portfolio/cup-cup-orbit-fast.webp`（640x640 WebP，约 14KB）；`详情页第一张图.png` 到 `详情页第八张图.png` 按顺序接入为 `/portfolio/cup-cup-detail-01.png` 到 `/portfolio/cup-cup-detail-08.png`。
- 已更新 `cup-cup` 项目数据：圆盘/详情封面使用新的正方形图，详情页 gallery 使用 8 张宽幅详情图，来源记录为用户给定本地文件夹；图片墙原 `cup-cup-wall-card.png` 保持不动，避免影响之前已调好的首页图片墙。
- 已把圆盘 9 张轻量图提前纳入首页 warmup，并在圆盘组件自身加 650ms 早期预取保险：`expansionCards` 图片在 Daima 后续图之后优先预热，圆盘 blob 预取从原来的 load 后较晚队列提前到页面稳定约 650ms 后启动，同时向 `<head>` 插入 9 个圆盘 WebP 的 `preload` 链接，仍保持省流量/2G 跳过策略。
- 已新增圆盘滚轮捕获逻辑：当页面已经进入圆盘阶段，且鼠标位于圆盘图片或下方圆盘区域内时，滚轮只驱动圆盘无限旋转并阻止页面继续下滑；鼠标移到圆盘区域外的空白处再滚动时，页面恢复正常向下滚动。
- 验证已通过：`npm run build`；本地生产版桌面 1440x1100 打开约 3.2 秒后已预取 9 张圆盘轻量图，快速滚到圆盘后 9/9 图片已加载、横向溢出 `0`；圆盘区域内滚轮保持页面 `scrollY` 不变并切换 active 卡，圆盘外空白滚轮可继续翻页；点击 Cup's Cup 可进入详情页，8 张详情图正常显示为宽幅图。
- 移动端 390x844 验证已通过：打开约 3.2 秒后已预取 9 张圆盘轻量图，圆盘区 9/9 图片已加载、横向溢出 `0`；Cup's Cup 详情页标题正确、8 张详情图存在、首张为 `/portfolio/cup-cup-detail-01.png`，控制台无错误。

## 2026-07-01 Watsu 接入 Product Language 圆形转盘
- 已按用户要求检查 `C:\Users\Yang\Desktop\作品集\旋转圆盘\watsu`：对应详情项目 `cross-ripple` 和站内素材已存在，但首页最后的 Product Language 圆形转盘 `expansionCards` 中还没有 Watsu。
- 已生成轻量圆盘图 `/portfolio/watsu-orbit-fast.webp`（640x640 WebP，约 15KB），避免把原 1254 方图重新放回首页圆盘加载路径。
- 已在 `expansionCards` 中新增 Watsu 卡片：`id: 'watsu'`、`projectId: 'cross-ripple'`、label `Watsu`，点击进入现有 Cross-ripple / Watsu 详情页。
- 保留现有圆盘几何、GSAP scroll、拖拽/点击、图片 blob 预取和接近视口挂载逻辑；本轮只新增一张轻量图和一条卡片数据。
- 验证已通过：`npm run build`；本地生产版 Playwright 桌面 1440x1200 与移动 390x844 均为 9 张圆盘卡、9/9 WebP 图片加载完成、横向溢出 `0`、控制台错误 `0`；桌面点击 Watsu 可进入 Cross-ripple 详情，且 Watsu 媒体正常渲染。

## 2026-07-01 首页图片加载优化
- 已继续完成交接里暂停的“网站加载慢”排查，先本地生产构建并用 Playwright 抓资源瀑布，不凭感觉压图或重写动画。
- 实测首屏 5 秒内原本会提前加载最后 Product Language 圆盘的 8 张 1254x1254 方图，约 `10.3MB`；这些图片位于页面底部，且每个 item 有 `.expansion-card-bg` / `.expansion-card-img` 两层。
- 已做最小代码修改：只把这两层圆盘图从 `loading="eager"` 改为 `loading="lazy"`，并加 `fetchPriority="low"`；不改图片源、圆盘几何、点击、拖拽、GSAP scroll 行为或详情页数据。
- 已补充首屏稳定后的空闲预加载队列：页面 `load` 后等待空闲，再按 3 张一批、`fetchPriority="low"` 预热 Daima 后续图、实体产品、图片墙前段和底部圆盘图；开启省流量或 2G 连接时跳过。
- 已给圆盘段补充接近视口触发器：当 `.expansion-section` 距离视口约 1800px 内时，立即低优先级预热 8 张圆盘图，避免快速滚动到圆盘区域时仍等待图片。
- 已生成 8 张 640x640 WebP 圆盘首页展示版（`*-orbit-fast.webp`），合计约 198KB；原 1254 方图保留在仓库中，不作为首页圆盘首选加载资源。
- 已将圆盘 WebP 在页面空闲后通过同源 `fetch` 预取为 blob URL；圆盘接近视口时再挂载真实图片节点，优先使用已预取的 blob，避免线上 `img` lazy/eager 调度不稳定。
- 验证已通过：`npm run build`；桌面 1440x1100 本地生产版初始只保留 8 个圆盘卡片壳、图片节点数 `0`；页面空闲预取后接近圆盘区会挂载 8 张 blob/WebP 图并全部加载完成，横向溢出 `0`，控制台错误 `0`。
- 移动端 390x844 验证通过：初始图片节点数 `0`，接近圆盘区后 8/8 WebP 圆盘图加载完成，横向溢出 `0`，控制台错误 `0`。
- 仍未处理：`momenta-detail-video.m4v` 约 103MB、图片墙大量视觉资产、真实线上网络环境和 Vercel 部署后的 waterfall；这些需要后续单独测量后再决定是否转码或生成小尺寸衍生图。

## 2026-07-01 全量交接文档
- 用户要求暂时停止网站加载变慢问题，不继续做性能排查或代码优化；本轮没有修改运行时代码、图片加载策略、视频压缩或 Vercel 配置。
- 已重写 `NEXT_AGENT_HANDOFF.md`，把当前工作目录、线上地址、GitHub、最新提交、首页模块顺序、Daima 四联、实体产品三卡、横向图片墙、产品语言圆盘、详情页规则、AGNES Agent、Email 浮球、图片生成红线、已知风险与下一步验证清单集中整理为下一窗口第一入口。
- 已核对当前圆盘 `expansionCards` 的真实状态：Xiaomi、CatToy、Cup's Cup、Opera、Miro 硬件、Momenta Touch、Capstone、Watch；特别标注 `miro` / `miro-hardware` 和 `momenta` / `momenta-touch` 不能混。
- 已记录加载变慢的未验证怀疑点：圆盘 8 张大方图、每个圆盘 item 双层 eager 图片、Momenta Touch 大视频和图片墙大量视觉资产；下一位 agent 如继续性能任务，应先测量 network waterfall，再做最小优化。

## 2026-06-30 圆盘方图、Miro 硬件与 Watsu 详情接入
- 按用户要求修正最后圆形圆盘卡片：所有圆盘图片都改为 1254x1254 方图，`.expansion-card-img` 统一 `padding: 0`、`object-fit: cover`，不再出现四边灰/白留边；已有产品文件夹提供的正方形图直接使用。
- 新增独立项目 `miro-hardware`，只代表用户刚给的 Miro 硬件设备，不覆盖原有 `miro` AI/Web 演练系统；圆盘入口短名为 `Miro`，详情页为 `mediaOnlyDetail`，先放压缩后的 `miro-hardware-detail-video.mp4`，再放 4 张宽幅详情图。
- 更新 `cross-ripple` / Watsu 详情页：使用 `C:\Users\Yang\Desktop\作品集\旋转圆盘\watsu` 中最新素材，先放 `watsu-detail-video.mp4`，再按用户更新后的顺序放 8 张图 `watsu-detail-01.png` 到 `watsu-detail-08.png`；项目封面换为 `watsu-orbit-square.png`，但首页图片墙原 Watsu 横图保持不动。
- 四联大屏前 `ModuleIntro` dark variant 已去掉成就区下方可见横线，并加大三行小字上下留白；当前桌面 padding 约 `151px / 132px`，移动端约 `88px / 82px`，黑底全宽，文字仍为浅灰白小字。
- 验证已通过：`npm run build`；Playwright 桌面 1440x920 与移动 390x844 检查确认 dark intro 背景/留白、圆盘卡片无 padding、Miro 硬件视频+4图、Watsu 视频+8图顺序均正确。

## 2026-06-30 圆形圆盘真实产品与 Momenta Touch
- 已把最后的圆形圆盘模块从占位内容替换为真实产品入口：Xiaomi、CatToy、Cup's Cup、Opera、HeartKit、Momenta、Capstone、Watch；圆盘 item 改为可点击按钮，继续保留原有旋转/拖拽/hover 逻辑，并通过现有 `onOpenProject` 路由进入详情页。
- 新增独立硬件项目 `momenta-touch`，标题为 `Momenta Touch`，不覆盖原有 UI 项目 `momenta`。该项目只用于产品语言圆盘和详情页，类型按工业设计 / 硬件概念处理。
- 已从 `C:\Users\Yang\Desktop\作品集\momenta` 接入 `正方形.png` 作为圆盘正方形图，接入 `X2.m4v` 作为详情页视频，并按用户给定顺序接入 `详情页第一张图.png` 到 `详情页第八张图.png`。
- `momenta-touch` 详情页启用 `mediaOnlyDetail`：顶部仍保留项目简短解释，往下先显示视频，再显示八张图片；不渲染数字/Web 项目的 case-study 文字模板，避免把工业设计外观项目做成网页项目说明页。
- 四联大屏前的 `ModuleIntro` 已使用 dark variant，背景与 Daima 深色段落连续，文字为浅灰白小字；其他模块导语仍保持原有节奏。
- 本地验证已通过：`npm run build`；Playwright 桌面/移动端检查圆盘 8 个 item、Momenta Touch 跳转、视频+八图顺序、无 case-study 模板、四联导语黑底、无横向溢出。

## 2026-06-30 CatToy 圆盘与详情素材替换
- 已从 `C:\Users\Yang\Desktop\作品集\CatToy` 接入用户准备好的素材：`正方形.png` 复制为 `cat-toy-orbit-square.png`，五张 `详情页第X张图.png` 按第一到第五顺序复制为 `cat-toy-detail-01.png` 到 `cat-toy-detail-05.png`。
- 圆形圆盘里的 `CatToy` item 已改用新的正方形封面；`cat-turntable` 详情页 gallery 已改为五张新横向图，并启用 `mediaOnlyDetail`，不再渲染 case-study 文字模板。
- 新增 `detail-media-product-wide-frame` 展示规则，按 1916:821 原比例显示 CatToy 宽幅产品图；桌面和移动端都保持原图比例，不做网页截图倾斜模板。
- 本次刻意没有更换横向图片墙里的猫玩具卡片，也没有更换实体产品旋转模块主图，避免影响用户之前已调过的首页图片墙/实体产品节奏；后续如用户明确要求再单独替换。
- 本地验证已通过：`npm run build`；Playwright 桌面确认 CatToy 圆盘点击可进入详情、详情页 5 张图顺序正确且无 case-study；移动端确认首图 390x167、无横向溢出。

## 2026-06-30 首页模块顺序与章节导语
- 按用户要求仅调整首页模块渲染顺序：Hero、成就数字、Daima 四联大屏、实体产品旋转模块、横向图片墙、圆形圆盘模块、Footer/Agent 等原有内容。
- 新增可复用 `ModuleIntro`，分别为 AI/Web/App 四联大屏、实体产品模块、Project Archive 图片墙接入中英文小字导语；导语为居中浅灰小字号，不加卡片、边框或阴影，且 `pointer-events: none` 不影响点击和拖拽。
- 更新圆形圆盘模块文案为 `Product Language / 产品语言` 方向，保留红色强调词视觉，并新增轻量 `.text-emphasis`。
- 本地验证已通过：`npm run build`；Playwright 检查桌面模块顺序、英文/中文语言切换、Agent/邮箱按钮存在、桌面与 390px 移动端横向溢出均为 `0`，并确认 Daima、实体产品旋转卡、图片墙卡片仍可点击进入详情页。

## 2026-06-29 图片墙指定卡片图源修正
- 继续修正用户截图中红框旧白底设备拆解卡：确认其实际来源为 `cmf-electronics` 照片墙卡片，而不是 `capstone-device`；已为 `cmf-electronics` 单独指定 `wallImage: /portfolio/capstone-watch-wall-card.png`，并把桌面横向 gap 提高到约 64px，避免卡片左右挤贴。
- 按用户最新指定，只调整横向图片墙卡片图源，不改 Daima 四连屏本体、不改详情页主图结构。
- `The Cup's Cup` 图片墙卡片已按用户指定替换为水杯成品图适配版 `cup-cup-wall-card.png`，并单独使用 `wallImageFit: cover` 满铺卡片；详情页仍保留原来的 `cup-cup-stage.jpg` 结构。
- `Miro AI Rehearsal System` 与 `Miro AI Governance Notes` 的图片墙卡片已改用四连屏 Miro 图 `daima-work-cover-01.png`；`Pai Li Shi` 与 `Food Health Feedback Model` 的图片墙卡片已改用四连屏拍立食图 `daima-work-cover-02.png`。
- `Offer Quest` 图片墙卡片已改用用户提供的键盘小岛图并生成适配版 `offer-quest-keyboard-wall-card.png`；`Feel Disambiguation NLP` 图片墙卡片已改用用户提供的橙色光圈图并生成适配版 `cbs5502-nlp-wall-card.png`。
- `Capstone AI Device Concept` 图片墙卡片已按用户指定替换为黑底手表图适配版 `capstone-watch-wall-card.png`；`Sichuan Opera Drawing Ruler` 图片墙卡片已改用满铺适配版 `opera-ruler-wall-card.jpg`，避免继承详情页 `contain` 造成四周留边。
- 图片墙排序已升级为按 `wallGroup` 去重：Miro / 拍立食 / 李白 / TCM 等同源或同视觉项目不再同时出现在横向图片墙里，避免同一屏看到重复卡片造成项目数量偏少的观感。
- 图片墙每行已从 6 张短循环改为完整项目序列错位循环，并把桌面横向 gap 从 18px 提高为响应式较大间距，减少同屏重复和左右挤贴；旧手表拆解图的可见模块入口已替换为黑底手表图。
- 注意：截图里被标为 Miro 的灰色圆形产品卡在项目数据中不是 Miro 项目，未强行改为 Miro 图，避免图片与点击详情页错配。

## 2026-06-29 图片墙点击与水疗卡片满铺修正
- 修复横向图片墙在 GSAP 持续移动时普通鼠标点击可能不触发原生 click 的问题：桌面端改为在 `pointerup` 判断短按直接进入对应项目，拖拽时仍不误跳；键盘/触摸保留 click 兜底。
- 重新生成 `public/portfolio/watsu-hydrotherapy-wall-card.png` 为 1.62:1 满铺 cover 裁切版，并为 `cross-ripple` 单独设置 `wallImageFit: 'cover'`，避免继承详情页 `imageFit: contain` 导致图片墙留四边。
- 去掉图片墙卡片正面的 1px 边框，让图片直接贴满圆角卡片。
- 本地验证已通过：`npm run build`；Playwright 确认真实鼠标点击图片墙可进入详情、22 个首页图片墙项目均可打开详情、水疗图片自然尺寸 `1944x1200` 且显示尺寸与卡片完全一致、桌面和移动端横向溢出均为 `0`。

## 2026-06-29 图片墙资产与跳转修正
- 按用户要求只调整横向图片墙，不改 Daima 四连屏本身：Miro、拍立食、李白、Home Form Coach 的图片墙卡片分别改用对应四连屏相关视觉，其中拍立食统一使用用户确认的浅绿色手持手机成品图。
- 新增图片墙专用适配图：`miro-daima-wall-card.png`、`palifood-handheld-wall-card.png`、`libai-daima-wall-card.png`、`sport-daima-wall-card.png`、`watsu-hydrotherapy-wall-card.png`，均按图片墙卡片比例重新做画布适配，避免直接硬裁或随机放大。
- 已将水疗 / Cross-ripple Hydrotherapy Wearable 图片墙卡片替换为用户提供的 `watsu/图片1.png` 适配版本；sport 卡片重新适配裁切，避免半张脸被裁掉。
- 图片墙排序增加 `wallGroup` 防邻接逻辑，避免同一项目/同源项目连续挨在一起；首页和详情页底部图片墙共用同一排序逻辑。
- 本地验证已通过：`npm run build`；Playwright 确认首页与详情页图片墙图源正确、无同组相邻、卡片可点击进入对应项目，桌面和移动端横向溢出均为 `0`。

## 2026-06-29 详情页底部图片墙替换
- 已按用户要求删除项目详情页底部旧的“证据”和“同方向作品”渲染模块；首页原有横向图片墙继续保留。
- 新增 `DetailShowcaseFooter`，在每个项目详情页最底部复用首页图片墙的三排横向流动结构，避免再出现证据卡片和同方向作品卡片。
- 图片墙资源调整：`sport / Home Form Coach` 在图片墙中改用用户指定的速度运动图 `public/portfolio/sport-speed-wall-cover.png`；`Xiaomi CMF` 在图片墙中改为满卡片 `cover` 展示，不再保留四边留白。
- 本地验证已通过：`npm run build`；Playwright 桌面与移动端检查确认首页图片墙仍为 1 个、详情页底部图片墙为 1 个、旧模块数量为 0、sport 图源替换生效、Xiaomi 卡片不再使用 contain、横向溢出为 0。

## 2026-06-29 Home Form Coach 详情页专属叙述
- 审计发现 `sport / Home Form Coach` 是首页四连屏核心入口之一，但详情页 case-study 区仍依赖通用 fallback 叙述，容易显得像模板页，不符合“每个详情页要有完整产品叙述”的目标。
- 已新增 `sport` 的专属 `caseStudyOverrides`：标签为 `Fitness AI case / 运动 AI 案例`，标题为 `Local posture coaching loop / 本地姿态教练闭环`，四个叙述卡分别覆盖 `Training Entry`、`Pose Tracking`、`Form Feedback`、`Report Loop`。
- 这次只改文案叙述结构，不改图片、动效、布局、AGNES/Agent、拍立食素材或其他项目呈现。
- 本地验证通过：`npm run build`；`node tools/verify-detail-format.mjs http://127.0.0.1:5233/` 返回 `checked=46`、`issueCount=0`。Playwright 单页取证确认 `Home Form Coach` 不再显示 `Digital product case`、`Core Flow` 或 `Shaped around the project` fallback 文案，且横向溢出为 `0`。

## 2026-06-29 TCM Knowledge Graph 首图高清修正
- 详情页深度审计发现 `tcm-kg` 首图 `tcm-graph-clean.jpg` 天然尺寸仅 `740x430`，在桌面和移动端都会成为低清放大素材。
- 已回到本地源项目 `Desktop/semester1/CBS5504-周四晚/final project` 复核素材；没有找到同一张独立知识图谱的更高清裁图，项目源里的高清完整流程板为 `资源 1.png`，已对应站内 `public/portfolio/tcm-full-process-board.png`。
- 已将 `TCM Knowledge Graph` 的首图和 gallery 第一张改为 `tcm-full-process-board.png`，保留 `tcm-graph-clean.jpg` 作为第二张辅助证据图；并新增 `tcm-kg` 的移动端安全图映射到 `tcm-full-process-board-mobile.png`。
- 本地验证通过：`npm run build`、`node tools/verify-detail-format.mjs http://127.0.0.1:5231/` 返回 `checked=46`、`issueCount=0`；深度审计 `tmp/detail-depth-audit.mjs` 返回 `count=44`、`issueCount=0`。桌面与移动端截图已人工复核，TCM 首图不再使用低清裁图。

## 2026-06-29 详情页产品/CMF 媒体舞台修正
- 按用户“网页项目可用黑底透视，工业/产品/CMF 按正常产品图呈现”的规则，拆掉 `detail-media-product` 与 `detail-media-cmf` 首图继承黑底 `100svh` 网页舞台的问题，避免产品图出现大面积黑边或被误当网页截图。
- 新增 `detail-media-fit-light` 浅底完整展示类型，用于 `hydrotherapy-clean.jpg` 与 `cmf-electronics-source-cover.jpg` 这类宽幅资料/证据图；图片使用 `object-fit: contain`，保持资料图完整可读，不再被 `cover` 强裁。
- 清理 `detailMobileSources` 中已不再使用且偏离参考母版的 `palifood-mobile-flow-showcase` / `palifood-feedback-loop-showcase` 映射，防止拍立食后续又误回到自由生成的三手机/说明卡方向。
- 本地验证通过：`npm run build`；`node tools/verify-detail-format.mjs http://127.0.0.1:5230/` 返回 `checked=46`、`issueCount=0`。人工复查桌面与移动截图：Miro 网页透视未受影响，拍立食仍使用用户确认的浅绿色手持图，猫玩具/水疗/CMF 不再出现黑底大空洞。

## 2026-06-26 详情页格式审计与 CBS5502 首图修正
- 使用 Product Design audit / QA 思路重新抓取当前所有公开项目详情页的桌面与移动端初始状态、首图媒体状态，并对照用户确认的顶部信息区与网页类黑底透视参考。
- 结构门禁仍通过：`npm run build` 与 `npm run verify:detail-format -- http://127.0.0.1:5206/` 返回 `checked=44`、`issueCount=0`。
- 将 `cbs5502` 首图从模板缩略图 montage 改为项目源文件中的真实演示证据图：`public/portfolio/cbs5502-data-cleaning.png`；旧 `cbs5502-montage.png` 保留为第二张证据图。
- 为 CBS5502 这类含大量文字/图表的研究证据图新增 `detail-media-source-contain` 展示：桌面仍占完整媒体屏，图片完整 contain；移动端按 16:9 原比例展示，避免强行满屏导致内容不可读。
- 更新 `tools/verify-detail-format.mjs`，允许显式标记为 `detail-media-source-contain` 的非网页研究证据图使用 `object-fit: contain`，但普通产品/CMF/研究图仍保持原有 full-media 检查。
- 视觉复查路径：`tmp/detail-visual-audit-20260626-current/`、`tmp/detail-media-stage-audit-current/`、`tmp/cbs5502-final-check/`。

## 2026-06-26 拍立食新增定稿图
- 已按用户提供的原图新增拍立食详情页图片：`public/portfolio/palifood-handheld-fresh.png`。
- 该图为用户已确认的生成素材，颜色、光影、手机角度、排版和整体风格不可重生成或改写；仅允许做不改变内容的尺寸/比例适配。
- 当前页面仅通过 `detail-media-source-aspect` 做 16:9 原比例展示，图片使用 `object-fit: contain`，容器背景贴近原图浅绿色；不得改为黑底、改色、重新排版或重新生成。
- 已将该图加入 `palifood` 项目图库第一位，并为它单独设置原始比例展示，避免详情页后续图库的竖向满屏容器裁切画面。
- 本地验证通过：`npm run build`；`npm run verify:detail-format -- http://127.0.0.1:5205/` 返回 `checked=44`、`issueCount=0`。单图检查确认自然尺寸 `1672x941`、桌面 `1488x836`、移动端 `390x218`、横向溢出 `0`。

## 2026-06-25 Product asset cleanup pass
- Added a higher-resolution image2-generated cat-turntable lifestyle image as `public/portfolio/cat-turntable-lifestyle-realistic.png` and pointed the `cat-turntable` cover/first gallery image to it. The generated image keeps the pink turntable toy structure but improves cats, lighting, floor contact, and scene realism.
- Cleaned old portfolio-page artifacts from hydrotherapy assets: `hydrotherapy-clean.jpg` no longer includes the left-side 01-05 navigation strip, and `hydrotherapy-detail-china.jpg` no longer includes the left-side navigation numbers or bottom `Design Comes From Life` tagline.
- Checked Xiaomi official product imagery through the current Xiaomi Mall product page. The available high-resolution official assets are for `Xiaomi 骨传导耳机2`, so they were treated as candidates only and not used to replace the first-generation Xiaomi CMF project image.
- Image2 attempts for the Xiaomi first-generation earphone image did not preserve the product and were rejected. Added `public/portfolio/xiaomi-cmf-first-gen-remastered.jpg` instead, using a source-preserving 1920x1366 detail-page canvas derived from the original first-generation cover so the CMF/color/layout remain consistent while `cover` no longer cuts the desktop hero content.

## 2026-06-25 Detail format rule verified + heart source search
- Re-verified the user's clarified rule: website/web-app detail pages keep the fullscreen black perspective stage, while product/CMF/research pages use normal fullscreen media without perspective.
- Local validation passed: `npm run build`; `npm run verify:detail-format -- http://127.0.0.1:5201/` returned `checked = 44`, `visibleProjectCount = 21`, `hiddenPendingCount = 1`, and `issueCount = 0`.
- Production validation passed: `npm run verify:detail-format -- https://portfolio-site-three-rose.vercel.app/` returned `checked = 44`, `visibleProjectCount = 21`, `hiddenPendingCount = 1`, and `issueCount = 0`.
- Focused runtime check confirmed Miro starts with a perspective transform and flattens on scroll; Xiaomi CMF remains `transform: none` with `object-fit: cover`.
- Searched local/project sources for Heart Disease Bracelet Kit using heart/bracelet/cardiac/health/心脏/手环 terms. `public/portfolio/bracelet-kit-clean.jpg` is not valid source evidence because it shows an opera-mask/ruler image, and the COMP5571 device renders appear to be a different device project. `heart-bracelet` remains source-pending.

## 2026-06-25 Detail format verification gate
- Added `tools/verify-detail-format.mjs` and `npm run verify:detail-format` so future detail-page changes can be checked against the current public-format contract.
- The verifier opens every media-backed public project on desktop and mobile, checks compact detail headers, metadata placement, image load, fullscreen media dimensions, digital/web perspective, non-web no-perspective media, global header/Agent/email controls, and horizontal overflow.
- It also checks that source-pending projects such as `heart-bracelet` are not exposed on the homepage or related project links before source images are available.
- Updated the Agent profile snapshot so `projectCount` reflects public media-backed projects, not hidden source-pending records.
- Local validation passed: `npm run build`; `npm run verify:detail-format -- http://127.0.0.1:5201/` returned `checked = 44`, `visibleProjectCount = 21`, `hiddenPendingCount = 1`, and `issueCount = 0`.

## 2026-06-25 Detail format public-completeness guard
- Tightened the digital/web first-media stage after visual comparison with the user's latest reference screenshot: the screenshot plane now starts closer to the reference top position while keeping the same fullscreen black stage and vertical perspective.
- Added a public-completeness guard for source-pending projects: projects without confirmed detail media, currently `heart-bracelet`, remain in data for future completion but cannot be opened as public detail pages, related project links, or Agent navigation targets.
- This prevents an incomplete pending-media page from being delivered under the "every project must match the reference format" goal.
- Local validation passed: `npm run build`; Playwright audit checked 21 media-backed projects plus the hidden pending project on desktop and mobile (`44` states total), with `issueCount = 0`.

## 2026-06-25 Detail media type-specific final pass
- Applied the user's clarified rule: website/web-app detail pages use the fullscreen black perspective stage, while non-website industrial/product/CMF/research pages stay as normal fullscreen media without perspective.
- Split detail media visual kind from case-study content kind so UI/dashboard evidence such as `miro-governance` can render as a web prototype without changing its research classification.
- Added `public/portfolio/cup-cup-stage.jpg` as a source-preserving Cup's Cup first-media composition to avoid stretching the narrow original product photo.
- Tightened mobile detail-title sizing so long project titles stay within the compact top-detail format with no `title-too-tall` flags.
- Local validation passed: `npm run build`; Playwright audit checked all 21 visible detail pages on desktop and mobile for media kind, transform direction, image load, title lines, and `overflowX = 0`.

## 2026-06-25 Detail media fullscreen coverage correction
- Tightened the project detail first-media stage so each visible project detail uses a true `100svh` fullscreen media band with no framed-card padding.
- Updated the type rule after user clarification: only digital/web prototype detail media uses the bottom-near / top-far `rotateX` perspective; research, product, and CMF media render as normal fullscreen images with `transform: none`.
- Reduced the digital/web perspective compensation so Miro-style interface screenshots are not horizontally compressed while still keeping the webpage mockup plane effect.
- Research, product, and CMF detail media now use full-bleed `object-fit: cover` instead of contained images inside a black frame.
- Local validation passed: `npm run build`; Playwright QA checked focused Miro/TCM/product entry screenshots and all 21 visible detail pages on desktop/mobile for type-specific transforms, image load, and `overflowX = 0`.

## 2026-06-25 Detail media vertical perspective correction
- Corrected the detail-page first-media tilt direction after the user clarified the desired reference: the media plane must recede vertically, with the top edge smaller/farther away and the bottom edge closer.
- Replaced the mistaken horizontal `rotateY` direction with `rotateX(var(--detail-tilt-x))` on digital/research first media, keeping the black fullscreen media stage and source images unchanged.
- Added a `ProjectDetail` scroll listener that starts the first media around `8deg` desktop / `6deg` mobile and gradually flattens it to `0deg` as the user scrolls down into the media block.
- Local validation passed: `npm run build`; Playwright desktop/mobile QA confirmed Miro, Pai Li Shi, Li Bai, and Home Form Coach start with vertical perspective, flatten to `0deg` after scrolling, and keep `overflowX = 0`.

## 2026-06-25 Miro detail reference correction
- Corrected the Miro detail page after the user pointed out the previous implementation did not match the selected references.
- Top hero now follows the option-1 screenshot: `PRODUCT / WEB / SYSTEM`, one-line `Miro Rehearsal System`, short cross-cultural rehearsal summary, and a right-side vertical metadata rail with `YEAR / ROLE / SOURCE STATUS`.
- First media block now uses `public/portfolio/miro-detail-reference-dashboard.png`, cropped from the selected option-4 black dashboard image, instead of the mismatched previous interface image.
- Tightened desktop vertical spacing so the black dashboard media stage begins around y=448 at `1488x1058`, closer to the reference, with no horizontal overflow.
- Local validation passed: `npm run build`; Playwright desktop/mobile QA confirmed correct copy, vertical metadata, image source/natural size, desktop title one-line, and mobile overflow `0`.

## 2026-06-25 Detail media untilt correction (superseded)
- Removed the extra CSS `rotateY/rotateZ` transform from digital/research detail-page first media images after the user flagged Li Bai and Sport as randomly tilted.
- Superseded by `2026-06-25 Detail media vertical perspective correction`: the correct behavior is controlled vertical `rotateX`, not `transform: none`.
- The black first-media stage remains, but images now render horizontally with `transform: none` and no floating shadow.
- Added `public/portfolio/palifood-detail-reference-stage.png`, a source-preserving horizontal composition of existing Pai Li Shi screenshots, so the mobile H5 project no longer spills as a giant portrait image in the fullscreen media stage.
- Local validation passed: `npm run build`; Playwright desktop/mobile QA confirmed Miro, Pai Li Shi, Li Bai, and Sport first images all have `transform: none`, loaded natural sizes, and `overflowX = 0`.

## 2026-06-25 Project detail page visual direction (superseded)
- Earlier detail-page attempt moved toward compact top typography and a black media stage, but it still used the wrong Miro kicker, horizontal metadata, and mismatched first image.
- Treat this entry as superseded by `2026-06-25 Miro detail reference correction` above.

## 2026-06-25 Industrial design expansion copy
- Replaced the Tresmares placeholder expansion copy with the user's selected version 3 for the industrial/product design section.
- New English title: `Product form grows from / Use and Feeling into / clarity`; new Chinese title: `产品形态来自 / 使用与感受 并走向 / 清晰`, with the red emphasis on `Use and Feeling / 使用与感受`.
- Updated the small kicker to `Product Form / 产品形态` and replaced the lower description with the selected English/Chinese copy about form language, surface treatment, ergonomics, and product identity.
- Local validation passed: `npm run build`; Playwright confirmed English/Chinese text, red emphasis, description rendering, desktop overflow `0`, and mobile overflow `0`.

## 2026-06-25 Default English language pass
- Changed the first-open site language to English (`lang = en`) so the header, navigation, hero, and homepage UI default to English; the top language toggle now offers `中文` from the default state.
- Updated the brand lockup from `AI Portfolio / AI 作品集` to `YANG` in the circle plus `Portfolio / 作品集` beside it.
- Made the Daima four-work panel titles and categories bilingual so English mode shows English work labels and Chinese mode shows Chinese labels.
- Local validation passed: `npm run build`; Playwright confirmed default `html.lang=en`, `YANG + Portfolio`, `Work / About`, Chinese toggle target, Daima English copy, Chinese toggle state with Daima Chinese copy, default visible text has no Chinese except the language switch button, and mobile overflow `0`.

## 2026-06-25 Bill Chien-style contact buttons
- Added a fixed Bill Chien-style email copy button using `lin297861138@gmail.com`: collapsed `80x80` black circle, white mail icon, click-to-copy, `EMAIL COPIED` pill expansion to `212px`, right-anchored icon, press dip, and timed retract.
- Restyled the existing Agent floating entry to the same black/white circular button language with a robot icon while preserving the original Agent panel, AGNES request flow, fallback logic, click-outside close, and project navigation behavior.
- Local validation passed: `npm run build`; Playwright desktop QA confirmed email button `80x80 -> 212x80 -> 80x80`, timing close to the Bill Chien reference, Agent panel still opens, and mobile QA confirmed no horizontal overflow with stacked 72px buttons.
- Release status: GitHub `main` contains the contact-button update, and Vercel production fixed alias `https://portfolio-site-three-rose.vercel.app/` has been verified with the same button behavior and clipboard output.

## 2026-06-25 Email second-click press fix
- Re-sampled the Bill Chien source email control and confirmed second click while expanded keeps the pill width at about `212px`; only the whole pill press-scales to about `95%` and then rebounds, with the retract timer restarted.
- Fixed Yang's email copy button so an expanded second click no longer clears `is-copied` first. It now preserves the expanded pill, applies the press state, copies the same email, and resets the collapse timer.
- Local validation passed: `npm run build`; Playwright desktop QA confirmed first click expands, second click stays expanded with press scale only, clipboard remains `lin297861138@gmail.com`, Agent panel still opens, and mobile overflow stays `0`.

## 2026-06-25 Daima nav rectangle removal
- Removed the unwanted rectangular background from the `Work / About` GooeyNav group while `body.is-daima-active` is applied.
- Kept the active black pill (`Work` / `作品`) and the language toggle styling unchanged; only the nav list container background/border is now transparent.
- Local validation passed: `npm run build`; Playwright confirmed `.gooey-nav-container ul` background is transparent, border is 0, active pill remains visible, and mobile overflow stays `0`.

## 2026-06-24 Daima panel image replacement
- Replaced only the four Daima work-panel background images with the four user-provided screenshots, in order, stored as `public/portfolio/daima-work-cover-01.png` through `public/portfolio/daima-work-cover-04.png`.
- Kept all project titles, categories, click targets, detail pages, Agent behavior, and interaction structure unchanged.
- Local validation passed: `npm run build`; Playwright QA confirmed the four panel image paths load in order at `1916x821`, and mobile horizontal overflow remains `0`.

## 2026-06-24 Daima fourth panel switched to sport
- Updated the Daima four-work panel copy so all visible panel titles/categories are English-only: `Miro AI Rehearsal System`, `Pai Li Shi`, `Li Bai Interactive Website`, and `Home Form Coach`.
- Replaced the previous fourth Daima entry from `Offer Quest` to the sport project `Home Form Coach`, backed by `https://github.com/Yang-lab1/sport` and the confirmed live site `https://sport-yangs-projects-d2ad4c9e.vercel.app`.
- Added the `sport` project to portfolio data with design concept, live-site link, source note, evidence, Agent aliases, and gallery assets under `public/portfolio/sport-home-form-coach-*`.
- Replaced `offer-quest` with `sport` in the primary `digitalCaseIds` sequence while keeping the original Offer Quest project record available for rollback/reference.
- Local validation passed: `npm run build`; Playwright desktop QA confirmed nav/language/Agent presence, four Daima panels, English-only panel copy, fourth-panel click into `Home Form Coach`, live link, and loaded detail media; mobile QA confirmed four panels and `overflow-x = 0`.

## 2026-06-24 Daima Miro cover and project text update
- Replaced the first Daima four-work panel image with the user-provided attachment, stored as `public/portfolio/miro-daima-cover.png`.
- Updated the four Daima panel texts from source-site placeholder names to portfolio-specific labels: `Miro AI 演练系统 / AI Rehearsal / Web System`, `拍立食 / Food AI / Mobile H5`, `李白互动网站 / Digital Humanities / Web`, and `Offer Quest / Career Learning / Quest Prototype`.
- Kept the remaining three panel cover images unchanged as requested.
- Local `npm run build` passed. Playwright QA verified the new Miro image loads, all four labels render, title rolling still works, mobile has no horizontal overflow, and all four panels still open the correct detail pages.

## 2026-06-24 Daima source interaction deep replica
- Reworked the four Daima-style work panels from static fullscreen buttons into source-like panels with internal sticky viewport structure, Lenis smooth scrolling, separate image/title/category scroll layers, and duplicate-title hover rolling.
- Desktop local QA at `1440x900` passed: first panel measured `1440x900`, sticky viewport `1440x900`, image layer `1440x1060`, image `transform/filter` both `none`, title clip `72.8px`, hover title roll `-72.8px`, and natural top/bottom handoff between the first and second panels.
- Mobile local QA at `390x844` passed: work panel height is `480px`, title is left aligned at `24px`, title style is `32px / 44.8px / 500`, and horizontal overflow is `0`.
- Click QA passed for all four panels: NovaTech -> `miro`, Finverse -> `palifood`, Medlink -> `libai`, Orbit -> `offer-quest`; each opens the internal `.detail-page` with launch bridge and media grid.
- Agent alias matching was hardened after QA: explicit project title/alias matches now score strongly, and remote refusal/clarify responses are corrected when the local site evidence has a strong project match. Unicode-input QA for `拍立食是干嘛的` returns Palifood with one project button and no Miro.
- Added `docs/research/components/daima-works-showcase.spec.md` to preserve measured source behavior and local verification targets.
- `npm run build` passed locally. GitHub push and Vercel production deployment are the next release steps.

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

## 2026-06-23 Daima 四屏满屏作品段
- 将旧数字案例滚动区替换为 Daima 风格四连 full-screen 作品屏：Miro、拍立食、李白、Offer Quest。
- 每个作品屏独占 100vw / 100svh，保留当前站点导航、语言切换和 AI 浮球；点击进入对应项目详情页。
- 作品屏使用当前项目资产做视觉入口，不复制 Daima 源站图片资产。
- 待验证：npm run build、GitHub 推送与 Vercel production 部署。
验证更新：`npm run build` 已通过，本地生产构建正常。

## 2026-06-23 Daima 四屏满屏作品段补充
- 四个作品入口已按用户要求改为满屏段落：Miro、拍立食、李白、Offer Quest，每屏占满 100vw / 100svh，不再被旧模块宽度限制。
- 保留本站自己的导航、语言切换和 AI 浮球；点击作品屏进入对应项目详情页，不直接跳外部网站。
- 详情页新增设计理念桥接区：先展示一段项目解释，再提供“立即进入网站”入口；没有真实外链时显示链接待补，不编造 URL。
- 详情页桥接区已补充移动端响应式样式，避免小屏文字和按钮挤压。
- `npm run build` 已通过。

## 2026-06-24 Daima 字体校准 + Agent 成就统计修复
- 对照 `https://wearedaima.framer.website/` 的四屏作品段实测样式，校准 Daima 段标题/分类字体：标题改为 Manrope 系、约 52px / 600 / 1.4 line-height；分类改为 Geist Mono 系、约 16px / 500。
- Daima 四屏仍保留本站导航、语言切换和 AI 浮球；四个入口继续映射到 Miro、拍立食、李白、Offer Quest 的内部详情页。
- 修复 Agent 本地 fallback 的成就知识库选择：`林杨得过多少奖` 这类问题现在优先命中“奖项荣誉 12+”，不会被“作品入口 51”抢答。
- 本地验证：`npm run build` 通过；Playwright QA 通过四屏 fullscreen、四个详情页桥接区、拍立食不混入 Miro、collapse/re-open 清空旧会话、奖项回答含 `12+`、移动端无横向溢出。
- QA 截图保存在 `tmp/daima-focused-qa/`；GitHub 与 Vercel 版本信息以本轮最终交付记录为准。
## 2026-06-26 UFEI 立式高精度柜新增项目
- 已从 `C:\Users\Yang\Desktop\作品集\UFEI\立式高精度柜` 接入 5 张源图，复制到 `public/portfolio/ufei-precision-cabinet-*.png`。
- 新增项目 id：`ufei-precision-cabinet`，英文名 `Vertical High-Precision Cabinet`，中文名 `立式高精度柜`，归类为工业产品 / product，不使用网页类黑底透视动效。
- 首图使用源图裁白边版本 `ufei-precision-cabinet-render-crop.png`，仅裁掉过多白边以适配移动端和详情页显示；保留原始 16:9 图 `ufei-precision-cabinet-render.png` 为图库第二张，不改变产品颜色、造型、材质或排版风格。
- 已加入工业设计入口、产品 showcase、Agent 别名和 `verify:detail-format` 可见项目清单；本地验证 `npm run build` 与 `npm run verify:detail-format -- http://127.0.0.1:5210/` 通过，结果为 `checked=46`、`visibleProjectCount=22`、`issueCount=0`。
- 临时年份沿用同组 UFEI 工业设备的 `2022-2023`，仍需用户最终确认；角色与详情介绍为基于图片证据的保守版本，可后续按用户简历/项目事实微调。

## 2026-06-26 详情页证据图与移动端安全构图
- 为 `cbs5502`、`tcm-systems`、`food-health-model`、`capstone-device`、`ufei-precision-cabinet` 增加移动端专用首图，避免手机端 `cover/contain` 后只露出边缘、标题被裁切或首图上方空白过多。
- 新增资源：`cbs5502-evidence-board-mobile.png`、`tcm-full-process-board-mobile.png`、`food-health-feedback-model-board-mobile.png`、`capstone-device-views-mobile.png`、`ufei-precision-cabinet-mobile.png`；并保留桌面端横向图。
- 详情页渲染新增 `detailMobileSources`，通过 `<picture>` 在 `max-width: 700px` 自动切换移动端安全图；桌面端继续使用原横图，不改变网页类项目的黑底透视交互。
- 对 `cbs5502`、`tcm-systems`、`food-health-model` 的首图改为 source-contain/full-contain，避免证据板和流程图被强裁；手机端隐藏 source-contain 首图黑色标签，避免压到图内标题。
- 本地验证通过：`npm run build`；`npm run verify:detail-format -- http://127.0.0.1:5220/` 返回 `checked=46`、`visibleProjectCount=22`、`hiddenPendingCount=1`、`issueCount=0`。重点复查了 CBS5502、TCM、Food Health、Capstone、UFEI 的桌面与移动端截图。

## 2026-06-27 拍立食详情图呈现修正
- 根据用户澄清，拍立食相关展示图不再自由生成新的视觉方向；统一按用户已确认的浅绿色成品图标准处理：浅绿色背景、黑色手机外壳、真实拍立食 UI 放入手机屏幕中，低文字密度，不使用深蓝/杂乱多文案风格。
- 保留用户提供的 `public/portfolio/palifood-handheld-fresh.png` 作为第一张成品图，不改变其色调、排版、风格或屏幕内容。
- 替换此前不被接受的 food-health / palifood 展示图，新增并引用 `palifood-mobile-flow-showcase.png`、`palifood-feedback-loop-showcase.png` 及对应移动端版本；`food-health-feedback-model-board.png` 也改为同风格手机 mockup 证据图。
- 移除拍立食详情页中直接引用 raw App 截图的 gallery 项，避免把竖屏 App 截图当成大横图铺满页面。
- 本地验证通过：`npm run build`；`npm run verify:detail-format -- http://127.0.0.1:5220/` 返回 `checked=46`、`issueCount=0`。

## 2026-06-28 拍立食参考一致性回退修正
- 用户再次确认拍立食展示图必须一比一照着已给参考图执行：手机 UI 必须放在手机屏幕内，不能把 App 截图当横向大图，也不能自行组合三手机、说明卡、箭头或新构图。
- 本轮尝试的 Image2 和本地透视贴图候选均未达到“锁定母版、只替换屏幕内容”的标准，因此未写入正式网站资产。
- 正式站已从 `palifood` 和 `food-health-model` 浏览顺序中撤掉偏离参考的 `palifood-mobile-flow-showcase.png` 与 `palifood-feedback-loop-showcase.png`，拍立食详情页暂只保留用户确认风格的 `palifood-handheld-fresh.png`。
- 移动端单独修正 `detail-media-project-palifood` 展示：容器保持 100svh，图片放大为沉浸式裁切，避免 16:9 横图在手机端变成矮条。
- 验证：`npm run verify:detail-format -- http://127.0.0.1:5220/` 返回 `checked=46`、`visibleProjectCount=22`、`issueCount=0`；`npm run build` 通过。
