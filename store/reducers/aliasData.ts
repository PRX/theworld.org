/**
 * @file aliasCache.ts
 *
 * Reducers for handling data by URL path alias.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { ContentDataState, RootState } from '@interfaces/state';

type State = ContentDataState | RootState;

export const aliasData = (state: State = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.aliasData };
    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.alias]: action.data
      };

    default:
      return state;
  }
};

export const getAliasData = (state: ContentDataState = {}, alias: string) =>
  state[alias];
