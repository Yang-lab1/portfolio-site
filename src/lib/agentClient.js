const ALLOWED_MODES = new Set(['navigate', 'answer', 'answer_with_navigation', 'clarify', 'refusal', 'not_found']);
const REMOTE_TIMEOUT_MS = 9000;

const PROFILE_HINTS = [
  '\u6797\u6768',
  'lin yang',
  'linyang',
  '\u4f60\u662f\u8c01',
  '\u662f\u4e00\u4e2a\u4ec0\u4e48\u6837\u7684\u4eba',
  '\u4ecb\u7ecd\u4e00\u4e0b',
  '\u80fd\u529b',
  '\u7b80\u5386',
  '\u5956',
  '\u5956\u9879',
  '\u83b7\u5956',
  '\u8363\u8a89',
  '\u5956\u5b66\u91d1',
  '\u5ba2\u6237',
  '\u534f\u4f5c',
  '\u591a\u5c11',
  'profile',
  'portfolio',
  'award',
  'honor',
  'scholarship',
  'client',
  'work',
];

const DIRECT_OPEN_HINTS = [
  '\u6253\u5f00',
  '\u8fdb\u5165',
  '\u5e26\u6211\u53bb',
  '\u8df3\u5230',
  '\u76f4\u63a5\u53bb',
  '\u76f4\u63a5\u6253\u5f00',
  '\u6253\u5f00\u9875\u9762',
  '\u8fdb\u8fd9\u4e2a\u9879\u76ee',
  'open',
  'jump to',
  'take me to',
  'bring me to',
  'go to',
];

const LOCATION_HINTS = [
  '\u627e',
  '\u627e\u4e00\u4e0b',
  '\u627e\u4e0d\u5230',
  '\u627e\u51fa\u6765',
  '\u5e2e\u6211\u627e',
  '\u5e2e\u6211\u627e\u51fa\u6765',
  '\u5728\u54ea',
  '\u5728\u54ea\u91cc',
  '\u4f4d\u7f6e',
  '\u9875\u9762',
  '\u54ea\u4e2a\u9879\u76ee',
  '\u600e\u4e48\u53bb',
  '\u5bf9\u5e94\u4f4d\u7f6e',
  '\u76f8\u5e94\u4f4d\u7f6e',
  'find',
  'locate',
  'where',
  'page',
  'show me',
];

const EXPLAIN_HINTS = [
  '\u662f\u5e72\u561b\u7684',
  '\u5e72\u561b',
  '\u505a\u4ec0\u4e48',
  '\u662f\u4ec0\u4e48',
  '\u89e3\u51b3',
  '\u75db\u70b9',
  '\u670d\u52a1',
  '\u7528\u6237',
  '\u76ee\u6807\u7528\u6237',
  '\u4e3a\u4ec0\u4e48\u505a',
  '\u4e3a\u4ec0\u4e48\u8981\u505a',
  '\u4f60\u89c9\u5f97',
  '\u600e\u4e48\u6837',
  '\u600e\u4e48\u770b',
  '\u8bc4\u4ef7',
  '\u4eae\u70b9',
  '\u4f18\u52bf',
  '\u8868\u73b0',
  'what',
  'why',
  'how',
  'does it do',
  'what does',
  'problem',
  'user',
  'audience',
  'review',
  'evaluate',
  'opinion',
  'think',
];

const GREETING_HINTS = [
  '\u4f60\u597d',
  '\u4f60\u662f\u8c01',
  '\u4f60\u4f1a\u505a\u4ec0\u4e48',
  '\u80fd\u5e2e\u6211\u4ec0\u4e48',
  '\u600e\u4e48\u7528',
  'hello',
  'hi',
  'who are you',
  'what can you do',
  'help me',
];

