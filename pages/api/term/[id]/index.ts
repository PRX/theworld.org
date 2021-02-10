/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
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
    )) as IPriApiResourceResponse;

    if (term) {
      const { featuredStories } = term.data;

      // Fetch list of stories. Paginated.
      const stories = await fetchApiTermStories(
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
      }).then((resp: IPriApiCollectionResponse) => resp.data.shift());

      // Build response object.
      const apiResp = {
        ...term.data,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.data.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.data.splice(0, 4 - featuredStories.length)
            )
          : stories.data.splice(0, 4),
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
