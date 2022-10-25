/**
 * @file fetchCtaRegionGroupData.ts
 *
 * Actions to fetch data for a CTA region group.
 */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ICtaRegions } from '@interfaces/cta';
import { CtaRegionGroupAction } from '@interfaces/state';
import { fetchApiCtaRegionGroup } from '@lib/fetch/api';
import { fetchCtaRegionGroup } from '@lib/fetch/cta';
import { IPriApiResourceResponse } from 'pri-api-library/types';

export const fetchCtaRegionGroupData = (
  regionGroup: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  const isOnServer = typeof window === 'undefined';

  dispatch({
    type: 'FETCH_CTA_REGION_GROUP_DATA_REQUEST',
    payload: {
      regionGroup
    }
  });

  const data = await (isOnServer
    ? fetchCtaRegionGroup
    : fetchApiCtaRegionGroup)(regionGroup).then(
    (resp: IPriApiResourceResponse) =>
      resp && (resp.data.subqueues as ICtaRegions)
  );

  dispatch({
    type: 'FETCH_CTA_REGION_GROUP_DATA_SUCCESS',
    payload: {
      data
    }
  } as CtaRegionGroupAction);
};
