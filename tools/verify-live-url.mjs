import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const DEFAULT_TIMEOUT_MS = 12000;
const DEFAULT_ASSET_TIMEOUT_MS = 15000;
const MAX_REPEAT = 30;

const args = parseArgs(process.argv.slice(2));

if (args.help || !args.url) {
  printUsage();
  process.exit(args.help ? 0 : 1);
}

let target;
try {
  target = new URL(args.url);
} catch {
  console.error(`Invalid URL: ${args.url}`);
  process.exit(1);
}

if (!['http:', 'https:'].includes(target.protocol)) {
  console.error('Only http and https URLs are supported.');
  process.exit(1);
}

const repeat = parseIntegerOption(args.repeat, 1, { min: 1, max: MAX_REPEAT, name: 'repeat' });
const intervalMs = parseIntegerOption(args.interval, 0, { min: 0, max: 60000, name: 'interval' });
const timeoutMs = parseIntegerOption(args.timeout, DEFAULT_TIMEOUT_MS, { min: 1000, max: 60000, name: 'timeout' });
const assetTimeoutMs = parseIntegerOption(args.assetTimeout, DEFAULT_ASSET_TIMEOUT_MS, {
  min: 1000,
  max: 90000,
  name: 'asset-timeout',
});

const report = {
  target: target.toString(),
  generatedAt: new Date().toISOString(),
  networkViewpoint:
    'Current machine only. Hong Kong and Shenzhen/Mainland proof requires real no-VPN network tests.',
  options: {
    repeat,
    intervalMs,
    timeoutMs,
    assetTimeoutMs,
  },
  samples: [],
  summary: null,
};

console.log('# Live URL Verification');
console.log(`Target: ${target.toString()}`);
console.log(`Samples: ${repeat}`);
console.log(
  'Network viewpoint: current machine only. Hong Kong/Shenzhen proof still requires real network tests.',
);

for (let index = 0; index < repeat; index += 1) {
  const sample = await runVerificationSample(index + 1);
  report.samples.push(sample);
  printSample(sample);

  if (index < repeat - 1 && intervalMs > 0) {
    await delay(intervalMs);
  }
}

report.summary = summarize(report.samples);
printSummary(report.summary);

if (args.report) {
  await writeOutputFile(args.report, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`JSON report written: ${resolve(args.report)}`);
}

if (args.markdown) {
  await writeOutputFile(args.markdown, renderMarkdownReport(report));
  console.log(`Markdown report written: ${resolve(args.markdown)}`);
}

if (!report.summary.passed) {
  process.exit(1);
}

console.log('\nVerification passed from the current network.');
console.log('Next proof required: open and verify the same URL from Hong Kong and Shenzhen/Mainland China without VPN.');

function parseArgs(rawArgs) {
  const parsed = {};
  const positionals = [];

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      positionals.push(arg);
      continue;
    }

    const [flag, inlineValue] = arg.slice(2).split(/=(.*)/s, 2);
    const normalized = flag.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    let value = inlineValue;

    if (value === undefined) {
      const next = rawArgs[index + 1];
      if (!next || next.startsWith('--')) {
        console.error(`Option --${flag} requires a value.`);
        process.exit(1);
      }
      value = next;
      index += 1;
    }

    switch (normalized) {
      case 'repeat':
        parsed.repeat = value;
        break;
      case 'interval':
      case 'interval-ms':
        parsed.interval = value;
        break;
      case 'timeout':
      case 'timeout-ms':
        parsed.timeout = value;
        break;
      case 'asset-timeout':
      case 'asset-timeout-ms':
        parsed.assetTimeout = value;
        break;
      case 'report':
        parsed.report = value;
        break;
      case 'markdown':
      case 'md':
        parsed.markdown = value;
        break;
      default:
        console.error(`Unknown option: --${flag}`);
        process.exit(1);
    }
  }

  parsed.url = positionals[0];
  return parsed;
}

function parseIntegerOption(value, fallback, options) {
  if (value === undefined || value === null) return fallback;
  const number = Number.parseInt(String(value), 10);
  if (!Number.isFinite(number) || String(number) !== String(value).trim()) {
    console.error(`Option --${options.name} must be an integer.`);
    process.exit(1);
  }
  if (number < options.min || number > options.max) {
    console.error(`Option --${options.name} must be between ${options.min} and ${options.max}.`);
    process.exit(1);
  }
  return number;
}

