/**
 * @file content.ts
 * Handler functions for routing to content.
 */

import { parse, UrlWithParsedQuery } from 'url';
import { IPriApiResource } from 'pri-api-library/types';

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
  data: IPriApiResource,
  parseUrl?: boolean
): string | UrlWithParsedQuery => {
  const { metatags } = data || ({} as IPriApiResource);
  const { canonical } = metatags || {};
  const href =
    canonical && parseUrl ? parse(canonical as string, true) : canonical;

  return href;
};

export const generateLinkPropsForContent = (
  data: IPriApiResource,
  query?: { [k: string]: string }
): { href: UrlWithParsedQuery; as: UrlWithParsedQuery } => {
  const url = generateLinkHrefForContent(data, true) as UrlWithParsedQuery;

  if (url) {
    const alias = {
      ...parse(url.pathname),
      ...(query && { query })
    };
    const href = {
      ...parse('/[...alias]'),
      query: {
        alias: alias.pathname.substr(1).split('/'),
        ...query
      }
    };

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
