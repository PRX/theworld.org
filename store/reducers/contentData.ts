/**
 * @file contentData.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentDataState, RootState } from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = ContentDataState | RootState;

export const contentData = (state: State = {}, action: AnyAction) => {
  let key: string;

  switch (action.type) {
    case HYDRATE:
      console.log(state, action.payload);
      return { ...action.payload.contentData, ...state };

    case 'FETCH_CONTENT_DATA_SUCCESS':
      key = action.payload && makeResourceSignature(action.payload);
      return {
        ...state,
        ...(action.payload && {
          [key]:
            state[key] && state[key].complete
              ? state[key]
              : {
                  ...action.payload
                }
        })
      };

    case 'FETCH_BULK_CONTENT_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload.reduce((a: any, item: any) => {
          const k = item && makeResourceSignature(item);
          return !item
            ? a
            : {
                ...a,
                [k]: state[k] && state[k].complete ? state[k] : item
              };
        }, {})
      };

    default:
      return state;
  }
};

export const getContentData = (
  state: ContentDataState = {},
  type: string,
  id: string
) => state[makeResourceSignature({ type, id } as IPriApiResource)];
