/**
 * @file [q].ts
 * Query Google Custom Search Engine JSON API.
 */

import { google, customsearch_v1 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { search } from '@config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gcs = google.customsearch({
    version: 'v1',
    auth: process.env.CSE_API_KEY
  });
  const { label, q, start } = req.query;
  const { cseId: cx } = search;
  const listParams: customsearch_v1.Params$Resource$Cse$List = {
    cx,
    q:
      !label || label !== 'all'
        ? `${q as string} more:${label}`
        : (q as string),
    ...(start && { start: parseInt(start as string, 10) })
  };

  if (q.length) {
    const apiResp = await gcs.cse.siterestrict.list(listParams);

    switch (apiResp.status) {
      case 200:
        res.status(200).json(apiResp.data);
        break;

      default:
        res.status(400).json(apiResp);
    }

    return;
  }

  res.status(400).end();
};
