/**
 * @file collections.interface.ts
 *
 * Define interfaces for collections state.
 */

export interface CollectionsState {
  // Key: Resource signature.
  [k: string]: {
    // Key: Collection name.
    [k: string]: string[];
  };
}
