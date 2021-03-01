/**
 * @file fetchEpisodeData.ts
 *
 * Actions to fetch data for a episode resource.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiEpisode } from '@lib/fetch/api';
import { getDataByResource } from '@store/reducers';

export const fetchEpisodeData = (
  id: string,
  req?: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'node--episodes';
  let data = getDataByResource(state, type, id);

  if (!data || !data.complete) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    data = await fetchApiEpisode(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: {
        ...data,
        complete: true
      }
    });
  }
};
