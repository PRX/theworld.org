/**
 * @file file/[id].ts
 * Gather file data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullAudioParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const story = (await fetchPriApiItem('file--audio', id as string, {
      ...fullAudioParams
    })) as IPriApiResource;

    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};
