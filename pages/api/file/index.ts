/**
 * @file file/index.ts
 * Gather file collection data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';
import { basicAudioParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query || {};

  const stories = (await fetchPriApiQuery('file--audio', {
    ...basicAudioParams,
    sort: '-date_published',
    ...query
  })) as IPriApiResource[];

  res.status(200).json(stories);
};
