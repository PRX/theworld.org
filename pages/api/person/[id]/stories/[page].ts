/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiCollectionResponse,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range, exclude } = req.query;

  if (id) {
    const person = (await fetchPriApiItem(
      'node--people',
      id as string
    )) as IPriApiResourceResponse;

    if (person) {
      const { featuredStories } = person.data;
      const excluded =
        (exclude || featuredStories) &&
        [
          ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
          ...(featuredStories && featuredStories.map(({ id: i }) => i))
        ]
          .filter((v: string) => !!v)
          .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        'filter[byline]': id,
        ...(excluded && {
          ...excluded,
          'filter[id][operator]': 'NOT IN'
        }),
        sort: '-date_published',
        range,
        page
      })) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = stories;

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404);
  }

  return res.status(400);
};
