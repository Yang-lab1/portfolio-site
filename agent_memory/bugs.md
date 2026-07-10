# 2026-07-10 Miro order and detail-cover scope
- The latest request changes the showcase order only: keep the industrial compression project and Miro, with Miro as the initial center card and the industrial project on the right.
- The external Miro entry image remains `/portfolio/miro-home-china.jpg`; the user-provided software cover is used only inside the clicked Miro detail page as its first figure.
- Verify both surfaces separately after future edits: showcase order/targets and detail first-image full-width geometry.

# 2026-07-08 Miro cover guardrail
- Do not replace any external Miro entry/cover image when updating the Miro software detail page. The blue person cover, Daima section panel cover, and scrolling wall covers are user-approved entry visuals and must remain unchanged unless the user explicitly asks to replace those exact entry covers.
- The folder image `C:\Users\Yang\Desktop\作品集\旋转圆盘\miro\软件\封面.png` is not allowed to replace the blue person Miro entry hero. If used at all, it can only be considered inside a detail-page context after explicit confirmation.
- For Miro software updates, verify both entry surfaces and detail surfaces separately: entry images should remain old/original, while the clicked detail gallery may use `miro-software-detail-01.png` through `miro-software-detail-08.png`.

# 2026-07-07 Momenta / Li Bai release guardrail
- Momenta software replacement must not visibly carry Li Bai naming, IDs, or detail captures. Keep code/page checks for `Li Bai`, `李白`, `libai`, `libai-data`, and `libai-detail` before release.
- The approved green cover is now a Momenta asset (`momenta-green-cover.png`). Do not point live project data back to `libai-background.png`.
- Old untracked `public/portfolio/libai-detail-*.png` and rejected `public/portfolio/momenta-source-*` files are excluded from Vercel uploads through `.vercelignore`; do not remove that protection while those local files exist.
- Project separation remains important: `momenta` is the software/app case, while `momenta-touch` is the hardware/device case.
- Momenta software detail order must follow the PPT/story logic rather than raw file numbering. `momenta-software-05.webp` is the closing device-and-phone visual and should remain the final figure unless the user explicitly changes the sequence.
- Momenta note/image alignment guardrail: image 10 is the implementation/evaluation evidence page, so the code/preview/simulator note belongs there. Image 22 is the personal/environment signal boundary, image 23 is the final principle page, and image 05 is the closing product-presence image.
- When showing the user the Momenta order, prefer the live-page storyboard `tmp/momenta-live-order-storyboard-v1/momenta-live-order-storyboard.png` over text-only lists, because the user could not visually judge the sequence from the earlier summary alone.

# 2026-07-06 Momenta Image2 / interaction guardrail
- The rejected Momenta static images must not be treated as final just because they are 21:9 / 4K files. The user specifically wants Image2/image-to-image expansion from the original PPT/source visuals into true 21:9, preserving structure without simple framing or redesign.
- Do not use a still frame captured from the long intro video as the PPT interaction section. The intro video can remain as the first normal video, but PPT interaction motion must come from the PPT/source animation material.
- PPT/source interaction motion must not show browser video controls. It should be scroll-driven or scroll-triggered page motion with controls hidden and pointer interaction disabled.
- Current blocker for true Image2 generation: local `OPENAI_API_KEY` is missing. Do not fake Image2 with CSS, canvas padding, blur-fill, crop-only, or non-source generative imagery.
- Before any push/deploy of the Momenta replacement, verify that rejected static assets `momenta-source-01..06.webp` are either replaced by true Image2-expanded assets or not referenced by the live page.
- Do not use the low-resolution embedded Keynote thumbnails from `keynote_img_130`, `keynote_img_131`, `keynote_img_138`, `keynote_img_141`, `keynote_img_147`, `keynote_img_149`, `keynote_img_155`, `keynote_img_164`, or the tiny Apple Health badge as Image2 source images. They are now isolated in `tmp/momenta-image2-source-package-v2-clean/excluded-lowres-keynote-thumbnails/`.

# 2026-07-06 Momenta source-preserving guardrail
- Momenta software detail pages must not use newly generated, redesigned, or recomposed 21:9 images made from PPT/PDF ideas. The user explicitly rejected that direction.
- Static visuals must preserve original PPT/PDF/Keynote slide/page content. Only export quality, 21:9 canvas adaptation, necessary crop, or letterboxing may change.
- Original continuous PPT/Keynote animations should be preserved through original exports or existing Drive/local animation clips. If the animation has to be rebuilt, it must use original source elements and source timing/intent, then be shown to the user as video before release.
- Do not reintroduce `momenta-software-01..06.webp` or `momenta-software-daima-cover.webp`; these generated WebP files were removed from `public/portfolio`.
- Keep `momenta-software-intro-h264.mp4` only as the user-confirmed intro video transcode. It does not replace the source-preserving slide/process material.
- Do not push or deploy any Momenta software replacement until the user approves the fresh source-preserving preview.

