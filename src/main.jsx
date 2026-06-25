import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Languages,
  Mail,
  Search,
  Send,
} from 'lucide-react';
import { requestAgentDecision, resolveAgentFallbackDecision } from './lib/agentClient.js';
import { warmSupabaseConnection } from './lib/supabaseClient.js';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'lin297861138@gmail.com';
const FLOATING_BUTTON_SIZE = 80;
const FLOATING_OFFSET = 20;
const FLOATING_STACK_GAP = 12;
const AGENT_DEFAULT_POSITION = {
  x: FLOATING_OFFSET,
  y: FLOATING_OFFSET + FLOATING_BUTTON_SIZE + FLOATING_STACK_GAP,
};

const copy = {
  en: {
    brand: 'Portfolio',
    work: 'Work',
    about: 'About',
    back: 'Back',
    heroTitle: 'Intelligence Takes Shape',
    heroSub: 'Industrial design, AI interaction, and digital systems in one portfolio.',
    workTitle: 'Work, organized by direction',
    workSub:
      'Each direction is a horizontal rail. Drag sideways, open a work, and read its process as a full case page.',
    aboutTitle: 'A portfolio system for hybrid product work.',
    aboutCopy:
      'The work connects industrial design, CMF, hardware delivery, AI interaction, web prototypes, and data systems into one evidence structure.',
    process: 'Process',
    role: 'Role',
    year: 'Year',
    evidence: 'Evidence',
    source: 'Source status',
    blocked: 'GitHub source pending',
    agentTitle: 'Portfolio Agent',
    agentCopy:
      'Ask by theme. This prototype routes visitors to matching projects and keeps the entry available across the site.',
    agentInput: 'Search AI, CMF, hardware, data...',
    hideAgent: 'Hide entry',
    achievementLabel: 'Selected signals',
    productShowcaseLabel: 'Product Form',
    productShowcaseTitle: 'Product Form',
    productShowcaseCopy: 'Hardware, CMF, and equipment projects are shown as objects first, then opened as process pages.',
    digitalCaseLabel: 'Digital Systems',
    digitalCaseTitle: 'Interface projects read as scrollable case moments.',
    digitalCaseCopy: 'Web, AI, and data systems use a large image plus short decision notes instead of dense explanation.',
    allWorksLabel: 'Full Index',
    footerNote: 'AI / Industrial Design / Web / CMF',
    suggestions: [
      ['AI product evidence', 'miro'],
      ['Industrial design process', 'cross-ripple'],
      ['CMF and production', 'xiaomi-cmf'],
      ['Knowledge graph systems', 'tcm-kg'],
    ],
  },
  zh: {
    brand: '作品集',
    work: '作品',
    about: '关于',
    back: '返回',
    heroTitle: '智能成形',
    heroSub: '工业设计、AI 交互与数字系统的复合作品集。',
    workTitle: '按方向组织作品',
    workSub: '每一类都是横向作品带。左右拖动，进入项目后按完整过程阅读。',
    aboutTitle: '一个面向复合型产品能力的作品系统。',
    aboutCopy:
      '这里把工业设计、CMF、硬件推进、AI 交互、Web 原型和数据系统组织成一套连续的证据结构。',
    process: '过程',
    role: '角色',
    year: '年份',
    evidence: '证据',
    source: '来源状态',
    blocked: 'GitHub 来源待补',
    agentTitle: '作品 Agent',
    agentCopy: '按主题提问。当前原型会把访客导向匹配的作品，并在全站保留入口。',
    agentInput: '搜索 AI、CMF、硬件、数据...',
    hideAgent: '隐藏入口',
    achievementLabel: '关键信号',
    productShowcaseLabel: '产品形态',
    productShowcaseTitle: '产品形态',
    productShowcaseCopy: '硬件、CMF 与设备项目先以物体被看见，再进入完整过程页。',
    digitalCaseLabel: '数字系统',
    digitalCaseTitle: '界面项目用滚动案例阅读。',
    digitalCaseCopy: 'Web、AI 与数据系统用大图和短判断呈现，不堆长段说明。',
    allWorksLabel: '完整索引',
    footerNote: 'AI / 工业设计 / Web / CMF',
    suggestions: [
      ['AI 产品证据', 'miro'],
      ['工业设计过程', 'cross-ripple'],
      ['CMF 与量产', 'xiaomi-cmf'],
      ['知识图谱系统', 'tcm-kg'],
    ],
  },
};

const categories = [
  {
    id: 'digital',
    title: { en: 'Digital / Web / AI', zh: '数字 / Web / AI' },
    summary: {
      en: 'Interactive products, AI-assisted prototypes, cultural interfaces, and mobile experiences.',
      zh: '互动产品、AI 原型、文化界面和移动体验。',
    },
  },
  {
    id: 'concept',
    title: { en: 'Concept / Hardware', zh: '概念 / 硬件' },
    summary: {
      en: 'Physical-product concepts, wearable systems, assistive objects, and hardware-adjacent services.',
      zh: '实体产品概念、穿戴系统、辅助物件和硬件相关服务。',
    },
  },
  {
    id: 'production',
    title: { en: 'Production / CMF', zh: '量产 / CMF' },
    summary: {
      en: 'CMF, manufacturable details, launched products, cost-down logic, and supplier-facing design work.',
      zh: 'CMF、可量产细节、上市产品、降本逻辑和供应链协作设计。',
    },
  },
  {
    id: 'research',
    title: { en: 'Research / Systems', zh: '研究 / 系统' },
    summary: {
      en: 'Knowledge graphs, NLP pipelines, product governance, and research-to-interface translation.',
      zh: '知识图谱、NLP 流程、产品治理，以及从研究到界面的转译。',
    },
  },
];

const steps = {
  en: [
    'Background / problem',
    'Thinking / framing',
    'Structure / prototype',
    'Interface / model / system',
    'Render / effect',
    'Result / value',
  ],
  zh: ['背景 / 问题', '思路 / 定义', '结构 / 原型', '界面 / 建模 / 系统', '渲染 / 效果', '结果 / 价值'],
};

