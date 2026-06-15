import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_EVIDENCE_PATH = 'deployment_evidence.json';
const DEFAULT_PREVIEW_HOSTS = [
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

const evidencePath = args.evidence || DEFAULT_EVIDENCE_PATH;
const errors = [];
const warnings = [];

const evidence = readJson(evidencePath, 'deployment evidence', errors);

if (evidence) {
  validateEvidence(evidence, path.resolve(evidencePath), errors, warnings);
}

console.log('# Launch Goal Gate');
console.log(`Evidence: ${path.resolve(evidencePath)}`);

if (warnings.length > 0) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.log('\nNot complete:');
  for (const error of errors) console.log(`- ${error}`);
  process.exit(1);
}

console.log('\nLaunch goal evidence passed.');
console.log('The one-domain Hong Kong/Shenzhen access goal has machine-readable completion evidence.');

function parseArgs(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      if (!parsed.evidence) parsed.evidence = arg;
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
      case 'evidence':
        parsed.evidence = value;
        break;
      default:
        console.error(`Unknown option: --${flag}`);
        process.exit(1);
    }
  }

  return parsed;
}

function printUsage() {
  console.log(`Usage:
  npm run verify:launch-goal
  npm run verify:launch-goal -- --evidence deployment_evidence.json

The evidence file should be copied from deployment_evidence.template.json after a real custom domain is live.`);
}