# 问题与风险

## 2026-07-06 Momenta software replacement guardrail
- 用户这次要用来替换 Li Bai 的是软件/App 方向 `momenta`，不是硬件外观项目 `momenta-touch`。后续不要把 `public/portfolio/momenta-detail-video.m4v` 或 `momenta-detail-01..08.png` 这批硬件详情素材当作软件 Momenta 的主素材。
- 当前 `Momenta Keynote.key` 和本地 `COMP5571-周一早/final project` 是更强的软件视觉/流程来源；GitHub `JosicZhou/MOMENTA` 主要证明真实 SwiftUI/iOS 开发和功能结构。
- Google Drive 没找到明显 Momenta PPT/PDF/Slides；不要凭 Drive 搜索结果硬塞无关 TCM、旧设计课或通用 lecture PDF。
- GitHub 源码中可能包含服务配置或敏感环境痕迹；后续只引用功能结构和视觉证据，不要公开粘贴密钥、配置值或敏感账号信息。

## 2026-07-06 Li Bai detail guardrail
- Li Bai 详情页当前只应使用用户确认范围内的 6 张 21:9 站内截图；不要把“诗仙生平”页面或“关于我们 / 成员组成”页面放进详情页 gallery。
- `data.pdf` 和“总结-大结论”Word 文档已被用户明确否定为目标资料，后续不要再把它们截图或作为 Li Bai 汇报流程素材。
- 原始 Li Bai HTML 可能含 API-key 风险，只能从本地页面截取视觉图，不要把原始 HTML 作为站点资源发布。
- 当前 Li Bai 白底 21:9 版本处于本地预览确认阶段；用户确认前不要 push，不要 Vercel deploy。

## 2026-07-05 Product Showcase card/image morph guardrail
- Product Showcase 三卡轮播的侧卡透视不能只靠外层 `clip-path` 斜切；图片内容需要跟随同一张卡片平面连续变化。
- 后续不要恢复侧卡图片强制 `object-fit: cover` 的规则，否则 `contain` 项目从侧卡转到正面时会重新出现突然换裁切/换比例的跳变。
- 回归检查至少覆盖：桌面 start/mid/end 三态截图、点击侧卡转正视频、`npm run build`、移动端单卡显示和 `overflowX=0`。

## 2026-07-05 About transition guardrail
- The user rejected the extra overhead lamp/glow treatment for the About portrait intro to metrics-card transition.
- Keep the cleaner no-glow black transition: no hard/double horizontal seam, no obvious radial lamp overlay between the portrait intro and the metric cards, and no lower gray glow below the metric cards before the next dark intro.
- If revisiting this area, compare against the user's approved no-glow screenshot rather than restoring `tmp/about-transition-seam-v5/about-transition-light-restored.png`.

## 2026-07-04 About 头像介绍区 guardrail
- 顶部 `About / 关于` 现在应落到新增黑底头像介绍区 `#about`，不要再把 `#about` 恢复给原数据卡片段；原数据卡片段现在是 `#about-metrics`。
- About 介绍文案必须随语言状态单语显示，不要把英文和中文同时放在同一个页面状态里。
- 当前正式文案需要保持两行节奏和右对齐关系：右侧介绍文字右边界与 `Yang Lin` 右边界平齐，姓名和文案之间保留约 `42px` 间距。
- 头像必须使用用户提供照片生成的站内资源 `public/portfolio/yang-lin-portrait.webp`，不要替换为生成头像或其它人物图。

## 2026-07-04 Work 菜单 hover / close guardrail
- Work 顶部下拉菜单的项目 hover/click 热区必须是“项目文字 + 周围一小圈”，不能恢复成整行、整列或整块 column 宽度。`.work-mega-menu__item` 不要再用 `width: 100%`，否则鼠标在同行远处空白也会误触发项目 hover。
- Work 菜单打开后，只有点击项目文字热区才能进入详情页；点击顶部面板空白、分类标题、行/列空白、列间空白、下方页面区域都应关闭菜单。
- 回归检查：列间空白 hover 应为 `null`，同行远处空白 hover 应为 `null`，文字外缘 hover 应为对应项目名；顶部空白/标题/下方区域点击后 `.work-mega-menu.is-open` 数量应为 `0`。

