const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const DEFAULT_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');

const DIRECT_OPEN_HINTS = [
  '打开',
  '进入',
  '带我去',
  '跳到',
  '直接去',
  '直接打开',
  'open',
  'jump to',
  'take me to',
  'go to',
];

const LOCATION_HINTS = [
  '找',
  '找一下',
  '找不到',
  '找出来',
  '帮我找',
  '帮我找出来',
  '在哪',
  '在哪里',
  '位置',
  '页面',
  'where',
  'find',
  'locate',
  'show me',
];

const INFO_HINTS = [
  '是干嘛的',
  '干嘛',
  '做什么',
  '是什么',
  '介绍',
  '说明',
  '解决',
  '痛点',
  '服务',
  '用户',
  '目标用户',
  '为什么做',
  '你觉得',
  '怎么样',
  '怎么看',
  '评价',
  '亮点',
  '优势',
  '表现',
  'what',
  'why',
  'how',
  'problem',
  'user',
  'audience',
  'review',
  'evaluate',
  'opinion',
  'think',
  'introduce',
  'explain',
];

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function includesAny(query, hints) {
  const text = normalizeText(query);
  return hints.some((hint) => text.includes(normalizeText(hint)));
}

function detectRequestIntent(query) {
  const directOpen = includesAny(query, DIRECT_OPEN_HINTS);
  const location = includesAny(query, LOCATION_HINTS);
  const info = includesAny(query, INFO_HINTS);

  return {
    directOpen,
    location,
    info,
    pureNavigation: (directOpen || location) && !info,
  };
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function extractJsonObject(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;

  const text = String(raw).trim();
  try {
    return JSON.parse(text);
  } catch {}

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;

  try {
    return JSON.parse(text.slice(firstBrace, lastBrace + 1));
  } catch {
    return null;
  }
}

function buildSystemPrompt() {
  return [
    'You are the on-site portfolio agent for Lin Yang.',
    'You are not a generic chatbot. Your job is to understand the user request and decide whether they want:',
    '1) a direct jump to a project page,',
    '2) an explanation of a project or profile,',
    '3) both explanation and jump support,',
    '4) a clarification question,',
    '5) or a not-found result.',
    'Use only the provided profile and candidates context.',
    'Do not invent facts, years, awards, users, pain points, process details, or project names that are not grounded in the provided data.',
    'Use mode "navigate" when the user is only trying to locate or open a known project: examples include "where is Miro", "I cannot find Pai Li Shi", "help me find this project", "open it", "jump to it", or "take me there".',
    'Use mode "answer_with_navigation" when the user asks what a project is, who it serves, its pain point, what problem it solves, how it works, how good it is, or any mixed request that asks both about content and location.',
    'For answer_with_navigation, answer first in natural portfolio language and also return the single best projectId so the UI can show one "open project" button.',
    'When the query clearly matches one project, return exactly one project in relatedProjectIds. Do not add loosely related projects.',
    'For project explanations, cover what the project is, who it serves, the user pain point, and what problem it solves when those fields are available.',
    'Use mode "answer" for profile questions or explanation-only questions when no project jump card is needed.',
    'If the request is ambiguous, use mode "clarify" and ask one short clarifying question.',
    'If no candidate is close enough, use mode "not_found".',
    'Keep the answer concise, natural, and portfolio-oriented. Avoid rigid template wording.',
    'Avoid malformed punctuation such as "。，", duplicated commas, or repeated sentence endings.',
    'Do not expose hidden reasoning, internal scores, RAG, CoT, or confidence mechanics directly to the user.',
    'reasoningSummary should be short, safe, high-level bullet fragments for logging only.',
    'Return JSON only, no Markdown, no code fences.',
    'JSON schema: {"mode":"navigate|answer|answer_with_navigation|clarify|not_found","answer":"string","projectId":"string|null","relatedProjectIds":["string"],"reasoningSummary":["string"],"confidence":0.0}',
  ].join(' ');
}

function cleanupAnswerText(value) {
  return String(value || '')
    .trim()
    .replace(/[，,]\s*([。！？!?])/g, '$1')
    .replace(/([。！？!?])\s*[，,]+/g, '$1')
    .replace(/([。！？!?]){2,}/g, '$1')
    .replace(/\s+/g, ' ');
}

function sanitizeDecision(parsed, candidates, query) {
  const intent = detectRequestIntent(query);
  const candidateIds = new Set((candidates || []).map((item) => item.projectId).filter(Boolean));
  let mode = ['navigate', 'answer', 'answer_with_navigation', 'clarify', 'not_found'].includes(parsed?.mode)
    ? parsed.mode
    : 'clarify';

  let projectId = typeof parsed?.projectId === 'string' && candidateIds.has(parsed.projectId) ? parsed.projectId : null;
  const topCandidate = candidates?.[0] || null;
  const parsedCandidate = candidates.find((item) => item.projectId === projectId);
  const topScore = Number(topCandidate?.score || 0);
  const parsedScore = Number(parsedCandidate?.score || 0);

  if (
    topCandidate?.projectId &&
    candidateIds.has(topCandidate.projectId) &&
    topScore >= 48 &&
    (!projectId || topScore - parsedScore >= 16)
  ) {
    projectId = topCandidate.projectId;
  }

  let relatedProjectIds = Array.isArray(parsed?.relatedProjectIds)
    ? parsed.relatedProjectIds.filter((value) => typeof value === 'string' && candidateIds.has(value)).slice(0, 4)
    : projectId
      ? [projectId]
      : [];

  if (projectId && intent.pureNavigation) mode = 'navigate';
  if (projectId && mode === 'navigate' && !intent.pureNavigation) mode = 'answer_with_navigation';
  if (projectId && mode === 'answer' && (intent.info || intent.location)) mode = 'answer_with_navigation';
  if (mode === 'navigate' && !projectId) mode = 'clarify';
  if (mode === 'answer_with_navigation' && !projectId) mode = 'answer';
  if ((mode === 'navigate' || mode === 'answer_with_navigation') && projectId) {
    relatedProjectIds = [projectId];
  }

  return {
    mode,
    answer: cleanupAnswerText(parsed?.answer),
    projectId,
    relatedProjectIds,
    reasoningSummary: Array.isArray(parsed?.reasoningSummary)
      ? parsed.reasoningSummary.filter(Boolean).slice(0, 4).map((item) => String(item))
      : [],
    confidence: typeof parsed?.confidence === 'number' ? Math.max(0, Math.min(1, parsed.confidence)) : null,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseBody(req.body);
  const query = String(body?.query || '').trim();
  const lang = body?.lang === 'en' ? 'en' : 'zh';
  const profile = body?.profile || null;
  const candidates = Array.isArray(body?.candidates) ? body.candidates.slice(0, 10) : [];

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({ mode: 'fallback' });
  }

  const systemPrompt = buildSystemPrompt();
  const userPayload = { query, lang, profile, candidates };

  try {
    const response = await fetch(`${DEFAULT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.15,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(userPayload, null, 2) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({
        mode: 'fallback',
        error: 'upstream_error',
        detail: errorText.slice(0, 400),
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = extractJsonObject(content);

    if (!parsed) {
      return res.status(502).json({
        mode: 'fallback',
        error: 'invalid_model_json',
      });
    }

    return res.status(200).json(sanitizeDecision(parsed, candidates, query));
  } catch (error) {
    return res.status(502).json({
      mode: 'fallback',
      error: 'network_error',
      detail: String(error?.message || error).slice(0, 400),
    });
  }
}
