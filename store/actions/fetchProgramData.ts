/**
 * @file fetchProgramData.ts
 *
 * Actions to fetch data for program page.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiProgram, fetchProgram } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchProgramData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'node--programs';
  const data = getDataByResource(state, type, id);

  if (!data) {
    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_REQUEST'
    });

    const apiResp = await (typeof window === 'undefined'
      ? fetchProgram
      : fetchApiProgram)(id).then(
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
      payload: {
        ...payload,
        complete: true
      }
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
