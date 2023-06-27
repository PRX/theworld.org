/**
 * @file program/[id]/index.ts
 * Gather program data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import {
  fetchApiProgramEpisodes,
  fetchApiProgramStories,
  fetchPriApiItem
} from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const params = {
      include: [
        'banner_image',
        'hosts.image',
        'logo',
        'podcast_logo',
        ...(basicStoryParams.include || []).map(
          (param) => `featured_stories.${param}`
        )
      ]
    };
    const program = (await fetchPriApiItem(
      'node--programs',
      id as string,
      params
    )) as IPriApiResourceResponse;

    if (program) {
      const { featuredStories } = program.data;

      // Fetch list of stories. Paginated.
      const stories = await fetchApiProgramStories(id as string);
      const storiesData = [...(stories?.data || [])];

      // Fetch list of episodes. Paginated.
      const episodes = await fetchApiProgramEpisodes(id as string);

      // Build response object.
      const apiResp = {
        data: {
          ...program.data,
          featuredStory: featuredStories
            ? featuredStories.shift()
            : storiesData.shift(),
          featuredStories: featuredStories
            ? [
                ...featuredStories,
                ...storiesData.splice(0, 4 - featuredStories.length)
              ]
            : storiesData.splice(0, 4),
          stories: {
            ...stories,
            data: storiesData
          },
          episodes
        }
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
