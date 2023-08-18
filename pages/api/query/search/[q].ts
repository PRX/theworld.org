/**
 * @file [q].ts
 * Query Google Custom Search Engine JSON API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGqlQuerySearch } from '@lib/fetch';
import { SearchFacetAll, SearchQueryProps, searchFacetKeys } from '@interfaces';
import { decode } from 'base-64';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q, c, f, t } = req.query;
  const query = q && (typeof q === 'string' ? q : q[0]);
  const facet = t && ((typeof t === 'string' ? t : t[0]) as SearchFacetAll);
  const cursor = c && (typeof c === 'string' ? c : c[0]);
  const cursors = cursor && JSON.parse(decode(cursor));
  const pageSize = f && parseInt(typeof f === 'string' ? f : f[0], 10);
  const isValidFacet = !facet || [...searchFacetKeys, 'all'].includes(facet);

  if (query?.length && isValidFacet) {
    const queryProps = {
      query,
      ...(facet && {
        facet
      }),
      ...(cursors && {
        cursors
      })
    } as SearchQueryProps;
    const apiResp = await fetchGqlQuerySearch(queryProps, {
      ...(pageSize && { pageSize })
    });

    if (apiResp) {
      res.setHeader(
        'Cache-Control',
        'no-cache, no-store, max-age=0, must-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
