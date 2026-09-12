import React from 'react';
import {
  AlignJustify,
  Archive,
  BarChart3,
  Box,
  Boxes,
  Building2,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Cloud,
  Component,
  Database,
  Download,
  Eye,
  Factory,
  Fence,
  FileBox,
  FileCheck,
  FilePlus,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  History,
  Image as ImageIcon,
  Info,
  Landmark,
  Layers,
  LayoutGrid,
  Library,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Package,
  Palette,
  PanelTop,
  RefreshCw,
  Recycle,
  Ruler,
  Scan,
  ScanSearch,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Tag,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  Users,
  Warehouse,
  Wrench,
  X,
} from 'lucide-react';
import './wasteflow.css';

const ICON_PROPS = { strokeWidth: 1.75 };

/* ------------------------------------------------------------------
   Board chrome — one design system for every board.
   chapterMono: right block renders as PAGE 01 / 05 (board 01 style);
   otherwise "Chapter XX" + CN label (boards 02-05 style).
   ------------------------------------------------------------------ */

function WasteFlowBoard({
  page,
  chapterMain,
  chapterSub,
  chapterMono = false,
  meta,
  title,
  subtitle,
  tagline,
  flow = false,
  children,
}) {
  return (
    <article
      className={flow ? 'wf-board wf-board--flow' : 'wf-board'}
      data-wasteflow-page={page}
    >
      <header className="wf-topbar">
        <span className="wf-topbar__meta">
          {meta.map((part, index) => (
            <React.Fragment key={part}>
              {index > 0 ? <span className="wf-sep">/</span> : null}
              {part}
            </React.Fragment>
          ))}
        </span>
        <span className="wf-topbar__chapter">
          <span
            className={
              chapterMono
                ? 'wf-topbar__chapter-title wf-topbar__chapter-title--mono'
                : 'wf-topbar__chapter-title'
            }
          >
            {chapterMain}
          </span>
          <span
            className={
              chapterMono
                ? 'wf-topbar__chapter-sub wf-topbar__chapter-sub--mono'
                : 'wf-topbar__chapter-cn'
            }
          >
            {chapterSub}
          </span>
        </span>
      </header>
      <div className="wf-titlebar">
        <h2 className="wf-titlebar__title">{title}</h2>
        <p className="wf-titlebar__subtitle">{subtitle}</p>
        <span className="wf-titlebar__tagline">
          {tagline[0]}
          <br />
          {tagline[1]}
        </span>
      </div>
      {children}
    </article>
  );
}

/* black column head, shared by board 01 / 02 */
function ColHead({ no, icon: HeadIcon, en, cn }) {
  return (
    <header className="wf-col__head">
      <div className="wf-col__head-top">
        <span className="wf-col__num">{no}</span>
        <HeadIcon className="wf-col__icon" size="1.3cqw" {...ICON_PROPS} />
      </div>
      <h3 className="wf-col__title">{en}</h3>
      <p className="wf-col__cn">{cn}</p>
    </header>
  );
}

