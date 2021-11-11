/**
 * Fetch episodes for a program from CMS API.
 *
 * @param id Program data or identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicEpisodeParams } from '../api/params';

export const fetchTermEpisodes = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  exclude: string[] | string = null
): Promise<PriApiResourceResponse> => {
  let term: IPriApiResource;

  if (typeof id === 'string') {
    term = await fetchPriApiItem('taxonomy_term--terms', id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
  } else {
    term = id;
  }

  if (term) {
    const { featuredStories } = term;
    const excluded =
      (exclude || featuredStories) &&
      [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ]
        .filter((v: string) => !!v)
        .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

    // Fetch list of stories. Paginated.
    return fetchPriApiQuery('node--episodes', {
      ...basicEpisodeParams,
      'filter[status]': 1,
      'filter[tags]': term.id,
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
