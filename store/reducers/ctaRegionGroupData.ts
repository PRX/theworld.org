/**
 * @file ctaRegionGroupData.ts
 *
 * Reducers for handling data by resource signature.
 */

import { HYDRATE } from 'next-redux-wrapper';
import {
  CtaRegionGroupAction,
  CtaRegionGroupDataState
} from '@interfaces/state';

type State = CtaRegionGroupDataState;

export const ctaRegionGroupData = (
  state: State = {},
  action: CtaRegionGroupAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ctaRegionData };

    case 'FETCH_CTA_REGION_GROUP_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload.data
      };

    default:
      return state;
  }
};

export const getCtaRegionData = (
  state: CtaRegionGroupDataState = {},
  region: string
) => state[region];
