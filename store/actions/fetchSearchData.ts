/**
 * @file fetchSearchData.ts
 *
 * Actions to fetch data for a search query.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { parse } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import {
  RootState,
  searchFacetLabels,
  SearchFacetAll
} from '@interfaces/state';
import { fetchApiSearch } from '@lib/fetch';
import { getSearchData } from '@store/reducers';
import { fetchBulkAliasData } from './fetchAliasData';
import { fetchStoryData } from './fetchStoryData';
import { fetchEpisodeData } from './fetchEpisodeData';

export const fetchSearchData = (
  query: string,
  label: SearchFacetAll
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const facets = label === 'all' ? searchFacetLabels : [label];
  const currentData = getSearchData(state, query) || {};
  const q = (query || '').toLowerCase().replace(/^\s+|\s+$/, '');

  // Map facet labels to data fetch for content type.
  const funcMap = new Map();
  funcMap.set('story', fetchStoryData);
  funcMap.set('episode', fetchEpisodeData);

  if (!q.length) {
    return;
  }

  dispatch({
    type: 'FETCH_SEARCH_REQUEST'
  });

  const requests = [...facets].map(async (l: SearchFacetAll) => {
    const facetData = currentData[l];
    const start: number = [...(facetData || [])].pop()?.queries?.nextPage?.[0]
      .startIndex;

    return fetchApiSearch(query, l, start)
      .then(data => ({
        l,
        data
      }))
      .then(r => {
        return r;
      });
  });

  const payloadData = await Promise.all(requests).then(async searchResults => {
    const dataRequests = searchResults.map(async ({ l, data }) => {
      const aliases = (data.items || []).map(
        ({ link }) => parse(link).pathname
      );
      const aliasesData: [string, IPriApiResource][] = await dispatch<any>(
        fetchBulkAliasData(aliases)
      );

      const reqs = aliasesData
        .map(([, { id }]): [
          string,
          (id: string) => ThunkAction<void, {}, {}, AnyAction>
        ] => [id as string, funcMap.get(l)])
        .map(([id, fetchFunc]) => dispatch<any>(fetchFunc(id)));

      await Promise.all(reqs);

      return { label: l, data };
    });

    return await Promise.all(dataRequests);
  });

  dispatch({
    type: 'FETCH_SEARCH_SUCCESS',
    payload: {
      query,
      data: payloadData
    }
  });

  dispatch({
    type: 'FETCH_SEARCH_COMPLETE'
  });
};
