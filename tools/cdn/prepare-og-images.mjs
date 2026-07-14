import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const [outputDirectoryArgument = '.next/og'] = process.argv.slice(2);

const sourceRoot = path.resolve('src');
const outputDirectory = path.resolve(outputDirectoryArgument);
const sourceExtensions = new Set(['.js', '.jsx', '.md', '.mdx', '.ts', '.tsx']);
const imageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (
      entry.isFile() &&
      sourceExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

const covers = new Map();

for (const sourceFile of await walk(sourceRoot)) {
  const source = await readFile(sourceFile, 'utf8');
  const coverImport = source.match(
    /import\s+cover\s+from\s+['"]([^'"]+)['"]\s*;?/,
  );
  const slug = source.match(/\bslug\s*:\s*['"]([^'"]+)['"]\s*,?/);

  if (!coverImport || !slug) {
    continue;
  }

  const coverPath = path.resolve(path.dirname(sourceFile), coverImport[1]);
  const extension = path.extname(coverPath).toLowerCase();

  if (!coverPath.startsWith(`${sourceRoot}${path.sep}`)) {
    throw new Error(`Cover is outside src: ${coverPath}`);
  }

  if (!imageExtensions.has(extension)) {
    throw new Error(`Unsupported OG image extension: ${coverPath}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug[1])) {
    throw new Error(`Invalid slug in ${sourceFile}: ${slug[1]}`);
  }

  const targetName = `${slug[1]}${extension}`;
  const existingCover = covers.get(targetName);

  if (existingCover && existingCover !== coverPath) {
    throw new Error(
      `Multiple covers resolve to ${targetName}: ${existingCover}, ${coverPath}`,
    );
  }

  covers.set(targetName, coverPath);
}

if (covers.size === 0) {
  throw new Error('No OG covers found');
}

await mkdir(outputDirectory, { recursive: true });

for (const [targetName, coverPath] of [...covers.entries()].sort()) {
  await copyFile(coverPath, path.join(outputDirectory, targetName));
}

console.log(`Prepared ${covers.size} OG images in ${outputDirectory}`);
