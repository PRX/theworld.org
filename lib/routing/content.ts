/**
 * @file content.ts
 * Handler functions for routing to content.
 */

import { parse, UrlWithParsedQuery } from 'url';

/**
 * Helper function to convert API data object for use in app relative aliased
 * Url object for use in Link components.
 *
 * @param data
 *    API data object to convert.
 *
 * @param parseUrl
 *    Flag to return a parsed Url object.
 *
 * @returns
 *    Canonical URL for the resource.
 */
export const generateLinkHrefForContent = (url: string, parseUrl?: boolean) => {
  if (!url) return undefined;

  if (parseUrl) return parse(url, true);

  return url;
};

export const generateLinkPropsForContent = (
  url: string,
  query?: { [k: string]: string }
) => {
  const parsedUrl = url ? parse(url, true) : undefined;

  if (parsedUrl?.pathname) {
    const alias = {
      ...parse(parsedUrl.pathname),
      ...(query && { query })
    } as UrlWithParsedQuery;
    const href = {
      ...parse('/[...alias]'),
      query: {
        alias: alias.pathname?.replace(/^\//, '').split('/'),
        ...query
      }
    } as UrlWithParsedQuery;

    return {
      href,
      as: alias
    };
  }

  return {
    href: null,
    as: null
  };
};
