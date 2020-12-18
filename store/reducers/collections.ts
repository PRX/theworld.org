/**
 * @file collections.ts
 *
 * Reducers for handling collections references.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { IPriApiResource } from 'pri-api-library/types';
import { CollectionsState, RootState } from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = CollectionsState | RootState;

export const collections = (state: State = {}, action: AnyAction) => {
  let key: string;
  let refs: string[];

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.collections };
    case 'APPEND_REFS_TO_COLLECTION':
      key = makeResourceSignature(action.payload.resource);
      refs = (action.payload.items || []).map((ref: IPriApiResource) =>
        makeResourceSignature(ref)
      );
      return {
        ...state,
        [key]: {
          ...(state[key]
            ? {
                ...state[key],
                [action.payload.collection]: [
                  ...state[key][action.payload.collection],
                  ...refs
                ]
              }
            : {
                [action.payload.collection]: [...refs]
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
