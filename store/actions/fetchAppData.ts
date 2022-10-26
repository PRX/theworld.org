/**
 * @file fetchAppData.ts
 *
 * Actions to fetch data for app.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiApp, fetchApp } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchAppData = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const isOnServer = typeof window === 'undefined';
  const latest = getCollectionData(state, 'app', undefined, 'latest');

  if (!latest || isOnServer) {
    dispatch({
      type: 'FETCH_APP_DATA_REQUEST'
    });

    const apiResp = await (isOnServer ? fetchApp : fetchApiApp)();
    const { latestStories, menus } = apiResp;

    dispatch(
      appendResourceCollection(latestStories, 'app', undefined, 'latest')
    );

    await dispatch<any>(fetchCtaRegionGroupData('tw_cta_regions_site'));

    dispatch({
      type: 'FETCH_MENUS_DATA_SUCCESS',
      payload: menus
    });

    dispatch({
      type: 'FETCH_APP_DATA_SUCCESS'
    });
  }
};
