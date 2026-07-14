import { createReadStream } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const [localRootArgument, remoteRootArgument] = process.argv.slice(2);

const endpoint = process.env.BUNNY_STORAGE_ENDPOINT?.trim().replace(/\/+$/, '');

const storageZone = process.env.BUNNY_STORAGE_ZONE?.trim();
const accessKey = process.env.BUNNY_STORAGE_ACCESS_KEY?.trim();

if (!localRootArgument || !remoteRootArgument) {
  throw new Error(
    'Usage: node upload-next-static-to-bunny.mjs <local-directory> <remote-prefix>',
  );
}

if (!endpoint || !storageZone || !accessKey) {
  throw new Error(
    'Missing BUNNY_STORAGE_ENDPOINT, BUNNY_STORAGE_ZONE or BUNNY_STORAGE_ACCESS_KEY',
  );
}

const allowedRemoteRoots = new Set([
  'prod/_next/static',
  'prod/og',
  'staging/_next/static',
  'staging/og',
]);

const remoteRoot = remoteRootArgument.replace(/^\/+|\/+$/g, '');

if (!allowedRemoteRoots.has(remoteRoot)) {
  throw new Error(`Disallowed Bunny destination: ${remoteRoot}`);
}

const localRoot = path.resolve(localRootArgument);

const mimeTypes = new Map([
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.wasm', 'application/wasm'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.otf', 'font/otf'],
  ['.eot', 'application/vnd.ms-fontobject'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      if (entry.isFile()) {
        return [fullPath];
      }

      return [];
    }),
  );

  return nestedFiles.flat();
}

function encodeRemotePath(value) {
  return value
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function getMimeType(filePath) {
  return (
    mimeTypes.get(path.extname(filePath).toLowerCase()) ??
    'application/octet-stream'
  );
}

async function uploadFile(filePath) {
  const relativePath = path
    .relative(localRoot, filePath)
    .split(path.sep)
    .join('/');

  if (
    relativePath === '..' ||
    relativePath.startsWith('../') ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`File is outside local root: ${filePath}`);
  }

  const remotePath = `${remoteRoot}/${relativePath}`;
  const encodedPath = encodeRemotePath(remotePath);
  const encodedZone = encodeURIComponent(storageZone);
  const fileStats = await stat(filePath);

  const response = await fetch(`${endpoint}/${encodedZone}/${encodedPath}`, {
    method: 'PUT',
    headers: {
      AccessKey: accessKey,
      'Content-Type': getMimeType(filePath),
      'Content-Length': String(fileStats.size),
    },
    body: createReadStream(filePath),
    duplex: 'half',
  });

  if (!response.ok) {
    const responseBody = await response.text().catch(() => '');

    throw new Error(
      `Bunny upload failed for ${remotePath}: ` +
        `${response.status} ${response.statusText} ${responseBody}`,
    );
  }

  console.log(`Uploaded: ${remotePath}`);
}

const files = (await walk(localRoot)).sort();

const requestedConcurrency = Number.parseInt(
  process.env.BUNNY_UPLOAD_CONCURRENCY ?? '8',
  10,
);

const concurrency =
  Number.isFinite(requestedConcurrency) && requestedConcurrency > 0
    ? requestedConcurrency
    : 8;

let nextIndex = 0;

async function worker() {
  while (true) {
    const currentIndex = nextIndex;
    nextIndex += 1;

    if (currentIndex >= files.length) {
      return;
    }

    await uploadFile(files[currentIndex]);
  }
}

await Promise.all(
  Array.from({ length: Math.min(concurrency, Math.max(files.length, 1)) }, () =>
    worker(),
  ),
);

console.log(`Uploaded ${files.length} files to ${remoteRoot}`);
