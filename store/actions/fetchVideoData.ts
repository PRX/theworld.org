/**
 * @file fetchVideoData.ts
 *
 * Actions to fetch data for a video resource.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiFileVideo, fetchVideo } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchVideoData =
  (id: string): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<IPriApiResource> => {
    const state = getState();
    const type = 'file--videos';
    const isOnServer = typeof window === 'undefined';
    let data = getDataByResource<any>(state, type, id);

    if (!data || !data.complete || isOnServer) {
      dispatch({
        type: 'FETCH_CONTENT_DATA_REQUEST',
        payload: {
          type,
          id
        }
      });

      const dataPromise = (isOnServer ? fetchVideo : fetchApiFileVideo)(
        id
      ).then((resp: IPriApiResourceResponse) => resp && resp.data);

      const ctaDataPromise = dispatch<any>(
        fetchCtaRegionGroupData('tw_cta_regions_content')
      );

      data = await dataPromise;
      await ctaDataPromise;

      dispatch({
        type: 'FETCH_CONTENT_DATA_SUCCESS',
        payload: {
          ...data,
          complete: true
        }
      });
    }

    return data;
  };
