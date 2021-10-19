/**
 * @file term/[id]/episodes.ts
 * Gather term episodes data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicEpisodeParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 10, exclude } = req.query;

  if (id) {
    const term = (await fetchPriApiItem(
      'taxonomy_term--terms',
      id as string
    )) as IPriApiResourceResponse;

    if (term) {
      const excluded = exclude && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude])
      ];

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--episodes', {
        ...basicEpisodeParams,
        'filter[status]': 1,
        'filter[tags]': id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
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
