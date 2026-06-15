import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareHelixFrames } from './prepare-helix-frames.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const parseArgs = (argv) => {
  const args = {
    input: path.join(projectRoot, 'source-helix-frames'),
    output: path.join(projectRoot, 'public', 'hero-yang-helix-loop.mp4'),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === '--input' || item === '-i') {
      args.input = argv[index + 1];
      index += 1;
    } else if (item === '--output' || item === '-o') {
      args.output = path.resolve(argv[index + 1]);
      index += 1;
    }
  }

  return args;
};

const runRemotion = ({ output }) =>
  new Promise((resolve, reject) => {
    const remotionRoot = path.join(projectRoot, 'remotion-hero');
    const remotionArgs = [
      'remotion',
      'render',
      'src/index.ts',
      'HeroHelixFrames',
      output,
      '--overwrite',
      '--codec',
      'h264',
      '--crf',
      '24',
      '--pixel-format',
      'yuv420p',
    ];
    const command = process.platform === 'win32' ? 'cmd.exe' : 'npx';
    const commandArgs = process.platform === 'win32' ? ['/c', 'npx', ...remotionArgs] : remotionArgs;
    const child = spawn(command, commandArgs, { cwd: remotionRoot, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Remotion render failed with exit code ${code}.`));
      }
    });
  });

const args = parseArgs(process.argv.slice(2));

try {
  const result = await prepareHelixFrames({ input: args.input });
  console.log(`Prepared ${result.count} source frames for Remotion.`);
  await runRemotion({ output: args.output });
  console.log(`Hero helix video written to ${args.output}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

