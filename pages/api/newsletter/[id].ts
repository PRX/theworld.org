/**
 * @file [id].ts
 * Gather newsletter data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem } from '@lib/fetch/api';
import { IPriApiResourceResponse } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const newsletter = (await fetchPriApiItem(
      'node--newsletter_sign_ups',
      id as string,
      {
        include: ['image']
      }
    )) as IPriApiResourceResponse;

    if (newsletter) {
      res.status(200).json(newsletter.data);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
