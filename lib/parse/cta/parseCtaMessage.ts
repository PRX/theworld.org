/**
 * @file parseCtaMessage.ts
 * Helper functions to parse CTA message API data.
 */

import { IPriApiResource } from 'pri-api-library/types';
import { ICtaMessage } from '@interfaces/cta';
import { IPriApiNewsletter, INewsletterOptions } from '@interfaces/newsletter';
import { generateLinkHrefForContent } from '@lib/routing';

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
  name: message.id as string,
  type: message.ctaType,
  hash: message.contentHash,
  ...(message.heading && { heading: message.heading }),
  ...(message.message && { message: message.message }),
  ...(message.cookieLifespan && { cookieLifespan: message.cookieLifespan }),
  ...(message.optinLabel && { optinLabel: message.optinLabel }),
  ...(message.actionLabel && {
    action: {
      name: message.actionLabel,
      ...(message.actionUrl && { url: message.actionUrl })
    }
  }),
  ...(message.dismissButtonLabel && {
    dismiss: {
      name: message.dismissButtonLabel
    }
  }),
  ...(message.ctaType === 'newsletter' &&
    message.newsletter && {
      ...(!message.heading && { heading: message.newsletter.title }),
      ...(!message.message && { message: message.newsletter.summary }),
      action: {
        name: message.actionLabel || message.newsletter.buttonLabel,
        url: generateLinkHrefForContent(message.newsletter) as string
      },
      newsletter: message.newsletter,
      newsletterOptions: parseNewsletterOptions(message.newsletter, region)
    }),
  ...(region && { region })
});
