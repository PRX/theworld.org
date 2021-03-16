/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiHomepage } from '@lib/fetch/api';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchHomepageData = (
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'homepage';
  const id = undefined;
  const dataCheck = getCollectionData(state, type, id, 'featured story');

  if (!dataCheck) {
    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_REQUEST'
    });

    const apiResp = await fetchApiHomepage(req);
    const {
      featuredStory,
      featuredStories,
      latestStories,
      stories,
      episodes
    } = apiResp;

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

    dispatch(appendResourceCollection(latestStories, type, id, 'latest'));
  }
};
