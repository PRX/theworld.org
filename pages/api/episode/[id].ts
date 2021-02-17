/**
 * @file episode/[id].ts
 * Gather episode data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullEpisodeParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const episode = (await fetchPriApiItem('node--episodes', id as string, {
      ...fullEpisodeParams
    })) as IPriApiResourceResponse;

    if (episode) {
      res.status(200).json(episode.data);
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};
