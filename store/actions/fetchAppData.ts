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
import { appendResourceCollection } from './appendResourceCollection';

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

    dispatch(
      appendResourceCollection(latestStories, 'app', undefined, 'latest')
    );

    dispatch({
      type: 'FETCH_MENUS_DATA_SUCCESS',
      payload: menus
    });
  }
};
