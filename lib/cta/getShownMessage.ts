/**
 * @file getShownMessage.ts
 */

import { ICtaMessage } from '@interfaces/cta';
import { Cookies } from '@interfaces/state';
import { getCookieKey } from './getCookieKey';

/**
 * Determine which (if any) of the messages should be shown.
 * Show first message that either:
 * - Cookie does NOT exist for key based on `name` prop.
 * - Cookie exists, but its value does NOT match `hash` prop.
 * Returns first message when cookie is ignored.
 *
 * @return {object|null} - Message data object that should be rendered.
 */
export const getShownMessage = (
  messages: ICtaMessage[],
  cookies?: Cookies
): ICtaMessage => {
  let message = null;

  if (messages) {
    message = !cookies
      ? [...messages].shift()
      : messages.reduce((result, msg) => {
          const { name, hash } = msg;
          const cookieName = getCookieKey(name);
          const hashOld = cookies[cookieName];
          if (!result && (!hashOld || hashOld !== hash)) {
            return msg;
          }
          return result;
        }, null);
  }

  return message;
};
