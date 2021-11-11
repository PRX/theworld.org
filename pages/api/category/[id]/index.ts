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
      const storiesData = [...stories.data];

      // Build response object.
      const apiResp = {
        ...category,
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
        }
      };

      return res.status(200).json(apiResp);
    }

    return res.status(404);
  }

  return res.status(400);
};
