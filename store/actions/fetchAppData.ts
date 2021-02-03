/**
 * @file fetchAppData.ts
 *
 * Actions to fetch data for app.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiApp } from '@lib/fetch/api';
import { getCollectionData } from '@store/reducers';

export const fetchAppData = (
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const latest = getCollectionData(state, 'app', null, 'latest');

  if (!latest) {
    dispatch({
      type: 'FETCH_APP_DATA_REQUEST'
    });

    const apiResp = await fetchApiApp(req);
    const { latestStories, menus } = apiResp;

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'app', id: null },
        collection: 'latest',
        items: latestStories
      }
    });

    latestStories.forEach((item: any) => {
      dispatch({
        type: 'FETCH_CONTENT_DATA_SUCCESS',
        payload: item
      });
    });

    dispatch({
      type: 'FETCH_MENUS_DATA_SUCCESS',
      payload: menus
    });
  }
};
