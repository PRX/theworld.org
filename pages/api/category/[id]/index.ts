/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource, PriApiResponseBody } from 'pri-api-library/types';
import { fetchApiCategoryStories, fetchPriApiItem } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const { data: category } = (await fetchPriApiItem(
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
    )) as PriApiResponseBody;

    if (category) {
      const { featuredStories } = category as IPriApiResource;

      // Fetch list of stories. Paginated.
      const stories = await fetchApiCategoryStories(
        id as string,
        1,
        undefined,
        undefined,
        undefined,
        req
      );

      // Build response object.
      const apiResp = {
        ...category,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.data.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.data.splice(0, 4 - featuredStories.length)
            )
          : stories.data.splice(0, 4),
        stories
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
