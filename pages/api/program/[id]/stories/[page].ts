/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range, exclude } = req.query;

  if (id) {
    const program = (await fetchPriApiItem(
      'node--programs',
      id as string
    )) as IPriApiResource;

    if (program) {
      const { featuredStories } = program;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ];

      // Fetch list of stories. Paginated.
      const data = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        'filter[program]': id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range: range || 15,
        page
      })) as IPriApiResource[];

      // Build response object.
      const apiResp = { data };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
