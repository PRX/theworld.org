/**
 * @file aliasCache.ts
 *
 * Reducers for handling data by URL path alias.
 */

import type { AnyAction } from 'redux';
import type { ContentNode } from '@interfaces';
import type { ContentDataState, RootState } from '@interfaces/state';
import { HYDRATE } from 'next-redux-wrapper';

type State = ContentDataState | RootState;

export const aliasData = (state: State = {}, action: AnyAction) => {
  let href: URL | undefined;

  switch (action?.type) {
    case HYDRATE:
      return { ...state, ...action.payload.aliasData };

    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.alias]: {
          id: action.data.id,
          ...(action.data.type && { type: action.data.type })
        }
      };

    case 'FETCH_BULK_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        ...action.data.reduce(
          (
            a: { [k: string]: { id: string; type: string } },
            [alias, { id, type }]: [string, { id: string; type: string }]
          ) => ({
            ...a,
            [alias]: { id, type: type || null }
          }),
          {}
        )
      };

    case 'FETCH_CONTENT_DATA_SUCCESS':
      href = action.payload.link && new URL(action.payload.link);
      return {
        ...state,
        ...(href &&
          href?.pathname && {
            [href.pathname.substr(1)]: {
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
            .filter((item: ContentNode) => !!item?.link)
            .reduce((a, item: ContentNode) => {
              const { id, link } = item;
              const h = link && new URL(link).pathname;
              return !h
                ? a
                : {
                    ...a,
                    [h.substring(1)]: {
                      id
                    }
                  };
            }, {})
        })
      };

    default:
      return state;
  }
};

export const getAliasData = (state: ContentDataState, alias: string) =>
  (state || {})[alias] || undefined;
