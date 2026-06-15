import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_DIST_FILES = [
  'index.html',
  '404.html',
  '_headers',
  '_redirects',
  'hero-ribbon-loop.mp4',
];
const REQUIRED_DOCS = [
  'one_domain_launch_runbook.md',
  'hosting_decision_matrix.md',
  'deployment_china_hk_strategy.md',
  'deployment_verification_log.md',
  'domain_dns_template.md',
  'deployment_evidence.template.json',
  'edgeone_pages_setup_zh.md',
];
const SIZE_LIMITS = {
  totalBytes: 12 * 1024 * 1024,
  singleAssetBytes: 1536 * 1024,
  jsBytes: 512 * 1024,
  heroVideoBytes: 1536 * 1024,
};

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printUsage();
  process.exit(0);
}

const releaseFolder = resolveReleaseFolder(args);
const errors = [];
const warnings = [];

const report = verifyReleaseFolder(releaseFolder, errors, warnings);

console.log('# Release Package Verification');
console.log(`Release folder: ${releaseFolder || 'not found'}`);
if (report?.zipPath) console.log(`Zip: ${report.zipPath}`);

if (warnings.length > 0) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.log('\nFailed:');
  for (const error of errors) console.log(`- ${error}`);
} else {
  console.log('\nRelease package passed local upload-readiness checks.');
}

if (args.report && report) {
  writeOutputFile(args.report, `${JSON.stringify({ ...report, passed: errors.length === 0, warnings, errors }, null, 2)}\n`);
  console.log(`JSON report written: ${path.resolve(args.report)}`);
}

if (args.markdown && report) {
  writeOutputFile(args.markdown, renderMarkdown({ ...report, passed: errors.length === 0, warnings, errors }));
  console.log(`Markdown report written: ${path.resolve(args.markdown)}`);
}

if (errors.length > 0) process.exit(1);

function parseArgs(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }
    if (arg === '--latest') {
      parsed.latest = true;
      continue;
    }
    if (!arg.startsWith('--')) {
      if (!parsed.release) parsed.release = arg;
      continue;
    }

    const [rawFlag, inlineValue] = arg.slice(2).split(/=(.*)/s, 2);
    const flag = rawFlag.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
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
      case 'release':
        parsed.release = value;
        break;
      case 'report':
        parsed.report = value;
        break;
      case 'markdown':
      case 'md':
        parsed.markdown = value;
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
  npm run verify:release -- --latest
  npm run verify:release -- release/portfolio-site-china-YYYYMMDD-HHMMSS
  npm run verify:release -- release/portfolio-site-china-YYYYMMDD-HHMMSS.zip

