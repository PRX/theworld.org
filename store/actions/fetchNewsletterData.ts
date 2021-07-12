/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { getDataByResource } from '@store/reducers';
import { fetchNewsletter } from '@lib/fetch';
import { IPriApiResourceResponse } from 'pri-api-library/types';

export const fetchNewsletterData = (
  id: string
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

    data = await fetchNewsletter(id).then(
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
