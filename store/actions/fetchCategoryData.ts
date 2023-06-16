/**
 * @file fetchCategoryData.ts
 *
 * Actions to fetch data for category page.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { fetchApiCategory, fetchCategory } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchCategoryData =
  (id: string): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<IPriApiResource> => {
    const state = getState();
    const type = 'taxonomy_term--categories';
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

      const dataPromise = (isOnServer ? fetchCategory : fetchApiCategory)(
        id
      ).then((resp: IPriApiResourceResponse) => resp && resp.data);

      const ctaDataPromise = dispatch<any>(
        fetchCtaRegionGroupData('tw_cta_regions_landing')
      );

      data = await dataPromise;
      await ctaDataPromise;

      const { featuredStory, featuredStories, stories, ...payload } = data;

      // Set CTA filter props.
      dispatch({
        type: 'SET_RESOURCE_CTA_FILTER_PROPS',
        payload: {
          filterProps: {
            type,
            id,
            props: {
              categories: [id]
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

      dispatch(appendResourceCollection(stories, type, id, 'stories'));
    }

    return data;
  };
