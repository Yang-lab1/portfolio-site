import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(args.root || 'dist');
const host = args.host || '127.0.0.1';
const port = Number.parseInt(args.port || '5182', 10);

if (!Number.isFinite(port) || port <= 0 || port > 65535) {
  console.error('Invalid --port value.');
  process.exit(1);
}

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error(`Missing index.html in ${root}. Run cmd /c npm run build first.`);
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${host}:${port}`);
  const filePath = resolveFile(url.pathname);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'content-type': contentType(filePath),
      'cache-control': filePath.includes(`${path.sep}assets${path.sep}`)
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Serving ${root}`);
  console.log(`Local: http://${host}:${port}/`);
});

function parseArgs(rawArgs) {
  const parsed = {};
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (!arg.startsWith('--')) continue;
    const [flag, inlineValue] = arg.slice(2).split(/=(.*)/s, 2);
    let value = inlineValue;
    if (value === undefined) {
      value = rawArgs[index + 1];
      index += 1;
    }
    parsed[flag] = value;
  }
  return parsed;
}

function resolveFile(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = decodedPath.replace(/^\/+/, '');
  const directPath = path.resolve(root, safePath);

  if (directPath.startsWith(root) && fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  return path.join(root, 'index.html');
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.ico': 'image/x-icon',
    }[extension] || 'application/octet-stream'
  );
}
