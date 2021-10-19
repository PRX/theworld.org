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
      const excluded = exclude && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude])
      ];

      // Fetch list of episodes. Paginated.
      const episodes = (await fetchPriApiQuery('node--episodes', {
        ...basicEpisodeParams,
        'filter[status]': 1,
        'filter[program]': id,
        ...(excluded && {
          'filter[id][value]': excluded,
          'filter[id][operator]': '<>'
        }),
        sort: '-date_published',
        range,
        page
      })) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = episodes;

      return res.status(200).json(apiResp);
    }

    return res.status(404);
  }

  return res.status(400);
};
