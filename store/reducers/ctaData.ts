/**
 * @file byResource.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { IPriApiResource } from 'pri-api-library/types';
import { CtaDataState } from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = CtaDataState;

export const ctaData = (state: State = {}, action: AnyAction) => {
  let key: string;

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ctaData };
    case 'FETCH_CTA_DATA_SUCCESS':
      key = makeResourceSignature(action.payload);
      return {
        ...state,
        ...(state[key]
          ? {
              ...state[key],
              data: {
                ...state[key].data,
                ...action.payload.data
              }
            }
          : {
              [key]: action.payload
            })
      };

    default:
      return state;
  }
};

export const getCtaData = (
  state: CtaDataState = {},
  type: string,
  id: string | number
) => state[makeResourceSignature({ type, id } as IPriApiResource)];

export const getCtaContext = (
  state: CtaDataState = {},
  type: string,
  id: string | number
) => (getCtaData(state, type, id) || {}).context;

export const getCtaRegionData = (
  state: CtaDataState = {},
  type: string,
  id: string | number,
  region: string
) => ((getCtaData(state, type, id) || {}).data || {})[region];
