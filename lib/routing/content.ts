/**
 * @file content.ts
 * Handler functions for routing to content.
 */

import type { IContent } from '@interfaces';
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
export const generateLinkHrefForContent = (
  data: IContent,
  parseUrl?: boolean
): string | UrlWithParsedQuery => {
  const { link } = data || ({} as typeof data);
  const href = link && parseUrl ? parse(link, true) : link;

  return href;
};

export const generateLinkPropsForContent = (
  data: IContent,
  query?: { [k: string]: string }
) => {
  const url = parse(data.link, true);

  if (url?.pathname) {
    const alias = {
      ...parse(url.pathname),
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
