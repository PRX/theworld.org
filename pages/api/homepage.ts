/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { basicStoryParams } from '@lib/fetch/api/params';
import { fetchApiProgram, fetchPriApiQuery } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Program Data
  const program = await fetchApiProgram('3704', req);

  // Latest Non-TW stories
  const latestStories = (await fetchPriApiQuery('node--stories', {
    ...basicStoryParams,
    'filter[status]': 1,
    'filter[program][value]': 3704,
    'filter[program][operator]': '<>',
    sort: '-date_published',
    range: 10
  })) as IPriApiCollectionResponse;

  const apiResp = {
    ...program,
    latestStories
  };

  res.status(200).json(apiResp);
};
