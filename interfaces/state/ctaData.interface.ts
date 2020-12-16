/**
import { ICtaMessage } from '@interfaces/cta';
 * @file ctaData.interface.ts
 *
 * Define interfaces for ctaData.
 */

import { ICtaMessage } from '@interfaces/cta';

export interface CtaDataState {
  // Key: Resource signature.
  [k: string]: {
    context: string[];
    data: {
      // Key: CTA region.
      [k: string]: ICtaMessage[];
    };
  };
}