const projects = [
  {
    id: 'miro',
    category: 'digital',
    title: { en: 'Miro AI Rehearsal System', zh: 'Miro AI 演练系统' },
    type: { en: 'AI Product / Web / Backend', zh: 'AI 产品 / Web / 后端' },
    year: '2026',
    image: '/portfolio/miro-home-china.jpg',
    gallery: ['/portfolio/miro-hifi-overview.jpg', '/portfolio/miro-review-dashboard.jpg', '/portfolio/miro-device-ui.png'],
    launchNote: {
      en: 'Miro turns cross-cultural business rehearsal into a structured AI coaching flow, where users can practice difficult conversations, review repeated risks, and enter the system through a clear digital product story.',
      zh: 'Miro 将跨文化沟通训练拆成可复盘的 AI 演练流程，让用户先练习高压对话，再回看风险信号与改进路径。',
    },
    role: {
      en: 'Product definition, UX structure, frontend prototype, AI workflow, deployment validation',
      zh: '产品定义、UX 结构、前端原型、AI 流程、部署验证',
    },
    summary: {
      en: 'A cross-cultural communication rehearsal product that moves beyond translation into pragmatics, pacing, taboo phrasing, and longitudinal improvement.',
      zh: '一个跨文化沟通演练产品，不只处理翻译，还处理语用、节奏、禁忌表达和长期提升。',
    },
    evidence: {
      en: ['Static frontend plus FastAPI backend', 'Supabase auth and database', 'Vercel and ECS deployment path', 'PRD, schema, governance and handoff docs'],
      zh: ['静态前端与 FastAPI 后端', 'Supabase 认证与数据库', 'Vercel 与 ECS 部署路径', 'PRD、Schema、治理与交付文档'],
    },
    source: { en: 'Confirmed local repo: Desktop/miro', zh: '已确认本地仓库：Desktop/miro' },
  },
  {
    id: 'palifood',
    category: 'digital',
    title: { en: 'Pai Li Shi', zh: '拍立食' },
    type: { en: 'Food AI / Mobile H5', zh: '食物识别 / 移动 H5' },
    year: '2026',
    image: '/portfolio/palifood-home.png',
    gallery: ['/portfolio/palifood-stage-china.jpg', '/portfolio/palifood-login-china.jpg'],
    launchNote: {
      en: 'Pai Li Shi is framed as a mobile food-recognition and health feedback experience, using lightweight interaction and visual clarity to connect daily meals with personal wellness decisions.',
      zh: '拍立食围绕食物识别与健康反馈展开，用轻量交互把日常饮食记录、识别效率和健康理解串联起来。',
    },
    role: {
      en: 'Scenario definition, mobile UI system, formal prototype validation',
      zh: '场景定义、移动端 UI 系统、正式原型验证',
    },
    summary: {
      en: 'A mobile food-recognition experience around photo capture, health feedback, recommendations, and lightweight social expression.',
      zh: '围绕拍照识别、健康反馈、推荐和轻社交表达构建的移动端食物体验。',
    },
    targetUser: {
      en: 'Mobile users who want quick food recognition, diet feedback, and simple health-oriented decisions after taking a photo.',
      zh: '面向想用手机快速识别食物、获得饮食反馈和健康建议的日常用户。',
    },
    painPoint: {
      en: 'Manual diet logging is slow and fragmented, while photo-based feedback often stops at recognition instead of guiding the next action.',
      zh: '传统饮食记录输入成本高、反馈慢，很多拍照识别只停在识别结果，缺少下一步健康建议。',
    },
    solution: {
      en: 'It connects capture, AI recognition, health feedback, recommendations, and lightweight sharing into one mobile H5 flow.',
      zh: '通过移动 H5 把拍摄、AI 识别、健康反馈、推荐和轻社交串成一个可连续使用的流程。',
    },
    evidence: {
      en: ['Formal H5 prototype', 'Camera and health feedback flow', 'Mobile visual system', 'Validation screenshots'],
      zh: ['正式 H5 原型', '拍照与健康反馈流程', '移动端视觉系统', '验证截图'],
    },
    source: { en: 'Confirmed local project: Desktop/拍立食', zh: '已确认本地项目：Desktop/拍立食' },
  },
  {
    id: 'libai',
    category: 'digital',
    title: { en: 'Li Bai Interactive Website', zh: '李白互动网站' },
    type: { en: 'Digital Humanities / Data Storytelling', zh: '数字人文 / 数据叙事' },
    year: '2025',
    image: '/portfolio/libai-background.png',
    gallery: ['/portfolio/libai-background.png'],
    launchNote: {
      en: 'The Li Bai interactive site transforms poetry, geography, and knowledge links into an explorable cultural interface, making classical content easier to browse, connect, and understand.',
      zh: '李白互动网站把诗歌、地图与知识关系组织成可探索界面，让传统文化内容更容易被浏览、连接和理解。',
    },
    role: {
      en: 'Interactive narrative, map/network/chart integration, bilingual cultural interface',
      zh: '互动叙事、地图/网络/图表整合、双语文化界面',
    },
    summary: {
      en: 'A digital humanities site translating Li Bai biography, social network, emotional imagery, journey map, and Ask Li Bai interaction into one web experience.',
      zh: '把李白生平、人物网络、情感意象、行旅地图和 Ask Li Bai 互动转译成网页体验。',
    },
    evidence: {
      en: ['Leaflet map', 'Vis-network graph', 'Chart.js analytics', '76 nodes and 80 edges'],
      zh: ['Leaflet 地图', 'Vis-network 网络', 'Chart.js 分析', '76 个节点与 80 条边'],
    },
    source: { en: 'Confirmed local project. Original HTML should not be published as-is due to API-key risk.', zh: '已确认本地项目。原 HTML 可能含 API Key 风险，不能原样公开。' },
  },
  {
    id: 'tcm-kg',
    category: 'digital',
    title: { en: 'TCM Knowledge Graph', zh: '中医药知识图谱' },
    type: { en: 'Knowledge Graph / Cultural Data', zh: '知识图谱 / 文化数据' },
    year: '2025',
    image: '/portfolio/tcm-graph-clean.jpg',
    gallery: ['/portfolio/tcm-graph-clean.jpg'],
    role: {
      en: 'Domain modeling, graph structure, ECharts prototype, educational framing',
      zh: '领域建模、图谱结构、ECharts 原型、教育化表达',
    },
    summary: {
      en: 'A knowledge-visualization project connecting classical texts, organs, symptoms, formulas, and herbs as an exploratory cultural-data system.',
      zh: '把古籍、脏腑、症状、方剂与药材连接成可探索的文化数据系统。',
    },
    evidence: {
      en: ['Five-layer network', 'Classical text sources', 'Herb co-occurrence analysis', 'Educational visualization only'],
      zh: ['五层网络', '古籍文本来源', '药材共现分析', '仅作为教育可视化'],
    },
    source: { en: 'Confirmed local project: CBS5504 final project', zh: '已确认本地项目：CBS5504 final project' },
  },
  {
    id: 'offer-quest',
    category: 'digital',
    title: { en: 'Offer Quest', zh: 'Offer Quest' },
    type: { en: 'Learning Product / Web App', zh: '学习产品 / Web 应用' },
    year: '2026',
    image: '/portfolio/offer-quest-china.jpg',
    gallery: ['/portfolio/offer-quest-desktop.png', '/portfolio/offer-quest-map.png'],
    launchNote: {
      en: 'Offer Quest turns job-search preparation into a game-like learning system, combining quests, progress feedback, and structured review to make career practice more continuous.',
      zh: 'Offer Quest 将求职准备转化为游戏化学习系统，用任务、进度反馈与复盘机制提升持续练习的动力。',
    },
    role: {
      en: 'Product framing, dashboard system, learning-map interaction',
      zh: '产品框定、仪表盘系统、学习地图交互',
    },
    summary: {
      en: 'A job-preparation learning product that turns interview study into structured maps, review cycles, and role-specific progress.',
      zh: '把求职准备转成学习地图、复习节奏和岗位进度管理的 Web 学习产品。',
    },
    evidence: {
      en: ['Dashboard UI', 'Learning map', 'Progress visualization', 'Local prototype screenshots'],
      zh: ['Dashboard 界面', '学习地图', '进度可视化', '本地原型截图'],
    },
    source: { en: 'Confirmed local source. Keep secondary because it is job-prep oriented.', zh: '已确认本地来源。因偏求职准备，作为次级作品处理。' },
  },
  {
    id: 'sport',
    category: 'digital',
    title: { en: 'Home Form Coach', zh: 'Home Form Coach' },
    type: { en: 'Fitness AI / Pose Tracking / Web App', zh: '运动姿态 AI / Web 应用' },
    year: '2026',
    image: '/portfolio/sport-home-form-coach-cover.jpg',
    gallery: [
      '/portfolio/sport-home-form-coach-cover.jpg',
      '/portfolio/sport-home-form-coach-coach.png',
      '/portfolio/sport-home-form-coach-swim.jpg',
      '/portfolio/sport-home-form-coach-tennis.jpg',
    ],
    liveUrl: 'https://sport-yangs-projects-d2ad4c9e.vercel.app',
    launchNote: {
      en: 'Home Form Coach is a local-first fitness form checker that uses browser camera pose tracking to guide home training, score movement quality, and turn each session into a structured report without uploading raw video.',
      zh: 'Home Form Coach 是一个本地优先的居家健身动作质检器，用浏览器摄像头姿态追踪引导训练、评分动作质量，并在不上传原始视频的前提下生成结构化报告。',
    },
    role: {
      en: 'Product framing, motion-led landing page, pose-analysis interface, report workflow, deployment QA',
      zh: '产品框定、运动视觉落地页、姿态分析界面、报告流程、部署验证',
    },
    summary: {
      en: 'A camera-based home training prototype combining sport collage motion, real-time pose feedback, workout planning, set control, and local-first reporting.',
      zh: '一个基于摄像头的居家训练原型，整合运动拼贴动效、实时姿态反馈、训练计划、组数控制和本地优先报告。',
    },
    targetUser: {
      en: 'Home fitness users who need lightweight form feedback, workout structure, and progress records without sending raw camera footage to a server.',
      zh: '需要轻量动作反馈、训练结构和进度记录，同时不希望上传原始摄像头画面的居家健身用户。',
    },
    painPoint: {
      en: 'Home workouts often lack coaching eyes, so users cannot tell whether posture quality, rep rhythm, and training records are reliable.',
      zh: '居家训练缺少教练视角，用户很难判断姿态质量、重复节奏和训练记录是否可靠。',
    },
    solution: {
      en: 'The prototype keeps video processing in the browser, combines pose landmarks with rule-based form checks, and saves only structured training reports.',
      zh: '原型把视频处理留在浏览器本地，将姿态关键点与规则化动作判断结合，并仅保存结构化训练报告。',
    },
    evidence: {
      en: ['React and Vite prototype', 'MediaPipe pose tracking', 'Workout planner and set controls', 'Local-first report flow with optional Supabase sync'],
      zh: ['React 与 Vite 原型', 'MediaPipe 姿态追踪', '训练计划与组数控制', '本地优先报告流程与可选 Supabase 同步'],
    },
    source: { en: 'Confirmed GitHub repository: Yang-lab1/sport', zh: '已确认 GitHub 仓库：Yang-lab1/sport' },
  },
  {
    id: 'momenta',
    category: 'digital',
    title: { en: 'Momenta AI Music Interaction', zh: 'Momenta AI 音乐交互' },
    type: { en: 'SwiftUI iOS / AI Music / Device Concept', zh: 'SwiftUI iOS / AI 音乐 / 设备概念' },
    year: '2025',
    image: '/portfolio/momenta-phone-wall.jpg',
    gallery: ['/portfolio/momenta-phone-wall.jpg', '/portfolio/momenta-github-compose-china.jpg', '/portfolio/momenta-github-share.png', '/portfolio/momenta-device-detail.jpg', '/portfolio/momenta-exploded-clean.jpg'],
    role: {
      en: 'SwiftUI source review, interaction concept, mobile UI direction, device rendering',
      zh: 'SwiftUI 源码核对、交互概念、移动界面方向、设备渲染',
    },
    summary: {
      en: 'A public SwiftUI iOS repository and local Keynote evidence for a mood, music, and wearable-device interaction concept.',
      zh: '公开 SwiftUI iOS 仓库与本地 Keynote 证据共同指向情绪、音乐与穿戴设备交互概念。',
    },
    evidence: {
      en: ['Public GitHub repository found', 'SwiftUI iOS project structure', 'compose.png and share.png source assets', 'Local Keynote/device renders'],
      zh: ['已找到公开 GitHub 仓库', 'SwiftUI iOS 项目结构', 'compose.png 与 share.png 源资产', '本地 Keynote 与设备渲染'],
    },
    source: { en: 'Public GitHub source: https://github.com/JosicZhou/MOMENTA plus confirmed local Keynote evidence', zh: '公开 GitHub 来源：https://github.com/JosicZhou/MOMENTA，并有本地 Keynote 证据' },
  },
  {
    id: 'cross-ripple',
    category: 'concept',
    title: { en: 'Cross-ripple Hydrotherapy Wearable', zh: '智能水疗穿戴辅具' },
    type: { en: 'Industrial Design / Wearable Concept', zh: '工业设计 / 穿戴概念' },
    year: '2019-2021',
    image: '/portfolio/cross-ripple-clean.jpg',
    imageFit: 'contain',
    gallery: ['/portfolio/hydrotherapy-clean.jpg', '/portfolio/hydrotherapy-detail-china.jpg'],
    role: {
      en: 'Product direction, user research, ergonomic form, component breakdown',
      zh: '产品方向、用户研究、人机形态、组件拆解',
    },
    summary: {
      en: 'A hydrotherapy training wearable exploring how standardized cues can improve therapist-patient safety and trust in Watsu scenarios.',
      zh: '面向 Watsu 水疗场景的训练穿戴辅具，探索标准化提示如何提升安全感与信任感。',
    },
    evidence: {
      en: ['User interviews', 'Hydrotherapy scenario mapping', 'Organic ergonomic form', 'Vibration feedback logic'],
      zh: ['用户访谈', '水疗场景映射', '有机人机形态', '振动反馈逻辑'],
    },
    source: { en: 'Confirmed from recovered portfolio evidence', zh: '来自已恢复作品集证据' },
  },
  {
    id: 'cup-cup',
    category: 'concept',
    title: { en: "The Cup's Cup", zh: '杯中杯饮水辅具' },
    type: { en: 'Assistive Product / Patent Applied', zh: '辅助产品 / 专利申请' },
    year: '2018-2019',
    image: '/portfolio/cup-cup-clean.jpg',
    imageFit: 'contain',
    gallery: ['/portfolio/cup-cup-clean.jpg'],
    role: {
      en: 'Pain-point reframing, use flow, physical product design',
      zh: '痛点重构、使用流程、实体产品设计',
    },
    summary: {
      en: 'A drinking aid reframing assisted drinking as a calmer, safer, and more dignified everyday action.',
      zh: '把辅助饮水重构为更安全、更自然、更有尊严的日常动作。',
    },
    evidence: {
      en: ['Operation flow', 'Usage comparison', 'Patent-applied direction', 'Assistive-object design'],
      zh: ['操作流程', '使用对比', '专利申请方向', '辅助物件设计'],
    },
    source: { en: 'Confirmed from recovered portfolio evidence', zh: '来自已恢复作品集证据' },
  },
  {
    id: 'heart-bracelet',
    category: 'concept',
    title: { en: 'Heart Disease Bracelet Kit', zh: '心脏病手环套件' },
    type: { en: 'Health Hardware Concept', zh: '健康硬件概念' },
    year: '2019-2020',
    image: null,
    gallery: [],
    role: {
      en: 'Product concept, kit structure, scenario exploration',
      zh: '产品概念、套件结构、场景探索',
    },
    summary: {
      en: 'A kit concept for health-support scenarios, included as hardware-thinking evidence rather than a clinical claim.',
      zh: '面向健康支持场景的套件概念，仅作为硬件思维证据，不作为医疗声明。',
    },
    evidence: {
      en: ['Kit design', 'Scenario framing', 'Hardware concept', 'Non-diagnostic framing'],
      zh: ['套件设计', '场景框定', '硬件概念', '非诊断表达'],
    },
    source: { en: 'Original product image pending; no source-preserving cover generated yet', zh: '原始产品图待补，暂不生成会改变产品形态的封面' },
  },
  {
    id: 'opera-ruler',
    category: 'concept',
    title: { en: 'Sichuan Opera Drawing Ruler', zh: '川剧儿童绘画尺' },
    type: { en: 'Cultural Toy / Education', zh: '文化玩具 / 教育' },
    year: '2019-2020',
    image: '/portfolio/opera-ruler-source-cover.jpg',
    imageFit: 'contain',
    gallery: ['/portfolio/opera-ruler-source-cover.jpg', '/portfolio/opera-ruler-kit-source.jpg', '/portfolio/opera-ruler-use-source.jpg'],
    role: {
      en: 'Cultural translation, toy concept, test-model direction',
      zh: '文化转译、玩具概念、测试模型方向',
    },
    summary: {
      en: 'A children-oriented drawing tool translating Sichuan opera face-changing colors and mask forms into cultural education play.',
      zh: '把川剧变脸色彩与面具形态转译成儿童文化教育绘画工具。',
    },
    evidence: {
      en: ['Heritage translation', 'Children toy insight', 'Mask and animal mapping', 'Test-model evidence'],
      zh: ['非遗转译', '儿童玩具洞察', '面具与动物映射', '测试模型证据'],
    },
    source: { en: 'Confirmed from recovered portfolio evidence', zh: '来自已恢复作品集证据' },
  },
  {
    id: 'capstone-device',
    category: 'concept',
    title: { en: 'Capstone AI Device Concept', zh: 'Capstone AI 设备概念' },
    type: { en: 'AI Hardware / Service Concept', zh: 'AI 硬件 / 服务概念' },
    year: '2026',
    image: '/portfolio/capstone-device-render.jpg',
    gallery: ['/portfolio/capstone-device-render.jpg', '/portfolio/capstone-device-export.jpg', '/portfolio/capstone-cover.jpg'],
    role: {
      en: 'Device scenario, concept framing, service narrative',
      zh: '设备场景、概念框定、服务叙事',
    },
    summary: {
      en: 'A capstone-stage device concept exploring how physical hardware and AI guidance can work together in one rehearsal workflow.',
      zh: 'Capstone 阶段的设备概念，探索实体硬件与 AI 引导如何在演练流程里协同。',
    },
    evidence: {
      en: ['Device render', 'GLB/STL evidence', 'Scenario video', 'AI service framing'],
      zh: ['设备渲染', 'GLB/STL 证据', '场景视频', 'AI 服务框定'],
    },
    source: { en: 'Confirmed local source: semester2/capstone', zh: '已确认本地来源：semester2/capstone' },
  },
  {
    id: 'xiaomi-cmf',
    category: 'production',
    title: { en: 'Xiaomi Bone-conduction Earphones CMF', zh: '小米骨传导耳机 CMF' },
    type: { en: 'CMF / Mass Production', zh: 'CMF / 量产' },
    year: '2022-2023',
    image: '/portfolio/xiaomi-cmf-source-cover.jpg',
    imageFit: 'contain',
    gallery: ['/portfolio/xiaomi-cmf-source-cover.jpg', '/portfolio/xiaomi-cmf-breakdown-source.jpg', '/portfolio/xiaomi-cmf-detail-source.jpg'],
    role: {
      en: 'CMF design, color rationale, material and finish specification',
      zh: 'CMF 设计、色彩逻辑、材料与工艺规格',
    },
    summary: {
      en: 'A mass-produced earphone CMF project involving color rationale, Pantone/material/finish details, laser engraving, and production documentation.',
      zh: '量产耳机 CMF 项目，涉及色彩理由、Pantone/材料/表面工艺、镭雕与生产文档。',
    },
    evidence: {
      en: ['Launched product', 'Pantone and material specs', 'Laser engraving process', 'Supplier-facing documentation'],
      zh: ['上市产品', 'Pantone 与材料规格', '镭雕工艺', '供应链文档'],
    },
    source: { en: 'Confirmed from recovered portfolio evidence', zh: '来自已恢复作品集证据' },
  },
  {
    id: 'cat-turntable',
    category: 'production',
    title: { en: 'Composite Turntable Pet Toy', zh: '复合转盘猫玩具' },
    type: { en: 'Mass-produced Product / Pet Toy', zh: '量产产品 / 宠物玩具' },
    year: '2021-2022',
    image: '/portfolio/cat-turntable-source-cover.jpg',
    gallery: ['/portfolio/cat-turntable-source-cover.jpg', '/portfolio/cat-turntable-hero-source.jpg', '/portfolio/cat-turntable-render-source.jpg', '/portfolio/cat-turntable-detail-source.jpg'],
    role: {
      en: 'Product design, cost-down strategy, commercial canvas',
      zh: '产品设计、降本策略、商业画布',
    },
    summary: {
      en: 'A launched pet-toy project using behavior mapping, function extraction, reuse strategy, and a space-travel metaphor.',
      zh: '已上市宠物玩具项目，结合宠物行为图谱、功能提取、复用降本和太空旅行隐喻。',
    },
    evidence: {
      en: ['Mass-produced / launched', 'Pet behavior map', 'Cost-down reuse logic', 'Commercial canvas'],
      zh: ['量产/上市', '宠物行为图谱', '复用降本逻辑', '商业画布'],
    },
    source: { en: 'Confirmed from recovered portfolio evidence', zh: '来自已恢复作品集证据' },
  },
  {
    id: 'smart-waste',
    category: 'production',
    title: { en: 'Smart Waste Tank', zh: '智能废料箱' },
    type: { en: 'Smart Hardware / Industrial Equipment', zh: '智能硬件 / 工业设备' },
    year: '2022-2023',
    image: '/portfolio/edited-smart-waste-cover.jpg',
    gallery: ['/portfolio/edited-smart-waste-cover.jpg', '/portfolio/smart-waste-source-cover.jpg', '/portfolio/smart-waste-panel-source.jpg'],
    role: {
      en: 'Hardware design thinking, equipment scenario, manufacturable structure',
      zh: '硬件设计思维、设备场景、可制造结构',
    },
    summary: {
      en: 'A smart waste-equipment direction for factory waste collection, rebuilt from the original PDF product render without changing the equipment form.',
      zh: '面向工厂废料收集的智能设备方向，已基于 PDF 原始产品渲染恢复封面，不改变设备形态。',
    },
    evidence: {
      en: ['Equipment scenario', 'Hardware delivery evidence', 'Production-minded framing', 'Source-preserving cover'],
      zh: ['设备场景', '硬件交付证据', '量产思维', '保留原产品形态封面'],
    },
    source: { en: 'Extracted from portfolio PDF; cover keeps the original product render unchanged', zh: '来自作品集 PDF 抽取图，封面保留原产品渲染形态' },
  },
  {
    id: 'baling-press',
    category: 'production',
    title: { en: 'Compression Baling Press', zh: '压缩打包机' },
    type: { en: 'Industrial Equipment / Production Logic', zh: '工业设备 / 生产逻辑' },
    year: '2022-2023',
    image: '/portfolio/edited-baling-press-cover.jpg',
    gallery: ['/portfolio/edited-baling-press-cover.jpg', '/portfolio/baling-press-source-cover.jpg', '/portfolio/baling-press-vi-source.jpg', '/portfolio/baling-press-panel-source.jpg'],
    role: {
      en: 'Equipment structure, use flow, production proposal',
      zh: '设备结构、使用流程、生产提案',
    },
    summary: {
      en: 'A production-oriented compression baling press project rebuilt from the original PDF product render without changing the equipment form.',
      zh: '面向生产的压缩打包机项目，已基于 PDF 原始产品渲染恢复封面，不改变设备形态。',
    },
    evidence: {
      en: ['Equipment structure', 'Use-flow thinking', 'Client proposal evidence', 'Source-preserving cover'],
      zh: ['设备结构', '使用流程思维', '客户提案证据', '保留原产品形态封面'],
    },
    source: { en: 'Extracted from portfolio PDF; cover keeps the original product render unchanged', zh: '来自作品集 PDF 抽取图，封面保留原产品渲染形态' },
  },
  {
    id: 'cmf-electronics',
    category: 'production',
    title: { en: 'CMF Electronics Archive', zh: '电子产品 CMF 档案' },
    type: { en: 'CMF / Supplier Documentation', zh: 'CMF / 供应链文档' },
    year: '2022-2023',
    image: '/portfolio/cmf-electronics-source-cover.jpg',
    imageFit: 'contain',
    gallery: ['/portfolio/cmf-electronics-source-cover.jpg', '/portfolio/cmf-earbuds-source.jpg', '/portfolio/cmf-material-source.jpg'],
    role: {
      en: 'Color, material, finish, and production communication',
      zh: '色彩、材料、表面工艺与生产沟通',
    },
    summary: {
      en: 'A supporting archive for electronics CMF decisions, supplier communication, and finish documentation.',
      zh: '电子产品 CMF 决策、供应链沟通和工艺文档的支持性档案。',
    },
    evidence: {
      en: ['CMF decision making', 'Supplier-facing detail', 'Finish specification', 'Production communication'],
      zh: ['CMF 决策', '供应链细节', '表面工艺规格', '生产沟通'],
    },
    source: { en: 'Recovered portfolio evidence', zh: '已恢复作品集证据' },
  },
  {
    id: 'cbs5502',
    category: 'research',
    title: { en: 'Feel Disambiguation NLP', zh: 'Feel 词义消歧 NLP' },
    type: { en: 'Computational Linguistics / Data Pipeline', zh: '计算语言学 / 数据流程' },
    year: '2026',
    image: '/portfolio/cbs5502-montage.png',
    gallery: ['/portfolio/cbs5502-montage.png'],
    role: {
      en: 'Data cleaning, annotation rules, feature extraction, reproducible handoff',
      zh: '数据清洗、标注规则、特征提取、可复现交付',
    },
    summary: {
      en: 'A computational linguistics project disambiguating the English verb feel in MBTI-related online text.',
      zh: '一个计算语言学项目，在 MBTI 相关在线文本里区分 feel 的不同语义。',
    },
    evidence: {
      en: ['8,675 raw rows', '421,757 post segments', '18,636 kept feel sentences', '400-row gold review'],
      zh: ['8,675 条原始数据', '421,757 个帖子片段', '18,636 条保留 feel 句', '400 条 Gold Review'],
    },
    source: { en: 'Confirmed local source: semester2/CBS5502/final project', zh: '已确认本地来源：semester2/CBS5502/final project' },
  },
  {
    id: 'miro-governance',
    category: 'research',
    title: { en: 'Miro AI Governance Notes', zh: 'Miro AI 治理文档' },
    type: { en: 'AI Governance / Product Architecture', zh: 'AI 治理 / 产品架构' },
    year: '2026',
    image: '/portfolio/miro-hifi-overview.jpg',
    gallery: ['/portfolio/miro-hifi-overview.jpg', '/portfolio/miro-review-dashboard.jpg'],
    role: {
      en: 'Flow/state/API mapping, governance notes, deployment checklist',
      zh: '流程/状态/API 映射、治理说明、部署清单',
    },
    summary: {
      en: 'The research-facing side of Miro: schemas, state maps, AI/data governance, deployment checks, and handoff documentation.',
      zh: 'Miro 的研究与架构侧：Schema、状态图、AI/数据治理、部署检查和交付文档。',
    },
    evidence: {
      en: ['Flow and state maps', 'API/schema docs', 'AI/data governance', 'Deployment checklist'],
      zh: ['流程与状态图', 'API/Schema 文档', 'AI/数据治理', '部署检查清单'],
    },
    source: { en: 'Confirmed local repo: Desktop/miro', zh: '已确认本地仓库：Desktop/miro' },
  },
  {
    id: 'tcm-systems',
    category: 'research',
    title: { en: 'Classical Formula Network', zh: '古籍方剂网络' },
    type: { en: 'Data Visualization / Knowledge System', zh: '数据可视化 / 知识系统' },
    year: '2025',
    image: '/portfolio/tcm-graph-clean.jpg',
    gallery: ['/portfolio/tcm-graph-clean.jpg'],
    role: {
      en: 'Ancient-text processing, co-occurrence matrix, graph exploration',
      zh: '古籍处理、共现矩阵、图谱探索',
    },
    summary: {
      en: 'A systems view of classical formulas and herbs, testing how historical relationships can be visualized and reasoned through data.',
      zh: '从系统角度组织古籍方剂与药材，测试历史关系如何通过数据可视化推理。',
    },
    evidence: {
      en: ['Ben Cao Gang Mu', 'Huangdi Neijing', 'Jun-Chen-Zuo-Shi hierarchy', 'ECharts prototypes'],
      zh: ['本草纲目', '黄帝内经', '君臣佐使层级', 'ECharts 原型'],
    },
    source: { en: 'Confirmed local project: CBS5504', zh: '已确认本地项目：CBS5504' },
  },
  {
    id: 'libai-data',
    category: 'research',
    title: { en: 'Li Bai Data Narrative', zh: '李白数据叙事' },
    type: { en: 'Cultural Dataset / Network Narrative', zh: '文化数据集 / 网络叙事' },
    year: '2025',
    image: '/portfolio/libai-background.png',
    gallery: ['/portfolio/libai-background.png'],
    role: {
      en: 'Poem data, journey data, social graph, emotional imagery analysis',
      zh: '诗歌数据、行旅数据、人物网络、情感意象分析',
    },
    summary: {
      en: 'A research layer for the Li Bai site, organizing biography, travel, poetry imagery, and relationship data into a navigable interface.',
      zh: '李白网站的研究层，把生平、行旅、诗歌意象和人物关系组织成可导航界面。',
    },
    evidence: {
      en: ['Poem database', 'Journey data', '76 nodes', '80 edges'],
      zh: ['诗歌数据库', '行旅数据', '76 个节点', '80 条边'],
    },
    source: { en: 'Confirmed local project: CHC5904 final project', zh: '已确认本地项目：CHC5904 final project' },
  },
  {
    id: 'food-health-model',
    category: 'research',
    title: { en: 'Food Health Feedback Model', zh: '食物健康反馈模型' },
    type: { en: 'Health Data Model / UX Logic', zh: '健康数据模型 / UX 逻辑' },
    year: '2026',
    image: '/portfolio/palifood-stage-china.jpg',
    gallery: ['/portfolio/palifood-stage-china.jpg', '/portfolio/palifood-login-china.jpg'],
    role: {
      en: 'Recognition flow, health feedback structure, prototype validation',
      zh: '识别流程、健康反馈结构、原型验证',
    },
    summary: {
      en: 'The logic layer behind Pai Li Shi: how capture, recognition, feedback, and social expression fit into one mobile loop.',
      zh: '拍立食背后的逻辑层：拍摄、识别、反馈和社交表达如何形成移动端闭环。',
    },
    evidence: {
      en: ['Recognition flow', 'Feedback model', 'Mobile validation', 'Prototype archive'],
      zh: ['识别流程', '反馈模型', '移动端验证', '原型归档'],
    },
    source: { en: 'Confirmed local project: Desktop/拍立食', zh: '已确认本地项目：Desktop/拍立食' },
  },
];

