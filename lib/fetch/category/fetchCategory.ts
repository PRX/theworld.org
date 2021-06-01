/**
 * Fetch category data from CMS API.
 *
 * @param id Category identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchCategoryStories } from './fetchCategoryStories';

export const fetchCategory = async (
  id: string
): Promise<PriApiResourceResponse> => {
  const params = {
    include: [
      'banner_image',
      'logo',
      ...(basicStoryParams.include || [])
        .filter(param => param !== 'primary_category')
        .map(param => `featured_stories.${param}`)
    ]
  };
  const category = await fetchPriApiItem(
    'taxonomy_term--categories',
    id as string,
    params
  );

  if (category) {
    const { data } = category;
    const { featuredStories } = data as IPriApiResource;
    const stories = await fetchCategoryStories(data as IPriApiResource).then(
      (resp: IPriApiCollectionResponse) => resp
    );

    // Build response object.
    const resp = {
      data: {
        ...category.data,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.data.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.data.splice(0, 4 - featuredStories.length)
            )
          : stories.data.splice(0, 4),
        stories
      }
    } as IPriApiResourceResponse;

    return resp;
  }

  return false;
};
