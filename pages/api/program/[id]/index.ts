/**
 * @file program/[id]/index.ts
 * Gather program data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'url';
import {
  fetchApiProgramStories,
  fetchPriApiItem,
  fetchPriApiQuery
} from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, p = '1' } = req.query;

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
    )) as IPriApiResource;

    if (program) {
      const {
        featuredStories,
        metatags: { canonical }
      } = program;
      const oUrl = parse(canonical);
      const page = parseInt(p as string, 10) || 1;
      const nextPage = page + 1;
      const nextPageUrl = {
        pathname: '/',
        query: {
          alias: oUrl.pathname,
          p: nextPage
        }
      };
      const nextPageAs = `${oUrl.pathname}?p=${nextPage}`;

      // Fetch list of stories. Paginated.
      const { data: stories } = await fetchApiProgramStories(
        id as string,
        1,
        req
      );

      const moreStories =
        (page > 1 &&
          (await fetchApiProgramStories(id as string, page, req)).data) ||
        [];

      // Latest Episode
      const latestEpisode = ((await fetchPriApiQuery('node--episodes', {
        include: ['image', 'audio.segments'],
        'filter[status]': 1,
        'filter[program]': id,
        sort: '-date_published',
        range: 1
      })) as IPriApiResource[]).shift();

      // Build response object.
      const apiResp = {
        ...program,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.splice(0, 4 - featuredStories.length)
            )
          : stories.splice(0, 4),
        stories: [...stories, ...moreStories],
        latestEpisode,
        page,
        nextPageUrl,
        nextPageAs
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }
  }

  res.status(400).end();
};
