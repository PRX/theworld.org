/**
 * @file appendResourceCollection.ts
 *
 * Actions to append collections data to contend data and collection refs.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiCollectionResponse } from 'pri-api-library/types';

export const appendResourceCollection = (
  resp: IPriApiCollectionResponse,
  type: string,
  id: number | string,
  collection: string
): ThunkAction<void, {}, {}, AnyAction> => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): void => {
  const payloadItems = resp.data?.filter(v => !!v);

  if (payloadItems) {
    dispatch({
      type: 'FETCH_BULK_CONTENT_DATA_SUCCESS',
      payload: payloadItems
    });

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type, id },
        collection,
        ...resp
      }
    });
  }
};
