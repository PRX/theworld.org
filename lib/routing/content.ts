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
export const generateLinkHrefForContent = (
  data: IPriApiResource
): UrlWithParsedQuery => {
  const { metatags } = data || ({} as IPriApiResource);
  const { canonical } = metatags || {};
  const href = canonical && parse(canonical as string, true);

  return href;
};

export const generateLinkPropsForContent = (
  data: IPriApiResource,
  query?: { [k: string]: string }
): { href: UrlWithParsedQuery; as: UrlWithParsedQuery } => {
  const url = generateLinkHrefForContent(data);
  const alias = {
    ...parse(url.pathname),
    ...(query && { query })
  };
  const href = {
    ...parse('/'),
    query: {
      alias: alias.pathname,
      ...query
    }
  };

  return {
    href,
    as: alias
  };
};
