import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_OUTPUT = 'deployment_evidence.json';
const DEFAULT_PROVIDER = 'EdgeOne Pages';
const DEFAULT_REGION = 'global excluding Chinese mainland';
const DEFAULT_COST_PLAN = 'free or low-cost';
const DEFAULT_ICP_STATUS = 'none';
const DEFAULT_DOMAIN_REPORT = 'release/domain-check.json';
const DEFAULT_LIVE_REPORT = 'release/live-domain-check.json';
const PREVIEW_HOSTS = [
  'vercel.app',
  'pages.dev',
  'netlify.app',
  'github.io',
  'web.app',
  'firebaseapp.com',
];

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printUsage();
  process.exit(0);
}

if (!args.url) {
  console.error('Missing required --url value.');
  printUsage();
  process.exit(1);
}

const root = process.cwd();
const publicUrl = normalizeUrl(args.url);
const outputPath = path.resolve(root, args.output || DEFAULT_OUTPUT);
const outputDir = path.dirname(outputPath);
const domainReportCommandPath = normalizePath(args.domainReport || DEFAULT_DOMAIN_REPORT);
const liveReportCommandPath = normalizePath(args.liveReport || DEFAULT_LIVE_REPORT);

if (fs.existsSync(outputPath) && !args.force) {
  console.error(`Output already exists: ${outputPath}`);
  console.error('Use --force to overwrite it.');
  process.exit(1);
}

const packagePath = args.package || findLatestReleasePackage(root) || 'TODO: release/portfolio-site-china-YYYYMMDD-HHMMSS.zip';
const usesDefaultPreviewDomain =
  args.usesDefaultPreviewDomain ?? PREVIEW_HOSTS.some((host) => publicUrl.hostname === host || publicUrl.hostname.endsWith(`.${host}`));

const evidence = {
  schemaVersion: 1,
  publicUrl: publicUrl.toString(),
  hosting: {
    provider: args.provider || DEFAULT_PROVIDER,
    regionOrAvailabilityZone: args.region || DEFAULT_REGION,
    package: toEvidenceRelativePath(packagePath, outputDir),
    costPlan: args.costPlan || DEFAULT_COST_PLAN,
    usesDefaultPreviewDomain,
    icpStatus: args.icpStatus || DEFAULT_ICP_STATUS,
  },
  automatedReports: {
    domainReadinessJson: toEvidenceRelativePath(args.domainReport || DEFAULT_DOMAIN_REPORT, outputDir),
    liveUrlJson: toEvidenceRelativePath(args.liveReport || DEFAULT_LIVE_REPORT, outputDir),
  },
  regionalChecks: {
    hongKong: {
      vpnDisabled: Boolean(args.hkVpnDisabled),
      result: args.hkResult || 'TODO: pass/fail',
      checkedAt: args.hkCheckedAt || 'TODO: YYYY-MM-DDTHH:mm:ss+08:00',
      networkOrIsp: args.hkNetwork || 'TODO: Hong Kong network / ISP',
      approxFirstLoadSeconds: parseOptionalNumber(args.hkLoadSeconds, 0, 'hk-load-seconds'),
      evidence: args.hkEvidence || 'TODO: screenshot, screen recording, or tester note path',
    },
    shenzhenMainland: {
      vpnDisabled: Boolean(args.szVpnDisabled),
      result: args.szResult || 'TODO: pass/fail',
      checkedAt: args.szCheckedAt || 'TODO: YYYY-MM-DDTHH:mm:ss+08:00',
      networkOrIsp: args.szNetwork || 'TODO: Shenzhen/Mainland network / ISP',
      approxFirstLoadSeconds: parseOptionalNumber(args.szLoadSeconds, 0, 'sz-load-seconds'),
      repeatedOpensPassed: Boolean(args.szRepeatedOpensPassed),
      evidence: args.szEvidence || 'TODO: screenshot, screen recording, or tester note path',
    },
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');

console.log('# Deployment Evidence Scaffold');
console.log(`Evidence: ${outputPath}`);
console.log(`URL: ${publicUrl.toString()}`);
console.log(`Package: ${evidence.hosting.package}`);

if (usesDefaultPreviewDomain) {
  console.log('\nWarning: the URL looks like a provider default preview domain. The launch gate will reject it.');
}

console.log('\nNext commands after DNS and HTTPS are live:');
console.log(
  `cmd /c npm run verify:domain -- ${publicUrl.toString()} --report ${domainReportCommandPath} --markdown release/domain-check.md`,
);
console.log(
  `cmd /c npm run verify:url -- ${publicUrl.toString()} --repeat 5 --interval 2000 --report ${liveReportCommandPath} --markdown release/live-domain-check.md`,
);
console.log(`cmd /c npm run verify:launch-goal -- --evidence ${normalizePath(path.relative(root, outputPath))}`);
console.log('\nFill the Hong Kong and Shenzhen/Mainland no-VPN evidence before expecting the launch gate to pass.');

function parseArgs(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      if (!parsed.url) parsed.url = arg;
      continue;
    }

    const [rawFlag, inlineValue] = arg.slice(2).split(/=(.*)/s, 2);
    const flag = normalizeFlag(rawFlag);

    if (['force', 'hk-vpn-disabled', 'sz-vpn-disabled', 'sz-repeated-opens-passed'].includes(flag)) {
      parsed[toCamelCase(flag)] = true;
      continue;
    }

    let value = inlineValue;
    if (value === undefined) {
      const next = rawArgs[index + 1];
      if (!next || next.startsWith('--')) {
        console.error(`Option --${rawFlag} requires a value.`);
        process.exit(1);
      }
      value = next;
      index += 1;
    }

    switch (flag) {
      case 'url':
      case 'output':
      case 'provider':
      case 'region':
      case 'package':
      case 'cost-plan':
      case 'icp-status':
      case 'domain-report':
      case 'live-report':
      case 'hk-result':
      case 'hk-checked-at':
      case 'hk-network':
      case 'hk-load-seconds':
      case 'hk-evidence':
      case 'sz-result':
      case 'sz-checked-at':
      case 'sz-network':
      case 'sz-load-seconds':
      case 'sz-evidence':
        parsed[toCamelCase(flag)] = value;
        break;
      case 'uses-default-preview-domain':
        parsed.usesDefaultPreviewDomain = parseBoolean(value, rawFlag);
        break;
      default:
        console.error(`Unknown option: --${rawFlag}`);
        process.exit(1);
    }
  }

  return parsed;
}

