/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchAudio } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { IPriApiResourceResponse } from 'pri-api-library/types';

export const fetchAudioData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'file--audio';
  let data = getDataByResource(state, type, id);

  if (!data || !data.complete) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    data = await fetchAudio(id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: {
        ...data,
        complete: true
      }
    });
  }
};