## 2026-07-03 Pai Li Shi showcase regression guardrail
- Do not push the outer app-screen background columns outside the viewport again. At the 1920x900 QA viewport, the first column must start at `x=0` and the fourth column must end at `x=1920`; otherwise the rounded phone-screen edges are cropped and the AWSMD-style app wall no longer matches the reference.
- Keep the side app-screen rhythm at the measured reference proportions for the 1920x900 QA viewport: `360px` card width and `24px` column gap. The previous `354px / 33.6px` geometry made the side images read more separated than the AWSMD reference.
- Do not restore the old `30-38px` center-hand safety offset while the showcase header is hidden. The current center screen top should stay around `34px-49px` across the 1920x900 scroll QA states.
- Keep the latest QA comparison image `tmp/palifood-continuous-wall-qa/27-reference-vs-current-raised-phone.png` as the visual check before asking the user to approve push/deploy.

## 当前风险
- 2026-07-03 拍立食 AWSMD 式滚动展示当前已改为四列完整 APP 截图卡片，旧的两张拼接 wall 图不应再作为渲染结构恢复。回归门槛：`.palifood-background-wall` 必须为 `0`，`.palifood-background-column` 必须为 `4`，`.palifood-background-screen` 必须为 `32`，且每张背景卡片保持完整手机界面截图、统一尺寸、圆角和间距。
- 2026-07-03 中心手持手机必须使用用户最新给的高清黑屏手图归一化版本，站内文件为 `public/portfolio/palifood-showcase/hand-user-black-mask.png`。不要再换回旧手图、参考站手图或自行找图；如再次替换，必须保持 `1817x866` 坐标系以及 `x=714,y=28,w=354,h=731` 的屏幕洞口/内容坐标。
- 2026-07-03 `p2-left-bottom-workbench.webp` 原始底部自带 iOS home indicator 横线，已局部清理。后续重新生成背景截图或覆盖该文件时，需要检查底部横线不要重新出现。
- 2026-07-01 圆盘滚轮交互已按用户截图收窄：只有可见圆盘图片及图片附近小范围会接管滚轮并旋转圆盘；左侧空白、右侧空白、底部文字/空白处应继续正常页面滚动到黑色 footer。后续不要再恢复“大椭圆区域整块拦截”，否则会复现用户指出的无法滚到底部问题。
- 2026-07-01 Product Language 圆盘当前为 8 张轻量图，`capstone-device` 白色 M 模块已从圆盘入口移除，保留用户文件对应的 `miro-hardware` 蓝色布面 M 入口。`capstone-device` 项目详情和素材仍可保留在项目库中，不要误删项目本体。
- 2026-07-01 首轮网站加载慢排查已完成并继续修复圆盘快速下滑时图片跟不上的问题：最后圆盘图不再用 1254 原图抢首屏网络，首页圆盘改用 640 WebP 展示版；Watsu 与 Cup's Cup 更新后、并移除重复 `capstone-device` 圆盘入口后，当前为 8 张轻量圆盘图。页面稳定约 650ms 后会提前后台预取圆盘 blob，圆盘组件自身也有同样的早期预取保险，同时仍保留接近视口预热与省流量/2G 跳过策略。后续若继续性能任务，仍要先测量再改；剩余风险是 `momenta-detail-video.m4v` 约 103MB、图片墙大量视觉资产、以及真实线上 / 国内网络 waterfall 未复测。
- `momenta-touch` 是硬件 / 工业设计外观项目，只能用于圆形圆盘和对应产品详情页；不要覆盖或改名原有 `momenta` UI 项目，也不要把 Momenta Touch 套入 Web/App 倾斜舞台或 case-study 文字模板。
- `momenta-detail-video.m4v` 体积约 103MB，提交/推送 GitHub 前需要注意 GitHub 单文件大小限制；如 push 被拒，优先和用户确认是否压缩视频、转码为 webm/mp4、或使用外部托管。
- `heart-bracelet` 当前为了圆形圆盘可点击临时使用 `capstone-watch-wall-card.png` 作为占位图。后续用户发来真实心脏病手环套件素材后，必须替换圆盘图和详情页图，不能把临时图当成最终证据。
- 详情页媒体类型必须继续区分：digital/web 项目可使用黑底透视与滚动拉平；工业产品、CMF、资料证据图不能再统一套黑底网页舞台。宽幅资料图优先使用浅底 `contain`，避免黑边、巨大空洞或强裁导致证据不可读。
- 未绑定真实自定义域名，无法完成最终上线目标。
- 未有香港与深圳/内地无 VPN 实测证据，不能声明一域名目标完成。
- 本机模板目录 `C:\Users\Yang\.codex\templates\agent_memory` 缺失，`agent_memory` 文件不是从模板复制而来。
- 示例域名和平台默认预览域名必须保持不能通过最终门禁。
- 当前 Codex shell 下后台启动本地预览服务不稳定；前台 `preview:static` 可用，但命令运行期间需要保持会话打开。
- `heart-bracelet` 仍缺少可靠源图。不要为它生成或编造产品图；在源图补齐前，它不应作为公开可点击详情页、相关项目入口或 Agent 导航目标交付。

