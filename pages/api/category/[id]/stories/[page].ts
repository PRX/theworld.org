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

  if (id) {
    const { data: category } = (await fetchPriApiItem(
      'taxonomy_term--categories',
      id as string
    )) as PriApiResponseBody;

    if (category) {
      const { featuredStories } = category as IPriApiResource;
      const excluded =
        (exclude || featuredStories) &&
        [
          ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
          ...(featuredStories ? featuredStories.map(({ id: i }) => i) : [])
        ]
          .filter((v: string) => !!v)
          .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        [`filter[${field}]`]: id,
        ...(excluded && {
          ...excluded,
          'filter[id][operator]': 'NOT IN'
        }),
        sort: '-date_published',
        range,
        page
      })) as PriApiResponseBody;

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(stories);
    }

    return res.status(404).end();
  }

  return res.status(500).end();
};
