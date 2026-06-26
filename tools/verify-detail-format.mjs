import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const baseUrl = process.argv[2] || process.env.BASE_URL || 'http://127.0.0.1:4173/';
const saveScreenshots = process.env.SAVE_SCREENSHOTS === '1';
const outDir = path.join(rootDir, 'tmp', 'detail-format-verification-latest');

const visibleProjects = [
  { id: 'miro', triggerTitle: 'Miro AI Rehearsal System', detailTitle: 'Miro Rehearsal System', kind: 'digital' },
  { id: 'palifood', triggerTitle: 'Pai Li Shi', detailTitle: 'Pai Li Shi', kind: 'digital' },
  { id: 'libai', triggerTitle: 'Li Bai Interactive Website', detailTitle: 'Li Bai Interactive Website', kind: 'digital' },
  { id: 'tcm-kg', triggerTitle: 'TCM Knowledge Graph', detailTitle: 'TCM Knowledge Graph', kind: 'research' },
  { id: 'offer-quest', triggerTitle: 'Offer Quest', detailTitle: 'Offer Quest', kind: 'digital' },
  { id: 'sport', triggerTitle: 'Home Form Coach', detailTitle: 'Home Form Coach', kind: 'digital' },
  { id: 'momenta', triggerTitle: 'Momenta AI Music Interaction', detailTitle: 'Momenta AI Music Interaction', kind: 'digital' },
  {
    id: 'cross-ripple',
    triggerTitle: 'Cross-ripple Hydrotherapy Wearable',
    detailTitle: 'Cross-ripple Hydrotherapy Wearable',
    kind: 'product',
  },
  { id: 'cup-cup', triggerTitle: "The Cup's Cup", detailTitle: "The Cup's Cup", kind: 'product' },
  { id: 'opera-ruler', triggerTitle: 'Sichuan Opera Drawing Ruler', detailTitle: 'Sichuan Opera Drawing Ruler', kind: 'product' },
  { id: 'capstone-device', triggerTitle: 'Capstone AI Device Concept', detailTitle: 'Capstone AI Device Concept', kind: 'product' },
  {
    id: 'xiaomi-cmf',
    triggerTitle: 'Xiaomi Bone-conduction Earphones CMF',
    detailTitle: 'Xiaomi Bone-conduction Earphones CMF',
    kind: 'cmf',
  },
  { id: 'cat-turntable', triggerTitle: 'Composite Turntable Pet Toy', detailTitle: 'Composite Turntable Pet Toy', kind: 'product' },
  { id: 'smart-waste', triggerTitle: 'Smart Waste Tank', detailTitle: 'Smart Waste Tank', kind: 'product' },
  { id: 'baling-press', triggerTitle: 'Compression Baling Press', detailTitle: 'Compression Baling Press', kind: 'product' },
  { id: 'cmf-electronics', triggerTitle: 'CMF Electronics Archive', detailTitle: 'CMF Electronics Archive', kind: 'cmf' },
  { id: 'cbs5502', triggerTitle: 'Feel Disambiguation NLP', detailTitle: 'Feel Disambiguation NLP', kind: 'research' },
  { id: 'miro-governance', triggerTitle: 'Miro AI Governance Notes', detailTitle: 'Miro AI Governance Notes', kind: 'digital' },
  { id: 'tcm-systems', triggerTitle: 'Classical Formula Network', detailTitle: 'Classical Formula Network', kind: 'research' },
  { id: 'libai-data', triggerTitle: 'Li Bai Data Narrative', detailTitle: 'Li Bai Data Narrative', kind: 'research' },
  { id: 'food-health-model', triggerTitle: 'Food Health Feedback Model', detailTitle: 'Food Health Feedback Model', kind: 'research' },
];

const hiddenPendingProjects = [{ id: 'heart-bracelet', title: 'Heart Disease Bracelet Kit' }];

const viewports = [
  { name: 'desktop', width: 1488, height: 1058 },
  { name: 'mobile', width: 390, height: 844 },
];

function ensureOutputDir() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
}

async function openProject(page, project) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.evaluate((needle) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const target = [...document.querySelectorAll('button')].find((button) => {
      const aria = button.getAttribute('aria-label') || '';
      const text = normalize(button.textContent || '');
      return aria.includes(needle) || text.includes(needle);
    });
    if (!target) throw new Error(`Project trigger not found: ${needle}`);
    target.click();
  }, project.triggerTitle);
  await page.waitForSelector('.detail-page', { timeout: 12000 });
  await page.waitForSelector('.detail-title h1', { timeout: 12000 });
  await page.waitForSelector('.detail-media-grid figure:first-child', { timeout: 12000 });
  await page.waitForFunction(
    () => {
      const image = document.querySelector('.detail-media-grid figure:first-child img');
      return image?.complete && image.naturalWidth > 0;
    },
    null,
    { timeout: 12000 },
  );
}