## 已知环境问题
- PowerShell 下直接运行 `npm` 可能触发 `npm.ps1` 执行策略问题；使用 `cmd /c npm ...`。

## 已修复问题
- 2026-07-01：顶部 `About / 关于` 从详情页或主页任意位置点击时，原生 `#about` 只适用于主页，且 Lenis `anchors: true` 会覆盖自定义落点。已改为由 `App` 接管 Header 导航：详情页先退出到主页，再滚到首页黑色成就数据卡片段；点击事件会阻止 Lenis 二次锚点处理。本地生产预览三路径验证均停在 `aboutTop` 约 `197px`，不再留在详情页或跳到旧 Product Language 圆盘段。
- 2026-07-01：圆盘区域拦截范围过大，导致用户截图标注的左侧空白、右侧空白、底部文字/空白处滚轮无法继续滚到黑色 footer。已把 wheel capture 改为只检查可见 `.expansion-card` 及其附近 padding，并过滤不可见卡片；本地桌面真实滚轮验证三处空白均可继续向下滚动。
- 2026-07-01：Product Language 圆盘中 `miro-hardware` 蓝色 M 硬件入口与 `capstone-device` 白色 M 模块入口相邻，视觉上像重复项目。已从 `expansionCards` 移除 `capstone-device` 圆盘入口，仅保留 `miro-hardware`；当前圆盘为 8 张卡，8/8 图片加载完成。
- 2026-07-01：圆盘滚轮速度相对用户预期偏慢。已提高滚轮换算系数和单次上限，并缩短 GSAP 响应动画时长；本地桌面验证图片上滚轮可明显切换圆盘且页面 `scrollY` 不变。
- 2026-07-01：Cup's Cup 本地文件夹 `C:\Users\Yang\Desktop\作品集\旋转圆盘\cup‘s cup` 未完整反映到圆形转盘和详情页。已复制用户提供的正方形图与 8 张详情图，重新生成 `/portfolio/cup-cup-orbit-fast.webp`，并把 `cup-cup` 详情 gallery 更新为 `/portfolio/cup-cup-detail-01.png` 到 `/portfolio/cup-cup-detail-08.png`；图片墙横图保持原先已调好的 `cup-cup-wall-card.png`。
- 2026-07-01：快速滚到 Product Language 圆盘时，圆盘图片显现速度仍可能慢于用户下滑速度。已把当前 8 张圆盘轻量图提前放入首页 warmup，并在圆盘组件自身加 650ms 早期 blob 预取保险；本地桌面/移动生产版验证进入圆盘前可预取当前 8 张，圆盘区 8/8 图片加载完成。
- 2026-07-01：鼠标停留在圆盘图片或圆盘区域时继续滚轮会推动页面下滑，不能无限旋转圆盘。已新增圆盘区域 wheel capture：进入圆盘阶段后，鼠标位于图片或下方圆盘区域内时滚轮只旋转圆盘并阻止页面滚动；鼠标离开圆盘区域到空白处时恢复正常页面滚动。
- 2026-07-01：`cross-ripple` / Watsu 详情项目和素材已存在，但未接入最后 Product Language 圆形转盘。已新增轻量 `/portfolio/watsu-orbit-fast.webp` 并接入 Watsu；后续移除重复 `capstone-device` 圆盘入口后，当前桌面/移动验证为 8/8 图片加载完成、横向溢出 `0`。
- 2026-07-01：首屏会提前加载页面底部 Product Language 圆盘 8 张 1254 方图，合计约 `10.3MB`。已将首页圆盘切换到 640 WebP 展示版；Watsu 接入并移除重复 `capstone-device` 圆盘入口后，当前为 8 张轻量圆盘图。圆盘图片节点初始不挂载，页面空闲后通过同源 `fetch` 预取为 blob，接近圆盘区后再挂载图片节点。打开初期圆盘图片节点数为 `0`，接近圆盘区后圆盘图全部加载完成。
- 2026-06-29：`TCM Knowledge Graph` 首图不应再使用 `tcm-graph-clean.jpg` 作为第一张交付图；该图天然尺寸只有 `740x430`，已改为高清完整流程板 `tcm-full-process-board.png`，并在移动端映射到 `tcm-full-process-board-mobile.png`。`tcm-graph-clean.jpg` 只能作为第二张辅助证据图。
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
- Current Daima panel copy is bilingual and must follow the global language state. English mode shows `Home Form Coach` / `sport`; Chinese mode shows the Chinese sport title. Do not restore `Offer Quest` to the four-screen showcase unless the user explicitly asks.
- Do not add a background/border to `.gooey-nav-container ul` under `body.is-daima-active`; it creates an unwanted rectangular frame around `Work / About`. Only the active item pill should have a visible shape.

