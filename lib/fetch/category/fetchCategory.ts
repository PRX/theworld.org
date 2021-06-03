/**
 * Fetch category data from CMS API.
 *
 * @param id Category identifier.
 */

import {
  PriApiResourceResponse,
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
      ...(basicStoryParams.include || []).map(
        param => `featured_stories.${param}`
      )
    ]
  };
  const category = await fetchPriApiItem(
    'taxonomy_term--categories',
    id as string,
    params
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (category) {
    const { featuredStories } = category;
    const stories = await fetchCategoryStories(category).then(
      (resp: IPriApiCollectionResponse) => resp
    );

    // Build response object.
    const resp = {
      data: {
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
      }
    } as IPriApiResourceResponse;

    return resp;
  }

  return false;
};
