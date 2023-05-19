import { combineReducers } from 'redux';
import { RootState } from '@interfaces/state';
import * as fromAliasData from './aliasData';
import * as fromCollections from './collections';
import * as fromContentData from './contentData';
import * as fromCtaRegionGroupData from './ctaRegionGroupData';
import * as fromMenusData from './menusData';
import * as fromSearch from './search';
import * as fromUi from './ui';

export const initialState: RootState = {
  aliasData: {},
  contentData: {},
  collections: {},
  ctaRegionData: {},
  loading: {},
  menusData: {},
  search: {
    open: false,
    loading: false,
    searches: {}
  },
  ui: {
    drawer: {
      open: true
    },
    socialShareMenu: {
      shown: false
    }
  }
};

export const reducers = combineReducers({
  aliasData: fromAliasData.aliasData,
  contentData: fromContentData.contentData,
  collections: fromCollections.collections,
  ctaRegionData: fromCtaRegionGroupData.ctaRegionGroupData,
  menusData: fromMenusData.menusData,
  search: fromSearch.search,
  ui: fromUi.ui
});

export const getDataByAlias = (state: RootState, alias: string) =>
  fromAliasData.getAliasData(state.aliasData, alias);

export const getDataByResource = (
  state: RootState,
  type: string,
  id: string | number
) => fromContentData.getContentData(state.contentData, type, id);

export const getContentDataByAlias = (state: RootState, alias: string) => {
  const aliasData = fromAliasData.getAliasData(state.aliasData, alias);
  const { id, type } = aliasData || {};
  return fromContentData.getContentData(
    state.contentData || {},
    type,
    id as string
  );
};

export const getCollectionData = (
  state: RootState,
  type: string,
  id: string | undefined,
  collection: string
) => {
  const collectionState = fromCollections.getResourceCollection(
    state.collections,
    type,
    id,
    collection
  );

  return (
    collectionState && {
      ...collectionState,
      items: collectionState.items.map((page: string[]) =>
        page ? page.map((key: string) => state.contentData[key]) : []
      )
    }
  );
};

export const getHomepageData = (state: RootState) => ({
  featuredStory: getCollectionData(
    state,
    'homepage',
    undefined,
    'featured story'
  ),
  featuredStories: getCollectionData(
    state,
    'homepage',
    undefined,
    'featured stories'
  ),
  stories: getCollectionData(state, 'homepage', undefined, 'stories'),
  episodes: getCollectionData(state, 'homepage', undefined, 'episodes'),
  latestStories: getCollectionData(state, 'homepage', undefined, 'latest')
});

export const getCtaRegionData = (
  state: RootState,
  region: string,
  type?: string,
  id?: string
) =>
  fromCtaRegionGroupData.getCtaRegionData(
    state.ctaRegionData,
    region,
    type,
    id
  );
export const getCookies = (state: RootState) =>
  fromCtaRegionGroupData.getCookies(state.ctaRegionData);

export const getMenusData = (state: RootState, menu: string) =>
  fromMenusData.getMenusData(state.menusData, menu);

export const getSearchOpen = (state: RootState) =>
  fromSearch.getSearchOpen(state.search);
export const getSearchLoading = (state: RootState) =>
  fromSearch.getSearchLoading(state.search);
export const getSearchQuery = (state: RootState) =>
  fromSearch.getSearchQuery(state.search);
export const getSearchData = (state: RootState, query: string) =>
  fromSearch.getSearchData(state.search, query);

export const getUiDrawerOpen = (state: RootState) =>
  fromUi.getUiDrawerOpen(state.ui);
export const getUiPlayerOpen = (state: RootState) =>
  fromUi.getUiPlayerOpen(state.ui);
export const getUiPlayerPlaylistOpen = (state: RootState) =>
  fromUi.getUiPlayerPlaylistOpen(state.ui);
export const getUiSocialShareMenu = (state: RootState) =>
  fromUi.getUiSocialShareMenu(state.ui);