## 2026-06-25 Language default guardrail
- The portfolio should open in English by default. Do not change `App` language initialization back to `zh` unless the user explicitly reverses this decision.
- The header brand should be `YANG` inside the circle and `Portfolio / 作品集` beside it; do not reintroduce `AI Portfolio` or `AI 作品集`.
- Default English visible UI text should not contain Chinese except for the language switch target `中文`. Chinese embedded inside portfolio screenshots/images is asset content, not language-state UI text.

## 2026-06-25 Floating contact guardrail
- Keep the email copy control in the Bill Chien-style pattern: black/white `80px` circle, right-anchored white mail icon, `EMAIL COPIED` text revealed by a left-expanding pill around `212px`, and timed retract after copy.
- Keep the Agent floating entry visually paired with the email button, but do not rewrite the existing Agent panel, AGNES API path, fallback logic, or collapse/reset behavior when only changing the icon/button shell.
- Do not use the Bill Chien yellow palette on Yang's site; the adapted contact controls should remain black/white to match the portfolio system.
- When the email pill is already expanded, a second click must not remove the expanded state before replaying. It should only apply the press scale/rebound and restart the retract timer, matching the source site's second-click behavior.

## 2026-06-25 Heart Bracelet source guardrail
- `public/portfolio/bracelet-kit-clean.jpg` is not valid Heart Disease Bracelet Kit source evidence; visual inspection shows it is an opera-mask/ruler image despite the filename.
- The COMP5571 final-project device renders (`设备前后相对.png`, `爆炸图.png`, `手机与设备.png`, `手指抓.png`) appear to be a different device/app project and should not be assigned to `heart-bracelet` without explicit user confirmation.
- Keep `heart-bracelet` hidden from public detail links and Agent navigation until a reliable original product image or user-confirmed source package is available.

## 2026-06-25 Generated asset style guardrail
- Generated or remastered project images must match the specific project's existing CMF, visual language, color palette, and layout logic; do not introduce unrelated colors, scenes, or composition styles just because they look more polished.
- For old portfolio-page source images, remove legacy navigation marks such as left-side `01-05` numbers and bottom `Design Comes From Life` text before using them on the site.
- Xiaomi CMF is a first-generation bone-conduction earphone project. Do not replace it with Xiaomi official second-generation assets unless the user explicitly approves that product identity change.

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
## 2026-06-26 Capstone 首图素材风险
- 当前 `capstone-device` 首图仍是西装徽章场景图；本轮源文件检查发现本地还有圆形设备透明图、人物展示照和若干视图图，但没有一个能在不改变项目含义的情况下明确替换为更好的首屏图。
- 不要为了“看起来像产品”而自行生成或替换 Capstone 首图；需要用户确认哪个源图/渲染图代表该项目，或提供新的定稿图后再改。
## 2026-06-26 UFEI / Capstone source-image notes
- `ufei-precision-cabinet` 的图片来源已确认来自本地 `Desktop/作品集/UFEI/立式高精度柜`；首图裁切版只裁白边，不改变产品造型、色调或材质。项目年份暂用 `2022-2023`，仍需用户最终确认。
- `capstone-device` 首图风险已通过本地源文件中的四视图设备 render 缓解：新增 `public/portfolio/capstone-device-views.png` 并作为首图；不要为该项目自行生成新产品造型。

