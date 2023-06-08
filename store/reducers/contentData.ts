/**
 * @file contentData.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { ContentDataState, RootState } from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = ContentDataState | RootState;

export const contentData = (state: State = {}, action: AnyAction) => {
  let key: string;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.contentData };

    case 'FETCH_CONTENT_DATA_SUCCESS':
      if (!action.payload?.id) return state;

      key = makeResourceSignature(action.payload);

      return {
        ...state,
        [key]: {
          ...(state[key] && state[key].complete ? state[key] : action.payload),
          ...(action.payload.complete ? action.payload : {})
        }
      };

    case 'FETCH_BULK_CONTENT_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload.reduce((a: any, item: any) => {
          const k = item && makeResourceSignature(item);
          return !k
            ? a
            : {
                ...a,
                [k]: {
                  ...(state[k] && state[k].complete ? state[k] : item),
                  ...(item.complete ? item : {})
                }
              };
        }, {})
      };

    default:
      return state;
  }
};

export const getContentData = (
  state: ContentDataState,
  type: string,
  id?: string
) => (state || {})[makeResourceSignature({ type, id })];
