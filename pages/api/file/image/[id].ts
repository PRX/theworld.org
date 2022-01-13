/**
 * @file file/image/[id].ts
 * Gather image file data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullImageParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const file = (await fetchPriApiItem('file--images', id as string, {
      ...fullImageParams
    })) as IPriApiResourceResponse;

    if (file) {
      res.setHeader(
        'Cache-Control',
        process.env.TW_API_RESOURCE_CACHE_CONTROL ||
          'public, s-maxage=600, stale-while-revalidate'
      );

      return res.status(200).json(file);
    }
    return res.status(404).end();
  }

  return res.status(400).end();
};
