/**
 * @file episode/index.ts
 * Gather episode collection data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { basicEpisodeParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query || {};

  const episodes = (await fetchPriApiQuery('node--episodes', {
    ...basicEpisodeParams,
    range: 10,
    sort: '-date_published',
    ...query,
    'filter[status]': 1
  })) as IPriApiCollectionResponse;

  res.setHeader(
    'Cache-Control',
    process.env.TW_API_COLLECTION_CACHE_CONTROL ||
      'public, s-maxage=300, stale-while-revalidate'
  );

  return res.status(200).json(episodes);
};