Options:
  --latest            Verify the newest release/portfolio-site-china-* folder
  --release <path>    Release folder or zip path
  --report <path>     Write JSON report
  --markdown <path>   Write Markdown report`);
}

function resolveReleaseFolder(parsed) {
  const projectRoot = process.cwd();
  if (parsed.release) {
    const resolved = path.resolve(projectRoot, parsed.release);
    return resolved.endsWith('.zip') ? resolved.slice(0, -4) : resolved;
  }

  if (parsed.latest || !parsed.release) {
    const releaseRoot = path.join(projectRoot, 'release');
    if (!fs.existsSync(releaseRoot)) return null;
    const folders = fs
      .readdirSync(releaseRoot)
      .filter((name) => /^portfolio-site-china-\d{8}-\d{6}$/.test(name))
      .map((name) => {
        const folder = path.join(releaseRoot, name);
        return { folder, mtimeMs: fs.statSync(folder).mtimeMs };
      })
      .sort((a, b) => b.mtimeMs - a.mtimeMs);
    return folders[0]?.folder || null;
  }

  return null;
}

function verifyReleaseFolder(releaseFolder, errors, warnings) {
  if (!releaseFolder || !fs.existsSync(releaseFolder)) {
    errors.push('Release folder does not exist.');
    return null;
  }

  const releaseName = path.basename(releaseFolder);
  const zipPath = `${releaseFolder}.zip`;
  const distDir = path.join(releaseFolder, 'dist');
  const manifestPath = path.join(releaseFolder, 'manifest.json');
  const readmePath = path.join(releaseFolder, 'README_DEPLOY.md');

  if (!fs.existsSync(zipPath)) errors.push(`Release zip is missing: ${zipPath}`);
  if (!fs.existsSync(distDir)) errors.push('dist folder is missing from the release package.');
  if (!fs.existsSync(manifestPath)) errors.push('manifest.json is missing.');
  if (!fs.existsSync(readmePath)) errors.push('README_DEPLOY.md is missing.');

  for (const fileName of REQUIRED_DOCS) {
    if (!fs.existsSync(path.join(releaseFolder, fileName))) {
      errors.push(`Required release document is missing: ${fileName}`);
    }
  }

  for (const fileName of REQUIRED_DIST_FILES) {
    if (!fs.existsSync(path.join(distDir, fileName))) {
      errors.push(`Required dist file is missing: dist/${fileName}`);
    }
  }

  let manifest = null;
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      errors.push(`manifest.json is not valid JSON: ${error.message}`);
    }
  }

  const files = walk(distDir).map((filePath) => {
    const bytes = fs.statSync(filePath).size;
    return {
      path: path.relative(releaseFolder, filePath).replaceAll(path.sep, '/'),
      bytes,
      sha256: sha256(filePath),
    };
  });
  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);

  validateManifest(manifest, releaseName, files, totalBytes, errors, warnings);
  validateReadme(readmePath, errors);
  validateSizeBudgets(files, totalBytes, errors, warnings);

  const indexPath = path.join(distDir, 'index.html');
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(indexPath) && fs.existsSync(notFoundPath) && sha256(indexPath) !== sha256(notFoundPath)) {
    warnings.push('dist/404.html does not match dist/index.html. This may break SPA fallback on object storage.');
  }

  return {
    releaseName,
    releaseFolder,
    zipPath: fs.existsSync(zipPath) ? zipPath : null,
    distDir,
    fileCount: files.length,
    totalBytes,
    totalSize: formatBytes(totalBytes),
    docs: REQUIRED_DOCS,
  };
}

function validateManifest(manifest, releaseName, actualFiles, actualTotalBytes, errors, warnings) {
  if (!manifest) return;
  if (manifest.name !== releaseName) errors.push(`manifest.name does not match release folder: ${manifest.name} vs ${releaseName}.`);
  if (manifest.deployRoot !== 'dist') errors.push('manifest.deployRoot must be dist.');
  if (!Array.isArray(manifest.files)) {
    errors.push('manifest.files must be an array.');
    return;
  }

  if (manifest.fileCount !== actualFiles.length) {
    errors.push(`manifest.fileCount mismatch: ${manifest.fileCount} vs ${actualFiles.length}.`);
  }
  if (manifest.totalBytes !== actualTotalBytes) {
    errors.push(`manifest.totalBytes mismatch: ${manifest.totalBytes} vs ${actualTotalBytes}.`);
  }

  const manifestByPath = new Map(manifest.files.map((file) => [file.path, file]));
  for (const actual of actualFiles) {
    const recorded = manifestByPath.get(actual.path);
    if (!recorded) {
      errors.push(`manifest is missing file entry: ${actual.path}`);
      continue;
    }
    if (recorded.bytes !== actual.bytes) errors.push(`manifest byte mismatch for ${actual.path}.`);
    if (recorded.sha256 !== actual.sha256) errors.push(`manifest sha256 mismatch for ${actual.path}.`);
  }

  for (const fileName of REQUIRED_DOCS) {
    if (!manifest.releaseDocs?.includes(fileName)) {
      warnings.push(`manifest.releaseDocs does not list ${fileName}.`);
    }
  }
}

function validateReadme(readmePath, errors) {
  if (!fs.existsSync(readmePath)) return;
  const readme = fs.readFileSync(readmePath, 'utf8');
  for (const requiredText of [
    'Bind one custom domain',
    'generate:evidence',
    'verify:launch-goal',
    'EdgeOne Pages',
    'Upload the contents of `dist/`',
  ]) {
    if (!readme.includes(requiredText)) {
      errors.push(`README_DEPLOY.md is missing required text: ${requiredText}`);
    }
  }
}

function validateSizeBudgets(files, totalBytes, errors, warnings) {
  if (totalBytes > SIZE_LIMITS.totalBytes) {
    errors.push(`Release dist size exceeds ${formatBytes(SIZE_LIMITS.totalBytes)}: ${formatBytes(totalBytes)}.`);
  }

  for (const file of files) {
    if (file.bytes > SIZE_LIMITS.singleAssetBytes) {
      errors.push(`${file.path} exceeds single asset limit ${formatBytes(SIZE_LIMITS.singleAssetBytes)}.`);
    }
    if (/\.js$/i.test(file.path) && file.bytes > SIZE_LIMITS.jsBytes) {
      warnings.push(`${file.path} exceeds recommended JS size ${formatBytes(SIZE_LIMITS.jsBytes)}.`);
    }
    if (file.path === 'dist/hero-ribbon-loop.mp4' && file.bytes > SIZE_LIMITS.heroVideoBytes) {
      errors.push(`Hero video exceeds ${formatBytes(SIZE_LIMITS.heroVideoBytes)}.`);
    }
  }
}

function walk(entryPath, files = []) {
  if (!entryPath || !fs.existsSync(entryPath)) return files;
  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath)) {
      walk(path.join(entryPath, child), files);
    }
  } else if (stat.isFile()) {
    files.push(entryPath);
  }
  return files;
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function writeOutputFile(filePath, content) {
  const absolutePath = path.resolve(filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, 'utf8');
}

function renderMarkdown(report) {
  const lines = [
    '# Release Package Verification',
    '',
    `- Release: ${report.releaseName}`,
    `- Folder: ${report.releaseFolder}`,
    `- Zip: ${report.zipPath || 'missing'}`,
    `- Passed: ${report.passed ? 'yes' : 'no'}`,
    `- Files: ${report.fileCount}`,
    `- Dist size: ${report.totalSize}`,
    '',
  ];

  if (report.warnings.length > 0) {
    lines.push('## Warnings', '');
    for (const warning of report.warnings) lines.push(`- ${warning}`);
    lines.push('');
  }
  if (report.errors.length > 0) {
    lines.push('## Errors', '');
    for (const error of report.errors) lines.push(`- ${error}`);
    lines.push('');
  }

  lines.push('## Still Required For Goal Completion', '');
  lines.push('- Upload `dist/` to the chosen host.');
  lines.push('- Bind one custom HTTPS domain.');
  lines.push('- Run domain and live URL verification.');
  lines.push('- Record Hong Kong and Shenzhen/Mainland no-VPN evidence.');
  lines.push('');

  return `${lines.join('\n')}\n`;
}
