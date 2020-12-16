/**
 * @file story/index.ts
 * Gather story collection data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';
import { fullStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query || {};

  const stories = (await fetchPriApiQuery('node--stories', {
    ...fullStoryParams,
    range: 10,
    sort: '-date_published',
    ...query,
    'filter[status]': 1
  })) as IPriApiResource[];

  res.status(200).json(stories);
};
