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
import {
  fetchApiQueryAlias,
  fetchQueryAlias,
  fetchTwApiQueryAlias
} from '@lib/fetch';

export const fetchAliasData =
  (alias: string): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<IPriApiResource> => {
    const state = getState();
    const isOnServer = typeof window === 'undefined';
    let data = getDataByAlias(state, alias);

    if (!data || isOnServer) {
      dispatch({
        type: 'FETCH_ALIAS_DATA_REQUEST',
        alias
      });

      data = await (isOnServer ? fetchTwApiQueryAlias : fetchApiQueryAlias)(
        alias
      ).then((resp: IPriApiResourceResponse) => resp && resp.data);

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

export const fetchBulkAliasData =
  (aliases: string[]): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<[string, IPriApiResource][]> => {
    const fetchFunc =
      typeof window === 'undefined' ? fetchQueryAlias : fetchApiQueryAlias;
    const data: [string, IPriApiResource][] = [];

    if (aliases && !!aliases.length) {
      dispatch({
        type: 'FETCH_BULK_ALIAS_DATA_REQUEST',
        aliases
      });

      await Promise.all(
        aliases.map((alias) =>
          fetchFunc(alias).then((r: IPriApiResourceResponse) => {
            if (r) {
              data.push([alias, r.data]);
            }
          })
        )
      );

      dispatch({
        type: 'FETCH_BULK_ALIAS_DATA_SUCCESS',
        aliases,
        data
      });
    }

    dispatch({
      type: 'FETCH_BULK_ALIAS_DATA_COMPLETE',
      aliases,
      data
    });

    return data;
  };
