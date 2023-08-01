/**
 * @file tags/[id]/index.ts
 * Gather tag data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlTag } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const tagId = !!id && (typeof id === 'string' ? id : id[0]);

  if (tagId) {
    const tag = await fetchGqlTag(tagId);

    if (tag) {
      return res.status(200).json(tag);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
