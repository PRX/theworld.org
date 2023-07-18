/**
 * @file appendResourceCollection.ts
 *
 * Actions to append collections data to contend data and collection refs.
 */
import { CollectionQueryOptions, Connection } from '@interfaces';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export function appendResourceCollection(
  data: Connection,
  type: string,
  id: number | string | undefined,
  collection: string,
  options?: CollectionQueryOptions
): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    const payloadItems = data.edges.map(({ node }) => node);

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
          data,
          ...(options && { options })
        }
      });
    }
  };
}
