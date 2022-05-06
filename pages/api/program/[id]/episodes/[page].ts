/**
 * @file program/[id]/episodes.ts
 * Gather program episodes data from CMS API.
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
    const program = (await fetchPriApiItem(
      'node--programs',
      id as string
    )) as IPriApiResourceResponse;

    if (program) {
      const excluded =
        exclude &&
        [...(exclude && Array.isArray(exclude) ? exclude : [exclude])]
          .filter((v: string) => !!v)
          .reduce((a, v, i) => ({ ...a, [`filter[id][value][${i}]`]: v }), {});

      // Fetch list of episodes. Paginated.
      const episodes = (await fetchPriApiQuery('node--episodes', {
        ...basicEpisodeParams,
        'filter[status]': 1,
        'filter[program]': id,
        ...(excluded && {
          ...excluded,
          'filter[id][operator]': 'NOT IN'
        }),
        sort: '-date_published',
        range,
        page
      })) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = episodes;

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404);
  }

  return res.status(400);
};
