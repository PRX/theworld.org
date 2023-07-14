/**
 * @file content.ts
 * Handler functions for routing to content.
 */

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
  url?: string | null,
  parseUrl?: boolean
) => {
  if (!url) return undefined;

  if (parseUrl) return new URL(url);

  return url;
};

export const generateLinkPropsForContent = (url?: string | null) => {
  const urlBase = url?.startsWith('/') ? 'https://theworld.org' : undefined;
  const parsedUrl = url ? new URL(url, urlBase) : undefined;

  if (parsedUrl?.pathname) {
    return parsedUrl.pathname;
  }

  return undefined;
};
