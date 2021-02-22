/**
 * @file collections.interface.ts
 *
 * Define interfaces for collections state.
 */

export interface CollectionState {
  count?: number;
  page?: number;
  range?: number;
  size?: number;
  first?: number;
  last?: number;
  next?: number;
  prev?: number;
  items: string[][];
}

export interface CollectionsState {
  // Key: Resource signature.
  [k: string]: {
    // Key: Collection name.
    [k: string]: CollectionState;
  };
}
