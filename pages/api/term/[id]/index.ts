/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import {
  fetchApiTermEpisodes,
  fetchApiTermStories,
  fetchPriApiItem
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
      const storiesData = [...stories.data];

      // Fetch list of episodes. Paginated.
      const episodes = await fetchApiTermEpisodes(
        id as string,
        1,
        undefined,
        undefined,
        req
      );

      // Build response object.
      const apiResp = {
        ...term.data,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : storiesData.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              storiesData.splice(0, 4 - featuredStories.length)
            )
          : storiesData.splice(0, 4),
        stories: {
          ...stories,
          data: storiesData
        },
        episodes
      };

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
