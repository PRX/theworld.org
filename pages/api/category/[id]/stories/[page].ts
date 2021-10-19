/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource, PriApiResponseBody } from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    page = '1',
    range = '15',
    field = 'categories',
    exclude
  } = req.query;
  let code = 400;
  let apiResp: any;

  if (id) {
    const { data: category } = (await fetchPriApiItem(
      'taxonomy_term--categories',
      id as string
    )) as PriApiResponseBody;

    if (category) {
      const { featuredStories } = category as IPriApiResource;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories ? featuredStories.map(({ id: i }) => i) : [])
      ];

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        [`filter[${field}]`]: id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range,
        page
      })) as PriApiResponseBody;

      // Build response object.
      code = 200;
      apiResp = stories;
    } else {
      code = 404;
    }
  }

  switch (code) {
    case 200:
      res.status(code).json(apiResp);
      break;

    default:
      res.status(code).end();
      break;
  }
};
