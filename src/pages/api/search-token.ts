import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'typesense';
import {
  environment,
  postsCollectionName,
  searchApiKey,
  searchHost,
  searchPort,
  searchProtocol,
} from '../../shared/search-consts-server';
import { TokenResponse } from '@swistak-codes/types';

const client = new Client({
  nodes: [
    {
      host: searchHost,
      port: searchPort,
      protocol: searchProtocol,
    },
  ],
  apiKey: searchApiKey,
  connectionTimeoutSeconds: 2,
  useServerSideSearchCache: false,
});

const scopedEolTime = 1000 * 60 * 2;
const masterEolTime = 1000 * 3600 * 24;

let masterKey: string | null = null;
let masterTimeout: NodeJS.Timeout | null = null;
let masterEol: number = Number.MAX_SAFE_INTEGER;

async function generateMasterKey() {
  if (masterTimeout) {
    clearTimeout(masterTimeout);
  }
  masterEol = Date.now() + masterEolTime;
  const result = await client.keys().create({
    actions: ['documents:search'],
    collections: [postsCollectionName],
    description: `Master search key ${environment} ${new Date().toISOString()}`,
    expires_at: Math.trunc(masterEol / 1000),
    autodelete: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  masterKey = result.value;
  masterTimeout = setTimeout(() => {
    masterKey = null;
    masterTimeout = null;
    masterEol = Number.MAX_SAFE_INTEGER;
  }, masterEolTime - 1000);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse>
) {
  if (req.method === 'POST') {
    if (!masterKey) {
      await generateMasterKey();
    }
    let expiresAt = Date.now() + scopedEolTime;
    if (expiresAt > masterEol) {
      expiresAt = masterEol - 100;
    }
    const searchToken = client.keys().generateScopedSearchKey(masterKey, {
      exclude_fields: 'embedding,contentEmbedding',
      query_by: 'title,abstract,content,tags,categories',
      use_cache: true,
      cache_ttl: 3600,
      expires_at: Math.trunc(expiresAt / 1000),
    });
    // const suggestionsToken = client.keys().generateScopedSearchKey(masterKey, {
    //   exclude_fields:
    //     'embedding,contentEmbedding,id,type,date,abstract,content,image',
    //   query_by: 'title,tags,categories',
    //   use_cache: true,
    //   cache_ttl: 3600,
    //   expires_at: Math.trunc(expiresAt / 1000),
    // });
    res.status(200).json({
      expiresAt,
      searchToken,
      suggestionsToken: 'no siema',
    } as TokenResponse);
  } else {
    res.status(403);
  }
}
