/**
 * @file fetchGoogleCustomSearch.ts
 * Fetch results for Google Custon Search query.
 */

import { google, customsearch_v1 } from 'googleapis';
import { search } from '@config';

export const fetchGoogleCustomSearch = async (
  q: string,
  label: string,
  start: number
) => {
  const gcs = google.customsearch({
    version: 'v1',
    auth: process.env.CSE_API_KEY
  });
  const { cseId: cx } = search;
  const listParams: customsearch_v1.Params$Resource$Cse$List = {
    cx,
    q:
      !label || label !== 'all'
        ? `${q as string} more:${label}`
        : (q as string),
    ...(start && { start })
  };
  const results = await gcs.cse.siterestrict.list(listParams);

  return results;
};
