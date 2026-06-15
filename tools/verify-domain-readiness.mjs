import dns from 'node:dns/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import tls from 'node:tls';

const DEFAULT_TIMEOUT_MS = 10000;

const args = parseArgs(process.argv.slice(2));

if (args.help || !args.url) {
  printUsage();
  process.exit(args.help ? 0 : 1);
}

const target = normalizeTarget(args.url);
const timeoutMs = parseIntegerOption(args.timeout, DEFAULT_TIMEOUT_MS, {
  min: 1000,
  max: 60000,
  name: 'timeout',
});

const report = {
  target: target.toString(),
  generatedAt: new Date().toISOString(),
  networkViewpoint:
    'Current machine only. This checks DNS, TLS, and HTTP from the current network, not Hong Kong/Shenzhen reachability.',
  dns: null,
  tls: null,
  http: null,
  summary: null,
};

console.log('# Domain Readiness Verification');
console.log(`Target: ${target.toString()}`);
console.log('Network viewpoint: current machine only.');

report.dns = await checkDns(target.hostname);
printDns(report.dns);

if (target.protocol === 'https:') {
  report.tls = await checkTls(target.hostname, target.port || 443);
  printTls(report.tls);
} else if (!isLocalhost(target.hostname)) {
  report.tls = {
    skipped: true,
    reason: 'Target URL is not HTTPS. Public interview domains should use HTTPS.',
    errors: ['Public interview domains should use HTTPS.'],
  };
  console.log('\nTLS: skipped because target is not HTTPS.');
} else {
  report.tls = {
    skipped: true,
    reason: 'Localhost HTTP preview is accepted.',
    errors: [],
  };
  console.log('\nTLS: skipped for localhost HTTP preview.');
}

report.http = await checkHttp(target);
printHttp(report.http);

report.summary = summarize(report);
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

console.log('\nDomain readiness passed from the current network.');
console.log('Next proof required: run live URL verification and record Hong Kong/Shenzhen no-VPN checks.');

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
      case 'timeout':
      case 'timeout-ms':
        parsed.timeout = value;
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

function normalizeTarget(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withProtocol);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only http and https URLs are supported.');
    }
    return parsed;
  } catch (error) {
    console.error(`Invalid URL: ${value}`);
    if (error.message) console.error(error.message);
    process.exit(1);
  }
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
  npm run verify:domain -- https://your-domain.example
  npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md

