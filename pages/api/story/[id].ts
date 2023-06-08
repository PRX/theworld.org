/**
 * @file story/[id].ts
 * Gather story data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlStory } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const story = await fetchGqlStory(parseInt(id as string, 10));

    if (story) {
      return res.status(200).json(story);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
