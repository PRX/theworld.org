/**
 * @file fetchNewsletterData.ts
 *
 * Actions to fetch data for a newsletter resource.
 */

import { fetchGqlNewsletter } from '@lib/fetch';

export const fetchNewsletterData = async (
  id: string,
  idType?: string,
  authToken?: string
) => {
  const newsletter = await fetchGqlNewsletter(id, idType, authToken);

  return newsletter;
};
