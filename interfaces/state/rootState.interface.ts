/**
 * @file rootState.interface.ts
 *
 * Define interfaces for RootState.
 */

import { ContentDataState } from './contentData.interface';
import { CollectionsState } from './collections.interface';
import { CtaDataState } from './ctaData.interface';
import { MenusDataState } from './menusData.interface';

export interface RootState {
  aliasData: ContentDataState;
  contentData: ContentDataState;
  collections: CollectionsState;
  ctaData: CtaDataState;
  menusData: MenusDataState;
}
