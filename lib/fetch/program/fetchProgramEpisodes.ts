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

export const fetchProgramEpisodes = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  exclude: string[] | string = null
): Promise<PriApiResourceResponse> => {
  let program: IPriApiResource;

  if (typeof id === 'string') {
    program = await fetchPriApiItem('node--programs', id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
  } else {
    program = id;
  }

  if (program) {
    const { featuredStories } = program;
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
      'filter[program]': program.id,
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
