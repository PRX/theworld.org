/**
 * @file byResource.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { ByResourceState } from '@interfaces/state';

export const byResource = (state: ByResourceState = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.byResource };
    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.signature]: action.data
      };

    default:
      return state;
  }
};
