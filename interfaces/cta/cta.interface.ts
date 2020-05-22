/**
 * @file interfaces/cta/cta.interface.tsx
 * Interfaces for content.
 */

import { IButton } from '@interfaces/button';

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
}
export interface ICtaRegions {
  [k: string]: ICtaMessage;
}

export interface ICtaMessageComponentContext {
  data: ICtaMessage;
}
