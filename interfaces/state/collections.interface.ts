/**
 * @file collections.interface.ts
 *
 * Define interfaces for collections state.
 */

import { PageInfo } from '@interfaces/api';

export type RefItem = {
  cursor: string;
  id: string;
};
export interface CollectionState {
  pageInfo: PageInfo;
  items: RefItem[];
}

export interface CollectionsState {
  // Key: Resource signature.
  [k: string]: {
    // Key: Collection name.
    [k: string]: CollectionState;
  };
}
