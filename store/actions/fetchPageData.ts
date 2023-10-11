/**
 * @file fetchGqlPage.ts
 *
 * Fetch data for a page resource.
 */

import { fetchGqlPage } from '@lib/fetch';

export const fetchPageData = async (id: string) => {
  const page = await fetchGqlPage(id);

  return page;
};
