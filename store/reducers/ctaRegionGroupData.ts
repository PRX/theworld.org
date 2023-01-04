/**
 * @file ctaRegionGroupData.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { CtaRegionGroupDataState, RootState } from '@interfaces/state';
import { filterCtaMessages } from '@lib/cta/filterCtaMessages';
import { makeResourceSignature } from '@lib/parse/state';

type State = CtaRegionGroupDataState | RootState;

export const ctaRegionGroupData = (state: State = {}, action: AnyAction) => {
  const { cookies, data, filterProps } = state as CtaRegionGroupDataState;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ctaRegionData };

    case 'SET_COOKIES':
      return {
        ...state,
        cookies: {
          ...(cookies || {}),
          ...(action.payload.cookies || {})
        }
      } as CtaRegionGroupDataState;

    case 'FETCH_CTA_REGION_GROUP_DATA_SUCCESS':
      return {
        ...state,
        data: { ...data, ...action.payload.data }
      } as CtaRegionGroupDataState;

    case 'SET_RESOURCE_CTA_FILTER_PROPS':
      return {
        ...state,
        filterProps: {
          ...filterProps,
          [makeResourceSignature({
            type: action.payload.filterProps.type,
            id: action.payload.filterProps.id
          })]: action.payload.filterProps.props
        }
      } as CtaRegionGroupDataState;

    default:
      return state;
  }
};

export const getCookies = (state: CtaRegionGroupDataState) =>
  (state || {}).cookies;

export const getCtaRegionData = (
  state: CtaRegionGroupDataState,
  region: string,
  type?: string,
  id?: string | number
) => {
  const messages = type
    ? state?.data?.[region]?.filter(
        filterCtaMessages(
          state.filterProps?.[makeResourceSignature({ type, id })]
        )
      )
    : state?.data?.[region];

  return messages?.length ? messages : null;
};