function printUsage() {
  console.log(`Usage:
  npm run generate:evidence -- --url https://portfolio.your-domain.com
  npm run generate:evidence -- --url https://portfolio.your-domain.com --output deployment_evidence.json

Options:
  --url <url>                         Required HTTPS custom-domain URL
  --output <path>                     Evidence JSON path. Default: ${DEFAULT_OUTPUT}
  --force                             Overwrite an existing output file
  --provider <name>                   Default: ${DEFAULT_PROVIDER}
  --region <name>                     Default: ${DEFAULT_REGION}
  --package <path>                    Default: newest release/portfolio-site-china-*.zip
  --cost-plan <text>                  Default: ${DEFAULT_COST_PLAN}
  --icp-status <text>                 Default: ${DEFAULT_ICP_STATUS}
  --domain-report <path>              Default: ${DEFAULT_DOMAIN_REPORT}
  --live-report <path>                Default: ${DEFAULT_LIVE_REPORT}
  --hk-vpn-disabled                   Set Hong Kong vpnDisabled to true
  --hk-result <pass|fail>             Hong Kong manual result
  --hk-checked-at <iso-date>          Hong Kong test time
  --hk-network <text>                 Hong Kong network or ISP
  --hk-load-seconds <number>          Hong Kong first-load estimate
  --hk-evidence <path-or-note>        Hong Kong proof
  --sz-vpn-disabled                   Set Shenzhen/Mainland vpnDisabled to true
  --sz-result <pass|fail>             Shenzhen/Mainland manual result
  --sz-checked-at <iso-date>          Shenzhen/Mainland test time
  --sz-network <text>                 Shenzhen/Mainland network or ISP
  --sz-load-seconds <number>          Shenzhen/Mainland first-load estimate
  --sz-repeated-opens-passed          Set repeatedOpensPassed to true
  --sz-evidence <path-or-note>        Shenzhen/Mainland proof

The generated file intentionally contains TODO fields until real regional no-VPN evidence is supplied.`);
}

function normalizeUrl(value) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Only http and https URLs are supported.');
    }
    url.hash = '';
    return url;
  } catch (error) {
    console.error(`Invalid --url value: ${value}`);
    if (error.message) console.error(error.message);
    process.exit(1);
  }
}

function findLatestReleasePackage(projectRoot) {
  const releaseDir = path.join(projectRoot, 'release');
  if (!fs.existsSync(releaseDir)) return null;

  const candidates = fs
    .readdirSync(releaseDir)
    .filter((name) => /^portfolio-site-china-\d{8}-\d{6}\.zip$/.test(name))
    .map((name) => {
      const absolutePath = path.join(releaseDir, name);
      return {
        absolutePath,
        mtimeMs: fs.statSync(absolutePath).mtimeMs,
      };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  if (candidates.length === 0) return null;
  return path.relative(projectRoot, candidates[0].absolutePath);
}

function parseOptionalNumber(value, fallback, optionName) {
  if (value === undefined || value === null || value === '') return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) {
    console.error(`Option --${optionName} must be a number.`);
    process.exit(1);
  }
  return number;
}

function parseBoolean(value, optionName) {
  const normalized = String(value).toLowerCase();
  if (['true', '1', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'no'].includes(normalized)) return false;
  console.error(`Option --${optionName} must be true or false.`);
  process.exit(1);
}

function normalizeFlag(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function normalizePath(value) {
  return String(value).replaceAll(path.sep, '/');
}

function toEvidenceRelativePath(value, evidenceDir) {
  const text = String(value);
  if (path.isAbsolute(text) || /^TODO:/i.test(text)) return normalizePath(text);
  const absolutePath = path.resolve(root, text);
  const relativePath = path.relative(evidenceDir, absolutePath);
  return normalizePath(relativePath || '.');
}
