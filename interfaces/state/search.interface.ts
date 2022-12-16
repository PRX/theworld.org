/**
 * @file search.interface.ts
 *
 * Define interfaces for search state.
 */

import { AnyAction } from 'redux';
import { customsearch_v1 as customSearch } from 'googleapis';

export const searchFacetLabels = ['story', 'episode', 'media'] as const;
export type SearchFacet = typeof searchFacetLabels[number];
export type SearchFacetAll = typeof searchFacetLabels[number] | 'all';

export interface SearchesState {
  // Key: Query signature.
  // base64(query)
  [k: string]: {
    // Key: Facet name.
    [k: string]: customSearch.Schema$Search[];
  };
}

export interface SearchState {
  open?: boolean;
  query?: string;
  loading?: boolean;
  searches?: SearchesState;
}

export interface SearchAction extends AnyAction {
  payload: {
    search?: SearchState;
    query: string;
    label: SearchFacetAll;
    data: { label: string; data: customSearch.Schema$Result }[];
  };
}
