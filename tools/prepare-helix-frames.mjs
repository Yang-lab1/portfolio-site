import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const parseArgs = (argv) => {
  const args = { input: path.join(projectRoot, 'source-helix-frames') };
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === '--input' || item === '-i') {
      args.input = argv[index + 1];
      index += 1;
    }
  }
  return args;
};

const assertInside = (child, parent, label) => {
  const relative = path.relative(parent, child);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`${label} resolved outside the project: ${child}`);
  }
};

export const prepareHelixFrames = async ({ input } = {}) => {
  const inputDir = path.resolve(input || path.join(projectRoot, 'source-helix-frames'));
  const remotionPublic = path.join(projectRoot, 'remotion-hero', 'public');
  const destinationDir = path.join(remotionPublic, 'helix-frames');
  const generatedManifest = path.join(projectRoot, 'remotion-hero', 'src', 'generatedHelixFrames.ts');

  assertInside(destinationDir, remotionPublic, 'Helix frame destination');
  assertInside(generatedManifest, path.join(projectRoot, 'remotion-hero', 'src'), 'Helix frame manifest');

  let entries;
  try {
    entries = await readdir(inputDir, { withFileTypes: true });
  } catch {
    throw new Error(`Helix frame input directory is missing: ${inputDir}`);
  }

  const frames = entries
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => collator.compare(a.name, b.name));

  if (frames.length < 2) {
    throw new Error(`Need at least 2 helix frame images in ${inputDir}. Found ${frames.length}.`);
  }

  if (frames.length !== 25) {
    console.warn(`Warning: expected 25 helix frames, found ${frames.length}. Rendering can continue, but review the loop.`);
  }

  await rm(destinationDir, { recursive: true, force: true });
  await mkdir(destinationDir, { recursive: true });

  const copied = [];
  for (let index = 0; index < frames.length; index += 1) {
    const sourceName = frames[index].name;
    const ext = path.extname(sourceName).toLowerCase();
    const targetName = `frame-${String(index + 1).padStart(3, '0')}${ext}`;
    const sourcePath = path.join(inputDir, sourceName);
    const targetPath = path.join(destinationDir, targetName);
    await copyFile(sourcePath, targetPath);
    copied.push(`helix-frames/${targetName}`);
  }

  const manifest = [
    'export const helixFrames = [',
    ...copied.map((framePath) => `  ${JSON.stringify(framePath)},`),
    '] as const;',
    '',
  ].join('\n');

  await writeFile(generatedManifest, manifest, 'utf8');

  return {
    inputDir,
    destinationDir,
    count: copied.length,
    frames: copied,
  };
};

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  const args = parseArgs(process.argv.slice(2));
  prepareHelixFrames(args)
    .then((result) => {
      console.log(`Prepared ${result.count} helix frames.`);
      console.log(`Input: ${result.inputDir}`);
      console.log(`Remotion public frames: ${result.destinationDir}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