const EXTERNAL_REALTIME_HINTS = [
  '\u5929\u6c14',
  '\u80a1\u7968',
  '\u80a1\u4ef7',
  '\u65b0\u95fb',
  '\u9644\u8fd1',
  '\u9910\u5385',
  '\u5916\u5356',
  '\u5730\u56fe',
  '\u8def\u7ebf',
  '\u6c47\u7387',
  '\u5b9e\u65f6',
  'weather',
  'stock',
  'stock price',
  'news',
  'nearby',
  'restaurant',
  'map',
  'exchange rate',
  'real-time',
];

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function compactText(value) {
  return normalizeText(value).replace(/[\s,，。.!！？?\/\\|:：;；"'“”‘’()（）\[\]{}<>-]+/g, '');
}

function getLocalized(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') return String(field?.[lang] || field?.zh || field?.en || '');
  return '';
}

function cleanupAnswerText(value) {
  return String(value || '')
    .trim()
    .replace(/[，,]\s*([。！？!?])/g, '$1')
    .replace(/([。！？!?])\s*[，,]+/g, '$1')
    .replace(/([。！？!?]){2,}/g, '$1')
    .replace(/\s+/g, ' ');
}

function dedupeProjectIds(items, limit = 3) {
  const seen = new Set();
  const ids = [];
  items.forEach((item) => {
    const projectId = typeof item === 'string' ? item : item?.projectId;
    if (!projectId || seen.has(projectId)) return;
    seen.add(projectId);
    ids.push(projectId);
  });
  return ids.slice(0, limit);
}

function candidateHaystack(candidate) {
  return [
    candidate.projectId,
    candidate.category,
    ...(candidate.aliases || []),
    getLocalized(candidate.title, 'zh'),
    getLocalized(candidate.title, 'en'),
    getLocalized(candidate.type, 'zh'),
    getLocalized(candidate.type, 'en'),
    getLocalized(candidate.summary, 'zh'),
    getLocalized(candidate.summary, 'en'),
    getLocalized(candidate.role, 'zh'),
    getLocalized(candidate.role, 'en'),
    getLocalized(candidate.targetUser, 'zh'),
    getLocalized(candidate.targetUser, 'en'),
    getLocalized(candidate.painPoint, 'zh'),
    getLocalized(candidate.painPoint, 'en'),
    getLocalized(candidate.solution, 'zh'),
    getLocalized(candidate.solution, 'en'),
    getLocalized(candidate.source, 'zh'),
    getLocalized(candidate.source, 'en'),
    ...(Array.isArray(candidate.evidence?.zh) ? candidate.evidence.zh : []),
    ...(Array.isArray(candidate.evidence?.en) ? candidate.evidence.en : []),
  ]
    .filter(Boolean)
    .join(' ');
}

function projectIdentityTokens(candidate) {
  return [
    candidate?.projectId,
    getLocalized(candidate?.title, 'zh'),
    getLocalized(candidate?.title, 'en'),
    ...(Array.isArray(candidate?.aliases) ? candidate.aliases : []),
  ]
    .map((item) => compactText(item))
    .filter((item) => item.length >= 2);
}

function hasDirectProjectSignal(candidate, query) {
  const compactQuery = compactText(query);
  if (!candidate || !compactQuery) return false;

  return projectIdentityTokens(candidate).some((token) => {
    if (compactQuery === token || compactQuery.includes(token)) return true;
    return compactQuery.length >= 3 && token.includes(compactQuery);
  });
}

function scoreSemanticCandidate(candidate, query) {
  const compactQuery = compactText(query);
  const rawQuery = normalizeText(query);
  const haystack = candidateHaystack(candidate);
  const compactHaystack = compactText(haystack);
  const titleZh = compactText(getLocalized(candidate.title, 'zh'));
  const titleEn = compactText(getLocalized(candidate.title, 'en'));
  const projectId = compactText(candidate.projectId);
  let score = 0;

  if (!compactQuery) return 0;

  if (compactQuery === titleZh || compactQuery === titleEn || compactQuery === projectId) score += 95;
  if (
    (titleZh && compactQuery.includes(titleZh)) ||
    (titleEn && compactQuery.includes(titleEn)) ||
    (projectId && compactQuery.includes(projectId))
  ) {
    score += 70;
  }
  if (
    compactQuery.length >= 3 &&
    ((titleZh && titleZh.includes(compactQuery)) ||
      (titleEn && titleEn.includes(compactQuery)) ||
      (projectId && projectId.includes(compactQuery)))
  ) {
    score += 36;
  }
  if (compactHaystack.includes(compactQuery)) score += 24;
  if (rawQuery && haystack.toLowerCase().includes(rawQuery)) score += 16;

  (candidate.aliases || []).forEach((alias) => {
    const compactAlias = compactText(alias);
    if (!compactAlias) return;
    if (compactQuery === compactAlias) score += 80;
    else if (compactQuery.includes(compactAlias)) score += compactAlias.length > 2 ? 62 : 24;
    else if (compactQuery.length >= 3 && compactAlias.includes(compactQuery)) score += 22;
  });

  return score;
}

function rankCandidates(candidates, query) {
  return (candidates || [])
    .map((candidate) => ({
      ...candidate,
      semanticScore: scoreSemanticCandidate(candidate, query),
    }))
    .sort((left, right) => right.semanticScore - left.semanticScore);
}

function knowledgeDocHaystack(doc) {
  return [
    doc.id,
    doc.kind,
    doc.projectId,
    doc.category,
    doc.value,
    ...(doc.keywords || []),
    getLocalized(doc.title, 'zh'),
    getLocalized(doc.title, 'en'),
    getLocalized(doc.note, 'zh'),
    getLocalized(doc.note, 'en'),
    getLocalized(doc.content, 'zh'),
    getLocalized(doc.content, 'en'),
  ]
    .filter(Boolean)
    .join(' ');
}

function scoreKnowledgeDoc(doc, query) {
  const compactQuery = compactText(query);
  const rawQuery = normalizeText(query);
  const haystack = knowledgeDocHaystack(doc);
  const compactHaystack = compactText(haystack);
  const titleZh = compactText(getLocalized(doc.title, 'zh'));
  const titleEn = compactText(getLocalized(doc.title, 'en'));
  let score = 0;

  if (!compactQuery) return score;

  if (titleZh && (compactQuery.includes(titleZh) || titleZh.includes(compactQuery))) score += 42;
  if (titleEn && (compactQuery.includes(titleEn) || titleEn.includes(compactQuery))) score += 36;
  if (compactHaystack.includes(compactQuery)) score += 28;
  if (rawQuery && haystack.toLowerCase().includes(rawQuery)) score += 18;

  (doc.keywords || []).forEach((keyword) => {
    const compactKeyword = compactText(keyword);
    if (!compactKeyword) return;
    if (compactQuery.includes(compactKeyword) || compactKeyword.includes(compactQuery)) {
      score += compactKeyword.length > 2 ? 14 : 5;
    }
  });

  [
    '\u5956',
    '\u8363\u8a89',
    '\u5956\u5b66\u91d1',
    '\u5ba2\u6237',
    '\u534f\u4f5c',
    '\u4f5c\u54c1',
    '\u5165\u53e3',
    '\u80fd\u529b',
    '\u65b9\u5411',
    '\u9879\u76ee',
    '\u6570\u91cf',
    '\u591a\u5c11',
    'award',
    'honor',
    'scholarship',
    'client',
    'work',
    'direction',
  ].forEach((term) => {
    const compactTerm = compactText(term);
    if (compactTerm && compactQuery.includes(compactTerm) && compactHaystack.includes(compactTerm)) score += 18;
  });

  normalizeText(query)
    .split(/\s+/)
    .filter((token) => token.length > 1)
    .forEach((token) => {
      if (haystack.toLowerCase().includes(token)) score += 3;
    });

  return score;
}

function rankKnowledgeDocs(knowledgeBase, query) {
  return (knowledgeBase || [])
    .map((doc) => ({
      ...doc,
      semanticScore: scoreKnowledgeDoc(doc, query),
    }))
    .filter((doc) => doc.semanticScore > 0)
    .sort((left, right) => right.semanticScore - left.semanticScore);
}

function achievementText(doc) {
  return [
    getLocalized(doc?.title, 'zh'),
    getLocalized(doc?.title, 'en'),
    getLocalized(doc?.note, 'zh'),
    getLocalized(doc?.note, 'en'),
    getLocalized(doc?.content, 'zh'),
    getLocalized(doc?.content, 'en'),
  ]
    .filter(Boolean)
    .join(' ');
}

function compactIncludesAny(value, terms) {
  const text = compactText(value);
  return terms.some((term) => {
    const compactTerm = compactText(term);
    return compactTerm && text.includes(compactTerm);
  });
}

function selectRequestedAchievementDoc(rankedDocs, query) {
  const achievementDocs = (rankedDocs || []).filter((doc) => doc.kind === 'achievement');
  if (!achievementDocs.length) return null;

  const groups = [
    {
      queryTerms: ['\u5956', '\u5956\u9879', '\u83b7\u5956', '\u8363\u8a89', '\u5956\u5b66\u91d1', 'award', 'awards', 'honor', 'honors', 'scholarship'],
      docTerms: ['\u5956\u9879', '\u8363\u8a89', '\u5956\u5b66\u91d1', 'honor', 'honors', 'award', 'awards', 'scholarship'],
    },
    {
      queryTerms: ['\u5ba2\u6237', '\u534f\u4f5c', '\u5408\u4f5c', 'client', 'clients', 'collaboration'],
      docTerms: ['\u5ba2\u6237', '\u534f\u4f5c', 'client', 'clients'],
    },
    {
      queryTerms: ['\u4f5c\u54c1', '\u5165\u53e3', '\u9879\u76ee\u6570', '\u9879\u76ee\u6570\u91cf', 'work', 'works', 'portfolio entries'],
      docTerms: ['\u4f5c\u54c1', '\u5165\u53e3', 'work', 'works', 'portfolio cases', 'portfolio entries'],
    },
    {
      queryTerms: ['\u80fd\u529b', '\u65b9\u5411', '\u7c7b\u578b', 'capability', 'capabilities', 'direction', 'directions'],
      docTerms: ['\u80fd\u529b', '\u65b9\u5411', 'direction', 'directions'],
    },
  ];

  for (const group of groups) {
    if (!compactIncludesAny(query, group.queryTerms)) continue;
    const matched = achievementDocs.find((doc) => compactIncludesAny(achievementText(doc), group.docTerms));
    if (matched) return matched;
  }

  return null;
}

function buildKnowledgeAnswer(rankedDocs, query, lang) {
  const top = selectRequestedAchievementDoc(rankedDocs, query) || rankedDocs?.[0];
  if (!top || top.semanticScore < 14) return '';

  const title = getLocalized(top.title, lang);
  const content = getLocalized(top.content, lang);
  const note = getLocalized(top.note, lang);
  const compactQuery = compactText(query);

  if (top.kind === 'achievement') {
    if (lang === 'zh') {
      if (compactQuery.includes('\u5956') || compactQuery.includes('\u8363\u8a89') || compactQuery.includes('\u5956\u5b66\u91d1')) {
        return `林杨站内整理到的${title}为 ${top.value}，包含${note || '设计奖项、奖学金与荣誉称号'}。`;
      }
      return `站内「${title}」目前记录为 ${top.value}${note ? `，${note}` : ''}。`;
    }
    return `The portfolio lists ${top.value} for ${title}${note ? `, covering ${note}` : ''}.`;
  }

  if (content) {
    const maxLength = lang === 'zh' ? 110 : 190;
    return content.length > maxLength ? `${content.slice(0, maxLength).trim()}…` : content;
  }

  return '';
}

function looksLikeNoDataAnswer(answer) {
  return /没.*锁定|没在站内证据|没有.*对应项目|未提及|没有.*资料|暂无|not mentioned|not provided|no data|could not lock|not lock/i.test(String(answer || ''));
}

function includesAny(query, hints) {
  const text = normalizeText(query);
  return hints.some((hint) => text.includes(normalizeText(hint)));
}

function detectIntent(query, ranked) {
  const directOpen = includesAny(query, DIRECT_OPEN_HINTS);
  const asksLocation = includesAny(query, LOCATION_HINTS);
  const asksExplanation = includesAny(query, EXPLAIN_HINTS);
  const asksProfile = includesAny(query, PROFILE_HINTS);
  const asksGreeting = includesAny(query, GREETING_HINTS);
  const asksExternalRealtime = includesAny(query, EXTERNAL_REALTIME_HINTS);
  const top = ranked[0] || null;
  const second = ranked[1] || null;
  const topScore = top?.semanticScore || 0;
  const delta = top && second ? top.semanticScore - second.semanticScore : topScore;
  const hasDirectProject = hasDirectProjectSignal(top, query);
  const hasStrongProject = Boolean(top && hasDirectProject && topScore >= 48);
  const ambiguousProject = Boolean(top && second && topScore < 82 && delta < 12);

  return {
    directOpen,
    asksLocation,
    asksExplanation,
    asksProfile,
    asksGreeting,
    asksExternalRealtime,
    hasDirectProject,
    hasStrongProject,
    ambiguousProject,
    top,
    second,
  };
}

function isPureNavigationIntent(intent) {
  return Boolean((intent.directOpen || intent.asksLocation) && !intent.asksExplanation);
}

function shouldAttachProjectNavigation(intent, mode) {
  return Boolean(intent.asksExplanation || intent.asksLocation || mode === 'answer_with_navigation');
}

function buildProfileAnswer(profile, lang, query) {
  const displayName = profile?.displayName || 'Lin Yang';
  const focus = getLocalized(profile?.focus, lang);
  const projectCount = Number(profile?.projectCount || 0);
  const categoryCount = Number(profile?.categoryCount || 0);
  const representative = (profile?.representativeProjects || [])
    .map((project) => getLocalized(project?.title, lang))
    .filter(Boolean)
    .slice(0, 4);
  const compactQuery = compactText(query);

  if (lang === 'zh') {
    if (compactQuery.includes('\u80fd\u529b') || compactQuery.includes('\u64c5\u957f')) {
      return `${displayName}\u76ee\u524d\u7684\u4f5c\u54c1\u91cd\u70b9\u96c6\u4e2d\u5728${focus}\uff0c\u7ad9\u5185\u5df2\u7ecf\u6574\u7406\u4e86${projectCount}\u4e2a\u9879\u76ee\u5165\u53e3\u548c${categoryCount}\u4e2a\u65b9\u5411\uff0c\u4ee3\u8868\u6848\u4f8b\u5305\u62ec${representative.join('\u3001')}\u3002`;
    }
    return `${displayName}\u662f\u4e00\u540d\u590d\u5408\u578b\u8bbe\u8ba1\u5e08\uff0c\u628a${focus}\u4e32\u6210\u4e00\u6761\u53ef\u4ee5\u5c55\u793a\u7ed3\u679c\u7684\u4f5c\u54c1\u8bc1\u636e\u94fe\u3002`;
  }

  if (compactQuery.includes('skill') || compactQuery.includes('ability')) {
    return `${displayName} focuses on ${focus}, with ${projectCount} portfolio entries across ${categoryCount} tracks.`;
  }

  return `${displayName} is a hybrid designer connecting ${focus} into evidence-led portfolio cases.`;
}

function buildGreetingAnswer(profile, lang) {
  const displayName = profile?.displayName || (lang === 'zh' ? '\u6797\u6768' : 'Yang');

  if (lang === 'zh') {
    return `\u4f60\u597d\uff0c\u6211\u662f${displayName}\u4e2a\u4eba\u7f51\u7ad9\u91cc\u7684 AI \u4f5c\u54c1\u96c6\u52a9\u624b\u3002\u6211\u53ef\u4ee5\u5e2e\u4f60\u4e86\u89e3\u9879\u76ee\u3001\u80fd\u529b\u65b9\u5411\u3001AI \u4ea7\u54c1\u548c\u5de5\u4e1a\u8bbe\u8ba1\u6848\u4f8b\uff0c\u4e5f\u53ef\u4ee5\u5e26\u4f60\u8df3\u5230\u5bf9\u5e94\u9879\u76ee\u9875\u3002`;
  }

  return `Hi, I am the AI portfolio assistant for ${displayName}'s site. I can explain projects, summarize capabilities, recommend cases, or take you to a specific project page.`;
}

function buildRefusalAnswer(lang) {
  if (lang === 'zh') {
    return '\u8fd9\u4e2a\u95ee\u9898\u4e0d\u5c5e\u4e8e\u5f53\u524d\u7f51\u7ad9\u5185\u5bb9\u8303\u56f4\uff0c\u6211\u73b0\u5728\u4e3b\u8981\u8d1f\u8d23\u89e3\u8bfb\u6797\u6768\u7684\u4f5c\u54c1\u3001\u9879\u76ee\u548c\u80fd\u529b\u3002\u5982\u679c\u4f60\u60f3\u4e86\u89e3\u67d0\u4e2a AI \u9879\u76ee\u3001\u5de5\u4e1a\u8bbe\u8ba1\u6848\u4f8b\u6216\u4f5c\u54c1\u9875\u9762\uff0c\u6211\u53ef\u4ee5\u9a6c\u4e0a\u5e2e\u4f60\u627e\u3002';
  }

  return 'That is outside the current site content. I am focused on explaining Yang\'s projects, portfolio, and capabilities. Ask me about an AI project, industrial design case, or page location and I can help right away.';
}

function summarizeEvidence(candidate, lang) {
  const evidence = Array.isArray(candidate?.evidence?.[lang]) ? candidate.evidence[lang] : [];
  return evidence.filter(Boolean).slice(0, 2).join(' ');
}

function buildProjectAnswer(candidate, query, lang) {
  const title = getLocalized(candidate.title, lang) || candidate.projectId;
  const type = getLocalized(candidate.type, lang);
  const summary = getLocalized(candidate.summary, lang);
  const role = getLocalized(candidate.role, lang);
  const targetUser = getLocalized(candidate.targetUser, lang);
  const painPoint = getLocalized(candidate.painPoint, lang);
  const solution = getLocalized(candidate.solution, lang);
  const source = getLocalized(candidate.source, lang);
  const evidence = summarizeEvidence(candidate, lang);
  const compactQuery = compactText(query);
  const asksEvaluation = compactQuery.includes('\u600e\u4e48\u6837') || compactQuery.includes('\u8bc4\u4ef7') || compactQuery.includes('review') || compactQuery.includes('opinion') || compactQuery.includes('think');
  const asksProblem = compactQuery.includes('\u75db\u70b9') || compactQuery.includes('\u89e3\u51b3') || compactQuery.includes('problem');
  const asksUser = compactQuery.includes('\u7528\u6237') || compactQuery.includes('\u670d\u52a1') || compactQuery.includes('user') || compactQuery.includes('audience');

  if (lang === 'zh') {
    if (candidate.projectId === 'palifood') {
      if (asksEvaluation) {
        return `${title}整体是一个完成度较高的食物识别移动 H5 案例，服务想快速识别食物、获得饮食反馈和健康建议的日常用户。它针对饮食记录输入成本高、拍照识别后缺少下一步健康建议的痛点，把拍摄、AI 识别、健康反馈、推荐和轻社交串成连续流程。`;
      }
      return `${title}是一个食物识别 / 移动 H5 案例，服务日常饮食记录用户，解决手动记录慢、拍照识别后缺少健康反馈的问题；核心流程覆盖拍摄、AI 识别、健康反馈、推荐和轻社交。`;
    }

    if (asksEvaluation) {
      return `${title}\u6574\u4f53\u5b8c\u6210\u5ea6\u6bd4\u8f83\u597d\uff0c\u91cd\u70b9\u5728${summary || type}\uff0c${role ? `\u4e5f\u80fd\u770b\u51fa\u5b83\u66f4\u504f${role}\u8fd9\u6761\u80fd\u529b\u7ebf\u3002` : '\u4f5c\u4e3a\u4f5c\u54c1\u96c6\u6848\u4f8b\u8db3\u591f\u80fd\u6253\u3002'}`;
    }
    if (asksProblem) {
      return `${title}\u66f4\u50cf\u662f\u4e00\u4e2a${type || '\u9879\u76ee'}\u6848\u4f8b\uff0c\u91cd\u70b9\u662f${summary || source || role}\uff0c\u7528\u6765\u5bf9\u5e94\u90a3\u7c7b\u4f7f\u7528\u3001\u534f\u4f5c\u6216\u4ea4\u4e92\u95ee\u9898\u3002`;
    }
    if (asksUser) {
      return `${title}\u76ee\u524d\u7ad9\u5185\u8bc1\u636e\u66f4\u5f3a\u8c03\u7684\u662f${summary || role}\uff0c${role ? `\u6240\u4ee5\u5b83\u66f4\u9002\u5408\u7528\u6765\u5c55\u793a${role}\u8fd9\u7c7b\u7528\u6237\u573a\u666f\u6216\u80fd\u529b\u65b9\u5411\u3002` : '\u5b83\u7684\u7528\u6237\u6307\u5411\u8981\u7ed3\u5408\u5168\u6848\u4f8b\u9875\u518d\u770b\u66f4\u5b8c\u6574\u3002'}`;
    }
    return `${title}\u4e3b\u8981\u662f\u4e00\u4e2a${type || '\u9879\u76ee'}\u6848\u4f8b\uff0c\u6838\u5fc3\u5728${summary || source || role}${evidence ? `\uff0c${evidence}` : ''}\u3002`;
  }

  if (asksEvaluation) {
    if (candidate.projectId === 'palifood') {
      return `${title} is a polished mobile H5 food-recognition case for ${targetUser || 'users who want quick diet feedback'}. It targets the pain point that ${painPoint || 'manual logging is slow and feedback is fragmented'}, then uses ${solution || summary} to make the next action clearer.`;
    }
    return `${title} reads as a strong ${type || 'portfolio'} case. Its value is mainly in ${summary || role || source}.`;
  }
  if (asksProblem) {
    return `${title} is mainly framed as a ${type || 'project'} case around ${summary || source || role}.`;
  }
  if (asksUser) {
    return `${title} is grounded more in ${summary || role}, so it is best read through that audience and use-case lens.`;
  }
  return `${title} is mainly a ${type || 'project'} case centered on ${summary || source || role}.`;
}

function buildClarifyAnswer(ranked, lang) {
  const options = ranked
    .slice(0, 2)
    .map((candidate) => getLocalized(candidate.title, lang))
    .filter(Boolean);

  if (lang === 'zh') {
    return options.length
      ? `\u6211\u5148\u5e2e\u4f60\u9501\u5b9a\u4e24\u4e2a\u6700\u63a5\u8fd1\u7684\u9879\u76ee\uff1a${options.join('\u3001')}\u3002\u4f60\u60f3\u770b\u54ea\u4e00\u4e2a\uff1f`
      : '\u6211\u8fd8\u9700\u8981\u4f60\u518d\u8865\u4e00\u70b9\u5173\u952e\u8bcd\uff0c\u6bd4\u5982\u9879\u76ee\u540d\u3001\u7c7b\u578b\u6216\u4f60\u60f3\u770b\u7684\u65b9\u5411\u3002';
  }

  return options.length
    ? `I found two likely matches: ${options.join(' and ')}. Which one do you want?`
    : 'I need one more clue, like a project name, category, or capability direction.';
}

function normalizeRemoteDecision(data, candidates, query, lang, profile, knowledgeBase = []) {
  if (!data || data.mode === 'fallback' || !ALLOWED_MODES.has(data.mode)) return null;

  const ranked = rankCandidates(candidates, query);
  const rankedKnowledge = rankKnowledgeDocs(knowledgeBase, query);
  const knowledgeAnswer = buildKnowledgeAnswer(rankedKnowledge, query, lang);
  const intent = detectIntent(query, ranked);
  const candidateIds = new Set((candidates || []).map((candidate) => candidate.projectId).filter(Boolean));
  let projectId = typeof data.projectId === 'string' && candidateIds.has(data.projectId) ? data.projectId : null;
  const localTop = intent.top;
  const remoteCandidate = ranked.find((candidate) => candidate.projectId === projectId);

  if (
    localTop &&
    intent.hasStrongProject &&
    (!projectId || localTop.semanticScore - (remoteCandidate?.semanticScore || 0) >= 16)
  ) {
    projectId = localTop.projectId;
  }

  let relatedProjectIds = dedupeProjectIds(
    Array.isArray(data.relatedProjectIds) ? data.relatedProjectIds.filter((id) => candidateIds.has(id)) : projectId ? [projectId] : [],
    3
  );
  let mode = data.mode === 'not_found' ? 'refusal' : data.mode;

  if (
    !projectId &&
    localTop &&
    intent.hasStrongProject &&
    (mode === 'refusal' || mode === 'clarify' || looksLikeNoDataAnswer(data.answer))
  ) {
    projectId = localTop.projectId;
    mode = isPureNavigationIntent(intent) ? 'navigate' : 'answer_with_navigation';
  }

  if (projectId && mode === 'refusal' && intent.hasStrongProject) {
    mode = isPureNavigationIntent(intent) ? 'navigate' : 'answer_with_navigation';
  }
  if (projectId && isPureNavigationIntent(intent)) mode = 'navigate';
  if (projectId && mode === 'navigate' && !isPureNavigationIntent(intent)) mode = 'answer_with_navigation';
  if (projectId && mode === 'answer' && shouldAttachProjectNavigation(intent, mode)) mode = 'answer_with_navigation';
  if (mode === 'navigate' && !projectId) mode = 'clarify';
  if (mode === 'answer_with_navigation' && !projectId) mode = 'answer';
  if ((mode === 'navigate' || mode === 'answer_with_navigation') && projectId) {
    relatedProjectIds = [projectId];
  }
  if (mode === 'refusal') {
    projectId = null;
    relatedProjectIds = [];
  }

  const base = {
    mode,
    answer: cleanupAnswerText(data.answer),
    projectId,
    relatedProjectIds,
    reasoningSummary: Array.isArray(data.reasoningSummary) ? data.reasoningSummary.filter(Boolean).slice(0, 4).map(String) : [],
    confidence: typeof data.confidence === 'number' ? Math.max(0, Math.min(1, data.confidence)) : null,
  };

  if (
    knowledgeAnswer &&
    !base.projectId &&
    (base.mode === 'not_found' || base.mode === 'refusal' || looksLikeNoDataAnswer(base.answer) || (base.mode === 'answer' && rankedKnowledge[0]?.semanticScore >= 32))
  ) {
    base.mode = 'answer';
    base.answer = cleanupAnswerText(knowledgeAnswer);
    base.relatedProjectIds = [];
    base.reasoningSummary = ['site-knowledge-match', 'remote-corrected'];
    base.confidence = Math.max(base.confidence || 0, 0.78);
  }

  if ((!base.answer || looksLikeNoDataAnswer(base.answer)) && (base.mode === 'answer' || base.mode === 'answer_with_navigation')) {
    const candidate = candidates.find((item) => item.projectId === projectId) || ranked[0] || candidates[0];
    if (candidate) {
      base.answer = cleanupAnswerText(buildProjectAnswer(candidate, query, lang));
    } else if (base.mode === 'answer') {
      base.answer = cleanupAnswerText(buildProfileAnswer(profile, lang, query));
    }
  }

  if (!base.answer && base.mode === 'clarify') {
    base.answer = buildClarifyAnswer(rankCandidates(candidates, query), lang);
  }

  if (!base.answer && base.mode === 'refusal') {
    base.answer = buildRefusalAnswer(lang);
  }

  return base;
}

async function requestRemoteDecision(payload) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);

  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`agent_api_${response.status}`);
    }

    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