async function collectDetailState(page) {
  return page.evaluate(() => {
    const title = document.querySelector('.detail-title h1');
    const titleRect = title?.getBoundingClientRect();
    const titleLineHeight = title ? Number.parseFloat(getComputedStyle(title).lineHeight) : 0;
    const hero = document.querySelector('.detail-hero');
    const heroRect = hero?.getBoundingClientRect();
    const meta = document.querySelector('.detail-meta');
    const metaRect = meta?.getBoundingClientRect();
    const media = document.querySelector('.detail-media-grid');
    const firstFigure = media?.querySelector('figure:first-child');
    const figureRect = firstFigure?.getBoundingClientRect();
    const image = firstFigure?.querySelector('img');
    const imageStyle = image ? getComputedStyle(image) : null;

    return {
      title: title?.textContent?.trim() || '',
      titleLines: titleRect && titleLineHeight ? Math.round(titleRect.height / titleLineHeight) : 0,
      metaRightColumn: Boolean(metaRect && heroRect && metaRect.left > heroRect.left + heroRect.width * 0.52),
      heroHeight: Math.round(heroRect?.height || 0),
      mediaClass: media?.className || '',
      figureClass: firstFigure?.className || '',
      figureW: Math.round(figureRect?.width || 0),
      figureH: Math.round(figureRect?.height || 0),
      objectFit: imageStyle?.objectFit || '',
      transform: imageStyle?.transform || '',
      imageLoaded: Boolean(image?.complete && image?.naturalWidth > 0),
      overflowX: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      hasHeader: Boolean(document.querySelector('.site-header')),
      hasAgent: Boolean(document.querySelector('.agent-orb')),
      hasEmail: Boolean(document.querySelector('.email-copy-button')),
    };
  });
}

function detailFlags(data, project, viewportName) {
  const flags = [];
  const isDigital = project.kind === 'digital';
  const isSourceContain = data.figureClass.includes('detail-media-source-contain');

  if (data.title !== project.detailTitle) flags.push(`title mismatch: ${data.title}`);
  if (!data.mediaClass.includes(`detail-media-${project.kind}`)) flags.push(`media kind mismatch: ${data.mediaClass}`);
  if (!data.imageLoaded) flags.push('first media did not load');
  if (!data.hasHeader || !data.hasAgent || !data.hasEmail) flags.push('global controls missing');
  if (data.overflowX !== 0) flags.push(`horizontal overflow ${data.overflowX}`);
  if (viewportName === 'desktop' && !data.metaRightColumn) flags.push('desktop metadata is not in the right column');
  if (viewportName === 'desktop' && data.heroHeight > 360) flags.push(`desktop hero too tall: ${data.heroHeight}`);
  if (data.titleLines > 2) flags.push(`${viewportName} title has ${data.titleLines} lines`);
  if (data.figureW < (viewportName === 'desktop' ? 1000 : 350)) flags.push(`media width too small: ${data.figureW}`);
  if (data.figureH < (viewportName === 'desktop' ? 700 : 600) && !(isSourceContain && viewportName === 'mobile')) {
    flags.push(`media height too small: ${data.figureH}`);
  }
  if (isDigital && data.transform === 'none') flags.push('digital/web media missing perspective transform');
  if (!isDigital && data.transform !== 'none') flags.push(`non-web media has perspective transform: ${data.transform}`);
  if (isDigital && data.objectFit !== 'contain') flags.push(`digital/web object-fit is ${data.objectFit}`);
  if (!isDigital && data.objectFit !== 'cover' && !(isSourceContain && data.objectFit === 'contain')) {
    flags.push(`non-web object-fit is ${data.objectFit}`);
  }

  return flags;
}

async function homepageHasHiddenProject(page, title) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  return page.evaluate((needle) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    return [...document.querySelectorAll('button')].some((button) => {
      const aria = button.getAttribute('aria-label') || '';
      const text = normalize(button.textContent || '');
      return aria.includes(needle) || text.includes(needle);
    });
  }, title);
}

async function relatedHasHiddenProject(page, hiddenTitle) {
  const crossRipple = visibleProjects.find((project) => project.id === 'cross-ripple');
  await openProject(page, crossRipple);
  await page.waitForSelector('.related-grid', { timeout: 12000 });
  return page.evaluate((needle) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    return [...document.querySelectorAll('.related-grid button')].some((button) =>
      normalize(button.textContent || '').includes(needle),
    );
  }, hiddenTitle);
}

async function main() {
  ensureOutputDir();
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });

    for (const project of visibleProjects) {
      await openProject(page, project);
      const data = await collectDetailState(page);
      const flags = detailFlags(data, project, viewport.name);
      const screenshot = `${viewport.name}-${project.id}.png`;
      if (saveScreenshots) await page.screenshot({ path: path.join(outDir, screenshot), fullPage: false });
      results.push({ viewport: viewport.name, id: project.id, screenshot: saveScreenshots ? screenshot : null, ...data, flags });
    }

    for (const project of hiddenPendingProjects) {
      const visibleOnHome = await homepageHasHiddenProject(page, project.title);
      const visibleInRelated = await relatedHasHiddenProject(page, project.title);
      const flags = [];
      if (visibleOnHome) flags.push('source-pending project appears on homepage');
      if (visibleInRelated) flags.push('source-pending project appears in related links');
      results.push({
        viewport: viewport.name,
        id: project.id,
        title: project.title,
        hiddenPendingExpected: true,
        visibleOnHome,
        visibleInRelated,
        flags,
      });
    }

    await page.close();
  }

  await browser.close();

  const summary = {
    baseUrl,
    checked: results.length,
    visibleProjectCount: visibleProjects.length,
    hiddenPendingCount: hiddenPendingProjects.length,
    issueCount: results.reduce((sum, item) => sum + item.flags.length, 0),
    issues: results
      .filter((item) => item.flags.length)
      .map((item) => ({ viewport: item.viewport, id: item.id, title: item.title, flags: item.flags })),
  };

  fs.writeFileSync(path.join(outDir, 'detail-format-results.json'), JSON.stringify(results, null, 2));
  fs.writeFileSync(path.join(outDir, 'detail-format-summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));

  if (summary.issueCount > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
