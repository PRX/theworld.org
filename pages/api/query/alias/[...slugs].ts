/**
 * @file [..slugs].ts
 * Query CMS API for data related to the provided URL path alias.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQueryAlias } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slugs } = req.query;
  const path = (slugs as string[]).join('/');

  if (path.length) {
    const apiResp = await fetchQueryAlias(path);

    if (apiResp) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
