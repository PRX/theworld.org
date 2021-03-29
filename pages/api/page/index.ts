/**
 * @file page/index.ts
 * Gather page collection data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { basicEpisodeParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query || {};

  const stories = (await fetchPriApiQuery('node--pages', {
    ...basicEpisodeParams,
    range: 10,
    sort: '-date_published',
    ...query,
    'filter[status]': 1
  })) as IPriApiCollectionResponse;

  res.status(200).json(stories);
};
