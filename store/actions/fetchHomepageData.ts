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

export const fetchHomepageData = (
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const dataCheck = getCollectionData(
    state,
    'homepage',
    null,
    'featured story'
  );

  if (!dataCheck) {
    dispatch({
      type: 'FETCH_HOMEPAGE_DATA_REQUEST'
    });

    const apiResp = await fetchApiHomepage(req);
    const {
      featuredStory,
      featuredStories,
      latestEpisode,
      latestStories,
      stories
    } = apiResp;

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'homepage', id: null },
        collection: 'latest episode',
        items: [latestEpisode]
      }
    });

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'homepage', id: null },
        collection: 'latest',
        items: [...latestStories]
      }
    });

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'homepage', id: null },
        collection: 'featured story',
        items: [featuredStory]
      }
    });

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'homepage', id: null },
        collection: 'featured stories',
        items: [...featuredStories]
      }
    });

    dispatch({
      type: 'APPEND_REFS_TO_COLLECTION',
      payload: {
        resource: { type: 'homepage', id: null },
        collection: 'stories',
        items: [...stories]
      }
    });

    [
      featuredStory,
      ...featuredStories,
      ...stories,
      ...latestStories,
      latestEpisode
    ].forEach((item: any) => {
      dispatch({
        type: 'FETCH_CONTENT_DATA_SUCCESS',
        payload: item
      });
    });
  }
};
