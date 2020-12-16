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
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.contentData };
    case 'FETCH_CONTENT_DATA_SUCCESS':
      return {
        ...state,
        [makeResourceSignature(action.payload)]: action.payload
      };

    default:
      return state;
  }
};

export const getContentData = (
  state: ContentDataState = {},
  type: string,
  id: string | number
) => state[makeResourceSignature({ type, id } as IPriApiResource)];
