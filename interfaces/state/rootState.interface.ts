/**
 * @file rootState.interface.ts
 *
 * Define interfaces for RootState.
 */

import { ContentDataState } from './contentData.interface';
import { CollectionsState } from './collections.interface';
import { CtaDataState } from './ctaData.interface';
import { LoadingState } from './loading.interface';
import { MenusDataState } from './menusData.interface';
import { SearchState } from './search.interface';

export interface RootState {
  aliasData?: ContentDataState;
  contentData?: ContentDataState;
  collections?: CollectionsState;
  ctaData?: CtaDataState;
  loading?: LoadingState;
  menusData?: MenusDataState;
  search?: SearchState;
}
