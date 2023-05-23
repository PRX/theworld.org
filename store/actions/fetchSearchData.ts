/**
 * @file fetchSearchData.ts
 *
 * Actions to fetch data for a search query.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { parse } from 'url';
import {
  RootState,
  searchFacetLabels,
  SearchFacetAll
} from '@interfaces/state';
import { fetchApiSearch, fetchQuerySearch } from '@lib/fetch';
import { getSearchData } from '@store/reducers';
import { fetchBulkAliasData } from './fetchAliasData';
import { fetchStoryData } from './fetchStoryData';
import { fetchEpisodeData } from './fetchEpisodeData';
import { fetchAudioData } from './fetchAudioData';
import { fetchImageData } from './fetchImageData';
import { fetchVideoData } from './fetchVideoData';

export const fetchSearchData =
  (
    query: string,
    label: SearchFacetAll
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
    const facets = label === 'all' ? searchFacetLabels : [label];
    const currentData = getSearchData(state, q) || {};
    const isOnServer = typeof window === 'undefined';
    const fetchFunc = isOnServer ? fetchQuerySearch : fetchApiSearch;

    // Map facet labels to data fetch for content type.
    const funcMap = new Map();
    funcMap.set('node--stories', fetchStoryData);
    funcMap.set('node--episodes', fetchEpisodeData);
    funcMap.set('file--audio', fetchAudioData);
    funcMap.set('file--images', fetchImageData);
    funcMap.set('file--videos', fetchVideoData);

    dispatch({
      type: 'FETCH_SEARCH_REQUEST'
    });

    const requests = [...facets].map(async (l: SearchFacetAll) => {
      const facetData = currentData[l];
      const start: number = [...(facetData || [])].pop()?.queries?.nextPage?.[0]
        .startIndex;

      return fetchFunc(q, l, start).then((data) => ({
        l,
        data
      }));
    });

    const payloadData = await Promise.all(requests).then(
      async (searchResults) => {
        const dataRequests = searchResults.map(async ({ l, data }) => {
          const aliases = (data.items || []).map(
            ({ link }) => parse(link).pathname
          );
          const aliasesData: [string, IPriApiResource][] = await dispatch<any>(
            fetchBulkAliasData(aliases)
          );

          const reqs = aliasesData
            .map(
              ([, { id, type }]): [
                string,
                // eslint-disable-next-line no-unused-vars, no-shadow
                (id: string) => ThunkAction<void, {}, {}, AnyAction>
              ] => [id as string, funcMap.get(type)]
            )
            .filter(([, func]) => !!func)
            .map(([id, func]) => dispatch<any>(func(id)));

          await Promise.all(reqs);

          return { label: l, data };
        });

        return dataRequests;
      }
    );

    dispatch({
      type: 'FETCH_SEARCH_SUCCESS',
      payload: {
        query: q,
        data: payloadData
      }
    });

    dispatch({
      type: 'FETCH_SEARCH_COMPLETE'
    });
  };
