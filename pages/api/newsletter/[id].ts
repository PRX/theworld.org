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
      res.setHeader(
        'Cache-Control',
        process.env.TW_API_RESOURCE_CACHE_CONTROL ||
          'public, s-maxage=600, stale-while-revalidate'
      );

      return res.status(200).json(newsletter.data);
    }

    return res.status(404);
  }

  return res.status(400);
};
