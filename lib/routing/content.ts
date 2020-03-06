/**
 * @file content.ts
 * Handler functions for routing to content.
 */

import { parse, UrlWithParsedQuery } from 'url';
import { IPriApiResource } from 'pri-api-library/types';

/**
 * Helper function to convert API data object for use in app relative aliseed
 * Url object for use in Link components.
 *
 * @param data
 *    API data object to convert.
 *
 * @returns
 *    Url object with alias query relative to app.
 */
export const generateLinkHrefForContent = (data: IPriApiResource): UrlWithParsedQuery => {
  const {
    metatags: { canonical }
  } = data;
  const { pathname: alias} = parse(canonical);
  const href = parse(`/?alias=${alias}`, true);

  return href;
};