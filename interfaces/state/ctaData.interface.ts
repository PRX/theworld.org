/**
 * @file ctaData.interface.ts
 *
 * Define interfaces for ctaData.
 */

import { ICtaMessage } from '@interfaces/cta';

export interface CtaDataState {
  // Key: Resource signature.
  [k: string]: {
    context: string[];
    groups: {
      // Key: CTA region group.
      // Value: array of CTA region keys.
      [k: string]: string[];
    };
    data: {
      // Key: CTA region.
      [k: string]: ICtaMessage[];
    };
  };
}