/* bottom label + tiles bar, shared by boards 01 / 02 / 05 */
function SupportBar({ labelEn, labelCn, items }) {
  return (
    <div className="wf-support wf-support--five">
      <div className="wf-support__title">
        <span className="wf-support__title-en">{labelEn}</span>
        <span className="wf-support__title-cn">{labelCn}</span>
      </div>
      <div className="wf-support__items">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className="wf-support-item" key={item.main}>
              <Icon className="wf-support-item__icon" size="1.25cqw" {...ICON_PROPS} />
              <span className="wf-support-item__divider" />
              <span className="wf-support-item__text">
                <span className="wf-support-item__en">{item.main}</span>
                <span className="wf-support-item__cn">{item.sub}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoopLine({ label }) {
  return (
    <div className="wf-loop wf-loop--tight" role="presentation">
      <span className="wf-loop__cap wf-loop__cap--left" />
      <span className="wf-loop__label">{label}</span>
      <span className="wf-loop__cap wf-loop__cap--right" />
    </div>
  );
}

/* ==================================================================
   BOARD 01 — From Real-World Input to Design Proposal
   ================================================================== */

const B01_META = ['REAL INPUT', 'ANALYSIS', 'MODELING', 'VISUALIZATION', 'FINAL OUTPUT'];
const B01_TAGLINE = ['FROM REAL WORLD', 'TO DESIGN PROPOSAL'];

const B01_COLUMNS = [
  {
    no: '01',
    icon: FileText,
    en: 'Brief & Site Input',
    cn: '需求与现场输入',
    media: { type: 'grid' },
    items: [
      { icon: FileText, en: 'Requirement Document', cn: '需求文档' },
      { icon: ImageIcon, en: 'Site Photos', cn: '现场照片' },
      { icon: Cloud, en: 'Reference Files', cn: '参考资料 / 素材库' },
    ],
  },
  {
    no: '02',
    icon: Search,
    en: 'Requirement Analysis',
    cn: '需求分析与场景理解',
    media: { type: 'img', src: '/portfolio/wasteflow/opt/site-warehouse.jpg' },
    items: [
      { icon: Eye, en: 'Site Conditions', cn: '现场环境 / 建筑' },
      { icon: Box, en: 'Needs & Constraints', cn: '需求与限制条件' },
      { icon: Lightbulb, en: 'Key Design Goals', cn: '设计首要目标' },
    ],
  },
  {
    no: '03',
    icon: Box,
    en: 'Rhino Modeling',
    cn: '三维建模',
    media: { type: 'img', src: '/portfolio/wasteflow/opt/render-racks.png' },
    items: [
      { icon: Boxes, en: '3D Structure Modeling', cn: '整体结构建模' },
      { icon: Ruler, en: 'Dimension & Proportion', cn: '尺寸与比例控制' },
      { icon: RefreshCw, en: 'Iteration & Refinement', cn: '方案迭代优化' },
    ],
  },
  {
    no: '04',
    icon: LayoutGrid,
    en: 'KeyShot Visualization',
    cn: '材质渲染与表现',
    media: { type: 'img', src: '/portfolio/wasteflow/opt/render-machine.png' },
    items: [
      { icon: Palette, en: 'Material & Color Setup', cn: '材质与颜色设置' },
      { icon: Lightbulb, en: 'Lighting & Environment', cn: '灯光与场景渲染' },
      { icon: ImageIcon, en: 'Render Output', cn: '渲染输出' },
    ],
  },
  {
    no: '05',
    icon: Send,
    en: 'Proposal Output',
    cn: '设计方案输出',
    media: { type: 'img', src: '/portfolio/wasteflow/opt/cover-35auto.png' },
    items: [
      { icon: Box, en: 'Final Render', cn: '最终效果图' },
      { icon: FileText, en: 'Presentation Boards', cn: '方案展板' },
      { icon: Layers, en: 'Deliverables', cn: '交付文件夹' },
    ],
  },
];

const B01_GRID_SHOTS = [
  '/portfolio/wasteflow/opt/site-container.jpg',
  '/portfolio/wasteflow/opt/site-warehouse.jpg',
  '/portfolio/wasteflow/opt/site-factory.png',
  '/portfolio/wasteflow/opt/cover-35auto.png',
  '/portfolio/wasteflow/opt/render-indoor.png',
  '/portfolio/wasteflow/opt/render-canopy.png',
];

const B01_OUTPUT = [
  { icon: ImageIcon, main: 'Design Renders', sub: '设计图' },
  { icon: FileText, main: 'Design Boards', sub: '方案展板' },
  { icon: Boxes, main: '3D Source Files', sub: '三维源文件' },
  { icon: Layers, main: 'Materials & Settings', sub: '材质与渲染设置' },
  { icon: Send, main: 'Ready for Implementation', sub: '支持落地' },
];

function WasteFlowBoard01() {
  return (
    <WasteFlowBoard
      page="01"
      chapterMain="PAGE 01 / 05"
      chapterSub="FROM REAL WORLD TO DESIGN PROPOSAL"
      chapterMono
      meta={B01_META}
      title="From Real-World Input to Design Proposal"
      subtitle="从现场信息到设计方案的完整流程"
      tagline={B01_TAGLINE}
      flow
    >
      <div className="wf-cols wf-cols--5 wf-cols--flow">
        {B01_COLUMNS.map((column) => (
          <section className="wf-col" key={column.no}>
            <ColHead no={column.no} icon={column.icon} en={column.en} cn={column.cn} />
            {column.media.type === 'grid' ? (
              <div className="wf-media wf-media--grid">
                {B01_GRID_SHOTS.map((src) => (
                  <img src={src} alt="" key={src} />
                ))}
                <span className="wf-metric">1.53m</span>
                <span className="wf-metric">2.36m</span>
              </div>
            ) : (
              <div className="wf-media">
                <img src={column.media.src} alt="" />
              </div>
            )}
            <div className="wf-cards wf-cards--under-media">
              {column.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="wf-card" key={item.en}>
                    <Icon className="wf-card__icon" size="1.15cqw" {...ICON_PROPS} />
                    <span className="wf-card__text">
                      <span className="wf-card__en">{item.en}</span>
                      <span className="wf-card__cn">{item.cn}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <LoopLine label="REAL INSIGHT  /  CLEAR PROCESS  /  TANGIBLE SOLUTION" />
      <SupportBar labelEn="PROJECT OUTPUT" labelCn="项目成果" items={B01_OUTPUT} />
    </WasteFlowBoard>
  );
}

/* ==================================================================
   BOARD 02 — From Files to a Reusable Knowledge Base
   ================================================================== */

const B02_META = ['FILE ARCHIVE', 'STANDARDIZE', 'STRUCTURE', 'INDEX', 'REUSE'];
const B02_TAGLINE = ['FROM SCATTERED FILES', 'TO A SEARCHABLE KNOWLEDGE BASE'];

const B02_FOLDERS = [
  '京瓷光电',
  '住成维保',
  '佛山大润环保',
  '国泰达鸣',
  '天津电装',
  '安费诺',
  '广州日立',
  '广州松下空调',
  '深圳传嘉',
];

const B02_THUMBS = [
  { src: '/portfolio/wasteflow/opt/render-door.png', name: '1.01.png' },
  { src: '/portfolio/wasteflow/opt/render-machine.png', name: '1.02.png' },
  { src: '/portfolio/wasteflow/opt/render-canopy.png', name: '1.03.png' },
];

const B02_RESULTS = [
  { src: '/portfolio/wasteflow/opt/render-door.png', name: '1.01.png' },
  { src: '/portfolio/wasteflow/opt/render-machine.png', name: '1.02.png' },
  { src: '/portfolio/wasteflow/opt/render-canopy.png', name: '1.03.png' },
  { src: '/portfolio/wasteflow/opt/render-racks.png', name: '1.04.png' },
  { src: '/portfolio/wasteflow/opt/render-indoor.png', name: '1.05.png' },
  { src: '/portfolio/wasteflow/opt/render-door-2.png', name: '1.06.png' },
];

const B02_CATEGORIES = [
  { name: '建模', files: ['模型文件', '材质贴图', '参考文件'] },
  { name: '效果图', files: ['场景图', '角度图', '细节图'] },
  { name: '渲染', files: ['渲染图', '后期图', '视频动画'] },
];

const B02_META_ROWS = [
  { label: '项目名称', chips: ['广州日立电梯'] },
  { label: '文件类型', chips: ['模型', '效果图', '渲染'] },
  { label: '应用场景', chips: ['机房', '厅门', '轿厢'] },
  { label: '风格', chips: ['现代', '工业', '极简'] },
  { label: '版本号', chips: ['1.0'] },
  { label: '创建时间', chips: ['2024-06-12'] },
  { label: '关键字', chips: ['电梯', '机房', '设备间'] },
];

const B02_KB = [
  { icon: Package, en: '项目模板', cn: 'Project Templates' },
  { icon: ImageIcon, en: '标准图库', cn: 'Image Library' },
  { icon: Palette, en: '材质资源', cn: 'Materials Library' },
  { icon: FileText, en: '经验文档', cn: 'Design Guidelines' },
  { icon: RefreshCw, en: '持续更新', cn: 'Continuous Expansion' },
];

const B02_VERSIONS = ['1.0', '1.1', '1.2', '1.3', '1.4', '2.0'];

function WfFolder({ name, small = false }) {
  return (
    <span className={small ? 'wf-folder wf-folder--small' : 'wf-folder'}>
      <Folder size={small ? '1.15cqw' : '1.85cqw'} fill="#f7b733" color="#232323" strokeWidth={1.1} />
      <span className="wf-folder__name">{name}</span>
    </span>
  );
}

function WasteFlowBoard02() {
  return (
    <WasteFlowBoard
      page="02"
      chapterMain="Chapter 02"
      chapterSub="文件资产化"
      meta={B02_META}
      title="From Files to a Reusable Knowledge Base"
      subtitle="让分散的项目文件，变成可搜索、可复用的设计知识库"
      tagline={B02_TAGLINE}
      flow
    >
      <div className="wf-cols wf-cols--6 wf-cols--flow">
        {/* 01 scattered archive */}
        <section className="wf-col">
          <ColHead no="01" icon={Folder} en="SCATTERED ARCHIVE" cn="分散的项目文件" />
          <div className="wf-notebook">
            <div className="wf-folders">
              {B02_FOLDERS.map((name) => (
                <WfFolder key={name} name={name} />
              ))}
            </div>
            <span className="wf-folders__more">...</span>
          </div>
          <div className="wf-note">
            <FileText size="1.1cqw" {...ICON_PROPS} />
            <p>
              文件分散，命名不统一
              <br />
              查找困难，难以复用
            </p>
          </div>
        </section>

        {/* 02 naming & versioning */}
        <section className="wf-col">
          <ColHead no="02" icon={FileText} en="NAMING & VERSIONING" cn="命名规则与版本结构" />
          <div className="wf-notebook">
            <p className="wf-notebook__label">版本目录结构</p>
            <div className="wf-versionrow">
              {B02_VERSIONS.map((v) => (
                <WfFolder key={v} name={v} small />
              ))}
            </div>
            <p className="wf-notebook__label">文件命名规则</p>
            <div className="wf-thumbrow">
              {B02_THUMBS.map((t) => (
                <figure className="wf-thumb" key={t.name}>
                  <img src={t.src} alt="" />
                  <figcaption>{t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="wf-note">
            <Tag size="1.1cqw" {...ICON_PROPS} />
            <p>
              统一命名规则
              <br />
              按版本管理，清晰可追溯
            </p>
          </div>
        </section>

        {/* 03 categorized assets */}
        <section className="wf-col">
          <ColHead no="03" icon={FolderOpen} en="CATEGORIZED ASSETS" cn="分类的设计资产" />
          <div className="wf-notebook">
            <div className="wf-cattree">
              {B02_CATEGORIES.map((cat) => (
                <div className="wf-cattree__cat" key={cat.name}>
                  <Folder size="1.9cqw" fill="#f7b733" color="#232323" strokeWidth={1.1} />
                  <span className="wf-cattree__name">{cat.name}</span>
                  <ul>
                    {cat.files.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                    <li>...</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="wf-note">
            <Box size="1.1cqw" {...ICON_PROPS} />
            <p>
              按内容类型分类
              <br />
              结构清晰，便于管理
            </p>
          </div>
        </section>

        {/* 04 metadata tags */}
        <section className="wf-col">
          <ColHead no="04" icon={Tag} en="METADATA TAGS" cn="元数据标签" />
          <div className="wf-notebook">
            <div className="wf-metaform">
              {B02_META_ROWS.map((row) => (
                <div className="wf-metaform__row" key={row.label}>
                  <span className="wf-metaform__label">{row.label}</span>
                  <span className="wf-metaform__value">
                    {row.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </span>
                </div>
              ))}
              <span className="wf-metaform__more">...</span>
            </div>
          </div>
          <div className="wf-note">
            <FileText size="1.1cqw" {...ICON_PROPS} />
            <p>
              为文件添加结构化信息
              <br />
              提升检索与复用效率
            </p>
          </div>
        </section>

        {/* 05 search & retrieval */}
        <section className="wf-col">
          <ColHead no="05" icon={Search} en="SEARCH & RETRIEVAL" cn="检索与索引" />
          <div className="wf-notebook">
            <div className="wf-searchpill">
              <Search size="0.95cqw" {...ICON_PROPS} />
              <span>电梯 · 机房 · 渲染</span>
            </div>
            <div className="wf-chiprow">
              {['文件类型', '项目', '版本'].map((chip) => (
                <span className="wf-chip" key={chip}>
                  {chip}
                  <ChevronDown size="0.7cqw" {...ICON_PROPS} />
                </span>
              ))}
            </div>
            <div className="wf-resultgrid">
              {B02_RESULTS.map((r) => (
                <figure className="wf-thumb" key={r.name}>
                  <img src={r.src} alt="" />
                  <figcaption>{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="wf-note">
            <BarChart3 size="1.1cqw" {...ICON_PROPS} />
            <p>
              通过标签、关键词快速定位
              <br />
              所需文件
            </p>
          </div>
        </section>

        {/* 06 reusable knowledge base */}
        <section className="wf-col">
          <ColHead no="06" icon={Database} en="REUSABLE KNOWLEDGE BASE" cn="可复用的知识库" />
          <div className="wf-notebook wf-notebook--list">
            {B02_KB.map((item) => {
              const Icon = item.icon;
              return (
                <div className="wf-kbitem" key={item.en}>
                  <Icon size="1.05cqw" {...ICON_PROPS} />
                  <span className="wf-kbitem__text">
                    <span className="wf-kbitem__en">{item.en}</span>
                    <span className="wf-kbitem__cn">{item.cn}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="wf-note">
            <Database size="1.1cqw" {...ICON_PROPS} />
            <p>
              沉淀为可复用的设计资产
              <br />
              支持新项目快速应用
            </p>
          </div>
        </section>
      </div>
      <SupportBar
        labelEn="KEY BENEFITS"
        labelCn="核心价值"
        items={[
          { icon: Search, main: '快速查找', sub: 'Faster Retrieval' },
          { icon: Settings, main: '规范管理', sub: 'Standardized Management' },
          { icon: Layers, main: '知识沉淀', sub: 'Knowledge Accumulation' },
          { icon: RefreshCw, main: '提升效率', sub: 'Higher Efficiency' },
          { icon: Users, main: '支持复用', sub: 'Reusable for Future Projects' },
        ]}
      />
    </WasteFlowBoard>
  );
}

/* ==================================================================
   BOARD 03 — Agent System Architecture (visual master board, frozen)
   ================================================================== */

const BOARD03_META = ['SYS_ARCH_2026', 'MODULAR', 'SCALABLE', 'HUMAN-CENTERED'];

const BOARD03_TAGLINE = ['TURN CONSTRUCTION WASTE', 'INTO REUSABLE DESIGN ASSETS'];

const BOARD03_COLUMNS = [
  {
    no: '01',
    icon: FileText,
    en: 'INPUT LAYER',
    cn: '输入层',
    items: [
      { icon: FileText, en: 'Requirement Doc', cn: '项目需求' },
      { icon: ImageIcon, en: 'Site Photos', cn: '现场照片' },
      { icon: Tag, en: 'Naming Rules', cn: '命名规则' },
      { icon: Layers, en: 'Similar Cases', cn: '相似案例' },
    ],
  },
  {
    no: '02',
    icon: Scan,
    en: 'PARSE + UNDERSTAND',
    cn: '解析理解',
    items: [
      { icon: FileText, en: 'OCR / VLM Parsing', cn: '文档解析' },
      { icon: ListChecks, en: 'Need Extraction', cn: '需求提取' },
      { icon: Boxes, en: 'Scene Understanding', cn: '场景理解' },
      { icon: Component, en: 'Component Cues', cn: '部件线索' },
    ],
  },
  {
    no: '03',
    icon: Database,
    en: 'RETRIEVAL CORE',
    cn: '检索核心',
    items: [
      { icon: Archive, en: 'Archive Index', cn: '检索索引' },
      { icon: Filter, en: 'Metadata Filter', cn: '元数据筛选' },
      { icon: Search, en: 'Vector Search', cn: '语义检索' },
      { icon: BarChart3, en: 'Ranked Cases', cn: '相似案例排序' },
    ],
  },
  {
    no: '04',
    icon: ClipboardList,
    en: 'REUSE PLANNER',
    cn: '复用规划',
    items: [
      { icon: FileCheck, en: 'Single-case Reuse', cn: '单案例复用' },
      { icon: Layers, en: 'Multi-case Assembly', cn: '多案例组合' },
      { icon: ShieldCheck, en: 'Constraint Check', cn: '约束校验' },
      { icon: Lightbulb, en: 'Adaptation Suggestion', cn: '适配建议' },
    ],
  },
  {
    no: '05',
    icon: Wrench,
    en: 'TOOL LAYER',
    cn: '工具驱动',
    items: [
      { icon: Box, en: 'Open Rhino', cn: '打开Rhino' },
      { icon: Camera, en: 'Open KeyShot', cn: '打开KeyShot' },
      { icon: Eye, en: 'Preview Files', cn: '文件预览' },
      { icon: LayoutGrid, en: 'Other Tools', cn: '扩展工具' },
    ],
  },
  {
    no: '06',
    icon: UserCheck,
    en: 'HUMAN REVIEW',
    cn: '人工审核',
    items: [
      { icon: ScanSearch, en: 'Inspect', cn: '结果检查' },
      { icon: SlidersHorizontal, en: 'Adjust', cn: '手动微调' },
      { icon: CheckCircle2, en: 'Approve', cn: '方案确认' },
      { icon: MessageSquare, en: 'Comments', cn: '批注反馈' },
    ],
  },
  {
    no: '07',
    icon: Send,
    en: 'OUTPUT',
    cn: '交付输出',
    items: [
      { icon: Package, en: 'Reuse Package', cn: '可复用包' },
      { icon: FileBox, en: 'Rhino Files', cn: '建模文件' },
      { icon: ImageIcon, en: 'Render Path', cn: '渲染路径' },
      { icon: BarChart3, en: 'Proposal Support', cn: '方案支持' },
    ],
  },
];

const BOARD03_SUPPORT = [
  { icon: Settings, en: 'Python Orchestrator', cn: '流程控制' },
  { icon: BarChart3, en: 'Trace + Eval', cn: '追踪评估' },
  { icon: RefreshCw, en: 'Feedback Loop', cn: '反馈循环' },
  { icon: Users, en: 'Human-in-the-Loop', cn: '人在回路' },
];

function WasteFlowBoard03() {
  return (
    <WasteFlowBoard
      page="03"
      chapterMain="Chapter 03"
      chapterSub="系统架构"
      meta={BOARD03_META}
      title="WasteFlow Reuse Agent System"
      subtitle="从项目输入到可复用成果的智能化闭环"
      tagline={BOARD03_TAGLINE}
    >
      <div className="wf-cols">
        {BOARD03_COLUMNS.map((column) => {
          const HeadIcon = column.icon;
          return (
            <section className="wf-col" key={column.no}>
              <header className="wf-col__head">
                <div className="wf-col__head-top">
                  <span className="wf-col__num">{column.no}</span>
                  <HeadIcon className="wf-col__icon" size="1.3cqw" {...ICON_PROPS} />
                </div>
                <h3 className="wf-col__title">{column.en}</h3>
                <p className="wf-col__cn">{column.cn}</p>
              </header>
              <div className="wf-cards">
                {column.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="wf-card" key={item.en}>
                      <Icon className="wf-card__icon" size="1.15cqw" {...ICON_PROPS} />
                      <span className="wf-card__text">
                        <span className="wf-card__en">{item.en}</span>
                        <span className="wf-card__cn">{item.cn}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="wf-loop" role="presentation">
        <span className="wf-loop__cap wf-loop__cap--left" />
        <span className="wf-loop__label">ITERATION / FEEDBACK / CONTINUOUS IMPROVEMENT -</span>
        <span className="wf-loop__cap wf-loop__cap--right" />
      </div>
      <div className="wf-support">
        <div className="wf-support__title">
          <span className="wf-support__title-en">SYSTEM SUPPORT LAYER</span>
          <span className="wf-support__title-cn">系统支撑层</span>
        </div>
        <div className="wf-support__items">
          {BOARD03_SUPPORT.map((item) => {
            const Icon = item.icon;
            return (
              <div className="wf-support-item" key={item.en}>
                <Icon className="wf-support-item__icon" size="1.25cqw" {...ICON_PROPS} />
                <span className="wf-support-item__divider" />
                <span className="wf-support-item__text">
                  <span className="wf-support-item__en">{item.en}</span>
                  <span className="wf-support-item__cn">{item.cn}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </WasteFlowBoard>
  );
}

/* ==================================================================
   BOARD 04 — Multi-Case Reuse Strategy
   ================================================================== */

const B04_META = ['SYS_ARCH_3226', 'MODULAR', 'SCALABLE', 'HUMAN-CENTERED'];
const B04_TAGLINE = ['TURN EXISTING SOLUTIONS', 'INTO REUSABLE SOLUTIONS'];

const B04_CASE_A = [
  { icon: MapPin, en: 'Urban Facility', cn: '城市市区' },
  { icon: PanelTop, en: 'With Canopy', cn: '带雨棚' },
  { icon: LayoutGrid, en: 'Wall Installation', cn: '墙体安装' },
  { icon: Box, en: 'Basic Unit', cn: '基础单元' },
];

const B04_CASE_B = [
  { icon: MapPin, en: 'Outdoor Site', cn: '室外场地' },
  { icon: Fence, en: 'With Fence', cn: '带围栏' },
  { icon: LayoutGrid, en: 'Open Layout', cn: '开放布局' },
  { icon: Box, en: 'Standard Space', cn: '标准空间' },
];

const B04_TILES = [
  { icon: PanelTop, en: 'Canopy Roof', cn: '遮雨棚', img: '/portfolio/wasteflow/opt/render-canopy.png' },
  { icon: Fence, en: 'Fence Module', cn: '围栏模块', img: '/portfolio/wasteflow/opt/cover-35auto.png' },
  { icon: Recycle, en: 'Information Panel', cn: '信息面板', img: '/portfolio/wasteflow/opt/render-door.png' },
  { icon: Package, en: 'Cabinet Module', cn: '箱体模块', img: '/portfolio/wasteflow/opt/render-cuntian.png' },
  { icon: TriangleAlert, en: 'Safety Marking', cn: '安全警示', img: '/portfolio/wasteflow/opt/render-jieshiduo.png' },
  { icon: Ruler, en: 'Scene Constraints', cn: '场地约束', img: '/portfolio/wasteflow/opt/site-warehouse.jpg' },
];

const B04_STEPS = [
  { icon: Settings, en: 'Normalize Modules', cn: '标准化组件' },
  { icon: Shuffle, en: 'Flexible Combination', cn: '灵活组合' },
  { icon: MapPin, en: 'Adapt to Multiple Sites', cn: '适配多场景' },
  { icon: TrendingUp, en: 'Scalable Deployment', cn: '规模化部署' },
];

const B04_PACK = [
  { icon: Package, en: 'Cabinet Unit', cn: '箱体单元', qty: '×1–N', img: '/portfolio/wasteflow/opt/render-cuntian.png' },
  { icon: PanelTop, en: 'Canopy Unit', cn: '遮雨棚单元', qty: '×0–1', img: '/portfolio/wasteflow/opt/render-canopy.png' },
  { icon: Fence, en: 'Fence Unit', cn: '围栏单元', qty: '×0–N', img: '/portfolio/wasteflow/opt/cover-35auto.png' },
  { icon: Recycle, en: 'Info Panel', cn: '信息面板', qty: '×1–N', img: '/portfolio/wasteflow/opt/render-door.png' },
  { icon: TriangleAlert, en: 'Safety Unit', cn: '安全单元', qty: '×N', img: '/portfolio/wasteflow/opt/render-jieshiduo.png' },
  { icon: Layers, en: 'Base Option', cn: '基础适配', qty: '×1', img: '/portfolio/wasteflow/opt/render-green-room.png' },
];

const B04_SCENARIOS = [
  { icon: Factory, en: 'Industrial Park', cn: '产业园区' },
  { icon: Warehouse, en: 'Logistics Center', cn: '物流中心' },
  { icon: Building2, en: 'Commercial Site', cn: '商业场所' },
  { icon: Landmark, en: 'Municipal Facility', cn: '市政设施' },
  { icon: MoreHorizontal, en: 'More Possibilities', cn: '更多扩展' },
];

function CaseCard({ label, cn, items, photo }) {
  return (
    <div className="wf-case">
      <div className="wf-case__title">
        <span className="wf-case__label">{label}</span>
        <span className="wf-case__cn">{cn}</span>
      </div>
      <div className="wf-case__body">
        <div className="wf-case__list">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div className="wf-case__item" key={item.en}>
                <Icon size="1.05cqw" {...ICON_PROPS} />
                <span className="wf-case__item-text">
                  <span className="wf-case__item-en">{item.en}</span>
                  <span className="wf-case__item-cn">{item.cn}</span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="wf-case__photo">
          <img src={photo} alt="" />
        </div>
      </div>
    </div>
  );
}

function WasteFlowBoard04() {
  return (
    <WasteFlowBoard
      page="04"
      chapterMain="Chapter 04"
      chapterSub="多场景复用"
      meta={B04_META}
      title="Multi-Case Reuse Strategy"
      subtitle="多场景复用策略 · 模块化组合"
      tagline={B04_TAGLINE}
      flow
    >
      <div className="wf-b04">
        <div className="wf-b04__top">
          <CaseCard
            label="Case A"
            cn="场景案例 A"
            items={B04_CASE_A}
            photo="/portfolio/wasteflow/opt/render-canopy.png"
          />
          <div className="wf-extract">
            <div className="wf-extract__title">
              <span>Component Extraction</span>
              <span className="wf-extract__title-cn">可复用组件提取</span>
            </div>
            <div className="wf-extract__grid">
              {B04_TILES.map((tile) => {
                return (
                  <div className="wf-tile" key={tile.en}>
                    <span className="wf-tile__img">
                      <img src={tile.img} alt="" />
                    </span>
                    <span className="wf-tile__en">{tile.en}</span>
                    <span className="wf-tile__cn">{tile.cn}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <CaseCard
            label="Case B"
            cn="场景案例 B"
            items={B04_CASE_B}
            photo="/portfolio/wasteflow/opt/cover-35auto.png"
          />
        </div>
        <LoopLine label="EXTRACT  →  RECOMBINE  →  REUSE  →  SCALABLE SOLUTIONS" />
        <div className="wf-b04__bottom">
          <div className="wf-plan">
            <div className="wf-extract__title">
              <span>Reuse Planning</span>
              <span className="wf-extract__title-cn">复用规划</span>
            </div>
            <div className="wf-plan__body">
              <div className="wf-steps">
                {B04_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div className="wf-step" key={step.en}>
                      <span className="wf-step__no">{index + 1}</span>
                      <Icon size="1.0cqw" {...ICON_PROPS} />
                      <span className="wf-step__text">
                        <span className="wf-step__en">{step.en}</span>
                        <span className="wf-step__cn">{step.cn}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <figure className="wf-plan__photo">
                <img src="/portfolio/wasteflow/opt/render-indoor.png" alt="" />
                <figcaption>
                  <strong>Recombined Solution</strong>
                  <span>重组化方案</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="wf-pack">
            <div className="wf-extract__title">
              <span>Reusable Module Package</span>
              <span className="wf-extract__title-cn">可复用模块包</span>
            </div>
            <div className="wf-pack__grid">
              {B04_PACK.map((tile) => {
                return (
                  <div className="wf-pack-tile" key={tile.en}>
                    <span className="wf-pack-tile__img">
                      <img src={tile.img} alt="" />
                    </span>
                    <span className="wf-pack-tile__en">{tile.en}</span>
                    <span className="wf-pack-tile__cn">{tile.cn}</span>
                    <span className="wf-pack-tile__qty">{tile.qty}</span>
                  </div>
                );
              })}
            </div>
            <div className="wf-scen">
              <span className="wf-scen__title">
                <span className="wf-scen__en">Application Scenarios</span>
                <span className="wf-scen__cn">应用场景</span>
              </span>
              {B04_SCENARIOS.map((s) => {
                const Icon = s.icon;
                return (
                  <span className="wf-scen__item" key={s.en}>
                    <Icon size="1.05cqw" {...ICON_PROPS} />
                    <span className="wf-scen__text">
                      <span className="wf-scen__item-en">{s.en}</span>
                      <span className="wf-scen__item-cn">{s.cn}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </WasteFlowBoard>
  );
}

/* ==================================================================
   BOARD 05 — Reuse Agent Workbench
   ================================================================== */

const B05_META = ['SYS_ARCH_3234', 'MODULAR', 'SCALABLE', 'HUMAN-CENTERED'];
const B05_TAGLINE = ['TOOL LAYER · INTERFACE', 'REUSE AGENT WORKBENCH'];

const B05_CHECKS = [
  { en: 'Extract product information', cn: '提取产品信息' },
  { en: 'Identify key components', cn: '识别关键部件' },
  { en: 'Analyze design intent', cn: '分析设计意图' },
  { en: 'Generate search keywords', cn: '生成检索关键词' },
];

const B05_FILTERS = [
  { en: 'Category', cn: '产品类别', options: [
    { name: 'Waste Bins', on: true },
    { name: 'Storage', on: false },
    { name: 'Signage', on: false },
    { name: 'Other', on: false },
  ] },
  { en: 'Application', cn: '应用场景', options: [
    { name: 'Indoor', on: true },
    { name: 'Outdoor', on: false },
    { name: 'Public Space', on: false },
    { name: 'Industrial', on: false },
  ] },
  { en: 'Material', cn: '主要材质', options: [
    { name: 'Steel', on: true },
    { name: 'Aluminum', on: false },
    { name: 'Plastic', on: false },
    { name: 'Composite', on: false },
  ] },
  { en: 'Mounting', cn: '安装方式', options: [
    { name: 'Floor Standing', on: false },
    { name: 'Wall Mounted', on: false },
    { name: 'Modular', on: true },
    { name: 'Other', on: false },
  ] },
];

const B05_PRODUCTS = [
  { src: '/portfolio/wasteflow/opt/render-canopy.png', en: 'Modular Waste Station', cn: '模块化回收站', tags: ['Indoor', 'Modular', 'Steel'], picked: true },
  { src: '/portfolio/wasteflow/opt/render-haixin.png', en: 'Sorting Station', cn: '分类回收站', tags: ['Indoor', 'Modular', 'Steel'] },
  { src: '/portfolio/wasteflow/opt/render-cuntian.png', en: 'Compact Bin', cn: '紧凑型垃圾桶', tags: ['Indoor', 'Compact', 'Steel'] },
  { src: '/portfolio/wasteflow/opt/render-machine.png', en: 'Wall Mounted Bin', cn: '壁挂式垃圾桶', tags: ['Indoor', 'Wall', 'Aluminum'] },
  { src: '/portfolio/wasteflow/opt/render-jieshiduo.png', en: 'Outdoor Station', cn: '户外回收站', tags: ['Outdoor', 'Modular', 'Steel'] },
  { src: '/portfolio/wasteflow/opt/cover-35auto.png', en: 'Dual Stream Bin', cn: '双分类垃圾桶', tags: ['Indoor', 'Modular', 'Steel'] },
];

const B05_DELIVERABLES = [
  { icon: Box, en: 'Rhino 3D File (.3dm)', cn: '三维模型文件' },
  { icon: FileText, en: 'STEP File (.step)', cn: '通用交换文件' },
  { icon: ImageIcon, en: 'Render Package', cn: '渲染文件包' },
  { icon: Ruler, en: 'Technical Drawing (.pdf)', cn: '技术图纸' },
  { icon: TrendingUp, en: 'Reuse Proposal (.pdf)', cn: '复用建议方案' },
];

function WbHead({ no, en, cn, steps, stepsCn }) {
  return (
    <div className="wf-wbhead">
      <span className="wf-wbhead__no">{no}</span>
      <span className="wf-wbhead__text">
        <span className="wf-wbhead__en">{en}</span>
        <span className="wf-wbhead__cn">{cn}</span>
      </span>
      <span className="wf-wbhead__steps">
        <span className="wf-wbhead__steps-en">{steps}</span>
        <span className="wf-wbhead__steps-cn">{stepsCn}</span>
      </span>
    </div>
  );
}

function WasteFlowBoard05() {
  return (
    <WasteFlowBoard
      page="05"
      chapterMain="Chapter 05"
      chapterSub="工具层设计"
      meta={B05_META}
      title="Reuse Agent Workbench"
      subtitle="从项目输入到可复用成果的智能工作台"
      tagline={B05_TAGLINE}
      flow
    >
      <div className="wf-wbrow">
        {/* 01 intake & parsing */}
        <div className="wf-wbcol">
          <WbHead
            no="01"
            en="Project Intake & Parsing"
            cn="项目输入与解析"
            steps="UPLOAD → PARSE → UNDERSTAND"
            stepsCn="工作资料 / 解析内容 / 理解需求"
          />
          <div className="wf-wb">
            <div className="wf-side">
              <span className="wf-side__item wf-side__item--active">
                <FilePlus size="0.95cqw" {...ICON_PROPS} /> New Project
              </span>
              <span className="wf-side__item">
                <Library size="0.95cqw" {...ICON_PROPS} /> Project Library
              </span>
              <span className="wf-side__item">
                <History size="0.95cqw" {...ICON_PROPS} /> Parsing History
              </span>
              <span className="wf-side__item">
                <Settings size="0.95cqw" {...ICON_PROPS} /> Settings
              </span>
            </div>
            <div className="wf-drop">
              <span className="wf-drop__fileicon">
                <FileText size="1.4cqw" {...ICON_PROPS} />
              </span>
              <strong className="wf-drop__title">Drag and drop your project files here</strong>
              <span className="wf-drop__cn">拖放文件至此区域</span>
              <span className="wf-drop__hint">
                Supports CAD, PDF, images, specs, etc.
                <br />
                支持 CAD、PDF、图片、规格书等
              </span>
              <span className="wf-btn-orange">Select Files 选择文件</span>
            </div>
            <div className="wf-parse">
              <span className="wf-parse__title">Parsing...</span>
              <span className="wf-parse__cn">正在解析 …</span>
              <div className="wf-parse__checks">
                {B05_CHECKS.map((check) => (
                  <span className="wf-parse__check" key={check.en}>
                    <CheckCircle2 size="1.0cqw" color="#7ac142" strokeWidth={2} />
                    <span className="wf-parse__check-text">
                      <span className="wf-parse__check-en">{check.en}</span>
                      <span className="wf-parse__check-cn">{check.cn}</span>
                    </span>
                  </span>
                ))}
              </div>
              <div className="wf-progress">
                <span className="wf-progress__bar" />
                <span className="wf-progress__num">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 02 retrieval & case comparison */}
        <div className="wf-wbcol">
          <WbHead
            no="02"
            en="Retrieval & Case Comparison"
            cn="检索与案例对比"
            steps="SEARCH → COMPARE → EVALUATE"
            stepsCn="智能检索 / 案例对比 / 综合选择"
          />
          <div className="wf-wb wf-wb--col">
            <div className="wf-ui__bar">
              <span className="wf-searchpill2">
                <Search size="0.85cqw" {...ICON_PROPS} />
                waste bin
                <X size="0.7cqw" {...ICON_PROPS} />
              </span>
              <span className="wf-btn-orange wf-btn-orange--sm">Search</span>
              <span className="wf-results-num">
                <strong>12 results</strong> 12 个结果
              </span>
              <span className="wf-select">
                Relevance <ChevronDown size="0.75cqw" {...ICON_PROPS} />
              </span>
              <LayoutGrid size="0.9cqw" color="#f6a528" {...ICON_PROPS} />
              <AlignJustify size="0.9cqw" color="#8a867a" {...ICON_PROPS} />
            </div>
            <div className="wf-ui__body">
              <div className="wf-filters">
                {B05_FILTERS.map((group) => (
                  <div className="wf-filter" key={group.en}>
                    <span className="wf-filter__title">
                      <span className="wf-filter__en">{group.en}</span>
                      <span className="wf-filter__cn">{group.cn}</span>
                    </span>
                    {group.options.map((option) => (
                      <span className="wf-checkrow" key={option.name}>
                        <span className={option.on ? 'wf-box wf-box--on' : 'wf-box'} />
                        <span className={option.on ? 'wf-checkrow__name wf-checkrow__name--on' : 'wf-checkrow__name'}>
                          {option.name}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="wf-resultsgrid">
                {B05_PRODUCTS.map((product) => (
                  <div
                    className={product.picked ? 'wf-product wf-product--picked' : 'wf-product'}
                    key={product.en}
                  >
                    {product.picked ? (
                      <span className="wf-product__badge">
                        <CheckCircle2 size="0.9cqw" color="#232323" strokeWidth={2.4} />
                      </span>
                    ) : null}
                    <span className="wf-product__img">
                      <img src={product.src} alt="" />
                    </span>
                    <span className="wf-product__en">{product.en}</span>
                    <span className="wf-product__cn">{product.cn}</span>
                    <span className="wf-product__tags">
                      {product.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 03 reusable package output */}
        <div className="wf-wbcol">
          <WbHead
            no="03"
            en="Reusable Package Output"
            cn="可复用成果输出"
            steps="PACKAGE → EXPORT → NEXT STEPS"
            stepsCn="打包生成 / 导出文件 / 后续支持"
          />
          <div className="wf-wb wf-wb--col">
            <div className="wf-ui3">
              <div className="wf-preview">
                <span className="wf-preview__main">
                  <img src="/portfolio/wasteflow/opt/render-machine.png" alt="" />
                </span>
                <span className="wf-preview__thumbs">
                  <img src="/portfolio/wasteflow/opt/render-cuntian.png" alt="" />
                  <img src="/portfolio/wasteflow/opt/render-indoor.png" alt="" />
                  <img src="/portfolio/wasteflow/opt/render-door.png" alt="" />
                  <span className="wf-preview__next">
                    <ChevronRight size="1.0cqw" {...ICON_PROPS} />
                  </span>
                </span>
              </div>
              <div className="wf-detail">
                <div className="wf-detail__head">
                  <span className="wf-detail__titles">
                    <span className="wf-detail__en">Modular Waste Station</span>
                    <span className="wf-detail__cn">模块化回收站</span>
                  </span>
                  <span className="wf-detail__badge">
                    <span>Reusable Module</span>
                    <span>可复用模块</span>
                  </span>
                </div>
                <div className="wf-tabs">
                  <span className="wf-tab wf-tab--on">
                    <span className="wf-tab__en">Deliverables</span>
                    <span className="wf-tab__cn">交付文件</span>
                  </span>
                  <span className="wf-tab">
                    <span className="wf-tab__en">Specifications</span>
                    <span className="wf-tab__cn">技术参数</span>
                  </span>
                  <span className="wf-tab">
                    <span className="wf-tab__en">Usage Notes</span>
                    <span className="wf-tab__cn">使用说明</span>
                  </span>
                </div>
                <div className="wf-files">
                  {B05_DELIVERABLES.map((file) => {
                    const Icon = file.icon;
                    return (
                      <div className="wf-file" key={file.en}>
                        <Icon size="1.0cqw" {...ICON_PROPS} />
                        <span className="wf-file__text">
                          <span className="wf-file__en">{file.en}</span>
                          <span className="wf-file__cn">{file.cn}</span>
                        </span>
                        <span className="wf-file__btn">Download</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportBar
        labelEn="NEXT-STEP SUPPORT"
        labelCn="后续支持"
        items={[
          { icon: Lightbulb, main: 'Adaptation Guidance', sub: '适配建议' },
          { icon: SlidersHorizontal, main: 'Customization Support', sub: '定制化支持' },
          { icon: FileText, main: 'Integration into Project', sub: '集成到当前项目' },
          { icon: Users, main: 'Share & Collaborate', sub: '分享与协作' },
          { icon: BarChart3, main: 'Track Reuse Impact', sub: '追踪复用成效' },
        ]}
      />
    </WasteFlowBoard>
  );
}

/* ------------------------------------------------------------------
   Case study entry — mounted by ProjectDetail for project id "sport".
   Boards stack with zero seam, one shared design system.
   ------------------------------------------------------------------ */

export function WasteFlowCaseStudy() {
  return (
    <div className="wf-casestudy wf-scope">
      <WasteFlowBoard01 />
      <WasteFlowBoard02 />
      <WasteFlowBoard03 />
      <WasteFlowBoard04 />
      <WasteFlowBoard05 />
    </div>
  );
}
