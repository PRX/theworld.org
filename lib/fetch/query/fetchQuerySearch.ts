/**
 * Query search server.
 */

import type { customsearch_v1 as customSearchV1 } from 'googleapis';
import { format } from 'url';

/**
 * Fetch search results from search server.
 *
 * @param q Search string.
 * @param label Facet label.
 * @param start Start of results to return.
 * @returns Search results.
 */
export const fetchQuerySearch = (
  q: string,
  label: string,
  start: string | number
) =>
  fetch(
    format({
      protocol: 'https',
      hostname: 'search.theworld.org',
      pathname: 'query',
      query: {
        ...(q && { q }),
        ...(label && { l: `${label}` }),
        ...(start && { s: `${start}` }),
        t: 'metatags-pubdate:d,date:d:s'
      }
    })
  ).then(
    (r) => r.status === 200 && r.json()
  ) as Promise<customSearchV1.Schema$Search>;
