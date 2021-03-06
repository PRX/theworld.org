/**
 * @file file/[id].ts
 * Gather file data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullAudioParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const file = (await fetchPriApiItem('file--audio', id as string, {
      ...fullAudioParams
    })) as IPriApiResourceResponse;

    if (file) {
      res.status(200).json(file.data);
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};
