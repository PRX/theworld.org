/**
 * @file program/[id]/index.ts
 * Gather program data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  fetchApiProgramStories,
  fetchPriApiItem,
  fetchPriApiQuery,
  postJsonPriApiCtaRegion
} from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const getContext = (program: IPriApiResource): string[] => [
    `node:${program.id}`
  ];

  if (id) {
    const program = (await fetchPriApiItem('node--programs', id as string, {
      include: [
        'banner_image',
        'featured_stories.image',
        'featured_stories.primary_category',
        'logo',
        'podcast_logo'
      ]
    })) as IPriApiResource;

    if (program) {
      const { type, featuredStories } = program;

      // Fetch list of stories. Paginated.
      const { data: stories } = await fetchApiProgramStories(id as string, req);

      // Latest Episode
      const latestEpisode = ((await fetchPriApiQuery('node--episodes', {
        include: ['image', 'audio.segments'],
        'filter[status]': 1,
        'filter[program]': id,
        sort: '-date_published',
        range: 1
      })) as IPriApiResource[]).shift();

      // Fetch CTA Messages.
      const context = getContext(program);
      const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
        'tw_cta_regions_landing',
        {
          context
        }
      )) as IPriApiResource;

      // Build response object.
      const apiResp = {
        type,
        context,
        ctaRegions,
        data: {
          ...program,
          featuredStory: featuredStories
            ? featuredStories.shift()
            : stories.shift(),
          featuredStories: featuredStories
            ? featuredStories.concat(
                stories.splice(0, 4 - featuredStories.length)
              )
            : stories.splice(0, 4),
          latestEpisode,
          stories
        }
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
