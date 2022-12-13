/**
 * @file fetchImageData.ts
 *
 * Actions to fetch data for a image resource.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { fetchApiFileImage, fetchImage } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchImageData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  const type = 'file--images';
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

    const dataPromise = (isOnServer ? fetchImage : fetchApiFileImage)(id).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );

    const ctaDataPromise = dispatch<any>(
      fetchCtaRegionGroupData('tw_cta_regions_content')
    );

    data = await dataPromise;
    await ctaDataPromise;

    // Set CTA filter props.
    dispatch({
      type: 'SET_RESOURCE_CTA_FILTER_PROPS',
      payload: {
        filterProps: {
          type,
          id,
          props: {
            id
          }
        }
      } as ICtaFilterProps
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
