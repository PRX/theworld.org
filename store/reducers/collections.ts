/**
 * @file collections.ts
 *
 * Reducers for handling collections references.
 */

import type { AnyAction } from 'redux';
import type { CollectionQueryOptions, Edge, PageInfo } from '@interfaces';
import type {
  CollectionState,
  CollectionsState,
  RefItem,
  RootState
} from '@interfaces/state';
import { HYDRATE } from 'next-redux-wrapper';
import { makeResourceSignature } from '@lib/parse/state';

type State = CollectionsState | RootState;

const addCollectionPage = (state: CollectionState, pageItems: RefItem[]) => {
  const endIndex = state.items.findIndex(
    (item) => item.cursor === state.pageInfo.endCursor
  );
  const result = [...state.items];
  result.splice(endIndex + 1, 0, ...pageItems);

  return result;
};

export const collections = (state: State = {}, action: AnyAction) => {
  let key: string;
  let refs: RefItem[];
  let newCollection: CollectionState;
  let pageInfo: PageInfo;
  let options: CollectionQueryOptions;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.collections };

    case 'APPEND_REFS_TO_COLLECTION':
      key = makeResourceSignature(action.payload.resource);
      refs = (action.payload.data.edges || []).map((edge: Edge) => ({
        cursor: edge.cursor,
        id: edge.node.id
      }));
      pageInfo = {
        ...action.payload.data.pageInfo
      };
      options = action.payload.data.options;
      newCollection = {
        pageInfo,
        items: refs,
        ...(options && { options })
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
                        pageInfo,
                        items: addCollectionPage(
                          state[key][action.payload.collection],
                          refs
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
  state: CollectionsState,
  type: string | undefined,
  id: string | number | undefined,
  collection: string
) => {
  const key = makeResourceSignature({ type, id });
  const resourceCollections = (state || {})[key];

  return resourceCollections && resourceCollections[collection];
};