## 2026-06-26 Detail evidence-board responsive guardrail
- `cbs5502`、`tcm-systems`、`food-health-model`、`capstone-device`、`ufei-precision-cabinet` 已有移动端专用首图；不要把它们删回单一横图，否则手机端会重新出现只露边缘、标题被裁或首图空白过多的问题。
- 证据板/流程板首图应使用 source-contain/full-contain 或对应移动端安全图，不能用普通 `object-fit: cover` 强行裁掉图表文字。
- 手机端 source-contain 首图黑色媒体标签已隐藏，避免压住图内标题；不要在未重测截图前恢复。
# 2026-07-01 拍立食滚动交互风险
- 用户已明确禁止把 `/portfolio/palifood-handheld-fresh.png`（浅绿色手持手机图）用于拍立食新滚动交互。后续维护 `PaiFoodScrollShowcase` 时不要把它加入中心手机屏幕或左右素材轨。
- AWSMD 参考站只允许作为滚动节奏、布局和动效参考；不要把 AWSMD 的 hand/media/phone 图像资产复制进作品集生产资源。当前实现使用拍立食仓库素材和 CSS 手机框。
- 用户已提供纯黑屏手持手机母版用于新交互；中心屏幕内容应作为独立视频/截图层放进黑屏内，不要再把带旧界面的手持图当底图。
# 2026-07-02 拍立食素材误用风险
- 不要再使用旧英文/GASTRONOMIA 原型截图作为拍立食 AWSMD 式滚动交互背景；用户已明确指出那不是当前 App。
- 左右背景必须来自真实 App 整屏截图，且必须先给用户确认编号后再接入交互。
- `C:\Users\Yang\Desktop\作品集\拍立食\1.png` 与用户之前禁止的绿色手持图一致：可作为识别正确视觉方向的参考，但不要直接用于新滚动交互，除非用户重新明确允许。
- 背景八张图必须保持参考站式等宽竖列阵列，不要回退为四个散点式上下小组；回归检查应量卡片宽高、列 x 坐标和横向溢出。
# 2026-07-02 Pai Li Shi AWSMD 对齐守卫
- 背景墙必须是等宽、等高、等间距的手机截图矩阵；每一张 430x940 截图都要先做圆角裁切，再合成左右墙图。不要直接拼无圆角方图，也不要回退到散落小组布局。
- 中心手持手机必须使用用户提供的纯黑屏手持母版；屏幕内容层必须严格放在透明屏幕洞内，不能超过红/黑手机边框，也不能露出底图黑屏边缘。
- 推送或部署前必须先给用户看当前截图；用户未确认前不要发布。
## 2026-07-02 Pai Li Shi screenshot-edge guardrail
- Do not treat the AWSMD-style background gaps as app UI if they are simply column spacing. Check source screenshots, generated wall assets, and rendered DOM metrics before changing assets.
- D/E/G/H/I/J/K/L selected P2 app screenshots are complete phone screenshots. The user-marked vertical bars came from the generated background-wall gaps and dark screenshot edges being partially covered by the center hand, not from a broken app screen.
- Superseded correction: the current QA baseline uses two continuous background wall images generated from real 430x940 P2 phone screenshots, not four separate DOM columns. Regression checks should confirm `.palifood-background-wall` count is 2, `.palifood-background-column` and `.palifood-background-screen` counts are 0, the center slider has exactly three onboarding screenshots, and horizontal overflow is 0.
- Before push/deploy, show the latest screenshots to the user and wait for approval.

## 2026-07-02 Pai Li Shi center-screen fit guardrail
- Do not manually nudge the center phone screen by eye. Derive `.palifood-hand-screen` from the transparent aperture in `hand-user-black-mask.png`: `x=720`, `y=35`, `w=354`, `h=731` within the `1817x866` hand image.
- The center phone animation should use the three onboarding slides A/B/C unless the user explicitly asks to restore a recorded app-flow video. The old `palifood-center-flow.mp4` is no longer the intended center interaction.
- Latest measured fit is effectively exact: Playwright reports target-vs-actual deltas around `0.016px` and `overflowX=0`. If future screenshots look misaligned, re-run the aperture/DOM measurement before changing CSS.
- User has not approved push/deploy yet. Keep changes local until screenshots/video are accepted.

## 2026-07-02 Pai Li Shi continuous-wall guardrail
- Keep the desktop background as two continuous P2 app screenshot walls: `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp`. They are generated from the user-confirmed D/E/G/H/I/J/K/L full phone screenshots and rendered as `.palifood-background-wall`.
- Do not revert to loose food images, old English/GASTRONOMIA screenshots, or four independent DOM columns unless the user explicitly asks for that rollback.
- Current measured QA evidence lives in `tmp/palifood-continuous-wall-qa/`. Required checks before any push/deploy: two wall images loaded at natural `888x3844`, old scattered background node counts are 0, center screen aperture delta stays near `0.016px`, `overflowX=0`, and the user approves the screenshots/video.
- The hand layer is proven to come from the user-provided black-screen hand image: visible RGB diff is `0` over `197703` compared pixels. Keep `hand-user-black-mask.png` as the source layer for this interaction.

## 2026-07-02 Pai Li Shi measured-fit guardrail
- Do not fix center phone misalignment by visually nudging a few pixels. First measure the hand-mask aperture and rendered slide geometry.
- Current required source geometry: `hand-user-black-mask.png` is `1817x866`; its transparent screen aperture is `x=720`, `y=35`, `w=354`, `h=731`.
- The active onboarding slide must be center-aligned to that aperture, not just visually fitted. Regression QA should record active slide center delta, slide width/height delta, expected equal crop, and `overflowX`.
- The side background walls must retain real rounded cards: normalize screenshots to `430x940`, clip each card with `46px` radius, use `28px` gaps, then composite into the wall images. Do not paste square-corner screenshots directly.
- Latest local baseline: aperture delta about `0.016px`, active slide center deltas about `0.008px`, `1.621px`, and `2.966px` across the captured scroll states, wall natural size `888x3844`, rendered width `748px`, and horizontal overflow `0`.
- User approval is still required before any push or Vercel deployment.

