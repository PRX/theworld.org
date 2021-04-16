/**
 * @file aliasCache.ts
 *
 * Reducers for handling loading state.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { LoadingState, RootState } from '@interfaces/state';

type State = LoadingState | RootState;

export const loading = (state: State = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.loading };
    case 'FETCH_ALIAS_DATA_REQUEST':
      return {
        alias: action.alias,
        stage: 'alias-data'
      };
    case 'FETCH_ALIAS_DATA_SUCCESS':
    case 'FETCH_ALIAS_DATA_COMPLETE':
      return {
        ...state,
        type: action.data.type,
        id: action.data.id
      };
    case 'LOADING_CONTENT_DATA':
      return {
        ...state,
        stage: 'content-data'
      };
    case 'LOADING_APP_DATA':
      return {
        ...state,
        stage: 'app-data'
      };
    case 'LOADING_COMPLETE':
      return {};

    default:
      return state;
  }
};

export const getLoadingStage = (state: LoadingState) => state && state.stage;
