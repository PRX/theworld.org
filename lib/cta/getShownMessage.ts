/**
 * @file getShownMessage.ts
 */

import cookie from 'react-cookies';
import { ICtaMessage } from '@interfaces/cta';
import { getCookieKey } from './getCookieKey';

/**
 * Determine which (if any) of the messages should be shown.
 * Show first message that either:
 * - Cookie does NOT exist for key based on `name` prop.
 * - Cookie exists, but its value does NOT match `hash` prop.
 *
 * @return {object|null} - Message data object that should be rendered.
 */
export const getShownMessage = (messages: ICtaMessage[]): ICtaMessage => {
  let message = null;

  if (messages) {
    message = messages.reduce((result, msg) => {
      const { name, hash } = msg;
      const cookieName = getCookieKey(name);
      const hashOld = cookie.load(cookieName);
      if (!result && (!hashOld || hashOld !== hash)) {
        return msg;
      }
      return result;
    }, null);
  }

  return message;
};
