/**
 * @file collections.ts
 *
 * Reducers for handling collections references.
 */

import type { AnyAction } from 'redux';
import type { Edge, PageInfo } from '@interfaces';
import type {
  CollectionState,
  CollectionsState,
  RefItem,
  RootState
} from '@interfaces/state';
import { HYDRATE } from 'next-redux-wrapper';
import { makeResourceSignature } from '@lib/parse/state';

type State = CollectionsState | RootState;

const addCollectionPage = (
  items: RefItem[],
  pageItems: RefItem[],
  pageInfo: PageInfo
) => {
  const endIndex = items.findIndex(
    (item) => item.cursor === pageInfo.endCursor
  );
  const result = [...items].splice(endIndex + 1, 0, ...pageItems);

  return result;
};

export const collections = (state: State = {}, action: AnyAction) => {
  let key: string;
  let refs: RefItem[];
  let newCollection: CollectionState;
  let pageInfo: PageInfo;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.collections };

    case 'APPEND_REFS_TO_COLLECTION':
      key = action.payload.resource.id;
      refs = (action.payload.edges || []).map((edge: Edge) => ({
        cursor: edge.cursor,
        id: edge.node.id
      }));
      pageInfo = {
        ...action.payload.pageInfo
      };
      newCollection = {
        pageInfo,
        items: addCollectionPage([], refs, pageInfo)
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
                          state[key][action.payload.collection].items,
                          refs,
                          pageInfo
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
