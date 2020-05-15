/**
 * @file getCookieKey.ts
 */

import { cookieKeyPrefix } from './ctaConfig';

/**
 * Generate cookie key.
 *
 * @param id
 *    CTA message id.
 */
export const getCookieKey = (region: string, id: string | number) =>
  [cookieKeyPrefix, region, id].join('-');
