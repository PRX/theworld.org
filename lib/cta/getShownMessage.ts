/**
 * @file getShownMessage.ts
 */

import cookie from 'react-cookies';
import { IPriApiResource } from 'pri-api-library/types';
import { ICtaMessage } from '@interfaces/cta';
import { getCookieKey } from './getCookieKey';
import { parseCtaMessage } from '../parse/cta/parseCtaMessage';

/**
 * Determine which (if any) of the messages should be shown.
 * Show first message that either:
 * - Cookie does NOT exist for key based on `name` prop.
 * - Cookie exists, but its value does NOT match `hash` prop.
 *
 * @return {object|null} - Message data object that should be rendered.
 */
export const getShownMessage = (
  messages: IPriApiResource[],
  region: string
): ICtaMessage => {
  let message = null;

  if (messages) {
    message = messages.reduce((result, msg) => {
      const { id, contentHash } = msg;
      const cookieName = getCookieKey(region, id);
      const hashOld = cookie.load(cookieName);
      if (!result && (!hashOld || hashOld !== contentHash)) {
        return msg;
      }
      return result;
    }, null);
  }

  return message && parseCtaMessage(message);
};
