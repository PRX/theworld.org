/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchApiProgram, fetchPriApiQuery } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Program Data
  const {
    data: { featuredStories, latestEpisode, stories },
    ctaRegions,
    context
  } = await fetchApiProgram(3704, req);

  // Latest Non-TW stories
  const latestStories = (await fetchPriApiQuery('node--stories', {
    'filter[status]': 1,
    'filter[program][value]': 3704,
    'filter[program][operator]': '<>',
    sort: '-date_published',
    range: 10
  })) as IPriApiResource[];

  const apiResp = {
    type: 'homepage',
    ctaRegions,
    context,
    data: {
      featuredStory: featuredStories
        ? featuredStories.shift()
        : stories.shift(),
      featuredStories: featuredStories
        ? featuredStories.concat(stories.splice(0, 4 - featuredStories.length))
        : stories.splice(0, 4),
      stories,
      latestStories,
      latestEpisode
    }
  };

  res.status(200).json(apiResp);
};