export function resolveAgentFallbackDecision({ query, lang = 'zh', profile, candidates = [], knowledgeBase = [] }) {
  const ranked = rankCandidates(candidates, query);
  const rankedKnowledge = rankKnowledgeDocs(knowledgeBase, query);
  const knowledgeAnswer = buildKnowledgeAnswer(rankedKnowledge, query, lang);
  const intent = detectIntent(query, ranked);
  const top = intent.top;
  const second = intent.second;

  if (intent.asksExternalRealtime && !intent.hasStrongProject && (!knowledgeAnswer || rankedKnowledge[0]?.semanticScore < 32)) {
    return {
      mode: 'refusal',
      answer: buildRefusalAnswer(lang),
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: ['external-realtime-out-of-scope', 'local-fallback'],
      confidence: 0.82,
    };
  }

  if (intent.asksGreeting && !intent.hasStrongProject) {
    return {
      mode: 'answer',
      answer: buildGreetingAnswer(profile, lang),
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: ['greeting', 'local-fallback'],
      confidence: 0.78,
    };
  }

  if (intent.asksProfile && (!intent.hasStrongProject || (top && second && top.semanticScore - second.semanticScore < 8))) {
    return {
      mode: 'answer',
      answer: knowledgeAnswer || buildProfileAnswer(profile, lang, query),
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: knowledgeAnswer ? ['site-knowledge-match', 'local-fallback'] : ['profile-intent', 'local-fallback'],
      confidence: knowledgeAnswer ? 0.8 : 0.72,
    };
  }

  if (knowledgeAnswer && (!top || !intent.hasStrongProject)) {
    return {
      mode: 'answer',
      answer: cleanupAnswerText(knowledgeAnswer),
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: ['site-knowledge-match', 'local-fallback'],
      confidence: 0.78,
    };
  }

  if (!top || !intent.hasStrongProject) {
    return {
      mode: 'refusal',
      answer:
        lang === 'zh'
          ? '\u6211\u8fd8\u6ca1\u5728\u7ad9\u5185\u8bc1\u636e\u91cc\u9501\u5b9a\u5230\u8db3\u591f\u51c6\u7684\u5bf9\u5e94\u9879\u76ee\uff0c\u4f60\u53ef\u4ee5\u518d\u8865\u4e00\u4e2a\u9879\u76ee\u540d\u3001\u65b9\u5411\u6216\u5173\u952e\u8bcd\u3002'
          : 'I could not lock onto a confident project match from the site data yet. Add a project name, direction, or keyword and I will narrow it down.',
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: ['no-strong-match', 'local-fallback'],
      confidence: 0.28,
    };
  }

  if (intent.ambiguousProject && !isPureNavigationIntent(intent)) {
    return {
      mode: 'clarify',
      answer: buildClarifyAnswer(ranked, lang),
      projectId: null,
      relatedProjectIds: dedupeProjectIds(ranked, 2),
      reasoningSummary: ['ambiguous-match', 'local-fallback'],
      confidence: 0.46,
    };
  }

  const answer = cleanupAnswerText(buildProjectAnswer(top, query, lang));
  const relatedProjectIds = top?.projectId ? [top.projectId] : [];

  if (isPureNavigationIntent(intent)) {
    return {
      mode: 'navigate',
      answer: '',
      projectId: top.projectId,
      relatedProjectIds,
      reasoningSummary: ['explicit-open', 'project-match', 'local-fallback'],
      confidence: 0.86,
    };
  }

  return {
    mode: 'answer_with_navigation',
    answer,
    projectId: top.projectId,
    relatedProjectIds,
    reasoningSummary: ['explain-first', intent.asksLocation ? 'location-intent' : 'project-intent', 'local-fallback'],
    confidence: intent.asksExplanation || intent.asksLocation ? 0.82 : 0.74,
  };
}

