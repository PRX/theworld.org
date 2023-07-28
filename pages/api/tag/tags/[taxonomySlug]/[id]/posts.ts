/**
 * @file tags/cities/[id]/posts.ts
 * Gather tag posts data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlTagPosts } from '@lib/fetch';
import { taxonomySlugToSingularName } from '@lib/map/taxonomy';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, taxonomySlug: ts, c, f, e } = req.query;
  const tagId = !!id && (typeof id === 'string' ? id : id[0]);
  const taxonomySlug =
    (!!ts && (typeof ts === 'string' ? ts : ts[0])) || undefined;
  const taxonomySingleName =
    taxonomySlug && taxonomySlugToSingularName.get(taxonomySlug);
  const cursor = !!c && (typeof c === 'string' ? c : c[0]);
  const pageSize = !!f && parseInt(typeof f === 'string' ? f : f[0], 10);
  const exclude = !!e && (typeof e === 'string' ? [e] : e);

  if (tagId) {
    const posts = await fetchGqlTagPosts(
      tagId,
      {
        ...(cursor && { cursor }),
        ...(pageSize && { pageSize }),
        ...(exclude && { exclude })
      },
      taxonomySingleName
    );

    if (posts) {
      return res.status(200).json(posts);
    }

    return res.status(404);
  }

  return res.status(400);
};
