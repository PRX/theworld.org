/**
 * @file page/[id].ts
 * Gather page data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlPage } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const data = await fetchGqlPage(id as string);

    if (data) {
      return res.status(200).json(data);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
