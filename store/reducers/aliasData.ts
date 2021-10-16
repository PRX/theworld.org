/**
 * @file aliasCache.ts
 *
 * Reducers for handling data by URL path alias.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { UrlWithParsedQuery } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentDataState, RootState } from '@interfaces/state';
import { generateLinkHrefForContent } from '@lib/routing/content';

type State = ContentDataState | RootState;

export const aliasData = (state: State = {}, action: AnyAction) => {
  let href: UrlWithParsedQuery;

  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.aliasData, ...state };

    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.alias]: {
          id: action.data.id,
          type: action.data.type
        }
      };

    case 'FETCH_BULK_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        ...action.data.reduce(
          (
            a: { [k: string]: { id: string; type: string } },
            [alias, { id, type }]: [string, IPriApiResource]
          ) => ({
            ...a,
            [alias]: { id, type }
          }),
          {}
        )
      };

    case 'FETCH_CONTENT_DATA_SUCCESS':
      href = generateLinkHrefForContent(action.payload);
      return {
        ...state,
        ...(action.payload &&
          href && {
            [href.pathname]: {
              id: action.payload.id,
              type: action.payload.type
            }
          })
      };

    case 'FETCH_BULK_CONTENT_DATA_SUCCESS':
      return {
        ...state,
        ...(action.payload && {
          ...action.payload
            .filter(item => !!item)
            .reduce((a, item) => {
              const { id, type } = item;
              const h = generateLinkHrefForContent(item);
              return !h
                ? a
                : {
                    ...a,
                    [h.pathname]: {
                      id,
                      type
                    }
                  };
            }, {})
        })
      };

    default:
      return state;
  }
};

export const getAliasData = (state: ContentDataState = {}, alias: string) =>
  state[alias];