function printUsage() {
  console.log(`Usage:
  npm run verify:url -- https://your-domain.example
  npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000
  npm run verify:url -- https://your-domain.example --repeat 5 --report release/live-check.json --markdown release/live-check.md

Options:
  --repeat <n>          Number of verification samples, 1-${MAX_REPEAT}. Default: 1
  --interval <ms>       Delay between samples. Default: 0
  --timeout <ms>        Home page timeout. Default: ${DEFAULT_TIMEOUT_MS}
  --asset-timeout <ms>  Critical asset timeout. Default: ${DEFAULT_ASSET_TIMEOUT_MS}
  --report <path>       Write full JSON report
  --markdown <path>     Write human-readable Markdown report`);
}

function formatMs(ms) {
  return `${Math.round(ms)}ms`;
}

async function fetchWithTiming(url, options = {}) {
  const start = performance.now();
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(options.timeout || DEFAULT_TIMEOUT_MS),
    headers: { 'user-agent': 'portfolio-live-url-verifier/1.1' },
  });
  const buffer = await response.arrayBuffer();
  return {
    requestedUrl: url,
    finalUrl: response.url,
    status: response.status,
    ok: response.ok,
    bytes: buffer.byteLength,
    durationMs: Math.round(performance.now() - start),
    contentType: response.headers.get('content-type') || '',
    cacheControl: response.headers.get('cache-control') || '',
    text: options.text ? new TextDecoder().decode(buffer) : '',
  };
}

function extractAssetPaths(html) {
  const paths = new Set();
  const patterns = [/(?:src|href)=["']([^"']+)["']/g, /url\(["']?([^"')]+)["']?\)/g];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const value = match[1];
      if (!value || value.startsWith('data:') || value.startsWith('#')) continue;
      try {
        const assetUrl = new URL(value, target).toString();
        if (new URL(assetUrl).origin === target.origin) paths.add(assetUrl);
      } catch {
        // Ignore malformed non-critical references.
      }
    }
  }

  return [...paths];
}

async function runVerificationSample(sampleIndex) {
  const startedAt = new Date().toISOString();
  const errors = [];
  const assets = [];
  let home = null;

  try {
    home = await fetchWithTiming(target.toString(), { text: true, timeout: timeoutMs });
  } catch (error) {
    errors.push(`Home request failed: ${error.message}`);
  }

  if (home) {
    if (!home.ok) errors.push(`Home returned HTTP ${home.status}.`);
    if (!/text\/html/i.test(home.contentType)) {
      errors.push(`Home content-type is not HTML: ${home.contentType || 'missing'}.`);
    }
    if (!home.text.includes('<div id="root"')) {
      errors.push('Home HTML does not include the React root element.');
    }

    const initialAssets = extractAssetPaths(home.text);
    const criticalAssets = [
      ...initialAssets.filter((url) => /\.(js|css)(\?|$)/i.test(url)),
      new URL('/hero-ribbon-loop.mp4', target).toString(),
    ];
    const uniqueCriticalAssets = [...new Set(criticalAssets)].slice(0, 12);

    for (const assetUrl of uniqueCriticalAssets) {
      try {
        const asset = await fetchWithTiming(assetUrl, { timeout: assetTimeoutMs });
        assets.push(toAssetResult(asset));
        if (!asset.ok) errors.push(`${new URL(asset.finalUrl).pathname} returned HTTP ${asset.status}.`);
      } catch (error) {
        assets.push({
          requestedUrl: assetUrl,
          finalUrl: assetUrl,
          path: new URL(assetUrl).pathname,
          status: null,
          ok: false,
          bytes: 0,
          durationMs: null,
          contentType: '',
          cacheControl: '',
          error: error.message,
        });
        errors.push(`${assetUrl} failed: ${error.message}`);
      }
      await delay(100);
    }
  }

  const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(target.hostname);
  if (target.protocol !== 'https:' && !isLocalhost) {
    errors.push('The public URL should use HTTPS for interview use.');
  }

  return {
    index: sampleIndex,
    startedAt,
    finishedAt: new Date().toISOString(),
    passed: errors.length === 0,
    home: home ? toHomeResult(home) : null,
    assets,
    errors,
  };
}

function toHomeResult(home) {
  const { text, ...rest } = home;
  return {
    ...rest,
    path: new URL(home.finalUrl).pathname,
  };
}

function toAssetResult(asset) {
  return {
    requestedUrl: asset.requestedUrl,
    finalUrl: asset.finalUrl,
    path: new URL(asset.finalUrl).pathname,
    status: asset.status,
    ok: asset.ok,
    bytes: asset.bytes,
    durationMs: asset.durationMs,
    contentType: asset.contentType,
    cacheControl: asset.cacheControl,
  };
}

