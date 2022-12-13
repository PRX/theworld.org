/**
 * @file fetchTermData.ts
 *
 * Actions to fetch data for term page.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { parse } from 'url';
import { IncomingMessage } from 'http';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiTerm, fetchTerm } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchTermData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  const type = 'taxonomy_term--terms';
  const params = req?.url ? parse(req.url, true).query : null;
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

    const dataPromise = (isOnServer
      ? fetchTerm(id, params)
      : fetchApiTerm(id)
    ).then((resp: IPriApiResourceResponse) => resp && resp.data);

    const ctaDataPromise = dispatch<any>(
      fetchCtaRegionGroupData('tw_cta_regions_landing')
    );

    data = await dataPromise;
    await ctaDataPromise;

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