## 2026-07-02 Pai Li Shi black-background and aperture-fit guardrail
- User rejected keeping the white-background trial as the current direction. Keep the AWSMD-style Pai Li Shi interaction on a black background unless the user explicitly asks to revisit white.
- Center phone animation must use aperture-ratio assets (`354x731`) derived from the measured transparent screen opening in `hand-user-black-mask.png`; do not restore the original `430x940` center slides directly into the phone hole.
- Regression checks must verify: center slide natural size `354x731`, vertical crop `0px`, aperture delta around `0.016px`, no horizontal overflow, and screenshots shown to the user before push/deploy.
# 2026-07-02 Pai Li Shi pink-frame alignment guardrail
- Do not use the transparent aperture `x=720,y=35,w=354,h=731` as the final center content frame anymore. The user clarified this was the wrong baseline because the left finger occludes the real screen and makes the visible hole misleading.
- Current required baseline is the pink/red phone body frame in `hand-user-black-mask.png`: source image `1817x866`, front frame `x=700..1081`, `y=14..772`.
- The content layer must sit inside that frame with a realistic but narrower black bezel: current measured frame is `x=712`, `y=29`, `w=357`, `h=729`, giving rendered margins at 1920x900 of about left `12px`, right `12px`, top `15px`, bottom `14px`.
- The center onboarding assets must match this frame at `357x729`; do not restore `341x716` or `354x731` unless the user explicitly asks for thicker black bezels or the old visible-hole look.
- The dynamic island overlay must be centered on the same phone-frame centerline.
- Side background walls must keep real rounded app screenshots, currently `430x940` cards with `54px` radius and `54px` gap inside `palifood-left-app-wall.webp` / `palifood-right-app-wall.webp`.
- Do not push or deploy before the user approves the latest screenshots.

# 2026-07-02 Pai Li Shi side-wall continuity guardrail
- Side backgrounds must visually read as continuous walls of real app screenshots, not as loose isolated pictures or random cropped food/images.
- Current wall assets are `palifood-left-app-wall.webp` and `palifood-right-app-wall.webp`, each `914x4970`, generated from real full-screen P2 App screenshots.
- Keep the staggered two-column layout inside each wall: column 2 is offset by half a card period so row gaps do not align into a full-width horizontal break.
- Regression checks before approval/push: `.palifood-background-wall=2`, old `.palifood-background-column=0`, old `.palifood-background-screen=0`, wall natural size `914x4970`, `overflowX=0`, and latest screenshot comparison shown to the user.

# 2026-07-02 Pai Li Shi wall-gap guardrail
- Do not re-expand the side-wall seams to the previous `54px` natural gap / about `45px` rendered gap. That creates the user-rejected "断层" feeling.
- Current wall assets use natural gap `32px` and radius `42px`; at the `1920x900` QA viewport they render app-card width about `363px` and gap about `27px`, closer to the AWSMD reference.
- Current expected wall natural size is `892x4860`, not `914x4970`.
- Required regression evidence before push/deploy: wall natural size `892x4860`, `.palifood-background-wall=2`, old background DOM nodes `0`, `overflowX=0`, and screenshot comparison against the reference.
# 2026-07-03 Pai Li Shi center-screen current guardrail
- Current center-phone baseline supersedes older `x=720,w=354`, `x=712,w=357`, `x=708,w=365`, and cropped `357x729` notes.
- Do not crop the three onboarding pages to make them fit. The login button and bottom slider must remain fully visible.
- Current required center frame is derived from the pink/red phone body in `hand-user-black-mask.png`: source `1817x866`, content frame and transparent cutout `x=714,y=28,w=354,h=731`.
- Current center slide assets are no-crop Playwright captures of the real local P2 onboarding pages at `354x731` CSS pixels, saved at 2x as `708x1462` WebP: `p2-center-fit-onboarding-1/2/3.webp`.
- While the Pai Li Shi showcase is active, the site header must be hidden so it cannot cover the center phone login button.
- Push/deploy remains blocked until the user approves the latest screenshots.

## 2026-07-03 Pai Li Shi result-card source guardrail
- Do not restore `p2-right-top-result.webp` from the older tight-top capture. The user flagged that version as looking cropped/enlarged compared with the other app screenshots.
- Current replacement source is a fresh local P2 runtime capture of `艺术的诞生` normalized to `430x940`; keep it as a full mobile screenshot source.
- Regression checks before push/deploy: the `Result / 生成结果` background card must remain `430x940`, share the same rendered width/radius/gap as the other seven cards, and appear in `tmp/palifood-continuous-wall-qa/01-entry.png` without a tight/cropped topbar.

