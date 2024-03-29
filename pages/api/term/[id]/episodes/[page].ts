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
  const { id, page = '1', range = 5, exclude } = req.query;

  if (id) {
    const term = (await fetchPriApiItem(
      'taxonomy_term--terms',
      id as string
    )) as IPriApiResourceResponse;

    if (term) {
      const excluded =
        exclude &&
        [...(exclude && Array.isArray(exclude) ? exclude : [exclude])]
          .filter((v: string) => !!v)
          .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

      // Fetch list of stories. Paginated.
      const stories = (await fetchPriApiQuery('node--episodes', {
        ...basicEpisodeParams,
        'filter[status]': 1,
        'filter[tags]': id,
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

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
