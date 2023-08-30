/**
 * @file fetchAppData.ts
 *
 * Actions to fetch data for app.
 */
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { AppDataAction, Cookies, RootState } from '@interfaces';
import { fetchGqlApp } from '@lib/fetch';
import { getAppData } from '@store/reducers';
import { AnyAction } from 'redux';

export const fetchAppData =
  (cookies: Cookies): ThunkAction<void, {}, {}, AppDataAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const appData = getAppData(getState());

    if (!appData) {
      const data = await fetchGqlApp();

      if (data) {
        const { ctaRegions, ...payload } = data;

        dispatch({
          type: 'SET_COOKIES',
          payload: {
            cookies
          }
        });

        dispatch({
          type: 'FETCH_CTA_REGION_GROUP_DATA_SUCCESS',
          payload: {
            data: ctaRegions
          }
        });

        dispatch({
          type: 'FETCH_APP_DATA_SUCCESS',
          payload
        });
      }
    }
  };
