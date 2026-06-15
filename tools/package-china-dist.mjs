import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const releaseDir = path.join(root, 'release');

function walk(entryPath, files = []) {
  if (!fs.existsSync(entryPath)) return files;
  const stat = fs.statSync(entryPath);

  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath)) {
      walk(path.join(entryPath, child), files);
    }
    return files;
  }

  if (stat.isFile()) files.push(entryPath);
  return files;
}

function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) fs.rmSync(targetPath, { recursive: true, force: true });
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function copyReleaseDoc(fileName) {
  const sourcePath = path.join(root, fileName);
  if (!fs.existsSync(sourcePath)) return null;
  const targetPath = path.join(stagingDir, fileName);
  fs.copyFileSync(sourcePath, targetPath);
  return fileName;
}

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html was not found. Run npm run predeploy:china first.');
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+$/, '').replace('T', '-');
const releaseName = `portfolio-site-china-${stamp}`;
const stagingDir = path.join(releaseDir, releaseName);
const zipPath = path.join(releaseDir, `${releaseName}.zip`);

fs.mkdirSync(releaseDir, { recursive: true });
removeIfExists(stagingDir);
removeIfExists(zipPath);
fs.mkdirSync(stagingDir, { recursive: true });
fs.cpSync(distDir, path.join(stagingDir, 'dist'), { recursive: true });

const stagedDist = path.join(stagingDir, 'dist');
fs.copyFileSync(path.join(stagedDist, 'index.html'), path.join(stagedDist, '404.html'));
fs.writeFileSync(
  path.join(stagedDist, '_headers'),
  [
    '/*',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '',
    '/assets/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '',
    '/portfolio/*',
    '  Cache-Control: public, max-age=2592000',
    '',
    '/hero-ribbon-loop.mp4',
    '  Cache-Control: public, max-age=2592000',
    '',
  ].join('\n')
);
fs.writeFileSync(path.join(stagedDist, '_redirects'), '/* /index.html 200\n');

const releaseDocs = [
  'one_domain_launch_runbook.md',
  'hosting_decision_matrix.md',
  'deployment_china_hk_strategy.md',
  'deployment_verification_log.md',
  'domain_dns_template.md',
  'deployment_evidence.template.json',
  'edgeone_pages_setup_zh.md',
]
  .map(copyReleaseDoc)
  .filter(Boolean);

const files = walk(stagedDist).map((filePath) => {
  const bytes = fs.statSync(filePath).size;
  return {
    path: path.relative(stagingDir, filePath).replaceAll(path.sep, '/'),
    bytes,
    sha256: sha256(filePath),
  };
});

const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
const manifest = {
  name: releaseName,
  createdAt: new Date().toISOString(),
  purpose: 'China/Hong Kong static deployment package',
  deployRoot: 'dist',
  totalBytes,
  totalSize: formatBytes(totalBytes),
  fileCount: files.length,
  files,
  releaseDocs,
  notes: [
    'Upload the contents of dist/ to the selected static host.',
    'Use one custom domain for the public URL.',
    'Run domain readiness verification after DNS and HTTPS are configured.',
    'Run repeated URL verification with JSON/Markdown reports after the custom domain is live.',
    'Test from Hong Kong and Shenzhen networks without VPN before calling the goal complete.',
  ],
};

fs.writeFileSync(path.join(stagingDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(
  path.join(stagingDir, 'README_DEPLOY.md'),
  [
    '# Portfolio China / Hong Kong Static Package',
    '',
    'Upload the contents of `dist/` to the selected static hosting provider.',
    '',
    'Required post-deploy checks:',
    '',
    '1. Bind one custom domain.',
    '2. Open the domain from Hong Kong without VPN.',
    '3. Open the same domain from Shenzhen/Mainland China without VPN.',
    '4. Run `cmd /c npm run verify:release -- --latest` before upload if you regenerated the package locally.',
    '5. Run `cmd /c npm run verify:domain -- https://your-domain.example --report release/domain-check.json --markdown release/domain-check.md`.',
    '6. Run `cmd /c npm run verify:url -- https://your-domain.example --repeat 5 --interval 2000 --report release/live-domain-check.json --markdown release/live-domain-check.md`.',
    '7. Run `cmd /c npm run generate:evidence -- --url https://your-domain.example --output deployment_evidence.json`, fill in the real regional evidence, then run `cmd /c npm run verify:launch-goal -- --evidence deployment_evidence.json`.',
    '8. If Shenzhen access is unstable, move to ICP + Mainland static hosting/CDN behind the same domain.',
    '',
    'Preferred test order:',
    '',
    '1. EdgeOne Pages, global availability zone excluding Chinese mainland, with one custom domain.',
    '2. Hong Kong object storage static hosting if EdgeOne is unstable from Shenzhen.',
    '3. ICP plus Mainland static hosting/CDN behind the same domain if Shenzhen stability must be guaranteed.',
    '',
    'Provider notes:',
    '',
    '- `404.html` is copied from `index.html` for object-storage fallback compatibility.',
    '- `_headers` and `_redirects` are included for platforms that support them; object storage providers may ignore them.',
    '- Upload the contents of `dist/`, not the parent release folder.',
    '- Keep the copied launch documents beside the deployment package for domain, DNS, and regional test evidence.',
    '',
    'Included planning documents:',
    '',
    ...releaseDocs.map((fileName) => `- \`${fileName}\``),
    '',
  ].join('\n')
);

const escapedStaging = stagingDir.replaceAll("'", "''");
const escapedZip = zipPath.replaceAll("'", "''");
const compress = spawnSync(
  'powershell.exe',
  [
    '-NoProfile',
    '-ExecutionPolicy',
    'Bypass',
    '-Command',
    `Compress-Archive -Path '${escapedStaging}\\*' -DestinationPath '${escapedZip}' -Force`,
  ],
  { stdio: 'pipe', encoding: 'utf8' }
);

if (compress.status !== 0 || !fs.existsSync(zipPath)) {
  console.error(compress.stdout);
  console.error(compress.stderr);
  const fallback = spawnSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      [
        'Add-Type -AssemblyName System.IO.Compression.FileSystem',
        `if (Test-Path '${escapedZip}') { Remove-Item -LiteralPath '${escapedZip}' -Force }`,
        `[System.IO.Compression.ZipFile]::CreateFromDirectory('${escapedStaging}', '${escapedZip}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`,
      ].join('; '),
    ],
    { stdio: 'pipe', encoding: 'utf8' }
  );

  if (fallback.status !== 0 || !fs.existsSync(zipPath)) {
    console.error(fallback.stdout);
    console.error(fallback.stderr);
    console.error('Failed to create release zip.');
    process.exit(fallback.status || compress.status || 1);
  }
}

const zipBytes = fs.statSync(zipPath).size;
console.log('# China / Hong Kong Static Package');
console.log(`Release: ${releaseName}`);
console.log(`Staging: ${stagingDir}`);
console.log(`Zip: ${zipPath}`);
console.log(`Files: ${files.length}`);
console.log(`Uncompressed deploy size: ${formatBytes(totalBytes)}`);
console.log(`Zip size: ${formatBytes(zipBytes)}`);