Options:
  --timeout <ms>     HTTP/TLS timeout. Default: ${DEFAULT_TIMEOUT_MS}
  --report <path>    Write full JSON report
  --markdown <path>  Write human-readable Markdown report`);
}

async function checkDns(hostname) {
  const result = {
    hostname,
    lookup: [],
    cname: [],
    a: [],
    aaaa: [],
    errors: [],
  };

  if (isLocalhost(hostname)) {
    result.lookup.push({ address: hostname, family: hostname.includes(':') ? 6 : 4 });
    return result;
  }

  try {
    const lookupRecords = await dns.lookup(hostname, { all: true });
    result.lookup = lookupRecords.map((record) => ({ address: record.address, family: record.family }));
  } catch (error) {
    result.errors.push(`DNS lookup failed: ${error.message}`);
  }

  for (const [key, resolver] of [
    ['cname', () => dns.resolveCname(hostname)],
    ['a', () => dns.resolve4(hostname)],
    ['aaaa', () => dns.resolve6(hostname)],
  ]) {
    try {
      result[key] = await resolver();
    } catch (error) {
      if (!['ENODATA', 'ENOTFOUND', 'ENODOMAIN'].includes(error.code)) {
        result.errors.push(`${key.toUpperCase()} lookup failed: ${error.message}`);
      }
    }
  }

  if (result.lookup.length === 0) {
    result.errors.push('No DNS address records were resolved.');
  }

  return result;
}

async function checkTls(hostname, port) {
  if (isLocalhost(hostname)) {
    return { skipped: true, reason: 'Localhost TLS is not checked.', errors: [] };
  }

  return new Promise((resolvePromise) => {
    const socket = tls.connect({
      host: hostname,
      port,
      servername: hostname,
      rejectUnauthorized: false,
      timeout: timeoutMs,
    });

    socket.once('secureConnect', () => {
      const cert = socket.getPeerCertificate();
      const validToTime = cert.valid_to ? Date.parse(cert.valid_to) : Number.NaN;
      const daysRemaining = Number.isFinite(validToTime)
        ? Math.floor((validToTime - Date.now()) / 86400000)
        : null;
      const errors = [];

      if (!socket.authorized) {
        errors.push(`TLS certificate is not trusted: ${socket.authorizationError || 'unknown authorization error'}.`);
      }
      if (daysRemaining !== null && daysRemaining < 0) {
        errors.push('TLS certificate is expired.');
      }

      resolvePromise({
        authorized: socket.authorized,
        authorizationError: socket.authorizationError || null,
        subject: cert.subject || null,
        issuer: cert.issuer || null,
        validFrom: cert.valid_from || null,
        validTo: cert.valid_to || null,
        daysRemaining,
        fingerprint256: cert.fingerprint256 || null,
        errors,
      });
      socket.destroy();
    });

    socket.once('timeout', () => {
      resolvePromise({
        authorized: false,
        errors: [`TLS connection timed out after ${timeoutMs}ms.`],
      });
      socket.destroy();
    });

    socket.once('error', (error) => {
      resolvePromise({
        authorized: false,
        errors: [`TLS connection failed: ${error.message}`],
      });
      socket.destroy();
    });
  });
}

async function checkHttp(url) {
  const start = performance.now();
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'user-agent': 'portfolio-domain-readiness-verifier/1.0' },
    });

    const text = await response.text();
    const finalUrl = new URL(response.url);
    const errors = [];

    if (!response.ok) errors.push(`HTTP returned ${response.status}.`);
    if (url.protocol === 'https:' && finalUrl.protocol !== 'https:') {
      errors.push('Final URL is not HTTPS after redirects.');
    }
    if (!isLocalhost(url.hostname) && finalUrl.protocol !== 'https:') {
      errors.push('Public domain should resolve to HTTPS after redirects.');
    }

    return {
      requestedUrl: url.toString(),
      finalUrl: response.url,
      status: response.status,
      ok: response.ok,
      durationMs: Math.round(performance.now() - start),
      contentType: response.headers.get('content-type') || '',
      bytes: new TextEncoder().encode(text).byteLength,
      hasReactRoot: text.includes('<div id="root"'),
      errors,
    };
  } catch (error) {
    return {
      requestedUrl: url.toString(),
      finalUrl: null,
      status: null,
      ok: false,
      durationMs: Math.round(performance.now() - start),
      contentType: '',
      bytes: 0,
      hasReactRoot: false,
      errors: [`HTTP request failed: ${error.message}`],
    };
  }
}

function printDns(result) {
  console.log('\nDNS:');
  console.log(`- Lookup: ${result.lookup.map((record) => record.address).join(', ') || 'none'}`);
  console.log(`- CNAME: ${result.cname.join(', ') || 'none'}`);
  console.log(`- A: ${result.a.join(', ') || 'none'}`);
  console.log(`- AAAA: ${result.aaaa.join(', ') || 'none'}`);
  for (const error of result.errors) console.log(`- ERROR: ${error}`);
}

function printTls(result) {
  console.log('\nTLS:');
  if (result.skipped) {
    console.log(`- Skipped: ${result.reason}`);
  } else {
    console.log(`- Authorized: ${result.authorized ? 'yes' : 'no'}`);
    console.log(`- Valid to: ${result.validTo || 'unknown'}`);
    console.log(`- Days remaining: ${result.daysRemaining ?? 'unknown'}`);
  }
  for (const error of result.errors || []) console.log(`- ERROR: ${error}`);
}

function printHttp(result) {
  console.log('\nHTTP:');
  console.log(`- Status: ${result.status ?? 'ERR'}`);
  console.log(`- Final URL: ${result.finalUrl || 'none'}`);
  console.log(`- Duration: ${formatMs(result.durationMs)}`);
  console.log(`- Content-Type: ${result.contentType || 'unknown'}`);
  console.log(`- React root: ${result.hasReactRoot ? 'yes' : 'no'}`);
  for (const error of result.errors) console.log(`- ERROR: ${error}`);
}

function summarize(data) {
  const errors = [
    ...(data.dns?.errors || []),
    ...(data.tls?.errors || []),
    ...(data.http?.errors || []),
  ];

  return {
    passed: errors.length === 0,
    errors: [...new Set(errors)],
  };
}

function printSummary(summary) {
  console.log('\nSummary:');
  console.log(`- Passed: ${summary.passed ? 'yes' : 'no'}`);
  if (summary.errors.length > 0) {
    console.log('- Errors:');
    for (const error of summary.errors) console.log(`  - ${error}`);
  }
}

function renderMarkdownReport(data) {
  const lines = [
    '# Portfolio Domain Readiness Report',
    '',
    `- Target: ${data.target}`,
    `- Generated at: ${data.generatedAt}`,
    `- Network viewpoint: ${data.networkViewpoint}`,
    `- Passed: ${data.summary.passed ? 'yes' : 'no'}`,
    '',
    '## DNS',
    '',
    `- Lookup: ${data.dns.lookup.map((record) => record.address).join(', ') || 'none'}`,
    `- CNAME: ${data.dns.cname.join(', ') || 'none'}`,
    `- A: ${data.dns.a.join(', ') || 'none'}`,
    `- AAAA: ${data.dns.aaaa.join(', ') || 'none'}`,
    '',
    '## TLS',
    '',
  ];

  if (data.tls.skipped) {
    lines.push(`- Skipped: ${data.tls.reason}`);
  } else {
    lines.push(`- Authorized: ${data.tls.authorized ? 'yes' : 'no'}`);
    lines.push(`- Valid to: ${data.tls.validTo || 'unknown'}`);
    lines.push(`- Days remaining: ${data.tls.daysRemaining ?? 'unknown'}`);
  }

  lines.push('', '## HTTP', '');
  lines.push(`- Status: ${data.http.status ?? 'ERR'}`);
  lines.push(`- Final URL: ${data.http.finalUrl || 'none'}`);
  lines.push(`- Duration: ${formatMs(data.http.durationMs)}`);
  lines.push(`- Content-Type: ${data.http.contentType || 'unknown'}`);
  lines.push(`- React root: ${data.http.hasReactRoot ? 'yes' : 'no'}`);

  if (data.summary.errors.length > 0) {
    lines.push('', '## Errors', '');
    for (const error of data.summary.errors) lines.push(`- ${error}`);
  }

  lines.push('', '## Next Required Proof', '');
  lines.push('- Run repeated live URL verification against the HTTPS custom domain.');
  lines.push('- Record Hong Kong no-VPN access evidence.');
  lines.push('- Record Shenzhen/Mainland no-VPN repeated access evidence.');
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function formatMs(ms) {
  return `${Math.round(ms)}ms`;
}

function isLocalhost(hostname) {
  return ['localhost', '127.0.0.1', '::1'].includes(hostname);
}

async function writeOutputFile(filePath, content) {
  const absolutePath = resolve(filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, 'utf8');
}
