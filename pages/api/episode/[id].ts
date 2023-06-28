/**
 * @file episode/[id].ts
 * Gather episode data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlEpisode } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const story = await fetchGqlEpisode(id as string);

    if (story) {
      return res.status(200).json(story);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
