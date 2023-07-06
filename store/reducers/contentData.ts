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
        ...(key && { [key]: action.payload })
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
                [k]: item
              };
        }, {})
      };

    default:
      return state;
  }
};

export function getContentData<T>(
  state: ContentDataState,
  type?: string,
  id?: string | number
) {
  const data = (state || {})[makeResourceSignature({ type, id })];
  return data ? (data as T) : undefined;
}
