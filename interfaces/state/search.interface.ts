/**
 * @file search.interface.ts
 *
 * Define interfaces for search state.
 */

import { AnyAction } from 'redux';
import { customsearch_v1 } from 'googleapis';

export const searchFacetLabels = ['story', 'episode', 'media'] as const;
export type SearchFacet = typeof searchFacetLabels[number] | 'all';

export interface SearchesState {
  // Key: Query signature.
  // base64(query)
  [k: string]: {
    // Key: Facet name.
    [k: string]: customsearch_v1.Schema$Search[];
  };
}

export interface SearchState {
  open: boolean;
  query: string;
  loading: boolean;
  searches: SearchesState;
}

export interface SearchAction extends AnyAction {
  payload: {
    search?: SearchState;
    query: string;
    label: SearchFacet;
    data: customsearch_v1.Schema$Result;
  };
}