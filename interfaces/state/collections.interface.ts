/**
 * @file collections.interface.ts
 *
 * Define interfaces for collections state.
 */

export interface CollectionState {
  page: number;
  range: number;
  items: string[];
}

export interface CollectionsState {
  // Key: Resource signature.
  [k: string]: {
    // Key: Collection name.
    [k: string]: CollectionState;
  };
}
