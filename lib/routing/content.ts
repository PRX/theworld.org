/**
 * @file content.ts
 * Handler functions for routing to content.
 */

/**
 *
 * @param url Resource link URL.
 * @returns Return the app relative path for the resource, eg. pathname and query params.
 */
export const generateContentLinkHref = (url?: string | null) => {
  const urlBase = url?.startsWith('/') ? 'https://theworld.org' : undefined;
  const parsedUrl = url ? new URL(url, urlBase) : undefined;

  if (parsedUrl?.pathname) {
    return parsedUrl.pathname + parsedUrl.search;
  }

  return undefined;
};
