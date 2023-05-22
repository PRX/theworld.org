/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */

import _uniqBy from 'lodash/uniqBy';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiCollectionResponse,
  IPriApiResource
} from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import {
  fetchApiCategoryStories,
  fetchApiStory,
  fetchCategoryStories,
  fetchTwApiStory
} from '@lib/fetch';
import { getCollectionData, getDataByResource } from '@store/reducers';
// import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';
import { appendResourceCollection } from './appendResourceCollection';

export const decorateWithBylines = (story: IPriApiResource) => {
  const { byline: b, bylines: bs, ...other } = story;
  const bylinesMap: { [k: string]: IPriApiResource[] } = [
    ...(b?.reduce(
      (a: any, item: IPriApiResource) => [
        ...a,
        {
          creditType: item.creditType || { title: 'By' },
          person: item.person || item
        }
      ],
      []
    ) || []),
    ...(bs?.filter(({ person }) => !!person) || [])
  ].reduce((a, { creditType, person }) => {
    const key = creditType?.title || 'By';
    return {
      ...a,
      [key]: [...(a[key] || []), person]
    };
  }, {});
  const bylines: [string, IPriApiResource[]][] = Object.entries(bylinesMap).map(
    ([title, people]) => [title, _uniqBy(people, 'id')]
  );

  return {
    bylines: bylines?.length ? bylines : null,
    ...other
  };
};

export const fetchStoryData =
  (id: number): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<IPriApiResource> => {
    const state = getState();
    const type = 'post:story';
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

      const dataPromise = (isOnServer ? fetchTwApiStory : fetchApiStory)(id)
        .then((resp) => resp && resp.data)
        .then((story) => story && decorateWithBylines(story));

      // const ctaDataPromise = dispatch<any>(
      //   fetchCtaRegionGroupData('tw_cta_regions_content')
      // );

      data = await dataPromise;
      // await ctaDataPromise;

      // Set CTA filter props.
      dispatch({
        type: 'SET_RESOURCE_CTA_FILTER_PROPS',
        payload: {
          filterProps: {
            type,
            id,
            props: {
              id,
              categories: [
                data.primaryCategory?.id,
                ...(data.categories || [])
                  .filter((v: any) => !!v)
                  .map(({ id: tid }) => tid)
              ].filter((v: any) => !!v),
              program: data.program?.id || null
            }
          }
        } as ICtaFilterProps
      });

      // Get missing related stories data.
      const collection = 'related';
      const { primaryCategory } = data;
      const related =
        primaryCategory &&
        getCollectionData(
          state,
          primaryCategory.type,
          primaryCategory.id,
          collection
        );

      if (!related && primaryCategory) {
        (async () => {
          const apiData = await (isOnServer
            ? fetchCategoryStories
            : fetchApiCategoryStories)(
            primaryCategory.id,
            1,
            5,
            'primary_category'
          );

          if (apiData) {
            dispatch<any>(
              appendResourceCollection(
                apiData as IPriApiCollectionResponse,
                primaryCategory.type,
                primaryCategory.id,
                collection
              )
            );
          }
        })();
      }

      dispatch({
        type: 'FETCH_CONTENT_DATA_SUCCESS',
        payload: {
          ...data,
          complete: true
        }
      });
    }

    return data;
  };
