/**
 * @file search.ts
 *
 * Reducers for handling search state and data.
 */

import { HYDRATE } from 'next-redux-wrapper';
import { encode } from 'base-64';
import { SearchAction, SearchState, RootState } from '@interfaces/state';

type State = SearchState | RootState;

export const search = (
  state = {
    open: false,
    query: null,
    loading: false,
    searches: {}
  },
  action: SearchAction
) => {
  let queryHash: string;
  let s: State;

  // console.log(action, state);

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.search };

    case 'SEARCH_OPEN':
      s = state as SearchState;

      return {
        ...state,
        open: true,
        query: action.payload?.query || s.query
      } as SearchState;

    case 'SEARCH_CLOSE':
      return {
        ...state,
        open: false
      } as SearchState;

    case 'SEARCH_CLEAR_QUERY':
      return {
        ...state,
        query: null
      } as SearchState;

    case 'FETCH_SEARCH_REQUEST':
      return {
        ...state,
        loading: true
      } as SearchState;

    case 'FETCH_SEARCH_COMPLETE':
      return {
        ...state,
        loading: false
      } as SearchState;

    case 'FETCH_SEARCH_SUCCESS':
      queryHash = encode(action.payload.query);
      s = state as SearchState;

      console.log('FETCH_SEARCH_SUCCESS', action.payload);

      return {
        ...state,
        query: action.payload.query,
        searches: {
          ...s.searches,
          [queryHash]: {
            ...(s.searches[queryHash] || {}),
            [action.payload.label]: [
              ...(s.searches[queryHash]?.[action.payload.label] || []),
              action.payload.data
            ]
          }
        }
      } as SearchState;

    default:
      return state;
  }
};
export const getSearchOpen = (state: SearchState) => state.open;
export const getSearchLoading = (state: SearchState) => state.loading;
export const getSearchQuery = (state: SearchState) => state?.query || '';
export const getSearchData = (state: SearchState, query: string) =>
  state.searches[encode(query)];
