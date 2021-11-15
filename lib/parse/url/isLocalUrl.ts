/**
 * Test URL string to determine if is a local link URL. Should include:
 * - Relative paths
 * - Production domains
 * - CMS dev domains
 *
 * @param url URL string.
 */
export const isLocalUrl = (url: string) =>
  /^\/[^/]+?|\/\/(((www|admin)\.)?(pri|theworld)\.org|(\w+-)?pri9.(lndo.site|pantheonsite.io))/.test(
    url
  );
