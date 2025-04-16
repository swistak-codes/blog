import { NextApiRequest, NextApiResponse } from 'next';
import { PostDocument, SimilarPost } from '@swistak-codes/types';
import { SearchClient } from 'typesense';
import {
  postsCollectionName,
  searchApiKey,
  searchHost,
  searchPort,
  searchProtocol,
} from '../../shared/search-consts-server';

const client = new SearchClient({
  nodes: [
    {
      host: searchHost,
      port: searchPort,
      protocol: searchProtocol,
    },
  ],
  apiKey: searchApiKey,
  connectionTimeoutSeconds: 2,
  useServerSideSearchCache: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimilarPost[]>
) {
  if (req.method === 'POST') {
    try {
      const { slug } = req.body;
      if (!slug) {
        res.status(200).json([]);
        return;
      }
      const results = await client
        .collections(postsCollectionName)
        .documents()
        .search(
          {
            q: '*',
            // filter_by: 'type:=blog',
            limit: 6,
            vector_query: `embedding:([], id: ${slug})`,
          },
          {
            cacheSearchResultsForSeconds: Number.MAX_SAFE_INTEGER,
          }
        );
      res.status(200).json(
        results.hits.map(
          (x) =>
            ({
              slug: (x.document as PostDocument).id,
              image: (x.document as PostDocument).image,
              title: (x.document as PostDocument).title,
              type: (x.document as PostDocument).type,
            } as SimilarPost)
        )
      );
    } catch (e) {
      res.status(200).json([]);
    }
  } else {
    res.status(403);
  }
}
