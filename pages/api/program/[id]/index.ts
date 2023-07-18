/**
 * @file program/[id]/index.ts
 * Gather program data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlProgram } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const programId = !!id && (typeof id === 'string' ? id : id[0]);

  if (programId) {
    const program = await fetchGqlProgram(programId);

    if (program) {
      return res.status(200).json(program);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
