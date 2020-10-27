/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, p: page } = req.query;

  if (id) {
    const program = (await fetchPriApiItem(
      'node--programs',
      id as string
    )) as IPriApiResource;

    if (program) {
      const { featuredStories } = program;

      // Fetch list of stories. Paginated./ Latest TW Stories
      const data = (await fetchPriApiQuery('node--stories', {
        include: ['image', 'primary_category'],
        'filter[status]': 1,
        'filter[program]': id,
        ...(featuredStories && {
          'filter[id][value]': featuredStories.map(({ id: i }) => i),
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range: 15 - (featuredStories ? featuredStories.length : 0),
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
