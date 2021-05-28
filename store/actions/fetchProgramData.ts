/**
 * @file fetchProgramData.ts
 *
 * Actions to fetch data for homepage.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchProgram } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchProgramData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'node--programs';
  const dataCheck = getCollectionData(state, type, id, 'featured story');

  if (!dataCheck) {
    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_REQUEST'
    });

    const apiResp = await fetchProgram(id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
    const {
      featuredStory,
      featuredStories,
      stories,
      episodes,
      ...payload
    } = apiResp;

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload
    });

    dispatch(
      appendResourceCollection(
        { data: [featuredStory], meta: { count: 1 } },
        type,
        id,
        'featured story'
      )
    );

    dispatch(
      appendResourceCollection(
        { data: [...featuredStories], meta: { count: featuredStories.length } },
        type,
        id,
        'featured stories'
      )
    );

    dispatch(appendResourceCollection(stories, type, id, 'stories'));

    dispatch(appendResourceCollection(episodes, type, id, 'episodes'));
  }
};
