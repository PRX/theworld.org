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
export const getCookieKey = (id: string | number) =>
  [cookieKeyPrefix, id].join('-');
