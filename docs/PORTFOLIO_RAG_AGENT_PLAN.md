# Portfolio RAG Agent Plan

## 目标

把右下角 AssistiveTouch 入口升级为作品集 Agent：用户可以用自然语言询问林杨是谁、某个项目在哪里、某类能力有哪些证据，也可以直接跳转到对应作品详情。

核心原则：回答必须优先来自本站资料，不凭空编造；能跳转就给明确入口，不能确定就说明需要补资料。

## 当前前端状态

- 入口是一个小圆点浮球，点击打开搜索/对话框。
- 当前版本已支持本地项目匹配、关键词搜索和项目跳转。
- 当前版本还没有接入真实 LLM API，也没有向量库，因此回答只是站内数据的轻量动态组合。

## 三层链路

### 1. RAG 证据检索层

RAG 是第一层，不是 IG。

数据来源：

- `src/main.jsx` 里的项目数据、标题、分类、摘要、证据、详情段落。
- 作品详情页真实图片 caption、项目阶段描述、能力标签。
- `NEXT_AGENT_HANDOFF.md`、`task_plan.md`、`findings.md`、`progress.md`、`agent_memory/` 中已经沉淀的项目背景。
- 后续用户补充的封面/详情图索引文件。

检索流程：

1. 把项目、段落、图片说明、能力标签切成 chunk。
2. 每个 chunk 存 `projectId`、`title`、`category`、`sourceFile`、`route`、`language`、`updatedAt`。
3. 查询时先做关键词召回，再做向量召回，最后合并重排。
4. 如果用户意图是“打开/找/跳转”，优先返回 route；如果意图是“解释/介绍/总结”，返回证据片段给模型组织答案。

推荐存储：

- MVP：生成 `public/agent-index.json`，前端或 API 直接读取。
- 正式版：Supabase Postgres + pgvector，支持增量索引和来源追踪。

### 2. 可解释推理摘要层

不要展示模型隐藏 chain-of-thought 原文。正确做法是展示可读的“判断依据摘要”：

- 我检索到了哪些项目或资料。
- 哪些证据支持这个回答。
- 如果证据不足，缺的是哪类资料。
- 如果是跳转请求，为什么选择这个项目。

示例返回：

```json
{
  "reasoningSummary": [
    "识别到用户在询问设计师能力。",
    "检索到 Miro、拍立食、李白互动网站、小米 CMF 等项目证据。",
    "回答聚焦工业设计、AI 交互、Web 原型和数据系统。"
  ]
}
```

这样能满足“让用户看到判断过程”的产品目标，同时避免暴露不可控、冗长或不适合展示的内部推理。

### 3. 置信度与自我怀疑层

不要只依赖一个 raw logit 分数。不同模型和 API 对 logprobs/logits 支持不同，而且单个 logit 不能可靠代表答案是否正确。

建议做综合置信度：

- `retrievalScore`：召回结果和用户问题的匹配度。
- `coverageScore`：答案关键点是否都能被资料覆盖。
- `supportScore`：生成答案后，是否能逐句找到证据支撑。
- `intentScore`：用户意图是否明确，是问答、导航、比较还是资料补充。
- `logprobScore`：仅当 API 支持 logprobs 时作为辅助信号。

阈值策略：

- `overall >= 0.78`：直接回答或直接跳转。
- `0.55 <= overall < 0.78`：回答但附带“不确定点”，或给 2-3 个候选项目。
- `overall < 0.55`：先追问，或者提示当前资料库没有足够证据。

## API 设计

### 前端调用

```js
const response = await fetch('/api/agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query,
    lang,
    currentRoute,
  }),
});
```

### API 返回

```json
{
  "mode": "answer",
  "answer": "林杨是一名复合型设计师...",
  "route": null,
  "sources": [
    {
      "title": "Miro AI Governance",
      "projectId": "miro",
      "route": "/?project=miro",
      "score": 0.86
    }
  ],
  "reasoningSummary": [
    "检索到 4 个与 AI 交互和系统设计相关的项目。",
    "回答只使用站内已有项目证据。"
  ],
  "confidence": {
    "overall": 0.82,
    "retrievalScore": 0.88,
    "coverageScore": 0.78,
    "supportScore": 0.81,
    "logprobScore": null
  }
}
```

导航请求可返回：

```json
{
  "mode": "navigate",
  "answer": "已找到拍立食项目。",
  "route": "/?project=palifood",
  "sources": [],
  "reasoningSummary": ["用户明确要求找拍立食，项目别名命中 palifood。"],
  "confidence": { "overall": 0.94 }
}
```

## 环境变量

不要把 key 发在聊天里，也不要提交到 GitHub。

本地放在 `.env.local`：

```env
OPENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_ANON_KEY=...
AGENT_ADMIN_TOKEN=...
```

部署时放到 Vercel Project Settings -> Environment Variables：

- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `AGENT_ADMIN_TOKEN`

## 实施阶段

### MVP

1. 生成 `public/agent-index.json`。
2. 新增 `/api/agent`。
3. 支持问答、项目跳转、候选项目列表。
4. UI 中展示简短 answer，不默认展开 reasoningSummary。

### 正式版

1. 接 Supabase pgvector。
2. 增加 `/api/agent/reindex`，用 `AGENT_ADMIN_TOKEN` 保护。
3. 增加证据引用和置信度面板。
4. 建立 50-100 条评测问题，覆盖中文、英文、项目跳转、能力总结、资料不足等场景。

## 验收标准

- 问“林杨是谁”不会回答成“羚羊”。
- 问“找拍立食”能跳到拍立食项目。
- 问“有哪些 AI 交互项目”能列出站内真实项目。
- 问资料库没有的内容时，不编造。
- 回答里可选展示证据摘要和置信度，但不展示原始隐藏 CoT。
