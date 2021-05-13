/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiNewsletter } from '@lib/fetch/api';
import { getDataByResource } from '@store/reducers';

export const fetchNewsletterData = (
  id: string,
  req?: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'node--newsletter_sign_ups';
  let data = getDataByResource(state, type, id);

  if (!data || !data.complete) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    data = await fetchApiNewsletter(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: {
        ...data,
        complete: true
      }
    });
  }
};
