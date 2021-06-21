/**
 * @file aliasCache.ts
 *
 * Reducers for handling data by URL path alias.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { UrlWithParsedQuery } from 'url';
import { ContentDataState, RootState } from '@interfaces/state';
import { generateLinkHrefForContent } from '@lib/routing/content';

type State = ContentDataState | RootState;

export const aliasData = (state: State = {}, action: AnyAction) => {
  let href: UrlWithParsedQuery;

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.aliasData };
    case 'FETCH_ALIAS_DATA_SUCCESS':
      return {
        ...state,
        [action.alias]: {
          id: action.data.id,
          type: action.data.type
        }
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

    default:
      return state;
  }
};

export const getAliasData = (state: ContentDataState = {}, alias: string) =>
  state[alias];
