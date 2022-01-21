/**
 * Fetch stories for a person from CMS API.
 *
 * @param id Person data or identifier.
 * @param page Page number to fetch.
 * @param range Number of items per page.
 * @param exclude Array of id strings to not exclude from query.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export const fetchPersonStories = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  exclude: string[] | string = null
): Promise<PriApiResourceResponse> => {
  let person: IPriApiResource;

  if (typeof id === 'string') {
    person = await fetchPriApiItem('node--people', id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
  } else {
    person = id;
  }

  if (person) {
    const { featuredStories } = person;
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
      'filter[byline]': person.id,
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
