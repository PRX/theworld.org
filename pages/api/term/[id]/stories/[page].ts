/**
 * @file term/[id]/stories.ts
 * Gather term stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTermStories } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 15, exclude } = req.query;

  if (id) {
    const stories = await fetchTermStories(
      id as string,
      parseInt(page as string, 10),
      parseInt(range as string, 10),
      exclude as string
    );

    if (stories) {
      // Build response object.
      const apiResp = stories;

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
