import { combineReducers } from 'redux';
import { RootState } from '@interfaces/state';
import * as fromAliasData from './aliasData';
import * as fromCollections from './collections';
import * as fromContentData from './contentData';
import * as fromCtaData from './ctaData';
import * as fromMenusData from './menusData';

export const initialState: RootState = {
  aliasData: {},
  contentData: {},
  collections: {},
  ctaData: {},
  menusData: {}
};

export const reducers = combineReducers({
  aliasData: fromAliasData.aliasData,
  contentData: fromContentData.contentData,
  collections: fromCollections.collections,
  ctaData: fromCtaData.ctaData,
  menusData: fromMenusData.menusData
});

export const getDataByAlias = (state: RootState, alias: string) =>
  fromAliasData.getAliasData(state.aliasData, alias);

export const getDataByResource = (state: RootState, type: string, id: string) =>
  fromContentData.getContentData(state.contentData, type, id);

export const getCollectionData = (
  state: RootState,
  type: string,
  id: string,
  collection: string
) => {
  const collectionRefs = fromCollections.getResourceCollection(
    state.collections,
    type,
    id,
    collection
  );

  return (
    (collectionRefs &&
      Array.isArray(collectionRefs) &&
      collectionRefs.map((key: string) => state.contentData[key])) ||
    state.contentData[collectionRefs as string]
  );
};

export const getCtaData = (state: RootState, type: string, id: string) =>
  fromCtaData.getCtaData(state.ctaData, type, id);

export const getCtaContext = (state: RootState, type: string, id: string) =>
  fromCtaData.getCtaContext(state.ctaData, type, id);

export const getCtaRegionData = (
  state: RootState,
  type: string,
  id: string,
  region: string
) => fromCtaData.getCtaRegionData(state.ctaData, type, id, region);

export const getCtaRegionGroup = (
  state: RootState,
  type: string,
  id: string,
  group: string
) => fromCtaData.getCtaRegionGroup(state.ctaData, type, id, group);

export const getMenusData = (state: RootState, menu: string) =>
  fromMenusData.getMenusData(state.menusData, menu);
