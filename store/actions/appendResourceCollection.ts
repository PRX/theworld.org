/**
 * @file appendResourceCollection.ts
 *
 * Actions to append collections data to contend data and collection refs.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiCollectionResponse,
  IPriApiResource
} from 'pri-api-library/types';

export const appendResourceCollection = (
  resp: IPriApiCollectionResponse,
  type: string,
  id: number | string,
  collection: string
): ThunkAction<void, {}, {}, AnyAction> => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): void => {
  const payloadItems = resp.data.filter(v => !!v);

  payloadItems.forEach((item: IPriApiResource) => {
    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: item
    });
  });

  dispatch({
    type: 'APPEND_REFS_TO_COLLECTION',
    payload: {
      resource: { type, id },
      collection,
      ...resp
    }
  });
};
