/**
 * @file fetchCtaData.ts
 *
 * Actions to fetch data for a CTA region group.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiCtaRegionGroup } from '@lib/fetch/api';
import {
  getCtaContext,
  getCtaPageType,
  getCtaRegionGroup
} from '@store/reducers';

export const fetchCtaData = (
  type: string,
  id: string,
  regionGroup?: string,
  context?: string[],
  req?: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const ctx = context || getCtaContext(state, type, id);
  const pageType = getCtaPageType(state, type, id);
  const regionGroupName =
    regionGroup || (pageType && `tw_cta_regions_${pageType}`);
  const group = getCtaRegionGroup(state, type, id, regionGroupName);

  if (!group && !!regionGroupName) {
    dispatch({
      type: 'FETCH_CTA_DATA_REQUEST',
      payload: {
        type,
        id,
        regionGroup: regionGroupName
      }
    });

    const data = await fetchApiCtaRegionGroup(regionGroupName, ctx, req);

    dispatch({
      type: 'FETCH_CTA_DATA_SUCCESS',
      payload: {
        type,
        id,
        context: ctx,
        groups: {
          [regionGroupName]: Object.keys(data)
        },
        data
      }
    });
  }
};
