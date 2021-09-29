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
          param => `featured_stories.${param}`
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
      const stories = await fetchApiProgramStories(
        id as string,
        1,
        undefined,
        undefined,
        req
      );

      // Fetch list of episodes. Paginated.
      const episodes = await fetchApiProgramEpisodes(
        id as string,
        1,
        undefined,
        undefined,
        req
      );

      // Build response object.
      const apiResp = {
        data: {
          ...program.data,
          featuredStory: featuredStories
            ? featuredStories.shift()
            : stories.data.shift(),
          featuredStories: featuredStories
            ? featuredStories.concat(
                stories.data.splice(0, 4 - featuredStories.length)
              )
            : stories.data.splice(0, 4),
          stories,
          episodes
        }
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }
  }

  res.status(400).end();
};
