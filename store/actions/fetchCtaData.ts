/**
 * @file fetchAliasData.ts
 *
 * Actions to fetch basic data for a URL alias.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiCtaRegionGroup } from '@lib/fetch/api';
import { getCtaRegionGroup } from '@store/reducers';

export const fetchCtaData = (
  regionGroup: string,
  type: string,
  id: string,
  context: string[],
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const group = getCtaRegionGroup(state, type, id, regionGroup);

  if (!group) {
    dispatch({
      type: 'FETCH_CTA_DATA_REQUEST',
      payload: {
        type,
        id,
        regionGroup
      }
    });

    const data = await fetchApiCtaRegionGroup(regionGroup, context, req);

    dispatch({
      type: 'FETCH_CTA_DATA_SUCCESS',
      payload: {
        type,
        id,
        context,
        groups: {
          [regionGroup]: Object.keys(data)
        },
        data
      }
    });
  }
};
