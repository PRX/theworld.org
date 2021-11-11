/**
 * Fetch stories for a term from CMS API.
 *
 * @param id Term data or identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { generateLinkHrefForContent } from '@lib/routing';
import { fetchPriApiItem, fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export const fetchTermStories = async (
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
    const { pathname } = generateLinkHrefForContent(term) || {};
    const [, fn] = pathname.split('/');
    const fieldName = fn === 'tags' ? fn : `opencalais_${fn}`;

    // Fetch list of stories. Paginated.
    return fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      [`filter[${fieldName}]`]: term.id,
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
