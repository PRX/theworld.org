/**
 * @file fetchAliasData.ts
 *
 * Actions to fetch basic data for a URL alias.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { getDataByAlias } from '@store/reducers';
import { fetchQueryAlias } from '@lib/fetch';

export const fetchAliasData = (
  alias: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<IPriApiResource> => {
  const state = getState();
  let data = getDataByAlias(state, alias);

  if (!data) {
    dispatch({
      type: 'FETCH_ALIAS_DATA_REQUEST',
      alias
    });

    data = await fetchQueryAlias(alias).then(
      (resp: IPriApiResourceResponse) => resp && resp.data
    );

    dispatch({
      type: 'FETCH_ALIAS_DATA_SUCCESS',
      alias,
      data
    });
  }

  dispatch({
    type: 'FETCH_ALIAS_DATA_COMPLETE',
    alias,
    data
  });

  return data;
};
