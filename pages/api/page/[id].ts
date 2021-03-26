/**
 * @file episode/[id].ts
 * Gather episode data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const page = (await fetchPriApiItem(
      'node--pages',
      id as string,
      {}
    )) as IPriApiResourceResponse;

    if (page) {
      const apiResp = {
        ...page.data
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};
