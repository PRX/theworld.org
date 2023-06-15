/**
 * @file [q].ts
 * Query Google Custom Search Engine JSON API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuerySearch } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { label, q, start } = req.query;

  if (q?.length) {
    const apiResp = await fetchQuerySearch(
      q as string,
      label as string,
      start as string
    );

    if (apiResp) {
      res.setHeader(
        'Cache-Control',
        'no-cache, no-store, max-age=0, must-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(400).json(apiResp);
  }

  return res.status(400).end();
};
