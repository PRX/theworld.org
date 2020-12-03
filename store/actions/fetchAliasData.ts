/**
 * @file fetchAliasData.ts
 *
 * Actions to fetch basic data for a URL alias.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchApiQueryAlias } from '@lib/fetch/api';

// Action Definitions

export interface FetchAliasDataRequest {
  type: 'FETCH_ALIAS_DATA_REQUEST';
  alias: string;
}

export interface FetchAliadDataSuccess {
  type: 'FETCH_ALIAS_DATA_SUCCESS';
  alias: string;
  data: IPriApiResource;
}

// Union Action Types

export type Actions = FetchAliasDataRequest | FetchAliasDataRequest;

// Action Creators

export const requestAliasData = () => {};

export const fetchAliasData = (
  alias: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch({
    type: 'FETCH_ALIAS_DATA_REQUEST',
    alias
  });

  const data = await fetchApiQueryAlias(alias, req);

  dispatch({
    type: 'FETCH_ALIAS_DATA_SUCCESS',
    alias,
    data
  });
};
