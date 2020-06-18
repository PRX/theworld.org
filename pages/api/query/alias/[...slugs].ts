/**
 * @file alias.ts
 * Query API for data related to the provided URL path alias.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQueryAlias } from '@lib/fetch/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slugs } = req.query;
  const path = (slugs as string[]).join('/');

  if (path.length) {
    const apiResp = await fetchPriApiQueryAlias(path, {
      fields: ['id']
    });

    if (apiResp) {
      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
