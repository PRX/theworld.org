/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { fullStoryParams } from '@lib/fetch/api/params';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 15, exclude } = req.query;

  if (id) {
    const category = (await fetchPriApiItem(
      'taxonomy_term--categories',
      id as string
    )) as IPriApiResource;

    if (category) {
      const { featuredStories } = category;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories ? featuredStories.map(({ id: i }) => i) : [])
      ];

      // Fetch list of stories. Paginated.
      const data = (await fetchPriApiQuery('node--stories', {
        ...fullStoryParams,
        'filter[status]': 1,
        'filter[primary_category]': id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range,
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
