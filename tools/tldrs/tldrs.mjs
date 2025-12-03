#!/usr/bin/env node
// tools/llms/llms.mjs
// Generate ./src/public/llms.txt from blog-contents.jsonl
// Usage: node tools/llms/llms.mjs [--input ./blog-contents.jsonl] [--out ./src/public/llms.txt] [--desc "Your first paragraph here"]

import { readFile, writeFile, stat } from 'fs/promises';
import { dirname } from 'path';

const argv = process.argv.slice(2);

function parseArg(name, fallback) {
  const idx = argv.findIndex((a) => a === name);
  if (idx === -1) return fallback;
  const val = argv[idx + 1];
  return val ?? fallback;
}

const INPUT = parseArg('--input', './blog-contents.jsonl');
const OUT = parseArg('--out', './public/llms.txt');
const TLDRS_OUT = parseArg('--tldrs', './src/shared/tldrs.json');
const DESC = parseArg('--desc', '').trim();

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
}

function buildUrl(type, id) {
  // if type === 'blog' change to 'post'
  const path = type === 'blog' ? 'post' : type || 'post';
  return `https://swistak.codes/${path}/${id}`;
}

function safeString(v) {
  if (v == null) return '';
  return String(v).trim();
}

async function main() {
  if (!(await exists(INPUT))) {
    console.error(`Input file not found: ${INPUT}`);
    process.exit(2);
  }

  if (!(await exists(dirname(OUT)))) {
    console.error(`Target directory doesn't exist: ${dirname(OUT)}`);
    process.exit(2);
  }

  // ensure directory for tldrs exists
  if (!(await exists(dirname(TLDRS_OUT)))) {
    console.error(
      `Target directory for tldrs doesn't exist: ${dirname(TLDRS_OUT)}`,
    );
    process.exit(2);
  }

  const raw = await readFile(INPUT, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);

  const articles = [];
  for (const [i, line] of lines.entries()) {
    try {
      const obj = JSON.parse(line);
      const title = safeString(obj.title);
      const id = safeString(obj.id);
      const type = safeString(obj.type);
      const summary = safeString(
        obj.contentEmbedding || obj.abstract || obj.content || '',
      );

      if (!title || !id) {
        // skip lines without required fields
        continue;
      }

      articles.push({ title, id, type, summary });
    } catch (err) {
      console.warn(`skipping invalid jsonl at line ${i + 1}`);
    }
  }

  // build markdown
  const linesOut = [];
  linesOut.push('# świstak.codes');
  linesOut.push('');
  if (DESC) {
    linesOut.push(DESC);
  } else {
    linesOut.push(
      'świstak.codes to blog o programowaniu, informatyce i matematyce, który w przystępny sposób łączy solidne podstawy teoretyczne z praktycznymi przykładami kodu i realnymi zastosowaniami w pracy programisty. Autor skupia się na ponadczasowych zagadnieniach, takich jak algorytmy, struktury danych, matematyka w IT czy grafika komputerowa, unikając krótkotrwałych technologicznych mód.',
    );
  }
  linesOut.push('');

  for (const art of articles) {
    // use heading level 2 for each article title
    linesOut.push(`## ${art.title}`);
    linesOut.push('');
    const url = buildUrl(art.type, art.id);
    linesOut.push(url);
    linesOut.push('');
    if (art.summary) {
      linesOut.push(art.summary);
    } else {
      linesOut.push('_No summary available_');
    }
    linesOut.push('');
  }

  const outText = linesOut.join('\n');
  await writeFile(OUT, outText, 'utf8');
  console.log(`Wrote ${OUT} — ${articles.length} articles processed`);

  // create tldrs JSON file mapping id -> summary
  const tldrs = {};
  for (const a of articles) {
    // include summary as-is (may be empty string)
    tldrs[a.id] = a.summary || '';
  }

  // pretty JSON with 2 spaces
  await writeFile(TLDRS_OUT, JSON.stringify(tldrs, null, 2), 'utf8');
  console.log(`Wrote ${TLDRS_OUT} — ${Object.keys(tldrs).length} items`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