const projectShortCopy = {
  miro: {
    en: 'AI rehearsal system for cross-cultural communication and review.',
    zh: '面向跨文化沟通的 AI 演练与复盘系统。',
  },
  palifood: {
    en: 'Mobile food-recognition flow from capture to health feedback.',
    zh: '从拍摄识别到健康反馈的移动端体验。',
  },
  libai: {
    en: 'Cultural data, map, network, and dialogue in one poetic web interface.',
    zh: '把地图、网络、诗歌数据和问答组织成诗意网页。',
  },
  'tcm-kg': {
    en: 'Classical medicine knowledge graph for cultural education.',
    zh: '面向文化教育的中医药知识图谱。',
  },
  'offer-quest': {
    en: 'Structured job-learning dashboard with maps and review loops.',
    zh: '用地图和复习节奏组织求职学习。',
  },
  sport: {
    en: 'Local-first fitness form coach with camera pose tracking and reports.',
    zh: '本地优先的摄像头姿态训练质检与报告系统。',
  },
  momenta: {
    en: 'Public SwiftUI AI music repository plus local device-interaction evidence.',
    zh: '公开 SwiftUI AI 音乐仓库，加本地设备交互证据。',
  },
  'cross-ripple': {
    en: 'Hydrotherapy wearable concept built around safety cues.',
    zh: '围绕水疗安全提示建立的穿戴概念。',
  },
  'cup-cup': {
    en: 'Assistive drinking object for safer everyday care.',
    zh: '让辅助饮水更安全自然的日用辅具。',
  },
  'heart-bracelet': {
    en: 'Health-support kit concept; original product image still pending.',
    zh: '健康支持套件概念，原始产品图仍待补。',
  },
  'opera-ruler': {
    en: 'Cultural drawing tool translating Sichuan opera masks into play.',
    zh: '把川剧脸谱转译成儿童绘画工具。',
  },
  'capstone-device': {
    en: 'AI hardware/service concept for guided rehearsal workflows.',
    zh: '面向引导演练流程的 AI 硬件服务概念。',
  },
  'xiaomi-cmf': {
    en: 'Mass-production CMF work with color, material, and finish logic.',
    zh: '覆盖色彩、材料与工艺逻辑的量产 CMF。',
  },
  'cat-turntable': {
    en: 'Launched pet toy with behavior mapping and cost-down reuse.',
    zh: '结合行为洞察与降本复用的量产宠物玩具。',
  },
  'smart-waste': {
    en: 'Industrial waste-collection equipment rebuilt from source render evidence.',
    zh: '基于原始渲染证据呈现的工业废料收集设备。',
  },
  'baling-press': {
    en: 'Compression equipment case focused on structure and use flow.',
    zh: '围绕结构与使用流程展开的压缩设备案例。',
  },
  'cmf-electronics': {
    en: 'Electronics CMF archive for material and supplier communication.',
    zh: '用于材料和供应链沟通的电子产品 CMF 档案。',
  },
  cbs5502: {
    en: 'NLP pipeline turning raw online text into reviewable evidence.',
    zh: '把在线文本清洗成可复核证据的 NLP 流程。',
  },
  'miro-governance': {
    en: 'AI product governance notes for flow, schema, and deployment.',
    zh: '围绕流程、Schema 和部署的 AI 产品治理文档。',
  },
  'tcm-systems': {
    en: 'Formula and herb network for exploring historical relationships.',
    zh: '用于探索古籍方药关系的网络系统。',
  },
  'libai-data': {
    en: 'Research layer behind the Li Bai data narrative.',
    zh: '李白数据叙事背后的研究层。',
  },
  'food-health-model': {
    en: 'Recognition, feedback, and social expression as one mobile loop.',
    zh: '把识别、反馈和社交表达组织成移动闭环。',
  },
};

const projectKinds = {
  miro: 'digital',
  palifood: 'digital',
  libai: 'digital',
  'tcm-kg': 'research',
  'offer-quest': 'digital',
  sport: 'digital',
  momenta: 'digital',
  'cross-ripple': 'product',
  'cup-cup': 'product',
  'heart-bracelet': 'product',
  'opera-ruler': 'product',
  'capstone-device': 'product',
  'xiaomi-cmf': 'cmf',
  'cat-turntable': 'product',
  'smart-waste': 'product',
  'baling-press': 'product',
  'cmf-electronics': 'cmf',
  cbs5502: 'research',
  'miro-governance': 'research',
  'tcm-systems': 'research',
  'libai-data': 'research',
  'food-health-model': 'research',
};

const caseStudyOverrides = {
  miro: {
    label: { en: 'AI product case', zh: 'AI 产品案例' },
    headline: {
      en: 'Miro is framed as a rehearsal system: prepare, simulate, review, and improve across real cultural constraints.',
      zh: 'Miro 被组织成一个演练系统：准备、模拟、复盘，并在真实跨文化限制中持续改进。',
    },
    sections: [
      {
        title: { en: 'Communication Gap', zh: '沟通缺口' },
        body: {
          en: 'The product target is not literal translation. It focuses on timing, taboo phrasing, tone, and how users learn from repeated conversations.',
          zh: '项目目标不是字面翻译，而是处理节奏、禁忌表达、语气，以及用户如何在反复对话中学习。',
        },
      },
      {
        title: { en: 'Core Loop', zh: '核心闭环' },
        body: {
          en: 'The experience is built as a loop of scenario setup, AI role-play, transcript review, feedback, and next-session goals.',
          zh: '体验被拆成场景设置、AI 角色演练、文本复盘、反馈和下一轮目标的闭环。',
        },
      },
      {
        title: { en: 'Interface System', zh: '界面系统' },
        body: {
          en: 'Dashboard, review states, device-facing UI, and backend records are treated as one product surface rather than separate demos.',
          zh: 'Dashboard、复盘状态、设备界面和后端记录被当作同一个产品表面，而不是彼此独立的演示。',
        },
      },
      {
        title: { en: 'Evidence', zh: '结果证据' },
        body: {
          en: 'The case is supported by frontend, FastAPI, Supabase, deployment notes, schema, governance, and handoff documents.',
          zh: '案例由前端、FastAPI、Supabase、部署说明、Schema、治理和交付文档共同支撑。',
        },
      },
    ],
  },
  palifood: {
    label: { en: 'Mobile AI case', zh: '移动 AI 案例' },
    headline: {
      en: 'Pai Li Shi turns food recognition into a mobile loop that is fast, visual, and easy to repeat in daily life.',
      zh: '拍立食把食物识别变成一个快速、视觉化、可日常重复的移动端闭环。',
    },
    sections: [
      {
        title: { en: 'Capture Moment', zh: '拍摄时刻' },
        body: {
          en: 'The first interaction is designed around a low-friction camera action, not a data form.',
          zh: '第一步围绕低摩擦的拍摄动作设计，而不是让用户先填写数据表。',
        },
      },
      {
        title: { en: 'Feedback Rhythm', zh: '反馈节奏' },
        body: {
          en: 'Recognition results, health feedback, and recommendations are sequenced so the user gets an answer before deeper exploration.',
          zh: '识别结果、健康反馈和推荐按顺序出现，让用户先得到答案，再进入更深的信息。',
        },
      },
      {
        title: { en: 'Mobile Visual System', zh: '移动视觉系统' },
        body: {
          en: 'The prototype keeps compact controls, large food imagery, and short decision text for small screens.',
          zh: '原型保留紧凑控件、大面积食物图像和短决策文案，适配手机屏幕。',
        },
      },
      {
        title: { en: 'Validation', zh: '验证' },
        body: {
          en: 'The H5 evidence shows login, capture, stage feedback, and formal mobile UI states.',
          zh: 'H5 证据覆盖登录、拍摄、阶段反馈和正式移动端界面状态。',
        },
      },
    ],
  },
  libai: {
    label: { en: 'Digital humanities case', zh: '数字人文案例' },
    headline: {
      en: 'The Li Bai site uses data as atmosphere: map, network, chart, biography, poetry, and dialogue support one cultural journey.',
      zh: '李白网站把数据做成氛围：地图、网络、图表、生平、诗歌和对话共同支撑一次文化旅程。',
    },
    sections: [
      {
        title: { en: 'Narrative Frame', zh: '叙事框架' },
        body: {
          en: 'The page starts from biography and journey, then lets relationship data and poetic imagery become navigable material.',
          zh: '页面从生平与行旅出发，再让人物关系和诗歌意象变成可浏览的材料。',
        },
      },
      {
        title: { en: 'Data Surfaces', zh: '数据表面' },
        body: {
          en: 'Leaflet, Vis-network, and charts are not decorative widgets; each one answers a different cultural question.',
          zh: 'Leaflet、Vis-network 和图表不是装饰组件，而是分别回答不同的文化问题。',
        },
      },
      {
        title: { en: 'Interaction Tone', zh: '交互语气' },
        body: {
          en: 'The Ask Li Bai flow keeps the interface poetic while still exposing structured evidence.',
          zh: 'Ask Li Bai 流程让界面保留诗性，同时仍能暴露结构化证据。',
        },
      },
      {
        title: { en: 'Handoff Boundary', zh: '交付边界' },
        body: {
          en: 'Original HTML is treated carefully because direct publishing may expose API-key-like values.',
          zh: '原 HTML 需要谨慎处理，因为直接发布可能暴露类似 API Key 的值。',
        },
      },
    ],
  },
  'smart-waste': {
    label: { en: 'Industrial equipment case', zh: '工业设备案例' },
    headline: {
      en: 'The smart waste tank is presented as an equipment system, with the original product form preserved from source renders.',
      zh: '智能废料箱按设备系统呈现，产品形态来自原始渲染并保持不变。',
    },
    sections: [
      {
        title: { en: 'Factory Context', zh: '工厂场景' },
        body: {
          en: 'The case is positioned around waste collection in industrial environments, where clarity and durability matter more than styling tricks.',
          zh: '案例围绕工业环境中的废料收集展开，清晰度和耐用性比造型噱头更重要。',
        },
      },
      {
        title: { en: 'Equipment Logic', zh: '设备逻辑' },
        body: {
          en: 'The cover and gallery keep the source equipment geometry, using layout and contrast to explain the body, panel, and functional zones.',
          zh: '封面与图库保留源设备几何关系，通过排版和对比解释机身、面板和功能区域。',
        },
      },
      {
        title: { en: 'Source Preservation', zh: '源图保形' },
        body: {
          en: 'No new product angle is invented. Only page crop, fit, and presentation context are changed.',
          zh: '不虚构新的产品角度，只调整页面裁切、适配和展示语境。',
        },
      },
      {
        title: { en: 'Value', zh: '价值' },
        body: {
          en: 'It demonstrates industrial hardware thinking and production-minded presentation from limited source evidence.',
          zh: '它展示了在有限源图证据下组织工业硬件思维和量产表达的能力。',
        },
      },
    ],
  },
  'baling-press': {
    label: { en: 'Production equipment case', zh: '生产设备案例' },
    headline: {
      en: 'The baling press case focuses on pressure structure, use flow, and source-preserving industrial presentation.',
      zh: '压缩打包机案例聚焦压力结构、使用流程和源图保形的工业展示。',
    },
    sections: [
      {
        title: { en: 'Use Flow', zh: '使用流程' },
        body: {
          en: 'The case reads from equipment role to operator movement, rather than treating the machine as a single render.',
          zh: '案例从设备角色读到操作者动作，而不是只把机器当作单张效果图。',
        },
      },
      {
        title: { en: 'Structure', zh: '结构' },
        body: {
          en: 'The product body, compression volume, and control area are kept visible with contain-fit previews.',
          zh: '通过 contain 预览保留机身、压缩空间和控制区域的可读性。',
        },
      },
      {
        title: { en: 'Proposal Evidence', zh: '提案证据' },
        body: {
          en: 'Gallery images show original render evidence, detail pages, visual identity context, and panel information.',
          zh: '图库包含原始渲染、细节页、视觉识别语境和版面信息。',
        },
      },
      {
        title: { en: 'Boundary', zh: '边界' },
        body: {
          en: 'Because only source views are available, the site does not generate new sides or mechanisms.',
          zh: '因为当前只有这些源视图，网站不生成新的侧面或机械结构。',
        },
      },
    ],
  },
  'xiaomi-cmf': {
    label: { en: 'CMF production case', zh: 'CMF 量产案例' },
    headline: {
      en: 'The Xiaomi CMF page is a production-facing material story: color logic, finish details, engraving, and supplier communication.',
      zh: '小米 CMF 页面是面向量产的材料叙事：色彩逻辑、表面工艺、镭雕和供应链沟通。',
    },
    sections: [
      {
        title: { en: 'Color Rationale', zh: '色彩逻辑' },
        body: {
          en: 'The case starts from product positioning and turns color into a manufacturable decision, not just a mood board.',
          zh: '案例从产品定位出发，把色彩变成可量产决策，而不是单纯情绪板。',
        },
      },
      {
        title: { en: 'Material Detail', zh: '材料细节' },
        body: {
          en: 'Pantone, material, finish, and engraving evidence are presented as the core artifact.',
          zh: 'Pantone、材料、表面处理和镭雕证据是页面核心内容。',
        },
      },
      {
        title: { en: 'Production Communication', zh: '生产沟通' },
        body: {
          en: 'The page keeps the product image and technical panels readable so the case feels supplier-facing.',
          zh: '页面保留产品图和技术版面的可读性，让案例更像面向供应链的沟通。',
        },
      },
      {
        title: { en: 'Result', zh: '结果' },
        body: {
          en: 'The strongest value is launched-product evidence combined with formal CMF documentation.',
          zh: '最大价值在于上市产品证据与正式 CMF 文档同时存在。',
        },
      },
    ],
  },
};

const pinnedStories = [
  {
    id: 'ai-product',
    label: { en: 'AI Product', zh: 'AI 产品' },
    title: {
      en: 'Turn rehearsal, capture, and feedback into one guided loop.',
      zh: '把演练、识别和反馈组织成一个连续闭环。',
    },
    body: {
      en: 'The strongest AI-facing work here is not a single model demo. It is a product rhythm: scenario setup, interaction, review, and next action.',
      zh: '这里最强的 AI 向能力不是单次模型演示，而是把场景设置、交互、复盘和下一步行动组织成产品节奏。',
    },
    image: '/portfolio/miro-review-dashboard.jpg',
    projects: ['miro', 'palifood', 'momenta'],
  },
  {
    id: 'industrial',
    label: { en: 'Industrial Design', zh: '工业设计' },
    title: {
      en: 'Physical products are framed through use context, structure, and evidence.',
      zh: '把实体产品放回使用场景、结构推导和证据链里。',
    },
    body: {
      en: 'Instead of treating hardware as a hero render, the portfolio explains how form, ergonomics, and equipment logic are built from constrained source material.',
      zh: '不是把硬件当成孤立效果图，而是说明形态、人机和设备逻辑如何从有限源图与真实约束里长出来。',
    },
    image: '/portfolio/smart-waste-panel-source.jpg',
    projects: ['cross-ripple', 'smart-waste', 'baling-press'],
  },
  {
    id: 'cmf',
    label: { en: 'CMF / Production', zh: 'CMF / 量产' },
    title: {
      en: 'Color, material, and finish stay close to manufacturing reality.',
      zh: '颜色、材料和工艺始终贴着量产现实走。',
    },
    body: {
      en: 'This layer focuses on Pantone, finish, supplier communication, reuse logic, and how visual decisions survive production.',
      zh: '这一层关注 Pantone、表面工艺、供应链沟通、复用降本，以及视觉决策如何进入生产。',
    },
    image: '/portfolio/xiaomi-cmf-breakdown-source.jpg',
    projects: ['xiaomi-cmf', 'cat-turntable', 'cmf-electronics'],
  },
  {
    id: 'systems',
    label: { en: 'System Design', zh: '系统设计' },
    title: {
      en: 'Research work is translated into navigable systems, not isolated charts.',
      zh: '研究被翻译成可导航系统，而不是孤立图表。',
    },
    body: {
      en: 'Maps, graphs, schemas, governance notes, and language pipelines are arranged as interfaces that can be read, compared, and handed off.',
      zh: '地图、图谱、Schema、治理说明和语言处理流程被组织成可以阅读、比较和交接的界面系统。',
    },
    image: '/portfolio/tcm-graph-clean.jpg',
    projects: ['libai', 'tcm-kg', 'miro-governance'],
  },
];

