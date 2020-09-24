/**
 * @file parseCtaMessage.ts
 * Helper functions to parse CTA message API data.
 */

import { IPriApiResource } from 'pri-api-library/types';
import { ICtaMessage } from '@interfaces/cta';
import { parse } from 'url';
import { IPriApiNewsletter, INewsletterOptions } from '@interfaces/newsletter';

export const parseNewsletterOptions = (
  { listId }: IPriApiNewsletter,
  region: string
): INewsletterOptions => ({
  listId,
  customFields: {
    source: 'website',
    ...(region && { 'source-placement': region })
  }
});

export const parseCtaMessage = (
  message: IPriApiResource,
  region: string
): ICtaMessage => ({
  name: message.id,
  type: message.ctaType,
  hash: message.contentHash,
  ...(message.heading && { heading: message.heading }),
  ...(message.message && { message: message.message }),
  ...(message.cookieLifespan && { cookieLifespan: message.cookieLifespan }),
  ...(message.optinLabel && { optinLabel: message.optinLabel }),
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
  }),
  ...(message.newsletter && {
    newsletter: message.newsletter,
    newsletterOptions: parseNewsletterOptions(message.newsletter, region)
  }),
  ...(region && { region })
});
