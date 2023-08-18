/**
 * @file fetchSearchData.ts
 *
 * Actions to fetch data for a search query.
 */

import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type {
  RootState,
  SearchFacetAll,
  SearchQueryCursors,
  SearchQueryOptions,
  SearchQueryProps
} from '@interfaces/state';
import { fetchApiSearch, fetchGqlQuerySearch } from '@lib/fetch';
import { getSearchData } from '@store/reducers';

export const fetchSearchData =
  (
    query: string,
    facet?: SearchFacetAll,
    init?: RequestInit
  ): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<void> => {
    const q = (query || '').toLowerCase().replace(/^\s+|\s+$/, '');

    if (!q.length) {
      return;
    }

    const state = getState();
    const currentData = getSearchData(state, q);
    const cursors =
      currentData &&
      Object.entries(currentData).reduce(
        (a, [f, nc]) => ({
          ...a,
          ...(nc.pageInfo.endCursor && {
            [f]: nc.pageInfo.endCursor
          })
        }),
        {} as SearchQueryCursors
      );
    const queryProps = {
      query: q,
      ...(facet && {
        facet,
        cursors
      })
    } as SearchQueryProps;
    const options = {
      pageSize: 10
    } as SearchQueryOptions;
    const isOnServer = typeof window === 'undefined';
    const fetchFunc = isOnServer ? fetchGqlQuerySearch : fetchApiSearch;

    dispatch({
      type: 'FETCH_SEARCH_REQUEST'
    });

    const payloadData = await fetchFunc(queryProps, options, init);

    dispatch({
      type: 'FETCH_SEARCH_SUCCESS',
      payload: {
        query: q,
        options,
        data: payloadData
      }
    });

    dispatch({
      type: 'FETCH_SEARCH_COMPLETE'
    });
  };