const achievementCards = [
  {
    value: '51',
    label: { en: 'Works', zh: '作品入口' },
    note: { en: 'Portfolio cases across products, interfaces, and systems', zh: '覆盖产品、界面与系统的作品入口' },
  },
  {
    value: '20+',
    label: { en: 'Clients', zh: '客户协作' },
    note: { en: 'Confirmed in CV, including Siemens, Midea, and Foxconn', zh: '简历确认，含西门子、美的、富士康等' },
  },
  {
    value: '12+',
    label: { en: 'Honors', zh: '奖项荣誉' },
    note: { en: 'Design awards, scholarships, and student honors', zh: '设计奖项、奖学金与荣誉称号' },
  },
  {
    value: '4',
    label: { en: 'Directions', zh: '能力方向' },
    note: { en: 'AI, web, industrial design, and CMF evidence', zh: 'AI、Web、工业设计与 CMF 证据' },
  },
];

const productShowcaseIds = ['cross-ripple', 'smart-waste', 'baling-press', 'xiaomi-cmf', 'cat-turntable', 'heart-bracelet'];
const digitalCaseIds = ['miro', 'palifood', 'libai', 'momenta', 'sport'];
const daimaWorkPanels = [
  {
    id: 'daima-miro',
    projectId: 'miro',
    title: { en: 'Miro AI Rehearsal System', zh: 'Miro AI 演练系统' },
    category: { en: 'AI Product / Web System', zh: 'AI 产品 / Web 系统' },
    image: '/portfolio/daima-work-cover-01.png',
  },
  {
    id: 'daima-palifood',
    projectId: 'palifood',
    title: { en: 'Pai Li Shi', zh: '拍立食' },
    category: { en: 'Food AI / Mobile H5', zh: '食物 AI / 移动 H5' },
    image: '/portfolio/daima-work-cover-02.png',
  },
  {
    id: 'daima-libai',
    projectId: 'libai',
    title: { en: 'Li Bai Interactive Website', zh: '李白互动网站' },
    category: { en: 'Digital Humanities / Web Experience', zh: '数字人文 / Web 体验' },
    image: '/portfolio/daima-work-cover-03.png',
  },
  {
    id: 'daima-sport',
    projectId: 'sport',
    title: { en: 'Home Form Coach', zh: '居家运动姿态教练' },
    category: { en: 'Fitness AI / Pose Tracking', zh: '运动 AI / 姿态追踪' },
    image: '/portfolio/daima-work-cover-04.png',
  },
];

const expansionCards = [
  {
    id: 'france',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'italy',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'holland',
    country: 'Holland',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'belgium',
    country: 'Belgium',
    image: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'luxembourg',
    country: 'Luxembourg',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'norway',
    country: 'Norway',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=760&q=86',
  },
  {
    id: 'denmark',
    country: 'Denmark',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'sweden',
    country: 'Sweden',
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'finland',
    country: 'Finland',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'germany',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'austria',
    country: 'Austria',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'spain',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'portugal',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'switzerland',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=680&q=82',
  },
  {
    id: 'iceland',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=680&q=82',
    mobileExtra: true,
  },
  {
    id: 'greece',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=680&q=82',
    mobileExtra: true,
  },
  {
    id: 'czechia',
    country: 'Czechia',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=680&q=82',
    mobileExtra: true,
  },
];

function getProjectsByIds(ids) {
  return ids.map((id) => projects.find((project) => project.id === id)).filter(Boolean);
}

function getMotionState() {
  if (typeof window === 'undefined') {
    return { reduced: false, mobile: false, finePointer: false };
  }
  return {
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mobile: window.matchMedia('(max-width: 820px)').matches,
    finePointer: window.matchMedia('(pointer: fine)').matches,
  };
}

function useMotionProfile() {
  const [state, setState] = useState(getMotionState);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 820px)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const sync = () => setState(getMotionState());

    sync();
    const subscriptions = [reduced, mobile, finePointer].map((query) => {
      if (query.addEventListener) {
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
      }
      query.addListener(sync);
      return () => query.removeListener(sync);
    });

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return state;
}

function useLenisScroll(enabled) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.05,
      wheelMultiplier: 1,
      anchors: true,
    });

    window.__portfolioLenis = lenis;
    const refreshScrollTrigger = () => ScrollTrigger.update();
    const tickLenis = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', refreshScrollTrigger);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', refreshScrollTrigger);
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
      ScrollTrigger.refresh();
    };
  }, [enabled]);
}

function useHomepageMotion(rootRef, { enabled, reduced, magneticEnabled }) {
  useLayoutEffect(() => {
    if (!enabled || !rootRef.current) return undefined;

    const magneticCleanup = [];
    const ctx = gsap.context(() => {
      gsap.set('.air-structure-stage', { autoAlpha: 0, scale: 1.02 });
      gsap.set('.air-hero-copy', { autoAlpha: 0, y: 18 });
      gsap.set('.achievement-card', { autoAlpha: 0, y: 26 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.site-header', { y: -18, autoAlpha: 0, duration: 0.62 }, 0.18)
        .fromTo(
          '.air-letter',
          { x: -118, autoAlpha: 0, filter: 'blur(8px)' },
          { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.32, stagger: 0.34, immediateRender: false },
          0.16,
        )
        .to('.air-structure-stage', { autoAlpha: 1, scale: 1, duration: 1.18, ease: 'power2.out' }, 2.64)
        .to('.air-hero-copy', { autoAlpha: 1, y: 0, duration: 0.82, ease: 'power2.out' }, 2.92)
        .to('.achievement-card', { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.06 }, 3.2);

      if (!reduced) {
        const heroLetters = gsap.utils.toArray('.air-letter');
        const readBaseLetterRects = () => {
          const previousTransforms = heroLetters.map((letter) => ({
            x: gsap.getProperty(letter, 'x'),
            y: gsap.getProperty(letter, 'y'),
            scale: gsap.getProperty(letter, 'scale'),
          }));

          gsap.set(heroLetters, { x: 0, y: 0, scale: 1 });
          const rects = heroLetters.map((item) => item.getBoundingClientRect());

          heroLetters.forEach((letter, index) => {
            gsap.set(letter, previousTransforms[index]);
          });

          return rects;
        };

        const calculateCollectedLetterVars = () => {
          const sticky = document.querySelector('.air-hero-sticky');
          if (!sticky) return heroLetters.map(() => ({ x: 0, y: 0, scale: 1 }));

          const stickyRect = sticky.getBoundingClientRect();
          const letterRects = readBaseLetterRects();
          const viewportWidth = window.innerWidth || stickyRect.width;
          const scale = viewportWidth < 560 ? 0.64 : viewportWidth < 900 ? 0.46 : 0.3;
          const gap = viewportWidth < 560 ? 6 : viewportWidth < 900 ? 8 : 10;
          const targetTop =
            stickyRect.top +
            (viewportWidth < 560
              ? Math.min(Math.max(window.innerHeight * 0.78, 610), 690)
              : viewportWidth < 900
                ? Math.min(Math.max(window.innerHeight * 0.32, 260), 340)
                : Math.min(Math.max(window.innerHeight * 0.24, 210), 248));
          const scaledWidths = letterRects.map((item) => item.width * scale);
          const groupWidth = scaledWidths.reduce((sum, width) => sum + width, 0) + gap * (scaledWidths.length - 1);
          const groupLeft = stickyRect.left + (stickyRect.width - groupWidth) / 2;

          return heroLetters.map((letter, index) => {
            const rect = letterRects[index];
            const targetLeft =
              groupLeft + scaledWidths.slice(0, index).reduce((sum, width) => sum + width, 0) + gap * index;
            const targetCenterX = targetLeft + scaledWidths[index] / 2;
            const currentCenterX = rect.left + rect.width / 2;
            const targetCenterY = targetTop + (rect.height * scale) / 2;
            const currentCenterY = rect.top + rect.height / 2;
            return {
              x: targetCenterX - currentCenterX,
              y: targetCenterY - currentCenterY,
              scale,
            };
          });
        };
        let collectedLetterVars = calculateCollectedLetterVars();
        const getCollectedLetterVars = (index) => {
          return collectedLetterVars[index] || { x: 0, y: 0, scale: 1 };
        };

        const heroScroll = gsap.timeline({
          scrollTrigger: {
            trigger: '.air-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              collectedLetterVars = calculateCollectedLetterVars();
            },
          },
        });

        heroScroll
          .to(
            heroLetters,
            {
              x: (index) => getCollectedLetterVars(index).x,
              y: (index) => getCollectedLetterVars(index).y,
              scale: (index) => getCollectedLetterVars(index).scale,
              autoAlpha: 1,
              duration: 0.24,
              ease: 'none',
            },
            0,
          )
          .to('.air-structure-stage', { yPercent: -5, scale: 1.01, autoAlpha: 0.92, ease: 'none' }, 0)
          .to('.air-hero-copy', { yPercent: -70, autoAlpha: 0, duration: 0.18, ease: 'none', overwrite: true }, 0);
      }

      if (magneticEnabled) {
        gsap.utils.toArray('[data-magnetic]').forEach((node) => {
          const element = node;
          const xTo = gsap.quickTo(element, 'x', { duration: 0.26, ease: 'power3.out' });
          const yTo = gsap.quickTo(element, 'y', { duration: 0.26, ease: 'power3.out' });
          const onMove = (event) => {
            const rect = element.getBoundingClientRect();
            const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1);
            const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1);
            xTo(Math.max(-7, Math.min(7, dx * 7)));
            yTo(Math.max(-7, Math.min(7, dy * 7)));
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          element.addEventListener('pointermove', onMove);
          element.addEventListener('pointerleave', onLeave);
          element.addEventListener('pointercancel', onLeave);
          magneticCleanup.push(() => {
            element.removeEventListener('pointermove', onMove);
            element.removeEventListener('pointerleave', onLeave);
            element.removeEventListener('pointercancel', onLeave);
          });
        });
      }
    }, rootRef);

    return () => {
      magneticCleanup.forEach((dispose) => dispose());
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [enabled, reduced, magneticEnabled, rootRef]);
}

function t(value, lang) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || '';
}

function getProjectKind(project) {
  return projectKinds[project.id] || (project.category === 'research' ? 'research' : project.category === 'production' ? 'cmf' : 'digital');
}

function getProjectShort(project, lang) {
  return t(projectShortCopy[project.id], lang) || t(project.summary, lang);
}

function getCaseStudy(project, lang) {
  const override = caseStudyOverrides[project.id];
  const kind = getProjectKind(project);
  if (override) {
    return {
      kind,
      label: t(override.label, lang),
      headline: t(override.headline, lang),
      sections: override.sections.map((section) => ({
        title: t(section.title, lang),
        body: t(section.body, lang),
      })),
    };
  }
  return getFallbackCaseStudy(project, lang, kind);
}

function getFallbackCaseStudy(project, lang, kind) {
  const title = t(project.title, lang);
  const type = t(project.type, lang);
  const evidence = project.evidence?.[lang] || project.evidence?.en || [];
  const source = t(project.source, lang);

  if (kind === 'product') {
    return {
      kind,
      label: lang === 'zh' ? '产品设计案例' : 'Product case',
      headline:
        lang === 'zh'
          ? `${title} 用场景、结构和源图证据说明产品判断。`
          : `${title} explains product judgment through scenario, structure, and source-image evidence.`,
      sections: [
        {
          title: lang === 'zh' ? '场景痛点' : 'Scenario',
          body:
            lang === 'zh'
              ? `项目先确认 ${type} 的使用场景，再判断哪些动作、限制或情绪需要被产品承接。`
              : `The project first defines the ${type} scenario, then identifies which actions, constraints, or emotions the product must support.`,
        },
        {
          title: lang === 'zh' ? '结构推导' : 'Structure',
          body:
            lang === 'zh'
              ? '页面用草图、模型或源图组织结构关系，避免把产品只呈现为孤立效果图。'
              : 'Sketches, models, or source images are used to explain structural relationships instead of showing the product as an isolated render.',
        },
        {
          title: lang === 'zh' ? '展示边界' : 'Presentation Boundary',
          body:
            lang === 'zh'
              ? `当前证据来源：${source}。没有可靠视图时不生成新的产品形态。`
              : `Current source: ${source}. New product forms are not generated when reliable views are missing.`,
        },
        {
          title: lang === 'zh' ? '价值证据' : 'Value Evidence',
          body: evidence.length ? evidence.join(lang === 'zh' ? '、' : ', ') : t(project.summary, lang),
        },
      ],
    };
  }

  if (kind === 'cmf') {
    return {
      kind,
      label: lang === 'zh' ? 'CMF / 量产案例' : 'CMF / production case',
      headline:
        lang === 'zh'
          ? `${title} 把材料、色彩、工艺和供应链沟通组织成可读证据。`
          : `${title} organizes material, color, finish, and supplier communication into readable evidence.`,
      sections: [
        {
          title: lang === 'zh' ? '定位' : 'Positioning',
          body:
            lang === 'zh'
              ? `先把 ${type} 的产品角色说清楚，再决定色彩和材质如何支撑体验。`
              : `The product role under ${type} is clarified before color and material decisions are made.`,
        },
        {
          title: lang === 'zh' ? 'CMF 证据' : 'CMF Evidence',
          body:
            lang === 'zh'
              ? '页面强调色板、材料、表面处理和工艺细节，而不是只放一张渲染图。'
              : 'The page emphasizes color chips, materials, finish details, and process evidence rather than a single render.',
        },
        {
          title: lang === 'zh' ? '生产沟通' : 'Production Communication',
          body:
            lang === 'zh'
              ? `当前证据来源：${source}。`
              : `Current source: ${source}.`,
        },
        {
          title: lang === 'zh' ? '结果' : 'Result',
          body: evidence.length ? evidence.join(lang === 'zh' ? '、' : ', ') : t(project.summary, lang),
        },
      ],
    };
  }

  if (kind === 'research') {
    return {
      kind,
      label: lang === 'zh' ? '研究 / 系统案例' : 'Research / systems case',
      headline:
        lang === 'zh'
          ? `${title} 把研究材料转译为可浏览、可解释的系统证据。`
          : `${title} translates research material into browsable and explainable system evidence.`,
      sections: [
        {
          title: lang === 'zh' ? '问题域' : 'Problem Domain',
          body:
            lang === 'zh'
              ? `项目先界定 ${type} 的问题域，再决定哪些数据关系需要被可视化。`
              : `The project defines the ${type} problem domain before deciding which data relationships need to be visualized.`,
        },
        {
          title: lang === 'zh' ? '方法' : 'Method',
          body:
            lang === 'zh'
              ? '通过清洗、建模、映射或图谱结构，把研究对象从材料变成界面。'
              : 'Cleaning, modeling, mapping, or graph structures turn research material into interface evidence.',
        },
        {
          title: lang === 'zh' ? '可视化结果' : 'Visualization Result',
          body: evidence.length ? evidence.join(lang === 'zh' ? '、' : ', ') : t(project.summary, lang),
        },
        {
          title: lang === 'zh' ? '边界' : 'Boundary',
          body:
            lang === 'zh'
              ? `当前证据来源：${source}。页面只表达研究和教育价值，不夸大为未验证结论。`
              : `Current source: ${source}. The page presents research and educational value without overstating unverified conclusions.`,
        },
      ],
    };
  }

  return {
    kind,
    label: lang === 'zh' ? '数字产品案例' : 'Digital product case',
    headline:
      lang === 'zh'
        ? `${title} 把流程、界面和系统逻辑组织成一个可演示的产品体验。`
        : `${title} organizes flow, interface, and system logic into a demonstrable product experience.`,
    sections: [
      {
        title: lang === 'zh' ? '问题' : 'Problem',
        body:
          lang === 'zh'
            ? `项目从 ${type} 的使用情境出发，先定义用户为什么需要这个系统。`
            : `The project starts from the ${type} context and defines why the user needs the system.`,
      },
      {
        title: lang === 'zh' ? '核心流程' : 'Core Flow',
        body:
          lang === 'zh'
            ? '页面优先呈现入口、主任务、反馈和复盘，而不是堆叠静态界面。'
            : 'The page prioritizes entry, primary task, feedback, and review instead of stacking static screens.',
      },
      {
        title: lang === 'zh' ? '系统逻辑' : 'System Logic',
        body:
          lang === 'zh'
            ? `当前证据来源：${source}。`
            : `Current source: ${source}.`,
      },
      {
        title: lang === 'zh' ? '价值' : 'Value',
        body: evidence.length ? evidence.join(lang === 'zh' ? '、' : ', ') : t(project.summary, lang),
      },
    ],
  };
}

function App() {
  const appRef = useRef(null);
  const [lang, setLang] = useState('en');
  const [selectedId, setSelectedId] = useState(null);
  const selected = projects.find((project) => project.id === selectedId);
  const motion = useMotionProfile();
  const pinEnabled = !selected && !motion.reduced && !motion.mobile;

  useHomepageMotion(appRef, {
    enabled: !selected,
    reduced: motion.reduced,
    magneticEnabled: !motion.reduced && !motion.mobile && motion.finePointer,
  });
  useLenisScroll(!motion.reduced);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-zh', lang === 'zh');
  }, [lang]);

  useEffect(() => {
    let active = true;
    warmSupabaseConnection().then((status) => {
      if (!active) return;
      document.documentElement.dataset.supabase = status.ready ? 'connected' : status.reason;
    });
    return () => {
      active = false;
    };
  }, []);

  const openProject = (id) => {
    setSelectedId(id);
    window.setTimeout(() => {
      const lenis = window.__portfolioLenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(0, { immediate: true, force: true });
        return;
      }
      window.scrollTo({ top: 0, behavior: motion.reduced ? 'auto' : 'smooth' });
    }, 0);
  };

  return (
    <div className="app-shell" ref={appRef}>
      <Header lang={lang} setLang={setLang} />
      {selected ? (
        <ProjectDetail lang={lang} project={selected} onBack={() => setSelectedId(null)} onOpenProject={openProject} />
      ) : (
        <>
          <Hero lang={lang} />
          <AchievementCards lang={lang} />
          <ProductShowcase3D lang={lang} onOpenProject={openProject} />
          <DaimaWorksShowcase lang={lang} onOpenProject={openProject} motionEnabled={!motion.reduced} />
          <WorkSection lang={lang} onOpenProject={openProject} motionEnabled={!motion.reduced} />
          <About lang={lang} motionEnabled={!motion.reduced} />
          <AirFooter lang={lang} />
        </>
      )}
      <AgentOrb lang={lang} onOpenProject={openProject} />
      <EmailCopyButton />
    </div>
  );
}