function readJson(filePath, label, errors) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`${label} file does not exist: ${absolutePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    errors.push(`${label} file is not valid JSON: ${error.message}`);
    return null;
  }
}

function validateEvidence(evidence, absoluteEvidencePath, errors, warnings) {
  if (evidence.schemaVersion !== 1) {
    errors.push('schemaVersion must be 1.');
  }

  const publicUrl = parsePublicUrl(evidence.publicUrl, errors);
  if (publicUrl) {
    if (publicUrl.protocol !== 'https:') {
      errors.push('publicUrl must use HTTPS.');
    }
    if (publicUrl.hostname === 'your-domain.example') {
      errors.push('publicUrl still uses the placeholder domain.');
    }
    if (
      publicUrl.hostname === 'example.com' ||
      publicUrl.hostname.endsWith('.example.com') ||
      publicUrl.hostname.endsWith('.example')
    ) {
      errors.push('publicUrl still uses a reserved example domain.');
    }
    if (DEFAULT_PREVIEW_HOSTS.some((host) => publicUrl.hostname === host || publicUrl.hostname.endsWith(`.${host}`))) {
      errors.push('publicUrl must not rely on a provider default preview domain.');
    }
  }

  const evidenceDir = path.dirname(absoluteEvidencePath);
  validateHosting(evidence.hosting || {}, evidenceDir, errors);
  const domainReport = validateDomainReport(evidence.automatedReports?.domainReadinessJson, publicUrl, evidenceDir, errors);
  const liveReport = validateLiveUrlReport(evidence.automatedReports?.liveUrlJson, publicUrl, evidenceDir, errors);

  if (domainReport && liveReport) {
    const domainTarget = normalizeUrl(domainReport.target);
    const liveTarget = normalizeUrl(liveReport.target);
    if (domainTarget && liveTarget && domainTarget !== liveTarget) {
      errors.push(`domainReadinessJson target and liveUrlJson target do not match: ${domainTarget} vs ${liveTarget}.`);
    }
  }

  validateRegionalCheck(evidence.regionalChecks?.hongKong, 'Hong Kong', errors);
  validateRegionalCheck(evidence.regionalChecks?.shenzhenMainland, 'Shenzhen/Mainland', errors, {
    requireRepeatedOpens: true,
  });

  if (evidence.hosting?.icpStatus === 'none') {
    warnings.push('ICP status is none. This can be acceptable for EdgeOne global excluding Mainland or Hong Kong hosting, but Shenzhen stability still needs real evidence.');
  }
}

function parsePublicUrl(value, errors) {
  if (!value || typeof value !== 'string') {
    errors.push('publicUrl is required.');
    return null;
  }

  try {
    return new URL(value);
  } catch {
    errors.push(`publicUrl is not a valid URL: ${value}`);
    return null;
  }
}

function validateHosting(hosting, evidenceDir, errors) {
  requireText(hosting.provider, 'hosting.provider', errors);
  requireText(hosting.regionOrAvailabilityZone, 'hosting.regionOrAvailabilityZone', errors);
  requireText(hosting.package, 'hosting.package', errors);
  requireText(hosting.costPlan, 'hosting.costPlan', errors);
  requireText(hosting.icpStatus, 'hosting.icpStatus', errors);

  if (hosting.usesDefaultPreviewDomain !== false) {
    errors.push('hosting.usesDefaultPreviewDomain must be false.');
  }

  if (typeof hosting.package === 'string' && hosting.package.includes('YYYYMMDD')) {
    errors.push('hosting.package still uses the placeholder package path.');
  }

  validatePackageFile(hosting.package, evidenceDir, errors);
}

function validatePackageFile(packagePath, evidenceDir, errors) {
  if (typeof packagePath !== 'string' || packagePath.trim().length === 0) return;
  if (/TODO|YYYY|placeholder|pending/i.test(packagePath)) return;
  if (!/\.zip$/i.test(packagePath)) return;

  const absolutePath = path.isAbsolute(packagePath) ? packagePath : path.resolve(evidenceDir, packagePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`hosting.package file does not exist: ${absolutePath}`);
  }
}

function validateDomainReport(reportPath, publicUrl, evidenceDir, errors) {
  const report = readLinkedJson(reportPath, 'automatedReports.domainReadinessJson', evidenceDir, errors);
  if (!report) return null;

  if (report.summary?.passed !== true) {
    errors.push('domain readiness report did not pass.');
  }

  validateReportTarget(report.target, publicUrl, 'domain readiness report', errors);

  if (report.tls?.skipped) {
    errors.push('domain readiness report skipped TLS; public launch must verify HTTPS TLS.');
  }

  if (report.tls && report.tls.authorized !== true) {
    errors.push('domain readiness report TLS is not authorized.');
  }

  if (typeof report.tls?.daysRemaining === 'number' && report.tls.daysRemaining < 14) {
    errors.push('domain readiness report TLS certificate has fewer than 14 days remaining.');
  }

  if (report.http?.status !== 200) {
    errors.push('domain readiness report HTTP status is not 200.');
  }

  if (report.http?.hasReactRoot !== true) {
    errors.push('domain readiness report did not see the React root.');
  }

  return report;
}

function validateLiveUrlReport(reportPath, publicUrl, evidenceDir, errors) {
  const report = readLinkedJson(reportPath, 'automatedReports.liveUrlJson', evidenceDir, errors);
  if (!report) return null;

  if (report.summary?.passed !== true) {
    errors.push('live URL report did not pass.');
  }

  validateReportTarget(report.target, publicUrl, 'live URL report', errors);

  const sampleCount = report.summary?.sampleCount ?? report.samples?.length ?? 0;
  if (sampleCount < 5) {
    errors.push(`live URL report must include at least 5 samples; found ${sampleCount}.`);
  }

  if ((report.summary?.assetFailureCount ?? 0) !== 0) {
    errors.push('live URL report has asset failures.');
  }

  return report;
}

function readLinkedJson(reportPath, label, evidenceDir, errors) {
  if (!reportPath || typeof reportPath !== 'string') {
    errors.push(`${label} is required.`);
    return null;
  }

  const absolutePath = path.isAbsolute(reportPath) ? reportPath : path.resolve(evidenceDir, reportPath);
  return readJson(absolutePath, label, errors);
}

function validateReportTarget(reportTarget, publicUrl, label, errors) {
  if (!publicUrl) return;
  const normalizedReportTarget = normalizeUrl(reportTarget);
  const normalizedPublicUrl = normalizeUrl(publicUrl.toString());

  if (!normalizedReportTarget) {
    errors.push(`${label} has no valid target URL.`);
    return;
  }

  if (normalizedReportTarget !== normalizedPublicUrl) {
    errors.push(`${label} target does not match publicUrl: ${normalizedReportTarget} vs ${normalizedPublicUrl}.`);
  }
}

function validateRegionalCheck(check, label, errors, options = {}) {
  if (!check || typeof check !== 'object') {
    errors.push(`${label} regional check is required.`);
    return;
  }

  if (check.vpnDisabled !== true) {
    errors.push(`${label} check must have vpnDisabled: true.`);
  }

  if (String(check.result || '').toLowerCase() !== 'pass') {
    errors.push(`${label} check result must be pass.`);
  }

  requireText(check.checkedAt, `${label} checkedAt`, errors);
  requireText(check.networkOrIsp, `${label} networkOrIsp`, errors);
  requireText(check.evidence, `${label} evidence`, errors);

  if (options.requireRepeatedOpens && check.repeatedOpensPassed !== true) {
    errors.push(`${label} check must have repeatedOpensPassed: true.`);
  }

  if (typeof check.approxFirstLoadSeconds !== 'number' || check.approxFirstLoadSeconds <= 0) {
    errors.push(`${label} approxFirstLoadSeconds must be a positive number.`);
  }
}

function requireText(value, label, errors) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    errors.push(`${label} is required.`);
    return;
  }

  if (/your-domain\.example|YYYY|for example|TODO|TBD|pending|placeholder|\u5f85\u586b|\u793a\u4f8b/i.test(value)) {
    errors.push(`${label} still contains placeholder text.`);
  }
}

function normalizeUrl(value) {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    url.hash = '';
    url.search = '';
    if (url.pathname === '/') url.pathname = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}
