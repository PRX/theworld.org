/**
 * @file fetchSearchData.ts
 *
 * Actions to fetch data for a search query.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import {
  IPriApiResource,
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import {
  RootState,
  searchFacetLabels,
  SearchFacetAll
} from '@interfaces/state';
import {
  fetchApiEpisode,
  fetchApiFileAudio,
  fetchApiSearch,
  fetchApiStory
} from '@lib/fetch';
import { getSearchData } from '@store/reducers';
import { fetchBulkAliasData } from './fetchAliasData';

export const fetchSearchData = (
  query: string,
  label: SearchFacetAll,
  req?: IncomingMessage
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
  funcMap.set('story', fetchApiStory);
  funcMap.set('episode', fetchApiEpisode);
  funcMap.set('media', fetchApiFileAudio);

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

    return fetchApiSearch(query, l, start, req)
      .then(data => ({
        l,
        data
      }))
      .then(r => {
        console.log(r);
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
          (id: string, req: IncomingMessage) => Promise<PriApiResourceResponse>
        ] => [id as string, funcMap.get(l)])
        .map(([id, fetchFunc]) => fetchFunc(id, req));

      await Promise.all(reqs).then(dataResp => {
        dispatch<any>({
          type: 'FETCH_BULK_CONTENT_DATA_SUCCESS',
          payload: dataResp.map((item: IPriApiResourceResponse) => item.data)
        });
      });

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
