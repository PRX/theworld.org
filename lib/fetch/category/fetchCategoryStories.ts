/**
 * Fetch stories for a category from CMS API.
 *
 * @param id Category data or identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export const fetchCategoryStories = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  field = 'categories',
  exclude: string[] | string = null
): Promise<PriApiResourceResponse> => {
  let category: IPriApiResource;

  if (typeof id === 'string') {
    category = await fetchPriApiItem('taxonomy_term--categories', id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
  } else {
    category = id;
  }

  if (category) {
    const { featuredStories } = category;
    const excluded =
      (exclude || featuredStories) &&
      [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ]
        .filter((v: string) => !!v)
        .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

    // Fetch list of stories. Paginated.
    return fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      [`filter[${field}]`]: category.id,
      ...(excluded && {
        ...excluded,
        'filter[id][operator]': 'NOT IN'
      }),
      sort: '-date_published',
      range,
      page
    });
  }

  return false;
};
