/**
 * @file fetchTermData.ts
 *
 * Actions to fetch data for term page.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiTerm, fetchTerm } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchTermData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  const type = 'taxonomy_term--terms';
  const isOnServer = typeof window === 'undefined';
  let data = getDataByResource(state, type, id);

  if (!data || !data.complete || isOnServer) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type,
        id
      }
    });

    data = await (isOnServer ? fetchTerm : fetchApiTerm)(id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );
    const {
      featuredStory,
      featuredStories,
      stories,
      episodes,
      ...payload
    } = data;

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: {
        ...payload,
        complete: true
      }
    });

    if (featuredStory) {
      dispatch(
        appendResourceCollection(
          { data: [featuredStory], meta: { count: 1 } },
          type,
          id,
          'featured story'
        )
      );
    }

    if (featuredStories?.length) {
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
    }

    if (stories?.data?.length) {
      dispatch(appendResourceCollection(stories, type, id, 'stories'));
    }

    if (episodes?.data?.length) {
      dispatch(appendResourceCollection(episodes, type, id, 'episodes'));
    }
  }

  return data;
};
