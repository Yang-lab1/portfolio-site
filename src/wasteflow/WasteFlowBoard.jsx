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
  Clock,
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
  Scale,
  ScanSearch,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Shuffle,
  Signpost,
  SlidersHorizontal,
  Tag,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  Users,
  Warehouse,
  Weight,
  Wrench,
  Gauge,
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
    media: { type: 'img', src: '/portfolio/wasteflow/opt/tianke-req-site.jpg' },
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
    media: { type: 'img', src: '/portfolio/wasteflow/opt/tianke-b01-req.png' },
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
    media: { type: 'img', src: '/portfolio/wasteflow/opt/tianke-rhino.png' },
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
    media: { type: 'img', src: '/portfolio/wasteflow/opt/tianke-keyshot.jpg' },
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
    media: { type: 'img', src: '/portfolio/wasteflow/opt/tianke-final.jpg' },
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
  { icon: Send, main: 'Deliverable', sub: '支持落地' },
];

/* ==================================================================
   BOARD 01 — OVERVIEW / READING MAP  (new, inserted before old 01)
   One screen that links all six chapters into a single line.
   ================================================================== */

const B00_META = ['OVERVIEW', '6 CHAPTERS', 'ONE LINE', 'READ ME'];
const B00_TAGLINE = ['FROM INPUT', 'TO REUSABLE ASSETS'];

const B00_COLUMNS = [
  {
    no: '01', icon: FilePlus, en: 'Project Input', cn: '项目输入',
    items: [
      { icon: Camera, en: 'Site Scan', cn: '现场录入' },
      { icon: FileText, en: 'Req Parsing', cn: '需求解析' },
    ],
  },
  {
    no: '02', icon: Folder, en: 'Asset Base', cn: '资产化',
    items: [
      { icon: Folder, en: 'Standardize', cn: '目录标准化' },
      { icon: Search, en: 'Semantic Index', cn: '语义检索' },
    ],
  },
  {
    no: '03', icon: LayoutGrid, en: 'Architecture', cn: '系统架构',
    items: [
      { icon: Boxes, en: '7 Modules', cn: '7 大模块' },
      { icon: ShieldCheck, en: 'Human-in-loop', cn: '人工把关' },
    ],
  },
  {
    no: '04', icon: Recycle, en: 'Reuse', cn: '多场景复用',
    items: [
      { icon: Recycle, en: '3 Scenes', cn: '3 类场景' },
      { icon: Shuffle, en: 'Module Mix', cn: '模块组合' },
    ],
  },
  {
    no: '05', icon: PanelTop, en: 'Workbench', cn: '复用工作台',
    items: [
      { icon: ScanSearch, en: 'Scene Match', cn: '场景匹配' },
      { icon: Package, en: 'Singles Fit', cn: '单品装配' },
    ],
  },
];

const B00_OUTPUT = [
  { icon: FilePlus, main: 'Input', sub: '看输入' },
  { icon: Folder, main: 'Assets', sub: '看资产化' },
  { icon: LayoutGrid, main: 'Arch', sub: '看架构' },
  { icon: Recycle, main: 'Reuse', sub: '看复用' },
  { icon: PanelTop, main: 'Workbench', sub: '看工作台' },
];

