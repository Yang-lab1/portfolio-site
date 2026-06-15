import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');

const textExtensions = new Set([
  '.html',
  '.css',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.svg',
  '.txt',
  '.xml',
  '.webmanifest',
]);

const deployAssetExtensions = new Set([
  '.css',
  '.gif',
  '.jpeg',
  '.jpg',
  '.js',
  '.m4v',
  '.mp4',
  '.png',
  '.webm',
  '.webp',
]);

const blockedOrRiskyHosts = [
  /(^|\.)fonts\.googleapis\.com$/i,
  /(^|\.)fonts\.gstatic\.com$/i,
  /(^|\.)gstatic\.com$/i,
  /(^|\.)google-analytics\.com$/i,
  /(^|\.)googletagmanager\.com$/i,
  /(^|\.)youtube\.com$/i,
  /(^|\.)youtu\.be$/i,
  /(^|\.)vimeo\.com$/i,
  /(^|\.)unpkg\.com$/i,
  /(^|\.)jsdelivr\.net$/i,
  /(^|\.)twitter\.com$/i,
  /(^|\.)x\.com$/i,
  /(^|\.)facebook\.net$/i,
  /(^|\.)facebook\.com$/i,
];

const ignoreDirs = new Set(['node_modules', '.git', 'remotion-hero']);
const urlPattern = /https?:\/\/[^\s"'<>`\\)\],\uFF0C\u3002\uFF1B;\u3001]+/g;

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(entryPath, files = []) {
  if (!fs.existsSync(entryPath)) return files;

  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    const name = path.basename(entryPath);
    if (ignoreDirs.has(name)) return files;
    for (const child of fs.readdirSync(entryPath)) {
      walk(path.join(entryPath, child), files);
    }
    return files;
  }

  if (stat.isFile()) files.push(entryPath);
  return files;
}

function toRelative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, '/');
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function cleanUrl(rawUrl) {
  return rawUrl.replace(/[.,;:!?]+$/g, '');
}

function hostRisk(rawUrl) {
  try {
    const host = new URL(rawUrl).hostname.toLowerCase();
    if (host === 'www.w3.org') return { host, severity: 'ignore' };
    const isBlocked = blockedOrRiskyHosts.some((pattern) => pattern.test(host));
    return { host, severity: isBlocked ? 'error' : 'review' };
  } catch {
    return { host: 'invalid-url', severity: 'review' };
  }
}

