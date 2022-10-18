/**
 * @file ctaRegionGroupData.interface.ts
 *
 * Define interfaces for ctaRegionGroupData.
 */

import { AnyAction } from 'redux';
import { ICtaMessage } from '@interfaces/cta';

export interface CtaRegionGroupDataState {
  // Key: CTA Region Group Name
  [k: string]: ICtaMessage[];
}

export interface CtaRegionGroupAction extends AnyAction {
  payload: {
    ctaRegionData?: CtaRegionGroupDataState;
    data?: CtaRegionGroupDataState;
  };
}
