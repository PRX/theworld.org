/**
 * @file fetchAliasData.ts
 *
 * Actions to fetch basic data for a URL alias.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiQueryAlias } from '@lib/fetch/api';
import { getDataByAlias } from '@store/reducers';

export const fetchAliasData = (
  alias: string,
  req: IncomingMessage
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

    data = await fetchApiQueryAlias(alias, req);

    dispatch({
      type: 'FETCH_ALIAS_DATA_SUCCESS',
      alias,
      data
    });
  }

  return data;
};
