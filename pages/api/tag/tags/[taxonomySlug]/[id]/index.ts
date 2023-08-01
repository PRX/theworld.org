/**
 * @file tag/tags/[taxonomySlug]/[id]/index.ts
 * Gather custom taxonomy tag data from CMS API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlTag } from '@lib/fetch';
import { taxonomySlugToSingularName } from '@lib/map/taxonomy';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, taxonomySlug: ts } = req.query;
  const tagId = !!id && (typeof id === 'string' ? id : id[0]);
  const taxonomySlug =
    (!!ts && (typeof ts === 'string' ? ts : ts[0])) || undefined;
  const taxonomySingleName =
    taxonomySlug && taxonomySlugToSingularName.get(taxonomySlug);

  if (tagId) {
    const tag = await fetchGqlTag(tagId, undefined, taxonomySingleName);

    if (tag) {
      return res.status(200).json(tag);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
