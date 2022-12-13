/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { ICtaFilterProps } from '@interfaces/cta';
import { RootState } from '@interfaces/state';
import { fetchApiFileAudio, fetchAudio } from '@lib/fetch';
import { getDataByResource } from '@store/reducers';
import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchAudioData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  const type = 'file--audio';
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

    const dataPromise = (isOnServer ? fetchAudio : fetchApiFileAudio)(id).then(
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
            id,
            program: data.program?.id || null
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
