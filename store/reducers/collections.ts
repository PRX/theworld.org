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

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.collections };

    case 'APPEND_REFS_TO_COLLECTION':
      key = makeResourceSignature(action.payload.resource);
      refs = (action.payload.items || [])
        .filter(v => !!v)
        .map((ref: IPriApiResource) => makeResourceSignature(ref));
      newCollection = {
        page: 1,
        range: refs.length,
        items: [...refs]
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
                        page: state[key][action.payload.collection].page + 1,
                        items: _.uniq([
                          ...state[key][action.payload.collection].items,
                          ...refs
                        ])
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
