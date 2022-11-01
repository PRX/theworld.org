/**
 * @file app.ts
 * Gather app data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchApp } from '@lib/fetch/app';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResp = await fetchApp();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate'
  );

  return res.status(200).json(apiResp);
};
