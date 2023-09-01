/**
 * @file parseCtaMessage.ts
 * Helper functions to parse CTA message API data.
 */

import { IPriApiResource } from 'pri-api-library/types';
import type { Newsletter, INewsletterOptions, ICtaMessage } from '@interfaces';

export const parseNewsletterOptions = (
  data: Newsletter,
  region: string
): INewsletterOptions => ({
  listId: data.newsletterOptions?.listId,
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
  hash: message.contentHash, // TODO: create this hash during parse.
  ...(message.heading && { heading: message.heading }),
  ...(message.message && { message: message.message }),
  ...(message.cookieLifespan && {
    cookieLifespan: +message.cookieLifespan
  }),
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
        url: message.newsletter.link
      },
      newsletter: message.newsletter,
      newsletterOptions: parseNewsletterOptions(message.newsletter, region)
    }),
  ...(message.targetContent && { targetContent: message.targetContent }),
  ...(message.targetCategories && {
    targetCategories: message.targetCategories
  }),
  ...(message.targetProgram && { targetProgram: message.targetProgram }),
  ...(region && { region })
});
