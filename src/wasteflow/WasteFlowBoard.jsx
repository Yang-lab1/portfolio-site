import React from 'react';
import {
  Archive,
  BarChart3,
  Box,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardList,
  Component,
  Database,
  Eye,
  FileBox,
  FileCheck,
  FileText,
  Filter,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Package,
  RefreshCw,
  Scan,
  ScanSearch,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react';
import './wasteflow.css';

const ICON_PROPS = { strokeWidth: 1.75 };

/* ------------------------------------------------------------------
   WasteFlow board chrome — one design system for every board.
   ------------------------------------------------------------------ */

function WasteFlowBoard({ page, chapterCn, meta, title, subtitle, tagline, children }) {
  return (
    <article className="wf-board" data-wasteflow-page={page}>
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
          <span className="wf-topbar__chapter-title">Chapter {page}</span>
          <span className="wf-topbar__chapter-cn">{chapterCn}</span>
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

/* ------------------------------------------------------------------
   Page 03 — Agent System Architecture (visual master board).
   ------------------------------------------------------------------ */

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
      chapterCn="系统架构"
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

/* ------------------------------------------------------------------
   Case study entry — mounted by ProjectDetail for project id "sport".
   ------------------------------------------------------------------ */

export function WasteFlowCaseStudy() {
  return (
    <div className="wf-casestudy wf-scope">
      <WasteFlowBoard03 />
    </div>
  );
}
