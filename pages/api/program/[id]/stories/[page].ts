/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 15, exclude } = req.query;

  if (id) {
    const program = (await fetchPriApiItem(
      'node--programs',
      id as string
    )) as IPriApiResourceResponse;

    if (program) {
      const { featuredStories } = program.data;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ];

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        'filter[program]': id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range,
        page
      })) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = stories;

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
