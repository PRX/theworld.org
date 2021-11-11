/**
 * @file term/[id]/stories.ts
 * Gather term stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';
import { generateLinkHrefForContent } from '@lib/routing';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 15, exclude } = req.query;

  if (id) {
    const term = (await fetchPriApiItem(
      'taxonomy_term--terms',
      id as string
    )) as IPriApiResourceResponse;

    if (term) {
      const { featuredStories } = term.data;
      const excluded =
        (exclude || featuredStories) &&
        [
          ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
          ...(featuredStories ? featuredStories.map(({ id: i }) => i) : [])
        ]
          .filter((v: string) => !!v)
          .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});
      const { pathname } = generateLinkHrefForContent(term.data);
      const [, fn] = pathname.split('/');
      const fieldName = fn === 'tags' ? fn : `opencalais_${fn}`;

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--stories', {
        ...basicStoryParams,
        'filter[status]': 1,
        [`filter[${fieldName}]`]: id,
        ...(excluded && {
          ...excluded,
          'filter[id][operator]': 'NOT IN'
        }),
        sort: '-date_published',
        range,
        page
      })) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = stories;

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