function GooeyNav({ items, initialActiveIndex = 0 }) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (amount = 1) => amount / 2 - Math.random() * amount;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();
    const styles = {
      left: `${itemRect.x - containerRect.x}px`,
      top: `${itemRect.y - containerRect.y}px`,
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.textContent = element.textContent;
  };

  const makeParticles = (element) => {
    const particleCount = 10;
    const particleDistances = [54, 8];
    const particleRadius = 70;
    const animationTime = 520;

    element.querySelectorAll('.particle').forEach((particle) => particle.remove());
    element.classList.remove('active');
    void element.offsetWidth;
    element.classList.add('active');

    for (let index = 0; index < particleCount; index += 1) {
      const start = getXY(particleDistances[0], particleCount - index, particleCount);
      const end = getXY(particleDistances[1] + noise(5), particleCount - index, particleCount);
      const time = animationTime + noise(180);
      const rotate = noise(particleRadius / 10) * 10;

      window.setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.className = 'particle';
        point.className = 'point';
        particle.style.setProperty('--start-x', `${start[0]}px`);
        particle.style.setProperty('--start-y', `${start[1]}px`);
        particle.style.setProperty('--end-x', `${end[0]}px`);
        particle.style.setProperty('--end-y', `${end[1]}px`);
        particle.style.setProperty('--time', `${time}ms`);
        particle.style.setProperty('--scale', `${1 + noise(0.18)}`);
        particle.style.setProperty('--rotate', `${rotate}deg`);
        particle.appendChild(point);
        element.appendChild(particle);
        window.setTimeout(() => particle.remove(), time);
      }, 24);
    }
  };

  const activateItem = (element, index) => {
    if (!element) return;
    setActiveIndex(index);
    updateEffectPosition(element);
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) makeParticles(filterRef.current);
  };

  useEffect(() => {
    const activeItem = navRef.current?.querySelectorAll('li')[activeIndex];
    if (activeItem) {
      updateEffectPosition(activeItem);
      textRef.current?.classList.add('active');
    }

    if (!containerRef.current || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => {
      const currentActiveItem = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveItem) updateEffectPosition(currentActiveItem);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeIndex, items]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="Primary">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? 'active' : ''}>
              <a
                href={item.href}
                onClick={(event) => activateItem(event.currentTarget.parentElement, index)}
                onKeyDown={(event) => {
                  if (event.key === ' ') {
                    event.preventDefault();
                    activateItem(event.currentTarget.parentElement, index);
                    window.location.hash = item.href.replace('#', '');
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
}

function Header({ lang, setLang }) {
  const navItems = useMemo(() => [
    { label: copy[lang].work, href: '#work' },
    { label: copy[lang].about, href: '#about' },
  ], [lang]);

  return (
    <header className="site-header">
      <a className="brand-button" href="#top" aria-label="Portfolio home">
        <span className="brand-mark">YANG</span>
        <span>{copy[lang].brand}</span>
      </a>
      <nav className="header-actions">
        <GooeyNav key={lang} items={navItems} />
        <button className="language-toggle" data-magnetic type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}>
          <Languages size={15} />
          <span>{lang === 'en' ? '中文' : 'EN'}</span>
        </button>
      </nav>
    </header>
  );
}

function Hero({ lang }) {
  const heroTitle = copy[lang].heroTitle;
  return (
    <section id="top" className="hero-section air-hero">
      <div className="air-hero-sticky">
        <div className="air-letters" aria-hidden="true">
          <span className="air-letter air-letter-left air-letter-y">Y</span>
          <span className="air-letter air-letter-mid air-letter-a">A</span>
          <span className="air-letter air-letter-mid air-letter-n">N</span>
          <span className="air-letter air-letter-right air-letter-g">G</span>
        </div>
        <div className="air-structure-stage" aria-hidden="true">
          <div className="air-structure-slot">
            {Array.from({ length: 22 }).map((_, index) => (
              <span key={index} style={{ '--i': index }} />
            ))}
          </div>
          <video
            className="air-hero-video"
            src="/hero-yang-helix-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="air-hero-copy">
          <h1 className="air-hero-title" aria-label={heroTitle}>{heroTitle}</h1>
          <p className="air-hero-sub">{copy[lang].heroSub}</p>
        </div>
      </div>
    </section>
  );
}

function getAchievementValueParts(value) {
  const normalized = String(value);
  const match = normalized.match(/^([\d,.]+)(.*)$/);
  return {
    number: match ? Number(match[1].replace(/,/g, '')) : 0,
    suffix: match ? match[2] : '',
  };
}

function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const completedRef = useRef(false);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: false, margin: '0px 0px -10% 0px' });

  const getDecimalPlaces = (num) => {
    const str = num.toString();

    if (str.includes('.')) {
      const decimals = str.split('.')[1];

      if (parseInt(decimals, 10) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest) => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: Boolean(separator),
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!isInView || !startWhen) {
      completedRef.current = false;
      motionValue.set(direction === 'down' ? to : from);
      return undefined;
    }

    completedRef.current = false;
    if (typeof onStart === 'function') onStart();

    const timeoutId = window.setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);

    const durationTimeoutId = window.setTimeout(() => {
      completedRef.current = true;
      if (ref.current) {
        ref.current.textContent = formatValue(direction === 'down' ? from : to);
      }
      if (typeof onEnd === 'function') onEnd();
    }, delay * 1000 + duration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(durationTimeoutId);
    };
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = completedRef.current ? formatValue(direction === 'down' ? from : to) : formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue, direction, from, to]);

  return <span className={className} ref={ref} />;
}

function AchievementCards({ lang }) {
  return (
    <section className="achievement-section" aria-label={copy[lang].achievementLabel}>
      {achievementCards.map((card) => {
        const { number, suffix } = getAchievementValueParts(card.value);
        return (
          <article className="achievement-card" key={card.value}>
            <strong className="achievement-value" aria-label={card.value}>
              <CountUp from={0} to={number} separator="," direction="up" duration={1.3} className="count-up-text" delay={0} />
              {suffix ? <span className="achievement-suffix" aria-hidden="true">{suffix}</span> : null}
            </strong>
            <span className="achievement-label">{t(card.label, lang)}</span>
            <p>{t(card.note, lang)}</p>
          </article>
        );
      })}
    </section>
  );
}