function scanRuntimeUrls() {
  const scanEntries = ['index.html', 'src'];
  if (exists('dist')) scanEntries.push('dist');

  const results = [];

  for (const entry of scanEntries) {
    const fullPath = path.join(root, entry);
    for (const file of walk(fullPath)) {
      const ext = path.extname(file).toLowerCase();
      if (!textExtensions.has(ext)) continue;

      const text = fs.readFileSync(file, 'utf8');
      for (const match of text.matchAll(urlPattern)) {
        const url = cleanUrl(match[0]);
        const risk = hostRisk(url);
        if (risk.severity !== 'ignore') {
          results.push({
            file: toRelative(file),
            host: risk.host,
            severity: risk.severity,
            url,
          });
        }
      }
    }
  }

  const seen = new Set();
  return results.filter((item) => {
    const key = `${item.file}|${item.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function assetThreshold(filePath, bytes) {
  const ext = path.extname(filePath).toLowerCase();

  if (['.mp4', '.webm', '.m4v'].includes(ext)) {
    if (bytes > 5 * 1024 * 1024) return 'error';
    if (bytes > 2 * 1024 * 1024) return 'warn';
    return 'ok';
  }

  if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
    if (bytes > 2 * 1024 * 1024) return 'error';
    if (bytes > 500 * 1024) return 'warn';
    return 'ok';
  }

  if (['.js', '.css'].includes(ext)) {
    if (bytes > 600 * 1024) return 'error';
    if (bytes > 300 * 1024) return 'warn';
    return 'ok';
  }

  return 'ok';
}

function scanDeployAssets() {
  const assetRoot = exists('dist') ? path.join(root, 'dist') : path.join(root, 'public');
  const assets = [];

  for (const file of walk(assetRoot)) {
    const ext = path.extname(file).toLowerCase();
    if (!deployAssetExtensions.has(ext)) continue;

    const bytes = fs.statSync(file).size;
    const severity = assetThreshold(file, bytes);
    assets.push({
      file: toRelative(file),
      bytes,
      severity,
    });
  }

  assets.sort((a, b) => b.bytes - a.bytes);
  return assets;
}

function printSection(title) {
  console.log(`\n## ${title}`);
}

const runtimeUrls = scanRuntimeUrls();
const riskyRuntimeUrls = runtimeUrls.filter((item) => item.severity === 'error');
const reviewRuntimeUrls = runtimeUrls.filter((item) => item.severity === 'review');

const assets = scanDeployAssets();
const largeAssets = assets.filter((asset) => asset.severity !== 'ok');
const totalDeployBytes = assets.reduce((sum, asset) => sum + asset.bytes, 0);
const strictFailures = riskyRuntimeUrls.length + largeAssets.filter((asset) => asset.severity === 'error').length;

console.log('# China / Hong Kong Deployment Readiness Audit');
console.log(`Project: ${root}`);
console.log(`Mode: ${strict ? 'strict' : 'report-only'}`);
console.log(`Deploy asset basis: ${exists('dist') ? 'dist' : 'public'}`);
console.log(`Deploy asset total: ${formatBytes(totalDeployBytes)}`);

printSection('Runtime URL Check');
if (runtimeUrls.length === 0) {
  console.log('PASS: No external runtime URLs found in checked app files.');
} else {
  if (riskyRuntimeUrls.length > 0) {
    console.log(`ERROR: ${riskyRuntimeUrls.length} blocked/risky runtime URL(s) found.`);
    for (const item of riskyRuntimeUrls) {
      console.log(`- ${item.file}: ${item.url}`);
    }
  } else {
    console.log('PASS: No known blocked runtime URL hosts found.');
  }

  if (reviewRuntimeUrls.length > 0) {
    console.log(`REVIEW: ${reviewRuntimeUrls.length} external URL reference(s) should stay non-critical.`);
    for (const item of reviewRuntimeUrls.slice(0, 12)) {
      console.log(`- ${item.file}: ${item.url}`);
    }
    if (reviewRuntimeUrls.length > 12) {
      console.log(`- ... ${reviewRuntimeUrls.length - 12} more`);
    }
  }
}

printSection('Asset Weight Check');
if (largeAssets.length === 0) {
  console.log('PASS: No deploy assets exceed the current China-readiness thresholds.');
} else {
  console.log(`REVIEW: ${largeAssets.length} asset(s) exceed recommended size thresholds.`);
  for (const asset of largeAssets.slice(0, 20)) {
    console.log(`- ${asset.severity.toUpperCase()}: ${asset.file} (${formatBytes(asset.bytes)})`);
  }
  if (largeAssets.length > 20) {
    console.log(`- ... ${largeAssets.length - 20} more`);
  }
}

printSection('Recommendation');
console.log('- Keep the production build fully static and self-contained.');
console.log('- Use one custom domain; start with Hong Kong static hosting, then test from Shenzhen without VPN.');
console.log('- If Shenzhen reliability must be guaranteed, plan ICP plus Mainland static hosting/CDN behind the same domain.');
if (largeAssets.some((asset) => asset.severity === 'error')) {
  console.log('- Before public launch, compress the error-level video/image assets, then rerun this audit in strict mode.');
} else if (largeAssets.length > 0) {
  console.log('- No strict asset blockers remain; warn-level files can be optimized later if real-network tests are slow.');
} else {
  console.log('- No asset-size blockers remain in this audit.');
}

if (strict && strictFailures > 0) {
  console.error(`\nStrict mode failed: ${strictFailures} high-risk item(s) remain.`);
  process.exit(1);
}
