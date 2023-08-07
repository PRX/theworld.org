/**
 * @file contributor/[id]/index.ts
 * Gather contributor data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlContributor } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const contributorId = !!id && (typeof id === 'string' ? id : id[0]);

  if (contributorId) {
    const contributor = await fetchGqlContributor(contributorId);

    if (contributor) {
      return res.status(200).json(contributor);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
