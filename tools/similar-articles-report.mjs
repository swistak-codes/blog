import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Typesense from 'typesense';

const RESULT_LIMIT = 9;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const inputPath = path.join(projectRoot, 'blog-contents.jsonl');
const defaultOutputPath = path.join(
  projectRoot,
  'tools',
  'similar-articles-report.csv',
);

function loadLocalEnvFiles() {
  const result = dotenv.config({
    path: [path.join(projectRoot, '.env.local'), path.join(projectRoot, '.env')],
    override: false,
    quiet: true,
  });

  if (result.error) {
    throw result.error;
  }
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Brakuje wymaganej zmiennej środowiskowej: ${name}`);
  }

  return value;
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? '');

  if (/[",\n]/u.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

async function loadArticles() {
  const content = await fs.readFile(inputPath, 'utf8');
  const articles = [];
  const seenIds = new Set();

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    const article = JSON.parse(trimmedLine);

    if (seenIds.has(article.id)) {
      continue;
    }

    seenIds.add(article.id);
    articles.push(article);
  }

  return articles;
}

function createStatsMap(articles) {
  return new Map(
    articles.map((article) => [
      article.id,
      {
        slug: article.id,
        type: article.type,
        title: article.title,
        totalCount: 0,
        positionCounts: Array.from({ length: RESULT_LIMIT }, () => 0),
      },
    ]),
  );
}

function createSimilarSourceMap(articles) {
  return new Map(articles.map((article) => [article.id, []]));
}

async function fetchSimilarArticles(client, collectionName, articleId) {
  const results = await client
    .collections(collectionName)
    .documents()
    .search(
      {
        q: '*',
        limit: RESULT_LIMIT,
        vector_query: `embedding:([], id: ${articleId})`,
      },
      {
        cacheSearchResultsForSeconds: Number.MAX_SAFE_INTEGER,
      },
    );

  return results.hits ?? [];
}

function buildCsv(rows) {
  const header = [
    'slug',
    'type',
    'title',
    'total_count',
    ...Array.from({ length: RESULT_LIMIT }, (_, index) => `position_${index + 1}`),
  ];

  const lines = [header.join(',')];

  for (const row of rows) {
    lines.push(
      [
        row.slug,
        row.type,
        row.title,
        row.totalCount,
        ...row.positionCounts,
      ]
        .map(escapeCsvValue)
        .join(','),
    );
  }

  return `${lines.join('\n')}\n`;
}

function buildJson(rows, similarSourceMap) {
  const result = {};

  for (const row of rows) {
    const values = [...(similarSourceMap.get(row.slug) ?? [])].sort((a, b) =>
      a.localeCompare(b, 'pl'),
    );
    result[row.slug] = values;
  }

  return `${JSON.stringify(result, null, 2)}\n`;
}

async function main() {
  loadLocalEnvFiles();

  const baseUrl = requireEnv('NEXT_PUBLIC_BASE_URL');
  const searchApiKey = requireEnv('SEARCH_ADMIN_API_KEY');
  const searchHost = requireEnv('SEARCH_HOST');
  const searchPort = Number.parseInt(requireEnv('SEARCH_PORT'), 10);
  const searchProtocol = requireEnv('SEARCH_PROTOCOL');
  const environment = baseUrl
    .replace(/https?:\/\//u, '')
    .replace(/:\d+/u, '');
  const collectionName = `posts_${environment}`;
  const outputPath = path.resolve(process.argv[2] ?? defaultOutputPath);
  const outputPathWithoutExtension = outputPath.replace(/\.[^.]+$/u, '');
  const jsonOutputPath = `${outputPathWithoutExtension}.json`;

  if (Number.isNaN(searchPort)) {
    throw new Error('SEARCH_PORT musi byc poprawna liczba');
  }

  const client = new Typesense.Client({
    nodes: [
      {
        host: searchHost,
        port: searchPort,
        protocol: searchProtocol,
      },
    ],
    apiKey: searchApiKey,
    connectionTimeoutSeconds: 10,
    useServerSideSearchCache: true,
  });

  const articles = await loadArticles();
  const statsMap = createStatsMap(articles);
  const similarSourceMap = createSimilarSourceMap(articles);

  for (const [index, article] of articles.entries()) {
    console.log(
      `[${index + 1}/${articles.length}] Pobieranie podobnych artykulow dla ${article.id}`,
    );

    const hits = await fetchSimilarArticles(client, collectionName, article.id);

    hits.slice(0, RESULT_LIMIT).forEach((hit, hitIndex) => {
      const resultArticle = hit.document;
      const resultId = resultArticle?.id;

      if (!resultId) {
        return;
      }

      const stats = statsMap.get(resultId);
      let sourceArticles = similarSourceMap.get(resultId);

      if (!sourceArticles) {
        sourceArticles = [];
        similarSourceMap.set(resultId, sourceArticles);
      }

      if (!sourceArticles.includes(article.id)) {
        sourceArticles.push(article.id);
      }

      if (!stats) {
        statsMap.set(resultId, {
          slug: resultId,
          type: resultArticle.type ?? '',
          title: resultArticle.title ?? '',
          totalCount: 1,
          positionCounts: Array.from({ length: RESULT_LIMIT }, (_, position) =>
            position === hitIndex ? 1 : 0,
          ),
        });
        return;
      }

      stats.totalCount += 1;
      stats.positionCounts[hitIndex] += 1;
    });
  }

  const rows = [...statsMap.values()].sort((a, b) => {
    if (b.totalCount !== a.totalCount) {
      return b.totalCount - a.totalCount;
    }

    return a.slug.localeCompare(b.slug, 'pl');
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buildCsv(rows), 'utf8');
  await fs.writeFile(jsonOutputPath, buildJson(rows, similarSourceMap), 'utf8');

  console.log(`Zapisano raport CSV do ${outputPath}`);
  console.log(`Zapisano raport JSON do ${jsonOutputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
