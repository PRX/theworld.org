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
import { filterCtaMessages } from '@lib/cta/filterCtaMessages';
import { makeResourceSignature } from '@lib/parse/state';

type State = CtaRegionGroupDataState;

export const ctaRegionGroupData = (
  state: State = {},
  action: CtaRegionGroupAction
): CtaRegionGroupDataState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ctaRegionData };

    case 'FETCH_CTA_REGION_GROUP_DATA_SUCCESS':
      return {
        ...state,
        data: { ...state.data, ...action.payload.data }
      };

    case 'SET_RESOURCE_CTA_FILTER_PROPS':
      return {
        ...state,
        filterProps: {
          ...state.filterProps,
          [makeResourceSignature({
            type: action.payload.filterProps.type,
            id: action.payload.filterProps.id
          })]: action.payload.filterProps.props
        }
      };

    default:
      return state;
  }
};

export const getCtaRegionData = (
  state: CtaRegionGroupDataState = {},
  region: string,
  type?: string,
  id?: string | number
) => {
  const messages = type
    ? state.data?.[region]?.filter(
        filterCtaMessages(
          state.filterProps?.[makeResourceSignature({ type, id })]
        )
      )
    : state.data?.[region];

  return messages?.length ? messages : null;
};