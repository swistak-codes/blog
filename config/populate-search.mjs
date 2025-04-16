import { URL } from 'url';
import Typesense from 'typesense';
import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const environment = new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname;
const gptApiKey = process.env.GPT_API_KEY;
const searchApiKey = process.env.SEARCH_ADMIN_API_KEY;
const searchHost = process.env.SEARCH_HOST;
const searchPort = parseInt(process.env.SEARCH_PORT);
const searchProtocol = process.env.SEARCH_PROTOCOL;
const postsCollectionName = `posts_${environment}`;
const postsPopularCollectionName = `posts_queries_${environment}`;
const postsNoResultsCollectionName = `no_hits_queries_${environment}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const metadataFilePath = join(__dirname, '../blog-contents-metadata');
const postsFilePath = join(__dirname, '../blog-contents.jsonl');

const postsSchema = {
  name: postsCollectionName,
  fields: [
    {
      name: 'title',
      type: 'string',
      facet: false,
    },
    {
      name: 'id',
      type: 'string',
      facet: false,
    },
    {
      name: 'type',
      type: 'string',
      facet: true,
    },
    {
      name: 'tags',
      type: 'string[]',
      facet: true,
    },
    {
      name: 'categories',
      type: 'string[]',
      facet: true,
    },
    {
      name: 'date',
      type: 'int64',
      facet: false,
    },
    {
      name: 'abstract',
      type: 'string',
      facet: false,
    },
    {
      name: 'content',
      type: 'string',
      facet: false,
    },
    {
      name: 'contentEmbedding',
      type: 'string',
      facet: false,
      index: false,
    },
    {
      name: 'image',
      type: 'string',
      facet: false,
      index: false,
    },
    {
      name: 'embedding',
      type: 'float[]',
      embed: {
        from: ['title', 'tags', 'categories', 'abstract', 'contentEmbedding'],
        model_config: {
          model_name: 'openai/text-embedding-3-small',
          api_key: gptApiKey,
        },
      },
    },
  ],
  default_sorting_field: 'date',
};
const popularSchema = {
  name: postsPopularCollectionName,
  fields: [
    { name: 'q', type: 'string' },
    { name: 'count', type: 'int32' },
  ],
};
const noResultsSchema = {
  name: postsNoResultsCollectionName,
  fields: [
    { name: 'q', type: 'string' },
    { name: 'count', type: 'int32' },
  ],
};
const popularRule = {
  type: 'popular_queries',
  params: {
    source: {
      collections: [postsCollectionName],
    },
    destination: {
      collection: postsPopularCollectionName,
    },
    expand_query: false,
    limit: 1000,
  },
};
const noResultsRule = {
  type: 'nohits_queries',
  params: {
    source: {
      collections: [postsCollectionName],
    },
    destination: {
      collection: postsNoResultsCollectionName,
    },
    limit: 1000,
  },
};

async function checkEndpoint(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log('Search response not ok');
      return false;
    }

    const data = await response.json();
    return !!data?.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Search health request timed out');
      return false;
    } else {
      console.log('Search fetch error:', error.message);
      return false;
    }
  }
}

async function createCollections(client) {
  const list = await client.collections().retrieve();
  const availableCollections = new Set(list.map((x) => x.name));
  if (!availableCollections.has(postsCollectionName)) {
    console.log(`Creating ${postsCollectionName} collection`);
    await client.collections().create(postsSchema);
  }
  if (!availableCollections.has(postsPopularCollectionName)) {
    console.log(`Creating ${popularSchema} collection and analytics rule`);
    await client.collections().create(popularSchema);
    await client.analytics
      .rules()
      .upsert(`posts_popular_${environment}`, popularRule);
  }
  if (!availableCollections.has(postsNoResultsCollectionName)) {
    console.log(`Creating ${noResultsSchema} collection and analytics rule`);
    await client.collections().create(noResultsSchema);
    await client.analytics
      .rules()
      .upsert(`posts_no_results_${environment}`, noResultsRule);
  }
}

async function getLastImportDate() {
  try {
    const metadata = await fs.readFile(metadataFilePath, {
      encoding: 'utf-8',
    });
    return parseFloat(metadata) || 0;
  } catch (e) {
    console.log("Couldn't read metadata file, returning 0");
    return 0;
  }
}

async function populateData(client) {
  const lastDate = await getLastImportDate();
  const stats = await fs.stat(postsFilePath);
  if (stats.mtimeMs <= lastDate) {
    console.log('Data already added, aborting adding');
    return;
  }
  try {
    await fs.writeFile(metadataFilePath, '' + stats.mtimeMs, {
      encoding: 'utf-8',
      flag: 'w',
    });
  } catch (e) {
    console.log("Couldn't write metadata file", e);
  }
  const data = await fs.readFile(postsFilePath);
  console.log('Uploading JSONL file');
  const result = await client
    .collections(postsCollectionName)
    .documents()
    .import(data, { action: 'upsert' });
  const resultObj = result.split('\n').map((x) => JSON.parse(x));
  console.log(
    'Uploaded documents. Failures:',
    resultObj
      .filter((x) => !x.success)
      .map((x) => ({
        ...x,
        document: JSON.parse(x.document).id,
      })),
  );
  console.log('Failures count:', resultObj.filter((x) => !x.success).length);
}

export async function populateSearch() {
  console.log('POPULATE SEARCH', { searchProtocol, searchHost, searchPort });
  const isSearchAvailable = await checkEndpoint(
    `${searchProtocol}://${searchHost}:${searchPort}/health`,
  );
  console.log('isSearchAvailable', isSearchAvailable);
  if (!isSearchAvailable) {
    return;
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
    connectionTimeoutSeconds: 300,
  });
  await createCollections(client);
  await populateData(client);
}
