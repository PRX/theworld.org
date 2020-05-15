/**
 * @file setCtaCookie.ts
 */

import cookie from 'react-cookies';
import { getCookieKey } from './getCookieKey';

/**
 * Set cookie for a CTA region message.
 *
 * @param region
 *    Region the message was shown in.
 * @param id
 *    Identifier of the message.
 * @param hash
 *    Content hash to use as cookie value.
 * @param maxAgeHours
 *    Number of hours cookie should be expired for.
 */
export const setCtaCookie = (
  region: string,
  id: string | number,
  hash: string,
  maxAgeHours: number
) => {
  const key = getCookieKey(region, id);
  const maxAge = (maxAgeHours || 0) * 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + maxAge);
  const options = {
    ...(maxAge && { maxAge, expires }),
    path: '/'
  };
  console.log('setCtaCookie', key, hash, options);
  cookie.save(key, hash, options);
};