function ProductShowcase3D({ lang, onOpenProject }) {
  const productProjects = useMemo(() => getProjectsByIds(productShowcaseIds).filter((project) => project.image), []);
  const count = productProjects.length;
  const initialPosition = count > 1 ? 1 : 0;
  const [orbitPosition, setOrbitPosition] = useState(initialPosition);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth));
  const positionRef = useRef(initialPosition);
  const targetRef = useRef(initialPosition);
  const frameRef = useRef(0);
  const dragRef = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    moved: false,
    velocity: 0,
    origin: initialPosition,
    itemWidth: 240,
    cleanup: null,
  });

  const wrapIndex = (value) => {
    if (!count) return 0;
    return ((value % count) + count) % count;
  };

  const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

  const dragUnit = () => Math.max(170, Math.min(340, window.innerWidth * 0.16));

  const cardWidthFor = (offset) => {
    const centerWidth = clamp(620, viewportWidth * 0.46, 940);
    const sideWidth = clamp(250, viewportWidth * 0.17, 330);
    const progress = Math.min(1, Math.abs(offset));
    return centerWidth - (centerWidth - sideWidth) * progress;
  };

  const cleanupDragListeners = () => {
    if (dragRef.current.cleanup) {
      dragRef.current.cleanup();
      dragRef.current.cleanup = null;
    }
  };

  useEffect(() => {
    positionRef.current = initialPosition;
    targetRef.current = initialPosition;
    setOrbitPosition(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tick = () => {
      const ease = dragRef.current.active ? 0.42 : 0.115;
      const delta = targetRef.current - positionRef.current;
      if (Math.abs(delta) > 0.0008) {
        positionRef.current += delta * ease;
        setOrbitPosition(positionRef.current);
      } else if (positionRef.current !== targetRef.current) {
        positionRef.current = targetRef.current;
        setOrbitPosition(positionRef.current);
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const updateDrag = (clientX) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const delta = clientX - drag.startX;
    const now = performance.now();
    const elapsed = Math.max(1, now - drag.lastTime);
    if (Math.abs(delta) > 6) drag.moved = true;
    drag.velocity = (clientX - drag.lastX) / elapsed;
    drag.lastX = clientX;
    drag.lastTime = now;
    targetRef.current = drag.origin - delta / drag.itemWidth;
  };

  const finishDrag = (clientX) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const delta = clientX - drag.startX;
    if (Math.abs(delta) > 6) drag.moved = true;
    const inertia = clamp(-4.2, (-drag.velocity * 360) / drag.itemWidth, 4.2);
    targetRef.current = Math.round(targetRef.current + (drag.moved ? inertia : 0));
    drag.active = false;
    cleanupDragListeners();
  };

  const startDrag = (event) => {
    if (!count) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    cleanupDragListeners();
    const now = performance.now();
    dragRef.current = {
      active: true,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: now,
      moved: false,
      velocity: 0,
      origin: positionRef.current,
      itemWidth: dragUnit(),
      cleanup: null,
    };
    targetRef.current = positionRef.current;

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault();
      updateDrag(moveEvent.clientX);
    };
    const handleUp = (upEvent) => finishDrag(upEvent.clientX);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });
    window.addEventListener('pointercancel', handleUp, { once: true });
    dragRef.current.cleanup = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  };

  useEffect(() => () => cleanupDragListeners(), []);

  return (
    <section
      id="product-showcase"
      className="product-orbit-section"
      aria-label={copy[lang].productShowcaseLabel}
    >
      <div
        className="product-orbit-stage"
        onPointerDown={startDrag}
      >
        {(count ? [-1, 0, 1] : []).map((slot) => {
          const centerVirtualIndex = Math.round(orbitPosition);
          const virtualIndex = centerVirtualIndex + slot;
          const project = productProjects[wrapIndex(virtualIndex)];
          const offset = virtualIndex - orbitPosition;
          const absOffset = Math.abs(offset);
          const isActive = absOffset < 0.5;
          const xPosition = offset * 43.4;
          const rotate = 0;
          const scale = 1;
          const depth = isActive ? 0 : -24;
          const sideClass = isActive ? '' : offset < 0 ? ' is-side-left' : ' is-side-right';
          const width = `${cardWidthFor(offset)}px`;
          return (
            <button
              type="button"
              className={`product-orbit-card${isActive ? ' is-active' : ''}${sideClass}${project.imageFit === 'contain' ? ' is-contain' : ''}`}
              key={project.id}
              style={{
                '--orbit-offset': offset,
                zIndex: Math.round(30 - absOffset * 10),
                width,
                transformOrigin: offset < 0 ? 'right center' : offset > 0 ? 'left center' : 'center center',
                opacity: absOffset > 1.28 ? 0.72 : 1,
                transform: `translate3d(calc(-50% + ${xPosition}vw), -50%, ${depth}px) rotateY(${rotate}deg) scale(${scale})`,
              }}
              onClick={() => {
                if (dragRef.current.moved) return;
                if (Math.abs(offset) < 0.35) {
                  onOpenProject(project.id);
                  return;
                }
                targetRef.current += offset;
              }}
            >
              <img src={project.image} alt="" draggable="false" loading="lazy" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DaimaWorksShowcase({ lang, onOpenProject, motionEnabled }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !motionEnabled) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.daima-work-panel').forEach((panel) => {
        const mediaLayer = panel.querySelector('.daima-work-panel__media-layer');
        const titleWindow = panel.querySelector('.daima-work-panel__title-window');
        const categoryWrap = panel.querySelector('.daima-work-panel__category-wrap');

        if (mediaLayer) {
          gsap.fromTo(
            mediaLayer,
            { y: -160 },
            {
              y: 160,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }

        if (titleWindow) {
          gsap.fromTo(
            titleWindow,
            { y: 320 },
            {
              y: -160,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }

        if (categoryWrap) {
          gsap.fromTo(
            categoryWrap,
            { y: 390 },
            {
              y: -150,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 20%',
        onEnter: () => document.body.classList.add('is-daima-active'),
        onEnterBack: () => document.body.classList.add('is-daima-active'),
        onLeave: () => document.body.classList.remove('is-daima-active'),
        onLeaveBack: () => document.body.classList.remove('is-daima-active'),
      });
    }, sectionRef);

    return () => {
      document.body.classList.remove('is-daima-active');
      ctx.revert();
    };
  }, [motionEnabled]);

  return (
    <section className="daima-works-showcase" ref={sectionRef} aria-label={lang === 'zh' ? '精选数字作品' : 'Selected digital works'}>
      {daimaWorkPanels.map((panel, index) => {
        const title = t(panel.title, lang);
        const category = t(panel.category, lang);

        return (
          <button
            className="daima-work-panel"
            type="button"
            key={panel.id}
            onClick={() => onOpenProject(panel.projectId)}
            aria-label={lang === 'zh' ? `打开 ${title}` : `Open ${title}`}
          >
            <span className="daima-work-panel__sticky">
              <span className="daima-work-panel__frame">
                <span className="daima-work-panel__media-crop" aria-hidden="true">
                  <span className="daima-work-panel__media-layer">
                    <img className="daima-work-panel__image" src={panel.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                  </span>
                </span>
                <span className="daima-work-panel__content">
                  <span className="daima-work-panel__title-window">
                    <span className="daima-work-panel__title-track">
                      <span className="daima-work-panel__title-line">{title}</span>
                      <span className="daima-work-panel__title-line" aria-hidden="true">
                        {title}
                      </span>
                    </span>
                  </span>
                  <span className="daima-work-panel__category-wrap">
                    <span className="daima-work-panel__category">{category}</span>
                  </span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </section>
  );
}

function DigitalCaseScroller({ lang, onOpenProject, motionEnabled }) {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const cases = useMemo(() => getProjectsByIds(digitalCaseIds).filter((project) => project.image), []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !motionEnabled || !cases.length) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top+=68',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const nextIndex = Math.min(cases.length - 1, Math.floor(self.progress * cases.length));
        if (nextIndex === activeRef.current) return;
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      },
    });

    return () => trigger.kill();
  }, [cases.length, motionEnabled]);

  if (!cases.length) return null;

  return (
    <section className={`digital-scroll-section${motionEnabled ? '' : ' is-static'}`} ref={sectionRef} style={{ '--case-count': cases.length }}>
      <div className="air-section-kicker">{copy[lang].digitalCaseLabel}</div>
      <div className="digital-scroll-layout">
        <div className="digital-scroll-media">
          {cases.map((project, index) => (
            <figure className={index === activeIndex ? 'is-active' : ''} key={project.id}>
              <img src={project.image} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
        <div
          className={`digital-scroll-copy ${lang === 'en' ? 'is-en' : 'is-zh'}`}
          style={{ '--case-progress': `${((activeIndex + 1) / cases.length) * 100}%` }}
        >
          <div className="digital-scroll-progress" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="digital-scroll-index">
            <span className="digital-scroll-number">{activeIndex + 1}</span>
            <span className="digital-scroll-total">/ {cases.length}</span>
          </div>
          <h2>{t(cases[activeIndex].title, lang)}</h2>
          <p>{getProjectShort(cases[activeIndex], lang)}</p>
          <button data-magnetic type="button" onClick={() => onOpenProject(cases[activeIndex].id)}>
            {lang === 'zh' ? '查看项目' : 'View case'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function WorkSection({ lang, onOpenProject, motionEnabled }) {
  const showcaseProjects = useMemo(() => projects.filter((project) => project.image), []);
  const rows = useMemo(() => {
    const buckets = [[], [], []];
    showcaseProjects.forEach((project, index) => {
      buckets[index % 3].push(project);
    });
    return buckets.map((bucket, index) => {
      if (index === 1 && bucket.length > 2) {
        return [...bucket.slice(2), ...bucket.slice(0, 2)];
      }
      if (index === 2 && bucket.length > 1) {
        return [...bucket.slice(1), bucket[0]];
      }
      return bucket;
    });
  }, [showcaseProjects]);

  return (
    <main id="work" className="showcase-section air-wall-section" aria-label={lang === 'zh' ? '作品展示' : 'Work showcase'}>
      <div className="showcase-stack">
        {rows.map((rowProjects, index) => (
          <ShowcaseRow
            key={`showcase-row-${index}`}
            rowProjects={rowProjects}
            rowIndex={index}
            lang={lang}
            motionEnabled={motionEnabled}
            direction={index === 1 ? 'right' : 'left'}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </main>
  );
}

function ShowcaseRow({ rowProjects, rowIndex, lang, direction, onOpenProject, motionEnabled }) {
  const rowRef = useRef(null);
  const timelineRef = useRef(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    clickBlocked: false,
    pointerId: null,
    startX: 0,
    lastX: 0,
    x: 0,
    distance: 0,
    resetTimer: null,
  });

  const wrapTrackX = (value, distance) => {
    if (!distance) return 0;
    let next = value;
    while (next < -distance) next += distance;
    while (next > 0) next -= distance;
    return next;
  };

  const progressFromX = (x, distance) => {
    if (!distance) return 0;
    const normalized = direction === 'left' ? -x / distance : (x + distance) / distance;
    return Math.max(0, Math.min(1, normalized));
  };

  useLayoutEffect(() => {
    const track = rowRef.current;
    const row = track?.parentElement;
    if (!row || !track) return undefined;

    const setup = () => {
      timelineRef.current?.kill();
      if (!motionEnabled) {
        gsap.set(track, { x: 0 });
        return;
      }
      const distance = track.scrollWidth / 2;
      dragRef.current.distance = distance;
      gsap.set(track, { x: direction === 'left' ? 0 : -distance });
      timelineRef.current = gsap.to(track, {
        x: direction === 'left' ? -distance : 0,
        duration: Math.max(38, rowProjects.length * 7),
        ease: 'none',
        repeat: -1,
      });
    };

    setup();
    window.addEventListener('resize', setup);

    return () => {
      window.removeEventListener('resize', setup);
      if (dragRef.current.resetTimer) window.clearTimeout(dragRef.current.resetTimer);
      timelineRef.current?.kill();
    };
  }, [direction, motionEnabled, rowProjects.length]);

  const startDrag = (event) => {
    if (!motionEnabled || event.pointerType === 'touch') return;
    const track = rowRef.current;
    if (!track) return;
    const distance = dragRef.current.distance || track.scrollWidth / 2;
    if (!distance) return;
    if (dragRef.current.resetTimer) window.clearTimeout(dragRef.current.resetTimer);
    timelineRef.current?.pause();
    dragRef.current = {
      ...dragRef.current,
      active: true,
      moved: false,
      clickBlocked: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      x: Number(gsap.getProperty(track, 'x')) || 0,
      distance,
    };
    track.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const track = rowRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.lastX;
    const total = event.clientX - drag.startX;
    if (Math.abs(total) > 4) {
      drag.moved = true;
      track.classList.add('is-dragging');
      event.preventDefault();
    }
    drag.x = wrapTrackX(drag.x + delta, drag.distance);
    drag.lastX = event.clientX;
    const progress = progressFromX(drag.x, drag.distance);
    timelineRef.current?.progress(progress).pause();
    gsap.set(track, { x: drag.x });
  };

  const endDrag = (event) => {
    const track = rowRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active || drag.pointerId !== event.pointerId) return;
    if (track.hasPointerCapture?.(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove('is-dragging');
    drag.active = false;
    drag.clickBlocked = drag.moved;
    timelineRef.current?.resume();
    if (drag.clickBlocked) {
      drag.resetTimer = window.setTimeout(() => {
        dragRef.current.clickBlocked = false;
        dragRef.current.moved = false;
      }, 120);
    }
  };

  return (
    <section className={`showcase-row showcase-row-${rowIndex + 1}`}>
      <div
        className="showcase-track"
        ref={rowRef}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {[0, 1].map((cloneIndex) => (
          <div className="showcase-group" key={`clone-${rowIndex}-${cloneIndex}`} aria-hidden={cloneIndex === 1 ? 'true' : undefined}>
            {rowProjects.map((project) => (
              <button
                key={`${project.id}-${cloneIndex}`}
                type="button"
                className={`showcase-card${project.imageFit === 'contain' ? ' showcase-card-contain' : ''}`}
                onClick={() => {
                  if (!dragRef.current.clickBlocked) onOpenProject(project.id);
                }}
                aria-label={t(project.title, lang)}
                tabIndex={cloneIndex === 1 ? -1 : 0}
              >
                <span className="showcase-card-inner">
                  <span className="showcase-card-face showcase-card-front">
                    <img src={project.image} alt="" draggable="false" loading="lazy" />
                  </span>
                  <span className="showcase-card-face showcase-card-back">
                    <strong>{t(project.title, lang)}</strong>
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function AirFooter({ lang }) {
  return (
    <footer className="air-footer">
      <div className="air-footer-letters" aria-hidden="true">
        <span>Y</span>
        <span>A</span>
        <span>N</span>
        <span>G</span>
      </div>
      <small>{copy[lang].footerNote}</small>
      <small>© 2026</small>
    </footer>
  );
}

function WorkCategory({ lang, category, projects: categoryProjects, onOpenProject }) {
  const rowRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    moved: false,
    velocity: 0,
  });
  const momentumRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const loopedProjects = useMemo(() => [...categoryProjects, ...categoryProjects, ...categoryProjects], [categoryProjects]);

  const cancelMomentum = () => {
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    momentumRef.current = null;
  };

  const getRailMetrics = (row = rowRef.current) => {
    const card = row?.querySelector('.project-card');
    if (!row || !card || !categoryProjects.length) return null;
    const styles = window.getComputedStyle(row);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const step = card.getBoundingClientRect().width + gap;
    return { step, sequenceWidth: step * categoryProjects.length };
  };

  const loopScroll = (row = rowRef.current) => {
    if (!row || categoryProjects.length < 2) return;
    const metrics = getRailMetrics(row);
    if (!metrics?.sequenceWidth) return;
    while (row.scrollLeft < metrics.sequenceWidth * 0.4) row.scrollLeft += metrics.sequenceWidth;
    while (row.scrollLeft > metrics.sequenceWidth * 1.6) row.scrollLeft -= metrics.sequenceWidth;
  };

  const syncActive = (row = rowRef.current) => {
    if (!row || !categoryProjects.length) return;
    const metrics = getRailMetrics(row);
    if (!metrics?.sequenceWidth) return;
    const normalized =
      ((row.scrollLeft - metrics.sequenceWidth) % metrics.sequenceWidth + metrics.sequenceWidth) %
      metrics.sequenceWidth;
    setActiveIndex(Math.round(normalized / metrics.step) % categoryProjects.length);
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row || categoryProjects.length < 2) return undefined;
    const frame = requestAnimationFrame(() => {
      const metrics = getRailMetrics(row);
      row.scrollTo({ left: metrics?.sequenceWidth || row.scrollWidth / 3, behavior: 'auto' });
      syncActive();
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelMomentum();
    };
  }, [categoryProjects.length]);

  const scrollByCard = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    const metrics = getRailMetrics(row);
    if (!metrics) return;
    cancelMomentum();
    row.scrollBy({ left: direction * metrics.step, behavior: 'smooth' });
    window.setTimeout(() => {
      loopScroll(row);
      syncActive(row);
    }, 280);
  };

  const glide = (initialVelocity) => {
    const row = rowRef.current;
    if (!row) return;
    let velocity = Math.max(-2.4, Math.min(2.4, initialVelocity));
    let lastTime = performance.now();
    const tick = (time) => {
      const deltaTime = Math.min(32, time - lastTime);
      lastTime = time;
      row.scrollLeft += velocity * deltaTime;
      loopScroll(row);
      syncActive(row);
      velocity *= Math.pow(0.93, deltaTime / 16);
      if (Math.abs(velocity) > 0.025) {
        momentumRef.current = requestAnimationFrame(tick);
      } else {
        momentumRef.current = null;
      }
    };
    momentumRef.current = requestAnimationFrame(tick);
  };

  const startDrag = (event) => {
    const row = rowRef.current;
    if (!row) return;
    cancelMomentum();
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: performance.now(),
      moved: false,
      velocity: 0,
    };
  };

  const moveDrag = (event) => {
    const row = rowRef.current;
    if (!row || !dragRef.current.active) return;
    const now = performance.now();
    const deltaFromStart = event.clientX - dragRef.current.startX;
    const deltaFromLast = event.clientX - dragRef.current.lastX;
    if (Math.abs(deltaFromStart) > 5) {
      if (!dragRef.current.moved) row.setPointerCapture?.(event.pointerId);
      dragRef.current.moved = true;
      row.classList.add('is-dragging');
      event.preventDefault();
      row.scrollLeft -= deltaFromLast;
      loopScroll(row);
      syncActive(row);
    }
    const deltaTime = Math.max(8, now - dragRef.current.lastTime);
    dragRef.current.velocity = -deltaFromLast / deltaTime;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastTime = now;
  };

  const endDrag = (event) => {
    const row = rowRef.current;
    if (row?.hasPointerCapture?.(event.pointerId)) row.releasePointerCapture(event.pointerId);
    if (row) row.classList.remove('is-dragging');
    const velocity = dragRef.current.velocity;
    const moved = dragRef.current.moved;
    dragRef.current.active = false;
    if (moved && Math.abs(velocity) > 0.05) glide(velocity);
    window.setTimeout(() => {
      dragRef.current.moved = false;
      loopScroll(row);
      syncActive(row);
    }, 80);
  };

  return (
    <section className={`work-category work-category-${category.id}`} aria-label={t(category.title, lang)}>
      <div className="work-category-head">
        <div>
          <h3>{t(category.title, lang)}</h3>
          <p>{t(category.summary, lang)}</p>
        </div>
        <div className="rail-controls">
          <button data-magnetic type="button" onClick={() => scrollByCard(-1)} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <span>
            {String(activeIndex + 1).padStart(2, '0')} / {String(categoryProjects.length).padStart(2, '0')}
          </span>
          <button data-magnetic type="button" onClick={() => scrollByCard(1)} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        className="project-row"
        ref={rowRef}
        onScroll={() => {
          loopScroll();
          syncActive();
        }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {loopedProjects.map((project, index) => (
          <button
            type="button"
            className="project-card"
            key={`${project.id}-${index}`}
            onClick={() => {
              if (!dragRef.current.moved) onOpenProject(project.id);
            }}
          >
            <span className="project-year">{project.year}</span>
            <div className={`project-media${project.image ? '' : ' project-media-pending'}${project.imageFit === 'contain' ? ' project-media-contain' : ''}`}>
              {project.image ? (
                <img src={project.image} alt="" draggable="false" loading="lazy" />
              ) : (
                <span>{lang === 'zh' ? '资料待补' : 'Source pending'}</span>
              )}
            </div>
            <div className="project-card-copy">
              <span>{t(project.type, lang)}</span>
              <h4>{t(project.title, lang)}</h4>
              <p>{getProjectShort(project, lang)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function PinnedCapabilitySection({ lang, motionEnabled }) {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return undefined;
    if (!motionEnabled) {
      activeRef.current = 0;
      setActiveIndex(0);
      return undefined;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.pin-story-panel');
      if (!panels.length) return;

      gsap.set(panels, { autoAlpha: 0, y: 26 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const showPanel = (nextIndex) => {
        panels.forEach((panel, index) => {
          gsap.to(panel, {
            autoAlpha: index === nextIndex ? 1 : 0,
            y: index === nextIndex ? 0 : 26,
            duration: index === nextIndex ? 0.48 : 0.28,
            ease: index === nextIndex ? 'power2.out' : 'power2.inOut',
            overwrite: true,
          });
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top+=72',
        end: '+=220%',
        pin: true,
        scrub: 0.42,
        anticipatePin: 1,
        onUpdate: (self) => {
          const rawIndex = Math.floor(self.progress * pinnedStories.length);
          const nextIndex = Math.min(pinnedStories.length - 1, rawIndex);
          if (nextIndex === activeRef.current) return;
          activeRef.current = nextIndex;
          setActiveIndex(nextIndex);
          showPanel(nextIndex);
        },
      });

      gsap.to('.pin-story-sheen', {
        xPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [lang, motionEnabled]);

  return (
    <section className={`pin-story-section${motionEnabled ? ' is-motion-enabled' : ' is-static'}`} ref={sectionRef}>
      <div className="pin-story-shell">
        <div className="pin-story-copy">
          <span>{lang === 'zh' ? '能力展开' : 'Capability Narrative'}</span>
          <h2>{lang === 'zh' ? '先看能力如何从作品里长出来。' : 'See how capability grows out of the work.'}</h2>
          <p>
            {lang === 'zh'
              ? '这一层固定一屏，把首页里的项目重新卷成几条清晰能力线，再进入后面的总览。'
              : 'This layer stays pinned for one screen, regrouping the portfolio into a few clear capability lines before the summary below.'}
          </p>
        </div>

        {motionEnabled ? (
          <div className="pin-story-stage">
            <div className="pin-story-progress" aria-hidden="true">
              {pinnedStories.map((story, index) => (
                <div className={`pin-story-step${index === activeIndex ? ' is-active' : ''}`} key={story.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{t(story.label, lang)}</strong>
                </div>
              ))}
            </div>
            <div className="pin-story-viewport">
              <div className="pin-story-sheen" aria-hidden="true" />
              {pinnedStories.map((story, index) => (
                <article className={`pin-story-panel${index === activeIndex ? ' is-active' : ''}`} key={story.id}>
                  <figure className="pin-story-media">
                    <img src={story.image} alt="" loading="lazy" />
                  </figure>
                  <div className="pin-story-meta">
                    <span>{t(story.label, lang)}</span>
                    <h3>{t(story.title, lang)}</h3>
                    <p>{t(story.body, lang)}</p>
                    <div className="pin-story-evidence">
                      {story.projects.map((projectId) => {
                        const project = projects.find((item) => item.id === projectId);
                        return project ? <b key={projectId}>{t(project.title, lang)}</b> : null;
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="pin-story-static-grid">
            {pinnedStories.map((story) => (
              <article className="pin-story-static-card" key={story.id}>
                <figure className="pin-story-media">
                  <img src={story.image} alt="" loading="lazy" />
                </figure>
                <div className="pin-story-meta">
                  <span>{t(story.label, lang)}</span>
                  <h3>{t(story.title, lang)}</h3>
                  <p>{t(story.body, lang)}</p>
                  <div className="pin-story-evidence">
                    {story.projects.map((projectId) => {
                      const project = projects.find((item) => item.id === projectId);
                      return project ? <b key={projectId}>{t(project.title, lang)}</b> : null;
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectDetail({ lang, project, onBack, onOpenProject }) {
  const mediaGridRef = useRef(null);
  const siblings = projects.filter((item) => item.category === project.category && item.id !== project.id).slice(0, 4);
  const rawDetailMedia = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const referenceHeroMedia = {
    miro: '/portfolio/miro-detail-reference-dashboard.png',
    palifood: '/portfolio/palifood-detail-reference-stage.png',
  };
  const heroMedia = referenceHeroMedia[project.id];
  const detailMedia =
    heroMedia
      ? [heroMedia, ...rawDetailMedia.filter((src) => src !== heroMedia)]
      : rawDetailMedia;
  const caseStudy = getCaseStudy(project, lang);
  const heroCopy = getDetailHeroCopy(project, lang, caseStudy);
  const launchNote = project.launchNote ? t(project.launchNote, lang) : '';
  const liveUrl = project.liveUrl || project.externalUrl || project.websiteUrl || '';

  useEffect(() => {
    const root = mediaGridRef.current;
    const firstFigure = root?.querySelector('figure:first-child');
    const firstImage = firstFigure?.querySelector('img');
    if (!firstFigure || !firstImage || !root.matches('.detail-media-digital, .detail-media-research')) {
      return undefined;
    }

    let frame = 0;

    const updateTilt = () => {
      frame = 0;
      const rect = firstFigure.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const startTop = viewportHeight * 0.38;
      const endTop = viewportHeight * 0.09;
      const range = startTop - endTop || 1;
      const progress = Math.min(1, Math.max(0, (startTop - rect.top) / range));
      const baseTilt = window.matchMedia('(max-width: 700px)').matches ? 6 : 8;
      const tilt = baseTilt * (1 - progress);
      firstImage.style.setProperty('--detail-tilt-x', `${tilt.toFixed(3)}deg`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTilt);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      firstImage.style.removeProperty('--detail-tilt-x');
    };
  }, [project.id, caseStudy.kind, detailMedia.length]);

  return (
    <main className="detail-page">
      <button className="back-button" type="button" onClick={onBack}>
        <ChevronLeft size={18} />
        {copy[lang].back}
      </button>
      <section className="detail-hero">
        <div className="detail-title">
          <span>{heroCopy.kicker}</span>
          <h1>{heroCopy.title}</h1>
          <p>{heroCopy.summary}</p>
        </div>
        <div className="detail-meta">
          <dl>
            <div>
              <dt>{copy[lang].year}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>{copy[lang].role}</dt>
              <dd>{t(project.role, lang)}</dd>
            </div>
            <div>
              <dt>{heroCopy.statusLabel}</dt>
              <dd>
                {project.blocked ? <strong>{copy[lang].blocked}</strong> : null}
                {project.blocked ? <br /> : null}
                {t(project.source, lang)}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section ref={mediaGridRef} className={`detail-media-grid detail-media-${caseStudy.kind} detail-media-project-${project.id}`}>
        {detailMedia.length ? (
          detailMedia.map((src, index) => (
            <figure key={`${src}-${index}`}>
              <img src={src} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              {index === 0 ? (
                <figcaption>{lang === 'zh' ? '网站原型' : 'Website prototype'}</figcaption>
              ) : null}
            </figure>
          ))
        ) : (
          <figure className="detail-media-pending">
            <span>{lang === 'zh' ? '干净原图待补' : 'Clean source image pending'}</span>
          </figure>
        )}
      </section>
      {launchNote ? (
        <section className="project-launch-bridge">
          <div className="project-launch-bridge__copy">
            <span className="project-launch-bridge__eyebrow">
              {lang === 'zh' ? '设计理念' : 'Design concept'}
            </span>
            <p>{launchNote}</p>
          </div>
          {liveUrl ? (
            <a className="project-launch-bridge__link" href={liveUrl} target="_blank" rel="noreferrer">
              <span>{lang === 'zh' ? '立即进入网站' : 'Enter live site'}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <span className="project-launch-bridge__link project-launch-bridge__link--pending" aria-disabled="true">
              <span>{lang === 'zh' ? '立即进入网站' : 'Enter live site'}</span>
              <small>{lang === 'zh' ? '链接待补' : 'Link pending'}</small>
              <span aria-hidden="true">↓</span>
            </span>
          )}
        </section>
      ) : null}
      <section className={`case-study-section case-study-${caseStudy.kind}`}>
        <div className="case-study-head">
          <span>{caseStudy.label}</span>
          <h2>{lang === 'zh' ? '从项目调性出发' : 'Shaped around the project'}</h2>
          <p>{caseStudy.headline}</p>
        </div>
        <div className="case-study-grid">
          {caseStudy.sections.map((section, index) => (
            <article className="case-study-card" key={`${section.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="evidence-section">
        <h2>{copy[lang].evidence}</h2>
        <div className="evidence-grid">
          {project.evidence[lang].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      {siblings.length > 0 ? (
        <section className="related-section">
          <h2>{lang === 'zh' ? '同方向作品' : 'More in this direction'}</h2>
          <div className="related-grid">
            {siblings.map((item) => (
              <button type="button" key={item.id} onClick={() => onOpenProject(item.id)}>
                {item.image ? (
                  <img src={item.image} alt="" loading="lazy" />
                ) : (
                  <span className="related-placeholder">{lang === 'zh' ? '资料待补' : 'Source pending'}</span>
                )}
                <span>{t(item.title, lang)}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function getDetailHeroCopy(project, lang, caseStudy) {
  if (project.id === 'miro') {
    return {
      kicker: lang === 'zh' ? '产品 / 网页 / 系统' : 'PRODUCT / WEB / SYSTEM',
      title: lang === 'zh' ? 'Miro 演练系统' : 'Miro Rehearsal System',
      summary:
        lang === 'zh'
          ? '一个跨文化演练系统，帮助个人与团队准备、模拟、复盘，并与 AI 一起成长。'
          : 'A cross-cultural rehearsal system that helps individuals and teams prepare, simulate, review, and grow with AI.',
      statusLabel: copy[lang].source,
    };
  }

  return {
    kicker: t(project.type, lang),
    title: t(project.title, lang),
    summary: caseStudy.headline,
    statusLabel: copy[lang].source,
  };
}

function processCopy(project, lang, index) {
  const title = t(project.title, lang);
  const type = t(project.type, lang);
  const role = t(project.role, lang);
  const evidence = project.evidence[lang][index % project.evidence[lang].length];
  const zh = [
    `${title} 的起点不是单张效果图，而是一个明确场景：${t(project.summary, 'zh')}`,
    `项目先把目标用户、使用场景和限制条件拆开，再决定它应该属于 ${type}。`,
    `结构阶段关注信息、动作或硬件构成，保证后面的界面、模型或系统不是孤立视觉。`,
    `执行阶段由 ${role} 支撑，把研究判断落实到可浏览、可演示或可生产的证据。`,
    `视觉和效果图只保留图像主体，PPT/PDF 里的说明文字会在网页中重新排版。`,
    `最终价值落在可验证证据上：${evidence}。`,
  ];
  const en = [
    `${title} starts from a defined scenario rather than a single rendered image: ${t(project.summary, 'en')}`,
    `The project first separates audience, context, and constraints before placing it under ${type}.`,
    `The structure stage focuses on information, action, or hardware composition so the interface, model, or system has a reason to exist.`,
    `Execution is supported by ${role}, turning research judgment into browsable, demonstrable, or production-facing evidence.`,
    `Visuals keep the image content clean; slide captions from PPT/PDF sources are rebuilt as native website copy.`,
    `The result is evaluated through evidence: ${evidence}.`,
  ];
  return (lang === 'zh' ? zh : en)[index];
}

function About({ lang, motionEnabled }) {
  const sectionRef = useRef(null);
  const activeExpansionCountryLabelRef = useRef(null);
  const activeExpansionCountryRef = useRef('Norway');

  useLayoutEffect(() => {
    if (!sectionRef.current || !motionEnabled) return undefined;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = section.querySelector('.expansion-title-stack');
      const meta = section.querySelector('.expansion-active-meta');
      const description = section.querySelector('.expansion-description');
      const countryLabel = activeExpansionCountryLabelRef.current;
      const cards = expansionCards
        .map((card) => ({
          data: card,
          node: section.querySelector(`[data-expansion-card="${card.id}"]`),
        }))
        .filter((item) => item.node);

      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const clamp01 = (value) => clamp(value, 0, 1);
      const easeOutCubic = (value) => 1 - (1 - value) ** 3;
      const wrapDelta = (value, total) => {
        if (!total) return 0;
        const half = total / 2;
        return ((((value + half) % total) + total) % total) - half;
      };

      const updateActiveCountry = (country) => {
        if (activeExpansionCountryRef.current !== country) {
          activeExpansionCountryRef.current = country;
          if (countryLabel) {
            countryLabel.textContent = country;
          }
        }
      };

      const renderExpansion = (progress = 0) => {
        const width = section.offsetWidth;
        const height = section.offsetHeight;
        const mobile = window.matchMedia('(max-width: 820px)').matches;
        const visibleCards = cards.filter(({ data }) => !(mobile && data.mobileExtra));
        const hiddenCards = cards.filter(({ data }) => mobile && data.mobileExtra);
        const totalCards = Math.max(visibleCards.length, 1);
        const introStart = mobile ? 0.22 : 0.16;
        const introSpan = mobile ? 0.22 : 0.28;
        const intro = easeOutCubic(clamp01((progress - introStart) / introSpan));
        const orbitStart = mobile ? 0.36 : 0.36;
        const orbitSpan = mobile ? 0.58 : 0.56;
        const orbitProgress = clamp01((progress - orbitStart) / orbitSpan);
        const titleProgress = clamp01(progress / 0.42);
        const orbitPhase = 2 + orbitProgress * totalCards * (mobile ? 0.72 : 0.96);
        const step = mobile ? 28 : 20.25;
        const maxVisibleDelta = mobile ? 2.05 : 3.08;
        const edgeWindow = mobile ? 0.5 : 0.42;
        const centerX = width * 0.5;
        const orbitOriginY = height * (mobile ? 1.14 : 1.22);
        const orbitRadius = mobile ? height * 0.76 : Math.min(width * 0.545, height * 0.82);
        const introDrop = (1 - intro) * height * (mobile ? 0.3 : 0.36);
        const safeTopRatio = mobile
          ? clamp(0.56 - titleProgress * 0.22, 0.3, 0.56)
          : clamp(0.66 - titleProgress * 0.48, 0.16, 0.58);
        const safeTop = height * safeTopRatio;
        let activeCard = visibleCards[0];
        let activeDistance = Number.POSITIVE_INFINITY;
        let activeGeometry = null;
        const targetVisibleCount = Math.min(mobile ? 5 : 7, totalCards);
        const activeCardIndexes = new Set(
          visibleCards
            .map((_, index) => ({
              index,
              delta: wrapDelta(index - orbitPhase, totalCards),
            }))
            .sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta))
            .slice(0, targetVisibleCount)
            .map((item) => item.index),
        );

        hiddenCards.forEach(({ node }) => {
          gsap.set(node, { autoAlpha: 0, pointerEvents: 'none' });
        });

        visibleCards.forEach(({ data, node }, index) => {
          const delta = wrapDelta(index - orbitPhase, totalCards);
          const absDelta = Math.abs(delta);
          if (!activeCardIndexes.has(index)) {
            gsap.set(node, {
              autoAlpha: 0,
              pointerEvents: 'none',
              filter: 'blur(0px)',
              '--edge-wash-opacity': 0,
              '--bottom-wash-opacity': 0,
            });
            node.dataset.orbitDelta = delta.toFixed(3);
            node.dataset.orbitRotate = '0';
            return;
          }

          const angle = delta * step;
          const radians = (angle * Math.PI) / 180;
          const rawX = centerX + Math.sin(radians) * orbitRadius;
          const rawY = orbitOriginY - Math.cos(radians) * orbitRadius + introDrop;
          const topFocus = clamp01(1 - absDelta / (maxVisibleDelta + 0.18));
          const baseScale = mobile ? 0.76 + topFocus * 0.15 : 0.74 + topFocus * 0.18;
          const cardHalf = (node.offsetWidth * baseScale) / 2;
          const x = rawX;
          const y = rawY;
          const cardTop = rawY - cardHalf;
          const titleGuardFade = mobile ? clamp01((safeTop - cardTop) / (height * 0.14)) : 0;
          const bottomFade = clamp01((y - height * 0.7) / (height * 0.24));
          const edgeFade = clamp01((absDelta - (mobile ? 1.52 : 2.54)) / edgeWindow);
          const scale = baseScale * (1 - bottomFade * 0.05 - edgeFade * 0.015);
          const rotate = (Math.atan2(x - centerX, orbitOriginY - y) * 180) / Math.PI;
          const opacityFloor = mobile ? 0.46 : 1;
          const opacity = intro * clamp(1 - titleGuardFade * 0.78, opacityFloor, 1);
          const blur = 0;
          const edgeWash = clamp01(edgeFade * 0.88);
          const bottomWash = clamp01(bottomFade * 0.95);

          const activeScore = Math.abs(delta);
          if (activeScore < activeDistance) {
            activeDistance = activeScore;
            activeCard = { data, node };
            activeGeometry = { x, y, scale, size: node.offsetWidth };
          }

          gsap.set(node, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            rotate,
            scale,
            autoAlpha: opacity,
            zIndex: Math.round(100 + topFocus * 80 - bottomFade * 30),
            filter: `blur(${blur.toFixed(2)}px)`,
            transformOrigin: '50% 50%',
            '--edge-wash-angle': `${delta < 0 ? 90 : 270}deg`,
            '--edge-wash-opacity': edgeWash.toFixed(3),
            '--bottom-wash-opacity': bottomWash.toFixed(3),
          });
          node.dataset.orbitDelta = delta.toFixed(3);
          node.dataset.orbitRotate = rotate.toFixed(3);
        });

        const titleLift = -height * (mobile ? 0.54 : 0.48) * titleProgress;
        const titleOpacity = clamp(1 - clamp01((progress - 0.24) / 0.36) * 0.5, 0.46, 1);
        const textReveal = easeOutCubic(clamp01((progress - 0.32) / 0.22));
        const textExit = clamp01((progress - 0.88) / 0.1);
        const textOpacity = textReveal * (1 - textExit * 0.28);

        if (title) {
          gsap.set(title, {
            y: titleLift,
            scale: 1 - titleProgress * 0.03,
            autoAlpha: titleOpacity,
            '--title-mask-start': `${clamp(6 + titleProgress * 22, 6, 28)}%`,
            '--title-mask-end': `${clamp(88 - titleProgress * 18, 64, 88)}%`,
          });
        }

        if (description) {
          gsap.set(description, {
            y: (1 - textReveal) * 34 - textExit * 12,
            autoAlpha: textOpacity,
          });
        }

        if (meta && activeGeometry) {
          const activeSize = activeGeometry.size * activeGeometry.scale;
          const activeFocus = clamp01(1 - activeDistance / 0.55);
          gsap.set(meta, {
            x: activeGeometry.x,
            y: activeGeometry.y + activeSize * 0.62 + (mobile ? 18 : 24) + (1 - activeFocus) * 10,
            xPercent: -50,
            autoAlpha: textOpacity * (0.42 + activeFocus * 0.58),
          });
        }

        updateActiveCountry(activeCard?.data.country ?? 'Norway');
      };

      renderExpansion(0);

      const progressState = { value: 0 };
      gsap.to(progressState, {
        value: 1,
        ease: 'none',
        onUpdate: () => renderExpansion(progressState.value),
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => (window.matchMedia('(max-width: 820px)').matches ? '+=1650' : '+=2400'),
          scrub: 0.48,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            progressState.value = self.progress;
            renderExpansion(progressState.value);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <section id="about" className={`about-section expansion-section${motionEnabled ? '' : ' is-static'}`} ref={sectionRef}>
      <div className="expansion-orbit" aria-hidden="true" />
      <div className="expansion-title-stack">
        <span>{lang === 'zh' ? '产品形态' : 'Product Form'}</span>
        <h2>
          <span>{lang === 'zh' ? '产品形态来自' : 'Product form grows from'}</span>
          <span>
            <strong>{lang === 'zh' ? '使用与感受' : 'Use and Feeling'}</strong>
            {lang === 'zh' ? ' 并走向' : ' into'}
          </span>
          <span>{lang === 'zh' ? '清晰' : 'clarity'}</span>
        </h2>
      </div>
      <div className="expansion-cards" aria-hidden="true">
        {expansionCards.map((card) => (
          <figure
            className={`expansion-card${card.mobileExtra ? ' is-mobile-extra' : ''}`}
            data-expansion-card={card.id}
            key={card.id}
          >
            <img
              src={card.image}
              alt=""
              draggable="false"
              loading="eager"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.opacity = '0';
              }}
            />
          </figure>
        ))}
      </div>
      <div className="expansion-active-meta">
        <span className="expansion-red-dot" aria-hidden="true" />
        <strong className="expansion-country-label" ref={activeExpansionCountryLabelRef}>
          Norway
        </strong>
      </div>
      <p className="expansion-description">
        {lang === 'zh'
          ? '这些作品关注人们看见、触摸、理解和记住的部分，并通过形态语言、表面处理、人机与产品识别去塑造它们。'
          : 'The work is about shaping what people see, touch, understand, and remember through form language, surface treatment, ergonomics, and product identity.'}
      </p>
    </section>
  );
}

function buildAgentCandidateV2(project, score) {
  const evidenceZh = t(project.evidence, 'zh');
  const evidenceEn = t(project.evidence, 'en');

  return {
    projectId: project.id,
    route: `/?project=${project.id}`,
    category: project.category || null,
    score,
    aliases: agentProjectAliases[project.id] || [],
    title: {
      zh: t(project.title, 'zh'),
      en: t(project.title, 'en'),
    },
    type: {
      zh: t(project.type, 'zh'),
      en: t(project.type, 'en'),
    },
    summary: {
      zh: getProjectShort(project, 'zh'),
      en: getProjectShort(project, 'en'),
    },
    role: {
      zh: t(project.role, 'zh'),
      en: t(project.role, 'en'),
    },
    targetUser: {
      zh: t(project.targetUser, 'zh'),
      en: t(project.targetUser, 'en'),
    },
    painPoint: {
      zh: t(project.painPoint, 'zh'),
      en: t(project.painPoint, 'en'),
    },
    solution: {
      zh: t(project.solution, 'zh'),
      en: t(project.solution, 'en'),
    },
    source: {
      zh: t(project.source, 'zh'),
      en: t(project.source, 'en'),
    },
    evidence: {
      zh: Array.isArray(evidenceZh) ? evidenceZh.slice(0, 4) : [evidenceZh].filter(Boolean),
      en: Array.isArray(evidenceEn) ? evidenceEn.slice(0, 4) : [evidenceEn].filter(Boolean),
    },
  };
}

function buildAgentProfileSnapshotV2() {
  const representativeProjects = ['miro', 'palifood', 'libai', 'momenta', 'xiaomi-cmf']
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean)
    .map((project) => ({
      projectId: project.id,
      title: {
        zh: t(project.title, 'zh'),
        en: t(project.title, 'en'),
      },
    }));

  return {
    displayName: '林杨',
    englishName: 'Lin Yang',
    projectCount: projects.length,
    categoryCount: new Set(projects.map((project) => project.category).filter(Boolean)).size,
    focus: {
      zh: '工业设计、AI 交互、CMF、Web 原型与数据系统',
      en: 'industrial design, AI interaction, CMF, web prototyping, and data systems',
    },
    achievements: achievementCards.map((card) => ({
      value: card.value,
      label: {
        zh: t(card.label, 'zh'),
        en: t(card.label, 'en'),
      },
      note: {
        zh: t(card.note, 'zh'),
        en: t(card.note, 'en'),
      },
    })),
    representativeProjects,
  };
}

function buildAgentKnowledgeBaseV2() {
  const projectDocs = projects.map((project) => {
    const titleZh = t(project.title, 'zh');
    const titleEn = t(project.title, 'en');
    const typeZh = t(project.type, 'zh');
    const typeEn = t(project.type, 'en');
    const summaryZh = getProjectShort(project, 'zh');
    const summaryEn = getProjectShort(project, 'en');
    const roleZh = t(project.role, 'zh');
    const roleEn = t(project.role, 'en');
    const targetUserZh = t(project.targetUser, 'zh');
    const targetUserEn = t(project.targetUser, 'en');
    const painPointZh = t(project.painPoint, 'zh');
    const painPointEn = t(project.painPoint, 'en');
    const solutionZh = t(project.solution, 'zh');
    const solutionEn = t(project.solution, 'en');
    const sourceZh = t(project.source, 'zh');
    const sourceEn = t(project.source, 'en');
    const evidenceZh = t(project.evidence, 'zh');
    const evidenceEn = t(project.evidence, 'en');

    return {
      id: `project-${project.id}`,
      kind: 'project',
      projectId: project.id,
      route: `/?project=${project.id}`,
      category: project.category || null,
      title: {
        zh: titleZh,
        en: titleEn,
      },
      content: {
        zh: [
          `${titleZh}是${typeZh || '作品集项目'}。`,
          summaryZh,
          roleZh ? `角色/能力：${roleZh}。` : '',
          targetUserZh ? `目标用户：${targetUserZh}。` : '',
          painPointZh ? `痛点：${painPointZh}。` : '',
          solutionZh ? `解决方式：${solutionZh}。` : '',
          sourceZh ? `资料来源：${sourceZh}。` : '',
          Array.isArray(evidenceZh) ? evidenceZh.join(' ') : evidenceZh,
        ]
          .filter(Boolean)
          .join(' '),
        en: [
          `${titleEn} is a ${typeEn || 'portfolio case'}.`,
          summaryEn,
          roleEn ? `Role/capability: ${roleEn}.` : '',
          targetUserEn ? `Target user: ${targetUserEn}.` : '',
          painPointEn ? `Pain point: ${painPointEn}.` : '',
          solutionEn ? `Solution: ${solutionEn}.` : '',
          sourceEn ? `Source: ${sourceEn}.` : '',
          Array.isArray(evidenceEn) ? evidenceEn.join(' ') : evidenceEn,
        ]
          .filter(Boolean)
          .join(' '),
      },
      keywords: [
        project.id,
        project.category,
        titleZh,
        titleEn,
        typeZh,
        typeEn,
        roleZh,
        roleEn,
        targetUserZh,
        targetUserEn,
        painPointZh,
        painPointEn,
        solutionZh,
        solutionEn,
        ...(agentProjectAliases[project.id] || []),
      ].filter(Boolean),
    };
  });

  const achievementDocs = achievementCards.map((card, index) => {
    const labelZh = t(card.label, 'zh');
    const labelEn = t(card.label, 'en');
    const noteZh = t(card.note, 'zh');
    const noteEn = t(card.note, 'en');

    return {
      id: `achievement-${index}`,
      kind: 'achievement',
      title: {
        zh: labelZh,
        en: labelEn,
      },
      value: card.value,
      note: {
        zh: noteZh,
        en: noteEn,
      },
      content: {
        zh: `站内成就卡「${labelZh}」记录为 ${card.value}，说明为：${noteZh}。`,
        en: `The portfolio achievement card "${labelEn}" is ${card.value}. Note: ${noteEn}.`,
      },
      keywords: [labelZh, labelEn, noteZh, noteEn, card.value, '成就', '数字', '奖项', '荣誉', '客户', '作品', '能力', 'award', 'honor', 'client', 'work', 'direction'],
    };
  });

  const profileDocs = [
    {
      id: 'profile-overview',
      kind: 'profile',
      title: {
        zh: '林杨个人定位',
        en: 'Lin Yang profile',
      },
      content: {
        zh: '林杨是一名复合型设计师，作品集围绕工业设计、AI 交互、CMF、Web 原型与数据系统展开，强调把问题、流程、原型和结果组织成可展示的证据链。',
        en: 'Lin Yang is a hybrid designer focused on industrial design, AI interaction, CMF, web prototyping, and data systems, with portfolio evidence connecting problems, process, prototypes, and outcomes.',
      },
      keywords: ['林杨', 'Lin Yang', '能力', '简历', '个人', '设计师', 'AI', 'CMF', '工业设计', 'Web'],
    },
  ];

  return [...profileDocs, ...achievementDocs, ...projectDocs];
}

const agentProjectAliases = {
  miro: ['miro', '协作', '治理', 'collaboration', 'prototype'],
  palifood: ['拍立食', '拍历史', '派历史', '食物识别', '健康反馈', 'palifood', 'pai li shi'],
  libai: ['李白', 'libai', '互动网站', '诗歌', 'poetry'],
  'tcm-kg': ['中医', '知识图谱', 'tcm', '药材'],
  'offer-quest': ['offer', '求职', '面试', 'job learning quest'],
  sport: ['sport', 'sports', 'home form coach', 'fitness', 'pose tracking', '运动', '健身', '姿态', '动作质检'],
  momenta: ['momenta', '自动驾驶', '地图', 'map'],
  'cross-ripple': ['水疗', 'watsu', '复健', '训练设备', 'hydrotherapy'],
  'cup-cup': ['cup', '复合转盘', '小家电'],
  'heart-bracelet': ['心脏病', '手环', '健康辅助', 'bracelet'],
  'opera-ruler': ['川剧', '儿童', '绘画尺', '文化教育'],
  'capstone-device': ['毕业设计', '水疗', '复健', '训练设备'],
  'xiaomi-cmf': ['小米', 'cmf', '骨传导', '耳机', '量产'],
  'cat-turntable': ['猫玩具', '复合转盘', '宠物', 'cat toy'],
  'smart-waste': ['智能废料箱', '回收', 'waste'],
  'baling-press': ['压缩打包机', '打包机', 'baling', 'press'],
  'cmf-electronics': ['电子产品', 'cmf', '材料档案', '色板'],
  cbs5502: ['cbs5502', '耳机', '量产', '骨传导'],
  'miro-governance': ['miro governance', '系统', '治理', '协作'],
  'tcm-systems': ['中医系统', '知识图谱系统', '数据结构'],
  'libai-data': ['李白数据', '诗歌数据', '网络'],
  'food-health-model': ['食物健康', '健康模型', 'nutrition'],
};

function normalizeAgentText(value) {
  return String(value || '').trim().toLowerCase();
}

function compactAgentText(value) {
  return normalizeAgentText(value).replace(/[\s,，。?!！？/\\|:：；'"“”‘’()（）\[\]{}<>-]+/g, '');
}

function getAgentProjectSearchText(project) {
  return [
    project.id,
    project.category,
    t(project.title, 'en'),
    t(project.title, 'zh'),
    t(project.type, 'en'),
    t(project.type, 'zh'),
    t(project.summary, 'en'),
    t(project.summary, 'zh'),
    t(project.evidence, 'en'),
    t(project.evidence, 'zh'),
    t(project.source, 'en'),
    t(project.source, 'zh'),
    t(project.role, 'en'),
    t(project.role, 'zh'),
    t(project.targetUser, 'en'),
    t(project.targetUser, 'zh'),
    t(project.painPoint, 'en'),
    t(project.painPoint, 'zh'),
    t(project.solution, 'en'),
    t(project.solution, 'zh'),
    getProjectShort(project, 'en'),
    getProjectShort(project, 'zh'),
    ...(agentProjectAliases[project.id] || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function scoreAgentProject(project, query) {
  const normalized = normalizeAgentText(query);
  const compact = compactAgentText(query);
  const titleZh = compactAgentText(t(project.title, 'zh'));
  const titleEn = compactAgentText(t(project.title, 'en'));
  const id = compactAgentText(project.id);
  const haystack = getAgentProjectSearchText(project);
  const compactHaystack = compactAgentText(haystack);
  let score = 0;

  if (compact && (compact === id || compact === titleZh || compact === titleEn)) score += 80;
  if (
    compact &&
    ((id && compact.includes(id)) ||
      (titleZh && compact.includes(titleZh)) ||
      (titleEn && compact.includes(titleEn)))
  ) {
    score += 64;
  }
  if (compact && (id.includes(compact) || titleZh.includes(compact) || titleEn.includes(compact))) score += 34;
  if (normalized && haystack.includes(normalized)) score += 18;
  if (compact && compactHaystack.includes(compact)) score += 18;

  (agentProjectAliases[project.id] || []).forEach((alias) => {
    const aliasCompact = compactAgentText(alias);
    if (!aliasCompact) return;
    if (compact.includes(aliasCompact)) score += aliasCompact.length > 2 ? 62 : 18;
    else if (aliasCompact.includes(compact)) score += aliasCompact.length > 2 ? 26 : 10;
  });

  normalized.split(/\s+/).forEach((token) => {
    if (token.length > 1 && haystack.includes(token)) score += 3;
  });

  return score;
}

function getAgentResultProjectsV2(decision, matches) {
  const ids = [];
  if (Array.isArray(decision.relatedProjectIds)) ids.push(...decision.relatedProjectIds);
  if (decision.projectId) ids.unshift(decision.projectId);
  if (!ids.length) ids.push(...matches.map(({ project }) => project.id));

  return [...new Set(ids)]
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean)
    .slice(0, 1);
}

function AgentOrb({ lang, onOpenProject }) {
  const [open, setOpen] = useState(false);
  const [subtle, setSubtle] = useState(false);
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(AGENT_DEFAULT_POSITION);
  const panelRef = useRef(null);
  const orbRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    x: AGENT_DEFAULT_POSITION.x,
    y: AGENT_DEFAULT_POSITION.y,
    moved: false,
  });
  const requestSeqRef = useRef(0);

  const resetAgentSession = () => {
    requestSeqRef.current += 1;
    setQuery('');
    setReply('');
    setResults([]);
    setLoading(false);
  };

  const closePanel = () => {
    resetAgentSession();
    setOpen(false);
  };

  const openPanel = () => {
    resetAgentSession();
    setOpen(true);
  };

  useEffect(() => {
    let timer = null;
    const soften = () => {
      if (open) return;
      setSubtle(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setSubtle(false), 720);
    };
    const onPointerMove = (event) => {
      if (event.buttons) soften();
    };
    window.addEventListener('scroll', soften, { passive: true });
    window.addEventListener('wheel', soften, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener('scroll', soften);
      window.removeEventListener('wheel', soften);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      if (orbRef.current?.contains(event.target)) return;
      closePanel();
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const startDrag = (event) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      x: position.x,
      y: position.y,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!dragRef.current.active) return;
    const nextX = Math.max(FLOATING_OFFSET, dragRef.current.x - (event.clientX - dragRef.current.startX));
    const nextY = Math.max(AGENT_DEFAULT_POSITION.y, dragRef.current.y - (event.clientY - dragRef.current.startY));
    if (Math.abs(event.clientX - dragRef.current.startX) + Math.abs(event.clientY - dragRef.current.startY) > 6) {
      dragRef.current.moved = true;
    }
    setPosition({ x: nextX, y: nextY });
  };

  const endDrag = () => {
    dragRef.current.active = false;
  };

  const openAgentProject = (projectId) => {
    requestSeqRef.current += 1;
    onOpenProject(projectId);
    setOpen(false);
    setReply('');
    setResults([]);
    setQuery('');
    setLoading(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    const rawQuery = query.trim();
    if (!rawQuery) return;

    const rankedProjects = projects
      .map((project) => ({ project, score: scoreAgentProject(project, rawQuery) }))
      .sort((left, right) => right.score - left.score);

    const matches = rankedProjects.filter(({ score }) => score > 0).slice(0, 6);
    const candidates = rankedProjects.slice(0, 10).map(({ project, score }) => buildAgentCandidateV2(project, score));
    const requestId = requestSeqRef.current + 1;
    requestSeqRef.current = requestId;

    setLoading(true);
    setReply('');
    setResults([]);

    try {
      const decision = await requestAgentDecision({
        query: rawQuery,
        lang,
        profile: buildAgentProfileSnapshotV2(),
        candidates,
        knowledgeBase: buildAgentKnowledgeBaseV2(),
      });
      if (requestSeqRef.current !== requestId) return;

      const relatedProjects = getAgentResultProjectsV2(decision, matches);
      const primaryProject = relatedProjects[0] || null;

      if (decision.mode === 'navigate' && decision.projectId) {
        openAgentProject(decision.projectId);
        return;
      }

      let nextReply =
        decision.answer ||
        (lang === 'zh'
          ? '我已经先按站内资料理解了你的问题，下面也给你挂上最相关的项目入口。'
          : 'I interpreted the request from the portfolio data and attached the closest project entry below.');

      setReply(nextReply);
      setResults(decision.mode === 'answer_with_navigation' && primaryProject ? [primaryProject] : []);
    } catch (error) {
      if (requestSeqRef.current !== requestId) return;
      console.warn('[AgentOrb] Agent request failed, keeping UI alive with a local fallback.', error);
      const fallbackDecision = resolveAgentFallbackDecision({
        query: rawQuery,
        lang,
        profile: buildAgentProfileSnapshotV2(),
        candidates,
        knowledgeBase: buildAgentKnowledgeBaseV2(),
      });

      if (fallbackDecision.mode === 'navigate' && fallbackDecision.projectId) {
        openAgentProject(fallbackDecision.projectId);
        return;
      }

      const fallbackProjects = getAgentResultProjectsV2(fallbackDecision, matches);
      const primaryFallbackProject = fallbackProjects[0] || null;
      setReply(
        fallbackDecision.answer ||
          (lang === 'zh'
            ? '我在站内资料里还没锁定到足够准确的结果，你可以换一个项目名或关键词再试。'
            : 'I could not lock onto a confident project from the site data yet. Try another project name or keyword.')
      );
      setResults(
        fallbackDecision.mode === 'answer_with_navigation' && primaryFallbackProject
          ? [primaryFallbackProject]
          : []
      );
    } finally {
      if (requestSeqRef.current === requestId) setLoading(false);
    }
  };

  return (
    <div className={`agent-layer ${open ? 'open' : ''} ${subtle ? 'is-subtle' : ''} ${loading ? 'is-thinking' : ''}`} style={{ right: position.x, bottom: position.y }}>
      {open ? (
        <div className="agent-panel" ref={panelRef}>
          {loading ? (
            <div className="agent-thinking" role="status" aria-label={lang === 'zh' ? '正在思考' : 'Thinking'}>
              <span className="siri-loader" aria-hidden="true">
                <i />
              </span>
            </div>
          ) : reply ? (
            <div className="agent-response">
              <p>{reply}</p>
              {results[0] ? (
                <button
                  type="button"
                  className="agent-response-action"
                  onClick={() => openAgentProject(results[0].id)}
                >
                  {lang === 'zh' ? '点击进入项目页' : 'Open case page'}
                </button>
              ) : null}
            </div>
          ) : null}
          <form onSubmit={submit} className="agent-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={lang === 'zh' ? '搜索项目、能力、问题...' : 'Ask about a project, skill, or case...'}
            />
            <button type="submit" aria-label="Send" disabled={loading}>
              <Send size={15} />
            </button>
          </form>
        </div>
      ) : null}
      <button
        className="agent-orb"
        ref={orbRef}
        type="button"
        onClick={() => {
          if (!dragRef.current.moved) {
            if (open) closePanel();
            else openPanel();
          }
        }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label={lang === 'zh' ? '作品集 Agent' : 'Portfolio search assistant'}
      >
        <Bot className="agent-orb-icon" size={32} strokeWidth={2.1} aria-hidden="true" />
      </button>
    </div>
  );
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function EmailCopyButton() {
  const [copied, setCopied] = useState(false);
  const [pressed, setPressed] = useState(false);
  const timersRef = useRef({ copied: null, pressed: null, reveal: null });

  useEffect(() => {
    return () => {
      window.clearTimeout(timersRef.current.copied);
      window.clearTimeout(timersRef.current.pressed);
      window.clearTimeout(timersRef.current.reveal);
    };
  }, []);

  const copyEmail = async () => {
    window.clearTimeout(timersRef.current.copied);
    window.clearTimeout(timersRef.current.pressed);
    window.clearTimeout(timersRef.current.reveal);
    setPressed(true);
    timersRef.current.pressed = window.setTimeout(() => setPressed(false), 120);

    if (copied) {
      timersRef.current.copied = window.setTimeout(() => setCopied(false), 1040);
    } else {
      setCopied(false);
      timersRef.current.reveal = window.setTimeout(() => {
        setCopied(true);
        timersRef.current.copied = window.setTimeout(() => setCopied(false), 1040);
      }, 46);
    }

    try {
      await copyTextToClipboard(CONTACT_EMAIL);
    } catch (error) {
      console.warn('[EmailCopyButton] Clipboard copy failed.', error);
    }
  };

  return (
    <div className="email-copy-layer" aria-live="polite">
      <button
        className={`email-copy-button ${copied ? 'is-copied' : ''} ${pressed ? 'is-pressed' : ''}`}
        type="button"
        onClick={copyEmail}
        aria-label={`Copy email address ${CONTACT_EMAIL}`}
      >
        <span className="email-copy-label">EMAIL COPIED</span>
        <Mail className="email-copy-icon" size={32} strokeWidth={2.15} aria-hidden="true" />
      </button>
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />);
