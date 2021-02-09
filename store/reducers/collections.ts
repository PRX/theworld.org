/**
 * @file collections.ts
 *
 * Reducers for handling collections references.
 */

import { AnyAction } from 'redux';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';
import { IPriApiResource } from 'pri-api-library/types';
import {
  CollectionState,
  CollectionsState,
  RootState
} from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = CollectionsState | RootState;

export const collections = (state: State = {}, action: AnyAction) => {
  let key: string;
  let refs: string[];
  let newCollection: CollectionState;

  const addCollectionPage = (
    items: string[][],
    page: string[],
    pageNumber: number
  ) => {
    const result = [...items];

    result[pageNumber] = page;

    return result;
  };

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.collections };

    case 'APPEND_REFS_TO_COLLECTION':
      key = makeResourceSignature(action.payload.resource);
      refs = (action.payload.data || [])
        .filter(v => !!v)
        .map((ref: IPriApiResource) => makeResourceSignature(ref));
      newCollection = {
        ...action.payload.meta,
        items: addCollectionPage([], _.uniq(refs), action.payload.meta.page)
      };

      return {
        ...state,
        [key]: {
          ...(state[key]
            ? {
                ...state[key],
                ...(state[key][action.payload.collection]
                  ? {
                      [action.payload.collection]: {
                        ...state[key][action.payload.collection],
                        ...action.payload.meta,
                        items: addCollectionPage(
                          state[key][action.payload.collection].items,
                          _.uniq(refs),
                          action.payload.meta.page
                        )
                      }
                    }
                  : {
                      [action.payload.collection]: { ...newCollection }
                    })
              }
            : {
                [action.payload.collection]: { ...newCollection }
              })
        }
      };

    default:
      return state;
  }
};

export const getResourceCollection = (
  state: CollectionsState = {},
  type: string,
  id: string,
  collection: string
) => {
  const key = makeResourceSignature({ type, id } as IPriApiResource);
  const resourceCollections = state[key];

  return resourceCollections && resourceCollections[collection];
};
