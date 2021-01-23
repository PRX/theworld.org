/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchApiCategoryStories, fetchPriApiItem } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, p = '1' } = req.query;

  if (id) {
    const category = (await fetchPriApiItem(
      'taxonomy_term--categories',
      id as string,
      {
        include: [
          'banner_image',
          'logo',
          ...(basicStoryParams.include || [])
            .filter(param => param !== 'primary_category')
            .map(param => `featured_stories.${param}`)
        ]
      }
    )) as IPriApiResource;

    if (category) {
      const {
        featuredStories,
        metatags: { canonical }
      } = category;
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
      const { data: stories } = await fetchApiCategoryStories(
        id as string,
        1,
        undefined,
        undefined,
        undefined,
        req
      );

      const moreStories =
        (page > 1 &&
          (
            await fetchApiCategoryStories(
              id as string,
              page,
              undefined,
              undefined,
              undefined,
              req
            )
          ).data) ||
        [];

      // Build response object.
      const apiResp = {
        ...category,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.splice(0, 4 - featuredStories.length)
            )
          : stories.splice(0, 4),
        stories: [...stories, ...moreStories],
        page,
        nextPageUrl,
        nextPageAs
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
