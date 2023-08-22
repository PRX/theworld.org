/**
 * @file search.ts
 *
 * Reducers for handling search state and data.
 */

import { HYDRATE } from 'next-redux-wrapper';
import type {
  ContentNodeConnection,
  ContentNodeConnectionEdge,
  SearchAction,
  SearchState
} from '@interfaces';

const addSearchPage = (
  state: ContentNodeConnection,
  pageItems: ContentNodeConnectionEdge[]
) => {
  const endIndex = state.edges.findIndex(
    (item) => item.cursor === state.pageInfo.endCursor
  );
  const result = [...state.edges];
  result.splice(endIndex + 1, 0, ...pageItems);

  return result;
};

export const search = (state = {}, action: SearchAction) => {
  let query: string;
  let s: SearchState;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.search };

    case 'SEARCH_OPEN':
      return {
        ...state,
        ...(action.payload?.query && { query: action.payload.query }),
        open: true
      } as SearchState;

    case 'SEARCH_CLOSE':
      return {
        ...state,
        open: false
      } as SearchState;

    case 'SEARCH_CLEAR_QUERY':
      return {
        ...state,
        query: undefined
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
      query = (action.payload.query || '').toLowerCase();
      s = state as SearchState;

      return {
        ...state,
        query: action.payload.query,
        ...(action.payload.options && { options: action.payload.options }),
        searches: {
          ...(s.searches || {}),
          [query]: {
            ...Object.entries(action.payload.data).reduce(
              (a, [facet, data]) => ({
                ...a,
                [facet]: {
                  ...s.searches?.[query]?.[facet],
                  ...data,
                  ...(s.searches?.[query]?.[facet] && {
                    edges: addSearchPage(
                      s.searches?.[query]?.[facet],
                      data.edges
                    )
                  })
                }
              }),
              s.searches?.[query] || {}
            )
          }
        }
      } as SearchState;

    default:
      return state;
  }
};

export const getSearchOpen = (state: SearchState) => state?.open;
export const getSearchLoading = (state: SearchState) => state?.loading;
export const getSearchQuery = (state: SearchState) => state?.query || '';
export const getSearchData = (state: SearchState, query: string) =>
  (!!query?.length || undefined) && state?.searches?.[query.toLowerCase()];
