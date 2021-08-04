/**
 * @file fetchSearchData.ts
 *
 * Actions to fetch data for a search query.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { customsearch_v1 } from 'googleapis';
import { parse } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import { RootState, searchFacetLabels, SearchFacet } from '@interfaces/state';
import { fetchApiSearch } from '@lib/fetch';
import { getSearchData } from '@store/reducers';
import { fetchStoryData } from './fetchStoryData';
import { fetchAliasData } from './fetchAliasData';

export const fetchSearchData = (
  query: string,
  label: SearchFacet
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const facets = label === 'all' ? searchFacetLabels : [label];
  const currentData = getSearchData(state, query) || {};
  const q = (query || '').toLowerCase().replace(/^\s+|\s+$/, '');
  const getItemLinkAliasData = async ({
    link
  }: customsearch_v1.Schema$Result): Promise<IPriApiResource> => {
    const { pathname } = parse(link);

    const data = await dispatch<any>(fetchAliasData(pathname));

    console.log('Link Alias Data', pathname, data);

    return data;
  };

  // Map facet labels to data fetch for content type.
  const funcMap = new Map();
  funcMap.set('story', async (item: customsearch_v1.Schema$Search) => {
    const { id: storyId } = await getItemLinkAliasData(item);
    await dispatch<any>(fetchStoryData(storyId as string));
  });

  if (!q.length) {
    return;
  }

  dispatch({
    type: 'FETCH_SEARCH_REQUEST'
  });

  const requests = [...facets].map(async (l: SearchFacet) => {
    const facetData = currentData[l];
    const start: number = [...(facetData || [])].pop()?.queries.nextPage?.[0]
      .startIndex;

    return fetchApiSearch(query, l, start).then(data => ({
      l,
      data
    }));
  });

  await Promise.all(requests).then(results => {
    results.forEach(({ l, data }) => {
      const fetchFunc = funcMap.get(l);

      if (fetchFunc) {
        const reqs = data.items.map(item => fetchFunc(item));
        (async () => {
          await Promise.all(reqs);
        })();
      }

      dispatch({
        type: 'FETCH_SEARCH_SUCCESS',
        payload: {
          query,
          label: l,
          data
        }
      });
    });
  });

  dispatch({
    type: 'FETCH_SEARCH_COMPLETE'
  });
};
