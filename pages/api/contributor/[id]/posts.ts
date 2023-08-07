/**
 * @file contributor/[id]/posts.ts
 * Gather contributor posts data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlContributorPosts } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, c, f, e } = req.query;
  const contributorId = !!id && (typeof id === 'string' ? id : id[0]);
  const cursor = !!c && (typeof c === 'string' ? c : c[0]);
  const pageSize = !!f && parseInt(typeof f === 'string' ? f : f[0], 10);
  const exclude = !!e && (typeof e === 'string' ? [e] : e);

  if (contributorId) {
    const posts = await fetchGqlContributorPosts(contributorId, {
      ...(cursor && { cursor }),
      ...(pageSize && { pageSize }),
      ...(exclude && { exclude })
    });

    if (posts) {
      return res.status(200).json(posts);
    }

    return res.status(404);
  }

  return res.status(400);
};
