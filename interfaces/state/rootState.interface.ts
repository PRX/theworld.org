/**
 * @file rootState.interface.ts
 *
 * Define interfaces for RootState.
 */

import { ContentDataState } from './contentData.interface';
import { CollectionsState } from './collections.interface';
import { CtaRegionGroupDataState } from './ctaRegionGroupData.interface';
import { LoadingState } from './loading.interface';
import { MenusDataState } from './menusData.interface';
import { SearchState } from './search.interface';
import { UiState } from './ui.interface';

export interface RootState {
  aliasData: ContentDataState;
  contentData: ContentDataState;
  collections: CollectionsState;
  ctaRegionData: CtaRegionGroupDataState;
  loading: LoadingState;
  menusData: MenusDataState;
  search: SearchState;
  ui: UiState;
}
