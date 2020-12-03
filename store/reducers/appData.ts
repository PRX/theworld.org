/**
 * @file appData.ts
 *
 * Reducers for handling data for app.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { ByAliasState } from '@interfaces/state';

export const byAlias = (state: ByAliasState = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.byAlias };
    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.alias]: action.data
      };

    default:
      return state;
  }
};