export async function requestAgentDecision(payload) {
  const normalizedPayload = {
    query: String(payload?.query || '').trim(),
    lang: payload?.lang === 'en' ? 'en' : 'zh',
    profile: payload?.profile || null,
    candidates: Array.isArray(payload?.candidates) ? payload.candidates.slice(0, 10) : [],
    knowledgeBase: Array.isArray(payload?.knowledgeBase)
      ? rankKnowledgeDocs(payload.knowledgeBase, payload?.query || '').slice(0, 18)
      : [],
  };

  if (!normalizedPayload.query) {
    return {
      mode: 'clarify',
      answer:
        normalizedPayload.lang === 'zh'
          ? '\u4f60\u53ef\u4ee5\u76f4\u63a5\u95ee\u9879\u76ee\u540d\u3001\u80fd\u529b\u65b9\u5411\uff0c\u6216\u8005\u60f3\u770b\u7684\u6848\u4f8b\u3002'
          : 'You can ask for a project, a capability, or a specific case.',
      projectId: null,
      relatedProjectIds: [],
      reasoningSummary: ['empty-query'],
      confidence: 0,
    };
  }

  try {
    const remote = await requestRemoteDecision(normalizedPayload);
    const remoteDecision = normalizeRemoteDecision(
      remote,
      normalizedPayload.candidates,
      normalizedPayload.query,
      normalizedPayload.lang,
      normalizedPayload.profile,
      normalizedPayload.knowledgeBase
    );
    if (remoteDecision) return remoteDecision;
  } catch (error) {
    console.warn('[agentClient] Falling back to local semantic resolver.', error);
  }

  return resolveAgentFallbackDecision(normalizedPayload);
}
