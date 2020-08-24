/**
 * @file interfaces/cta/cta.interface.tsx
 * Interfaces for content.
 */

import { IButton } from '@interfaces/button';
import { INewsletterOptions, IPriApiNewsletter } from '@interfaces/newsletter';

export type CtaMessageType = 'info' | 'optin' | 'donation' | 'newsletter';

export interface ICtaMessage {
  name: string | number;
  type: CtaMessageType;
  hash: string;
  heading?: string;
  message?: string;
  optinLabel?: string;
  cookieLifespan?: number;
  action?: IButton;
  dismiss?: IButton;
  newsletter?: IPriApiNewsletter;
  newsletterOptions?: INewsletterOptions;
  region?: string;
}

export interface ICtaMessageProps {
  data: ICtaMessage;
}

export interface ICtaRegionProps {
  data: ICtaMessage[];
}

export interface ICtaRegions {
  [k: string]: ICtaMessage[];
}

export interface ICtaMessageComponentContext {
  data: ICtaMessage;
}
