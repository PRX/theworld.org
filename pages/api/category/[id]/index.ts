/**
 * @file category/[id]/index.ts
 * Gather category data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlCategory } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const categoryId = !!id && (typeof id === 'string' ? id : id[0]);

  if (categoryId) {
    const category = await fetchGqlCategory(categoryId);

    if (category) {
      return res.status(200).json(category);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
