/**
 * @file [q].ts
 * Query Google Custom Search Engine JSON API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchApiSearch } from '@lib/fetch/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { label, q, start } = req.query;

  if (q.length) {
    const apiResp = await fetchApiSearch(
      q as string,
      label as string,
      start as string
    );

    if (apiResp) {
      return res.status(200).json(apiResp);
    }

    return res.status(400).json(apiResp);
  }

  return res.status(400).end();
};
