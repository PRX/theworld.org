/**
 * @file program/[id]/episodes.ts
 * Gather program episodes data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlProgramEpisodes } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, c, f, e } = req.query;
  const programId = !!id && (typeof id === 'string' ? id : id[0]);
  const cursor = !!c && (typeof c === 'string' ? c : c[0]);
  const pageSize = !!f && parseInt(typeof f === 'string' ? f : f[0], 10);
  const exclude = !!e && (typeof e === 'string' ? [e] : e);

  if (programId) {
    const episodes = await fetchGqlProgramEpisodes(programId, {
      ...(cursor && { cursor }),
      ...(pageSize && { pageSize }),
      ...(exclude && { exclude })
    });

    if (episodes) {
      return res.status(200).json(episodes);
    }

    return res.status(404);
  }

  return res.status(400);
};