## 2026-07-03 Pai Li Shi edge/smoothness guardrail
- Do not bring back the heavy moving-column `filter` or per-card large shadows in the Pai Li Shi background wall; they made the 32 moving screenshots feel less smooth.
- The outer page-edge gap fix is intentionally asymmetric by column: only `.palifood-background-column--left-a` left corners and `.palifood-background-column--right-b` right corners are square/clipped. Interior corners must remain rounded.
- The lower-left generation card has a backup before edge-fill at `tmp/palifood-continuous-wall-qa/p2-left-bottom-generation-before-edge-fill.webp`. If the user dislikes the current edge-fill, restore from that backup instead of recropping by eye.
- Push/deploy remains blocked until the user approves the fresh screenshots/video after this pass.
## 2026-07-04 详情页底部说明模块 guardrail
- 不要再把详情页底部的 `case-study-section` 当作默认模块恢复。用户明确要求所有详情页都移除这块“标题说明 + 四张编号说明卡片”。
- 这条规则覆盖当前所有详情页，也覆盖之后新加入、继续使用 `ProjectDetail` 的项目详情页。
- 后续详情页如需补充项目信息，应优先用真实媒体、必要的详情页正文或用户确认的新模块，不要自动恢复旧的四卡片说明区。
# 2026-07-04 Product Language 转盘滚轮手感守卫
- 调整 Product Language 转盘速度时，不要扩大滚轮接管范围。必须继续只在可见 `.expansion-card` 和图片附近小范围内拦截滚轮。
- 左右大块空白、底部文字附近空白、两张图片之间距离较远的位置，应继续让页面正常向下滚动，而不是强行旋转转盘。
- 速度调优应优先调整 `wheelTargetOffset`、换算系数、clamp 和 GSAP tween，不要改转盘轨道几何、图片数量、项目入口或文字内容。
- 回归检查至少覆盖：图片上滚轮时 active label 改变且页面 `scrollY` 基本不变；空白处滚轮时页面继续下滑。
# 2026-07-05 About 黑底衔接 guardrail
- About 头像介绍区与下方数据卡片区都应读成同一片黑色空间，不要再让数据区顶部径向光晕贴着 section 边界出现硬横线。
- 后续若调整 `.about-profile-section::after` 或 `.achievement-section` 背景，必须复测两区交界处，确认没有双线、亮带或明显拼接边。
- 当前本地修正截图为 `tmp/about-transition-seam-v1/about-transition-fixed.png`；用户确认前不要 push/deploy。

# 2026-07-06 Momenta 软件视频编码 guardrail
- 不要直接把 Momenta 软件介绍视频的 HEVC 原文件作为网页引用；Playwright/Chromium 会黑屏，线上浏览器兼容性也不稳。
- 当前详情页应引用 `public/portfolio/momenta-software-intro-h264.mp4`。原 HEVC 文件只保留在本地素材审计目录，不放进 public，也不用于 `detailVideo`。
- Momenta 软件页和 `momenta-touch` 硬件页必须保持分离；不要把硬件视频、硬件 render 或设备叙述重新塞回软件详情页。
- 推送部署前必须先给用户看 `tmp/momenta-software-detail-v3/` 里的截图和录屏并获得明确确认。

# 2026-07-06 Momenta animation grouping guardrail
- Do not render `momenta-software-03.webp` and `momenta-software-02.webp` as two consecutive static detail images. The user confirmed they represent one PPT/interface animation: a wireframe/app-system state transforming into the final multi-phone visual.
- The accepted local direction is a scroll-driven, no-controls, center/radial wave reveal. It must remain page interaction, not a playable video.
- Do not split same-interface animation states into separate image blocks just because the user delivered them as individual 21:9 files. First inspect the PPT/source order and group related frames into one interaction when they are clearly the same motion.
- Regression checks before any Momenta push/deploy: one radial-wave sequence exists for `03 -> 02`, one crossfade/frame sequence exists for `11 -> 21`, no video controls appear inside sequence sections, and screenshots/video are shown to the user first.
# 2026-07-07 Momenta scroll-animation regression guardrail
- Do not replace `public/portfolio/momenta-green-cover.png` with Li Bai, landscape, or any generated cover. It must remain the approved green spotlight cover unless the user explicitly provides a new cover.
- Do not render `momenta-software-03.webp` and `momenta-software-02.webp` as consecutive static images. They are one aligned scroll-driven grey-to-color interface reveal.
- Do not split the photo capture interaction back into `photo-0` through `photo-6` as separate page blocks. The current source is the user-provided `7月7日.mp4`, converted to one scroll-driven 126-frame sequence under `scroll/photo-flow-video/`.
- The photo-flow sequence must remain one no-controls page animation, not a normal video player and not a stack of multiple images.
- Keep an explanatory text block between `momenta-software-23.webp` and final `momenta-software-05.webp` so the two white closing visuals do not collide visually.