function WasteFlowBoard00() {
  return (
    <WasteFlowBoard
      page="01"
      chapterMain="Chapter 01"
      chapterSub="总览地图"
      meta={B00_META}
      title="WasteFlow at a Glance"
      subtitle="一张图看懂六章如何连成一条线"
      tagline={B00_TAGLINE}
      flow
    >
      <div className="wf-cols wf-cols--5 wf-cols--flow">
        {B00_COLUMNS.map((column) => (
          <section className="wf-col" key={column.no}>
            <ColHead no={column.no} icon={column.icon} en={column.en} cn={column.cn} />
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
      <LoopLine label="INPUT  →  ASSETS  →  ARCHITECTURE  →  REUSE  →  WORKBENCH" />
      <SupportBar labelEn="READING MAP" labelCn="阅读地图" items={B00_OUTPUT} />
    </WasteFlowBoard>
  );
}

function WasteFlowBoard01() {
  return (
    <WasteFlowBoard
      page="02"
      chapterMain="Chapter 02"
      chapterSub="项目输入"
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
  { src: '/portfolio/wasteflow/opt/render-haixin.png', name: 'haixin_4.6.png' },
  { src: '/portfolio/wasteflow/opt/render-cuntian.png', name: 'cuntian_1.2.png' },
  { src: '/portfolio/wasteflow/opt/render-jieshiduo.png', name: 'jieshiduo_1.1.png' },
  { src: '/portfolio/wasteflow/opt/cover-35auto.png', name: 'gz35auto_1.png' },
  { src: '/portfolio/wasteflow/opt/render-racks.png', name: '1.04.png' },
  { src: '/portfolio/wasteflow/opt/render-indoor.png', name: '1.05.png' },
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
      page="03"
      chapterMain="Chapter 03"
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
          <div className="wf-notebook wf-notebook--even">
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
          <div className="wf-notebook wf-notebook--even">
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
          <div className="wf-notebook wf-notebook--even">
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
      page="04"
      chapterMain="Chapter 04"
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

const B04_REQ = [
  { icon: Factory, en: 'Req. 1 · Plant 1', cn: '需求一 · 厂房一 固废卡板秤' },
  { icon: Factory, en: 'Req. 2 · Plant 2', cn: '需求二 · 厂房二 卡板秤' },
  { icon: Warehouse, en: 'Req. 3 · Haz. Waste', cn: '需求三 · 危废仓 危废卡板秤' },
];

const B04_REUSE = [
  { icon: Factory, en: 'Solid Waste Point', cn: '固废点位' },
  { icon: Factory, en: 'Mixed Stream Point', cn: '混投点位' },
  { icon: Warehouse, en: 'Hazardous Point', cn: '危废仓点位' },
  { icon: RefreshCw, en: 'One Module · 3 Sites', cn: '同一模块 · 三处复用' },
];

const B04_TILES = [
  { icon: Scale, en: 'Pallet Scale', cn: '卡板秤（核心）', img: '/portfolio/wasteflow/opt/tianke-req-product.jpg' },
  { icon: Boxes, en: 'Storage Bin', cn: '料箱', img: '/portfolio/wasteflow/opt/tianke-bin.png' },
  { icon: Recycle, en: 'Paper Baling', cn: '纸皮', img: '/portfolio/wasteflow/opt/tianke-paper.png' },
  { icon: Signpost, en: 'Signage Board', cn: '指示板', img: '/portfolio/wasteflow/opt/tianke-sign.png' },
  { icon: TriangleAlert, en: 'Warning Strip', cn: '警示条', img: '/portfolio/wasteflow/opt/tianke-warning.png' },
  { icon: Ruler, en: 'Site Constraint', cn: '场地约束·图纸', img: '/portfolio/wasteflow/opt/tianke-req-drawing.png' },
];

const B04_STEPS = [
  { icon: Settings, en: 'Normalize Modules', cn: '标准化组件' },
  { icon: Shuffle, en: 'Flexible Combination', cn: '灵活组合' },
  { icon: MapPin, en: 'Adapt to Multiple Sites', cn: '适配多场景' },
  { icon: TrendingUp, en: 'Scalable Deployment', cn: '规模化部署' },
];

const B04_PACK = [
  // 场景资产（旧案例整场景 · 匹配度高直接打开）
  { icon: Factory, en: 'Scene · Solid Waste Bay', cn: '场景 · 固废称重仓', qty: '可整体复用', img: '/portfolio/wasteflow/opt/render-green-room.png', kind: 'scene' },
  { icon: Warehouse, en: 'Scene · Haixin Yard', cn: '场景 · 海新户外仓', qty: '可整体复用', img: '/portfolio/wasteflow/opt/render-haixin.png', kind: 'scene' },
  { icon: Building2, en: 'Scene · Cuntian Shading', cn: '场景 · 村田外棚仓', qty: '可整体复用', img: '/portfolio/wasteflow/opt/render-cuntian.png', kind: 'scene' },
  // 自研单品（公司自研 · 有 logo · 外买不到）
  { icon: Scale, en: 'Pallet Scale', cn: '单品 · 卡板秤', qty: '可放入场景', img: '/portfolio/wasteflow/opt/ufei-pallet-scale.png', kind: 'product' },
  { icon: Weight, en: '500kg Floor Scale', cn: '单品 · 500kg 地秤', qty: '可放入场景', img: '/portfolio/wasteflow/opt/ufei-500kg.png', kind: 'product' },
  { icon: Gauge, en: 'Solid-Waste Head', cn: '单品 · 固废表头', qty: '可放入场景', img: '/portfolio/wasteflow/opt/ufei-solid-head.png', kind: 'product' },
];

const B04_SCENARIOS = [
  { icon: Factory, en: 'Smart Solid-Waste Bay', cn: '智能固废仓' },
  { icon: Warehouse, en: 'Hazardous Waste', cn: '危废仓' },
  { icon: Building2, en: 'In-plant Point', cn: '厂内点位' },
  { icon: Landmark, en: 'Municipal Transfer', cn: '市政转运' },
  { icon: MoreHorizontal, en: 'More Sites', cn: '更多点位' },
];

function CaseCard({ label, cn, items, photo, badge }) {
  return (
    <div className="wf-case">
      <div className="wf-case__title">
        <span className="wf-case__label">{label}</span>
        <span className="wf-case__cn">{cn}</span>
        {badge ? <span className="wf-case__badge">{badge}</span> : null}
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
      page="05"
      chapterMain="Chapter 05"
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
            label="New Requirement"
            cn="新需求 · 深圳重投天科"
            badge="需求单 240625"
            items={B04_REQ}
            photo="/portfolio/wasteflow/opt/tianke-req-site.jpg"
          />
          <div className="wf-extract">
            <div className="wf-extract__title">
              <span>Reused Extracts</span>
              <span className="wf-extract__title-cn">复用的可提取组件</span>
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
          <div className="wf-reuse">
            <div className="wf-reuse__title">
              <span>Historical Reuse</span>
              <span className="wf-reuse__title-cn">历史案例复用 · 待确认</span>
            </div>
            <div className="wf-reuse__body">
              {B04_REUSE.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="wf-reuse__item" key={item.en}>
                    <Icon size="1.05cqw" {...ICON_PROPS} />
                    <span className="wf-reuse__text">
                      <span className="wf-reuse__en">{item.en}</span>
                      <span className="wf-reuse__cn">{item.cn}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="wf-reuse__note">
              历史公司案例与具体可复用素材，待与素材确认后补入，此处不虚构客户。
            </p>
          </div>
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
                <img src="/portfolio/wasteflow/opt/tianke-final.jpg" alt="" />
                <figcaption>
                  <strong>Reused Output</strong>
                  <span>复用成稿 · 天科智能卡板秤现场</span>
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
                <span className="wf-scen__en">Application Sites</span>
                <span className="wf-scen__cn">应用点位</span>
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
  { en: 'Target scene traits', cn: '目标场景特征 · 墙/窗/门/围栏' },
  { en: 'Required self-made singles', cn: '所需自研单品清单' },
  { en: 'Match old case scenes', cn: '匹配旧案例场景' },
  { en: 'Open Rhino workfiles', cn: '打开对应 Rhino 工程' },
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

const B05_SCENES = [
  { src: '/portfolio/wasteflow/opt/render-green-room.png', en: 'Solid Waste Bay', cn: '固废称重仓 · 旧案例', match: 92, picked: true },
  { src: '/portfolio/wasteflow/opt/render-cuntian.png', en: 'Cuntian Shading Bay', cn: '村田外棚仓 · 旧案例', match: 78 },
  { src: '/portfolio/wasteflow/opt/render-haixin.png', en: 'Haixin Outdoor Yard', cn: '海新户外仓 · 旧案例', match: 65 },
];

const B05_SINGLES = [
  { src: '/portfolio/wasteflow/opt/ufei-pallet-scale.png', en: 'Pallet Scale', cn: '卡板秤' },
  { src: '/portfolio/wasteflow/opt/ufei-500kg.png', en: '500kg Floor Scale', cn: '500kg 地秤' },
  { src: '/portfolio/wasteflow/opt/ufei-solid-head.png', en: 'Solid-Waste Head', cn: '固废表头' },
  { src: '/portfolio/wasteflow/opt/ufei-haz-head.png', en: 'Hazard Waste Head', cn: '危废表头' },
  { src: '/portfolio/wasteflow/opt/ufei-bin.png', en: 'Storage Bin', cn: '料箱' },
  { src: '/portfolio/wasteflow/opt/ufei-baler.png', en: 'Paper Baler', cn: '压缩打包机' },
];

const B05_DESKTOP = [
  { icon: FileBox, en: 'Solid-Waste Bay · 旧案例工程', cn: '场景窗口 ①', status: 'Opened', badge: '92%' },
  { icon: Package, en: 'Blank Scene · 已放入自研单品', cn: '单品窗口 ②', status: '6 items in', badge: 'N' },
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
      page="06"
      chapterMain="Chapter 06"
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
              <strong className="wf-drop__title">Drop files</strong>
              <span className="wf-drop__hint">CAD / PDF / 图片</span>
              <span className="wf-btn-orange">选择文件</span>
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

        {/* 02 scene matching */}
        <div className="wf-wbcol">
          <WbHead
            no="02"
            en="Scene Matching & Retrieval"
            cn="场景比对 · 匹配旧案例"
            steps="PARSE → MATCH → PICK"
            stepsCn="解析特征 / 匹配场景 / 打开工程"
          />
          <div className="wf-wb wf-wb--col">
            <div className="wf-ui__bar wf-ui__bar--scene">
              <span className="wf-scenepill">
                <ScanSearch size="0.85cqw" {...ICON_PROPS} />
                目标场景特征 · 现场物件比对
              </span>
              <span className="wf-matchcount">
                <strong>3</strong> 个匹配旧案例
              </span>
            </div>
            <div className="wf-ui__body wf-ui__body--stack">
              <div className="wf-scenecmp">
                <span className="wf-scenecmp__label">
                  <span className="wf-scenecmp__label-en">Matched Scenes</span>
                  <span className="wf-scenecmp__label-cn">匹配到旧案例场景 · 按匹配度排序</span>
                </span>
                <div className="wf-scenecmp__list">
                  {B05_SCENES.map((scene) => (
                    <div
                      key={scene.en}
                      className={scene.picked ? 'wf-scene wf-scene--picked' : 'wf-scene'}
                    >
                      {scene.picked ? (
                        <span className="wf-scene__open">
                          <FolderOpen size="0.8cqw" {...ICON_PROPS} /> 已打开
                        </span>
                      ) : null}
                      <span className="wf-scene__img">
                        <img src={scene.src} alt="" />
                      </span>
                      <span className="wf-scene__text">
                        <span className="wf-scene__en">{scene.en}</span>
                        <span className="wf-scene__cn">{scene.cn}</span>
                      </span>
                      <span className="wf-scene__match">{scene.match}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="wf-singles">
                <span className="wf-singles__label">
                  <span className="wf-singles__label-en">Self-Developed Singles</span>
                  <span className="wf-singles__label-cn">需求所需 · 公司自研单品</span>
                </span>
                <div className="wf-singles__row">
                  {B05_SINGLES.map((s) => (
                    <span className="wf-single" key={s.en}>
                      <span className="wf-single__img">
                        <img src={s.src} alt="" />
                      </span>
                      <span className="wf-single__cn">{s.cn}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 03 completion & handoff */}
        <div className="wf-wbcol">
          <WbHead
            no="03"
            en="Completed & Handoff"
            cn="已完成 · 交付"
            steps="OPENED → HANDOFF → NEXT STEPS"
            stepsCn="已打开工程 / 交接清单 / 人工拼接渲染"
          />
          <div className="wf-wb wf-wb--col">
            <div className="wf-ui3 wf-ui3--done">
              <div className="wf-done">
                <span className="wf-done__badge">
                  <CheckCircle2 size="1.4cqw" color="#7ac142" strokeWidth={2} />
                  <span className="wf-done__text">
                    <span className="wf-done__en">Task Complete</span>
                    <span className="wf-done__cn">Agent 已完成，交人工拼接</span>
                  </span>
                </span>
                <p className="wf-done__hint">
                  拼接（把单品挪入场景 + 加门等缺件）与渲染出图由设计师手动完成，Agent 只到"打开工程 + 放好单品"为止。
                </p>
              </div>
              <div className="wf-opened">
                <span className="wf-opened__label">
                  <span className="wf-opened__label-en">Opened Documents</span>
                  <span className="wf-opened__label-cn">已打开文件 · 按文档</span>
                </span>
                <div className="wf-opened__list">
                  <div className="wf-opened__row">
                    <FolderOpen size="0.95cqw" {...ICON_PROPS} />
                    <span className="wf-opened__path">cases/solid-waste-bay/old-case_92%.3dm</span>
                    <span className="wf-opened__badge wf-opened__badge--ok">Opened</span>
                  </div>
                  <div className="wf-opened__row">
                    <Package size="0.95cqw" {...ICON_PROPS} />
                    <span className="wf-opened__path">singles/blank-scene_3dm（已放入自研单品）</span>
                    <span className="wf-opened__badge wf-opened__badge--ok">Ready</span>
                  </div>
                </div>
              </div>
              <div className="wf-desktop">
                <span className="wf-desktop__label">
                  <span className="wf-desktop__label-en">Desktop · 2 Rhino Windows</span>
                  <span className="wf-desktop__label-cn">桌面 2 个 Rhino 窗口</span>
                </span>
                <div className="wf-desktop__row">
                  <div className="wf-rhinowin wf-rhinowin--scene">
                    <span className="wf-rhinowin__head">
                      <span className="wf-rhinowin__dot" />
                      Rhino · 固废称重仓场景
                    </span>
                    <span className="wf-rhinowin__view">
                      <img src="/portfolio/wasteflow/opt/render-green-room.png" alt="" />
                    </span>
                    <span className="wf-rhinowin__tag">窗口 ① · 旧案例</span>
                  </div>
                  <div className="wf-rhinowin wf-rhinowin--blank">
                    <span className="wf-rhinowin__head">
                      <span className="wf-rhinowin__dot" />
                      Rhino · 空白（已放入单品）
                    </span>
                    <span className="wf-rhinowin__view">
                      <img src="/portfolio/wasteflow/opt/ufei-pallet-scale.png" alt="" />
                      <img src="/portfolio/wasteflow/opt/ufei-500kg.png" alt="" />
                      <img src="/portfolio/wasteflow/opt/ufei-solid-head.png" alt="" />
                      <img src="/portfolio/wasteflow/opt/ufei-haz-head.png" alt="" />
                      <img src="/portfolio/wasteflow/opt/ufei-bin.png" alt="" />
                      <img src="/portfolio/wasteflow/opt/ufei-baler.png" alt="" />
                    </span>
                    <span className="wf-rhinowin__tag">窗口 ② · 自研单品 ×6</span>
                  </div>
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

/* ==================================================================
   BOARD 07 — IMPACT / OUTCOME  (new, closes the narrative)
   Quantified result + why it matters, same shell/tokens as 01-06.
   ================================================================== */

const B06_META = ['OUTCOME', '92% MATCH', 'REUSABLE', 'HAND-OFF'];
const B06_TAGLINE = ['FROM ONE CASE', 'TO A REUSABLE SYSTEM'];

const B06_COLUMNS = [
  {
    no: '01', icon: TrendingUp, en: 'Reuse Rate', cn: '复用命中率',
    metric: '92%',
    items: [
      { icon: ScanSearch, en: 'Scene Match', cn: '场景匹配' },
      { icon: CheckCircle2, en: 'No Redesign', cn: '免重做' },
    ],
  },
  {
    no: '02', icon: Clock, en: 'Time Saved', cn: '省工时',
    metric: '50%',
    items: [
      { icon: Boxes, en: 'Singles Fit', cn: '单品装配' },
      { icon: RefreshCw, en: 'Iterate', cn: '快速迭代' },
    ],
  },
  {
    no: '03', icon: Package, en: 'Scenes Shipped', cn: '交付场景',
    metric: '3 类',
    items: [
      { icon: Warehouse, en: 'Solid Waste', cn: '固废仓' },
      { icon: Factory, en: 'Outdoor Yard', cn: '户外仓' },
    ],
  },
  {
    no: '04', icon: UserCheck, en: 'Human-in-loop', cn: '人工把关',
    metric: '100%',
    items: [
      { icon: ShieldCheck, en: 'Reviewed', cn: '逐条审核' },
      { icon: Send, en: 'Rhino Hand-off', cn: '交付 Rhino' },
    ],
  },
];

const B06_OUTPUT = [
  { icon: TrendingUp, main: 'Faster', sub: '更快' },
  { icon: Recycle, main: 'Reusable', sub: '可复用' },
  { icon: UserCheck, main: 'Reviewable', sub: '可审核' },
  { icon: Boxes, main: 'Scalable', sub: '可扩展' },
  { icon: Send, main: 'Deliverable', sub: '可落地' },
];

function WasteFlowBoard06() {
  return (
    <WasteFlowBoard
      page="07"
      chapterMain="Chapter 07"
      chapterSub="成果价值"
      meta={B06_META}
      title="What the Agent Delivers"
      subtitle="复用命中率、省工时、可审核、可落地"
      tagline={B06_TAGLINE}
      flow
    >
      <div className="wf-cols wf-cols--4 wf-cols--flow">
        {B06_COLUMNS.map((column) => (
          <section className="wf-col" key={column.no}>
            <ColHead no={column.no} icon={column.icon} en={column.en} cn={column.cn} />
            <div className="wf-media">
              <span className="wf-metric wf-metric--big">{column.metric}</span>
            </div>
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
      <LoopLine label="FASTER  /  REUSABLE  /  REVIEWABLE  /  DELIVERABLE" />
      <SupportBar labelEn="WHY IT MATTERS" labelCn="价值" items={B06_OUTPUT} />
    </WasteFlowBoard>
  );
}

export function WasteFlowCaseStudy() {
  return (
    <div className="wf-casestudy wf-scope">
      <WasteFlowBoard00 />
      <WasteFlowBoard01 />
      <WasteFlowBoard02 />
      <WasteFlowBoard03 />
      <WasteFlowBoard04 />
      <WasteFlowBoard05 />
      <WasteFlowBoard06 />
    </div>
  );
}
