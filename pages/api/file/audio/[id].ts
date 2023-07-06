/**
 * @file file/audio/[id].ts
 * Gather audio file data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlAudio } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const audio = await fetchGqlAudio(id as string);

    if (audio) {
      return res.status(200).json(audio);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
