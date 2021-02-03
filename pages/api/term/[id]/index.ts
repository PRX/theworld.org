/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource } from 'pri-api-library/types';
import {
  fetchApiTermStories,
  fetchPriApiItem,
  fetchPriApiQuery
} from '@lib/fetch/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const term = (await fetchPriApiItem(
      'taxonomy_term--terms',
      id as string,
      {}
    )) as IPriApiResource;

    if (term) {
      const { featuredStories } = term;

      // Fetch list of stories. Paginated.
      const { data: stories } = await fetchApiTermStories(
        id as string,
        1,
        undefined,
        undefined,
        req
      );

      // Latest Episode
      const latestEpisode = await fetchPriApiQuery('node--episodes', {
        include: ['image', 'audio.segments'],
        'filter[status]': 1,
        'filter[tags][value]': id,
        'filter[tags][operator]': '"CONTAINS"',
        sort: '-date_published',
        range: 1
      }).then((resp: IPriApiResource[]) => resp.shift());

      // Build response object.
      const apiResp = {
        ...term,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.splice(0, 4 - featuredStories.length)
            )
          : stories.splice(0, 4),
        stories,
        latestEpisode
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
