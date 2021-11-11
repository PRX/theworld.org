/**
 * Fetch stories for a program from CMS API.
 *
 * @param id Program data or identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export const fetchProgramStories = async (
  id: string | IPriApiResource,
  page: number = 1,
  range: number = 15,
  exclude: string[] | string = undefined
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
    return fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
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
