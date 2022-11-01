/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { fetchApiHomepage } from '@lib/fetch/api';
import { fetchHomepage } from '@lib/fetch/homepage/fetchHomepage';
import { getHomepageData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

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

    // Set CTA filter props.
    dispatch({
      type: 'SET_RESOURCE_CTA_FILTER_PROPS',
      payload: {
        filterProps: {
          type,
          id,
          props: {
            program: '3704'
          }
        }
      } as ICtaFilterProps
    });

    dispatch(
      appendResourceCollection(
        {
          data: [featuredStory],
          meta: { count: 1 }
        },
        type,
        id,
        'featured story'
      )
    );

    dispatch(
      appendResourceCollection(
        {
          data: [...featuredStories],
          meta: { count: featuredStories.length }
        },
        type,
        id,
        'featured stories'
      )
    );

    dispatch(appendResourceCollection(stories, type, id, 'stories'));

    if (episodes) {
      dispatch(appendResourceCollection(episodes, type, id, 'episodes'));
    }

    dispatch(appendResourceCollection(latestStories, type, id, 'latest'));

    await dispatch<any>(fetchCtaRegionGroupData('tw_cta_regions_landing'));

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
