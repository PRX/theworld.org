/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { basicStoryParams } from '@lib/fetch/api/params';
import {
  fetchApiProgram,
  fetchPriApiQuery,
  fetchPriApiQueryMenu
} from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [program, latestStories, quickLinks] = await Promise.all([
    fetchApiProgram('3704').then(resp => resp && resp.data),
    fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      'filter[program][value]': 3704,
      'filter[program][operator]': '<>',
      sort: '-date_published',
      range: 10
    }).then((resp: IPriApiCollectionResponse) => resp),
    fetchPriApiQueryMenu('menu-the-world-quick-links')
  ]);

  const apiResp = {
    data: {
      ...program,
      latestStories,
      menus: {
        quickLinks
      }
    }
  };

  res.setHeader(
    'Cache-Control',
    process.env.TW_API_COLLECTION_CACHE_CONTROL ||
      'public, s-maxage=300, stale-while-revalidate'
  );

  return res.status(200).json(apiResp);
};
