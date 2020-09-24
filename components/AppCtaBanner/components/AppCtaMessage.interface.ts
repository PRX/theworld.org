/**
 * @file AppCtaMessage.interface.ts
 * Interfaces for CTA messages.
 */

import { ICtaMessage } from '@interfaces/cta';

export interface IAppCtaMessageProps {
  data: ICtaMessage;
  onClose: Function;
}
