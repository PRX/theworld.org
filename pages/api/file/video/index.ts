/**
 * @file file/video/index.ts
 * Gather video file collection data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { basicVideoParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query || {};

  const files = (await fetchPriApiQuery('file--videos', {
    ...basicVideoParams,
    sort: '-date',
    ...query
  })) as IPriApiCollectionResponse;

  res.setHeader(
    'Cache-Control',
    process.env.TW_API_COLLECTION_CACHE_CONTROL ||
      'public, s-maxage=300, stale-while-revalidate'
  );

  return res.status(200).json(files);
};
