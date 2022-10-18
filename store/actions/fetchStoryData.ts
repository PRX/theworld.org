/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */

import _uniqBy from 'lodash/uniqBy';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiStory, fetchStory } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

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
  const bylines: [string, IPriApiResource[]][] = Object.entries(
    bylinesMap
  ).map(([title, people]) => [title, _uniqBy(people, 'id')]);

  return {
    bylines: bylines?.length ? bylines : null,
    ...other
  };
};

export const fetchStoryData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  const type = 'node--stories';
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

    data = await (isOnServer ? fetchStory : fetchApiStory)(id)
      .then((resp: IPriApiResourceResponse) => resp && resp.data)
      .then(story => decorateWithBylines(story));

    await dispatch<any>(fetchCtaRegionGroupData('tw_cta_regions_content'));

    dispatch({
      type: 'SET_RESOURCE_CONTEXT',
      payload: {
        type,
        id,
        pageType: 'content',
        context: [
          `node:${data.id}`,
          `node:${data.program?.id}`,
          `term:${data.primaryCategory?.id}`,
          ...((data.categories &&
            !!data.categories.length &&
            data.categories
              .filter(v => !!v)
              .map(({ id: tid }) => `term:${tid}`)) ||
            []),
          ...((data.vertical &&
            !!data.vertical.length &&
            data.vertical.filter(v => !!v).map(({ tid }) => `term:${tid}`)) ||
            [])
        ]
      }
    });

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
