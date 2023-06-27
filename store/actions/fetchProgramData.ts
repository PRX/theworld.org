/**
 * @file fetchProgramData.ts
 *
 * Actions to fetch data for program page.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { fetchApiProgram, fetchProgram } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchProgramData =
  (id: string, req: IncomingMessage): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<IPriApiResource> => {
    const state = getState();
    const type = 'node--programs';
    const isOnServer = typeof window === 'undefined';
    const params = req?.url ? parse(req.url, true).query : undefined;
    let data = getDataByResource(state, type, id);

    if (!data || !data.complete || isOnServer) {
      dispatch({
        type: 'FETCH_CONTENT_DATA_REQUEST',
        payload: {
          type,
          id
        }
      });

      const dataPromise = (
        isOnServer ? fetchProgram(id, params) : fetchApiProgram(id)
      ).then((resp: IPriApiResourceResponse) => resp && resp.data);

      const ctaDataPromise = dispatch<any>(
        fetchCtaRegionGroupData('tw_cta_regions_landing')
      );

      data = await dataPromise;
      await ctaDataPromise;

      const { featuredStory, featuredStories, stories, episodes, ...payload } =
        data;

      // Set CTA filter props.
      dispatch({
        type: 'SET_RESOURCE_CTA_FILTER_PROPS',
        payload: {
          filterProps: {
            type,
            id,
            props: {
              program: id
            }
          }
        } as ICtaFilterProps
      });

      dispatch({
        type: 'FETCH_CONTENT_DATA_SUCCESS',
        payload: {
          ...payload,
          complete: true
        }
      });

      if (featuredStories) {
        // dispatch(
        //   appendResourceCollection(
        //     {
        //       data: [featuredStory],
        //       meta: { count: 1 }
        //     },
        //     type,
        //     id,
        //     'featured story'
        //   )
        // );
        // dispatch(
        //   appendResourceCollection(
        //     {
        //       data: [...featuredStories],
        //       meta: {
        //         count: featuredStories.length
        //       }
        //     },
        //     type,
        //     id,
        //     'featured stories'
        //   )
        // );
      }

      if (stories) {
        dispatch(appendResourceCollection(stories, type, id, 'stories'));
      }

      if (episodes) {
        dispatch(appendResourceCollection(episodes, type, id, 'episodes'));
      }
    }

    return data;
  };
