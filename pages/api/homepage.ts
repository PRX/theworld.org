/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchTwApiHomepage } from '@lib/fetch/homepage/fetchTwApiHomepage';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResp = await fetchTwApiHomepage();

  res.setHeader(
    'Cache-Control',
    process.env.TW_API_COLLECTION_CACHE_CONTROL ||
      'public, s-maxage=300, stale-while-revalidate'
  );

  return res.status(200).json(apiResp);
};
