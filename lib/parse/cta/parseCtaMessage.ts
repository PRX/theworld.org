/**
 * @file parseCtaMessage.ts
 * Helper functions to parse CTA message API data.
 */

import { IPriApiResource } from 'pri-api-library/types';
import { ICtaMessage } from '@interfaces/cta';
import { parse } from 'url';

export const parseCtaMessage = (message: IPriApiResource): ICtaMessage => ({
  name: message.id,
  type: message.ctaType,
  hash: message.contentHash,
  ...(message.heading && { heading: message.heading }),
  ...(message.message && { message: message.message }),
  ...(message.cookieLifespan && { cookieLifespan: message.cookieLifespan }),
  ...(message.actionLabel && {
    action: {
      name: message.actionLabel,
      ...(message.actionUrl && { url: parse(message.actionUrl) })
    }
  }),
  ...(message.dismissButtonLabel && {
    dismiss: {
      name: message.dismissButtonLabel
    }
  })
});