function printSample(sample) {
  const marker = sample.passed ? 'PASS' : 'FAIL';
  console.log(`\nSample ${sample.index}: ${marker}`);

  if (!sample.home) {
    for (const error of sample.errors) console.log(`- ${error}`);
    return;
  }

  console.log(
    `Home: ${sample.home.status} ${sample.home.contentType || 'unknown'} ${formatMs(sample.home.durationMs)} ${sample.home.bytes} bytes`,
  );
  console.log(`Critical assets checked: ${sample.assets.length}`);

  for (const asset of sample.assets) {
    const status = asset.ok ? 'OK' : 'FAIL';
    const duration = asset.durationMs === null ? 'n/a' : formatMs(asset.durationMs);
    const statusCode = asset.status ?? 'ERR';
    console.log(`- ${status} ${statusCode} ${asset.path} ${duration} ${asset.bytes} bytes`);
  }

  if (sample.errors.length > 0) {
    console.log('Errors:');
    for (const error of sample.errors) console.log(`- ${error}`);
  }
}

function summarize(samples) {
  const passedSamples = samples.filter((sample) => sample.passed);
  const failedSamples = samples.filter((sample) => !sample.passed);
  const homeDurations = samples
    .map((sample) => sample.home?.durationMs)
    .filter((duration) => Number.isFinite(duration));
  const assetFailures = samples.flatMap((sample) => sample.assets.filter((asset) => !asset.ok));

  return {
    passed: failedSamples.length === 0,
    sampleCount: samples.length,
    passedCount: passedSamples.length,
    failedCount: failedSamples.length,
    homeDurationMs: {
      min: homeDurations.length ? Math.min(...homeDurations) : null,
      median: percentile(homeDurations, 0.5),
      p95: percentile(homeDurations, 0.95),
      max: homeDurations.length ? Math.max(...homeDurations) : null,
    },
    assetFailureCount: assetFailures.length,
    errors: [...new Set(samples.flatMap((sample) => sample.errors))],
  };
}

function percentile(values, ratio) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);
  return sorted[index];
}

function printSummary(summary) {
  console.log('\nSummary:');
  console.log(`- Samples passed: ${summary.passedCount}/${summary.sampleCount}`);
  console.log(`- Asset failures: ${summary.assetFailureCount}`);
  if (summary.homeDurationMs.median !== null) {
    console.log(
      `- Home timing: min ${formatMs(summary.homeDurationMs.min)}, median ${formatMs(
        summary.homeDurationMs.median,
      )}, p95 ${formatMs(summary.homeDurationMs.p95)}, max ${formatMs(summary.homeDurationMs.max)}`,
    );
  }

  if (summary.errors.length > 0) {
    console.error('\nVerification failed:');
    for (const error of summary.errors) console.error(`- ${error}`);
  }
}

function renderMarkdownReport(data) {
  const lines = [
    '# Portfolio Live URL Verification Report',
    '',
    `- Target: ${data.target}`,
    `- Generated at: ${data.generatedAt}`,
    `- Network viewpoint: ${data.networkViewpoint}`,
    `- Samples: ${data.summary.passedCount}/${data.summary.sampleCount} passed`,
    `- Asset failures: ${data.summary.assetFailureCount}`,
    '',
    '## Timing',
    '',
    '| Metric | Value |',
    '|---|---:|',
    `| Home min | ${formatOptionalMs(data.summary.homeDurationMs.min)} |`,
    `| Home median | ${formatOptionalMs(data.summary.homeDurationMs.median)} |`,
    `| Home p95 | ${formatOptionalMs(data.summary.homeDurationMs.p95)} |`,
    `| Home max | ${formatOptionalMs(data.summary.homeDurationMs.max)} |`,
    '',
    '## Samples',
    '',
  ];

  for (const sample of data.samples) {
    lines.push(`### Sample ${sample.index}: ${sample.passed ? 'PASS' : 'FAIL'}`);
    lines.push('');
    if (sample.home) {
      lines.push(
        `- Home: HTTP ${sample.home.status}, ${formatMs(sample.home.durationMs)}, ${sample.home.bytes} bytes`,
      );
      lines.push(`- Critical assets checked: ${sample.assets.length}`);
    }
    if (sample.errors.length > 0) {
      lines.push('- Errors:');
      for (const error of sample.errors) lines.push(`  - ${error}`);
    }
    lines.push('');
  }

  lines.push('## Manual No-VPN Proof Still Required');
  lines.push('');
  lines.push('- Hong Kong network: open the same custom domain without VPN and record pass/fail, time, ISP/network.');
  lines.push('- Shenzhen/Mainland network: open the same custom domain without VPN and record pass/fail, time, ISP/network.');
  lines.push('- The automated result above only proves the current machine viewpoint.');
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function formatOptionalMs(value) {
  return value === null ? 'n/a' : formatMs(value);
}

async function writeOutputFile(filePath, content) {
  const absolutePath = resolve(filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, 'utf8');
}
