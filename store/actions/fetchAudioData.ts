/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { MediaItem, RootState } from '@interfaces';
import { fetchApiFileAudio, fetchGqlAudio } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';

export const fetchAudioData =
  (
    id: string
  ): ThunkAction<Promise<MediaItem | undefined>, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const state = getState();
    const type = 'file--audio';
    const isOnServer = typeof window === 'undefined';
    let data = getDataByResource<MediaItem>(state, type, id);

    if (!data || isOnServer) {
      dispatch({
        type: 'FETCH_CONTENT_DATA_REQUEST',
        payload: {
          type,
          id
        }
      });

      data = await (isOnServer ? fetchGqlAudio : fetchApiFileAudio)(id);

      if (data) {
        dispatch({
          type: 'FETCH_CONTENT_DATA_SUCCESS',
          payload: data
        });
      }
    }

    return data;
  };
