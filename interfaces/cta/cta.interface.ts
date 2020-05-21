/**
 * @file interfaces/cta/cta.interface.tsx
 * Interfaces for content.
 */

import { IButton } from '@interfaces';

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
