/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiHomepage } from '@lib/fetch/api';
import { fetchHomepage } from '@lib/fetch/homepage/fetchHomepage';
import { getHomepageData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchHomepageData = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<{ [k: string]: any }> => {
  const state = getState();
  const type = 'homepage';
  const id = undefined;
  const isOnServer = typeof window === 'undefined';
  const data = getHomepageData(state);
  const dataCheck = Object.values(data).filter(v => !!v).length > 0;

  if (!dataCheck || isOnServer) {
    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_REQUEST'
    });

    const apiResp = await (isOnServer
      ? fetchHomepage
      : fetchApiHomepage)().then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
    const {
      featuredStory,
      featuredStories,
      latestStories,
      stories,
      episodes,
      menus
    } = apiResp;

    dispatch({
      type: 'SET_RESOURCE_CONTEXT',
      payload: {
        type,
        id,
        pageType: 'landing',
        context: ['node:3704']
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

    dispatch(appendResourceCollection(latestStories, type, id, 'latest'));

    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_SUCCESS'
    });

    dispatch({
      type: 'FETCH_MENUS_DATA_SUCCESS',
      payload: menus
    });

    return { ...apiResp };
  }

  return { ...data };
};
