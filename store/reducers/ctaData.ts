/**
 * @file byResource.ts
 *
 * Reducers for handling data by resource signature.
 */

import { HYDRATE } from 'next-redux-wrapper';
import { IPriApiResource } from 'pri-api-library/types';
import { CtaAction, CtaDataState } from '@interfaces/state';
import { makeResourceSignature } from '@lib/parse/state';

type State = CtaDataState;

export const ctaData = (state: State = {}, action: CtaAction) => {
  let key: string;
  const makeKey = () =>
    makeResourceSignature({
      type: action.payload.type,
      id: action.payload.id
    } as IPriApiResource);

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ctaData };

    case 'SET_RESOURCE_CONTEXT':
      key = makeKey();
      return {
        ...state,
        [key]: {
          ...(state[key] || {}),
          pageType: action.payload.pageType,
          context: action.payload.context
        }
      };

    case 'FETCH_CTA_DATA_SUCCESS':
      key = makeKey();
      return {
        ...state,
        ...(state[key]
          ? {
              [key]: {
                ...state[key],
                groups: {
                  ...(state[key].groups || {}),
                  ...action.payload.groups
                },
                data: {
                  ...(state[key].data || {}),
                  ...action.payload.data
                }
              }
            }
          : {
              [key]: {
                context: action.payload.context,
                groups: action.payload.groups,
                data: action.payload.data
              }
            })
      };

    default:
      return state;
  }
};

export const getCtaData = (
  state: CtaDataState = {},
  type: string,
  id: string
) => state[makeResourceSignature({ type, id } as IPriApiResource)];

export const getCtaPageType = (
  state: CtaDataState = {},
  type: string,
  id: string
) => (getCtaData(state, type, id) || {}).pageType;

export const getCtaContext = (
  state: CtaDataState = {},
  type: string,
  id: string
) => (getCtaData(state, type, id) || {}).context;

export const getCtaRegionData = (
  state: CtaDataState = {},
  type: string,
  id: string,
  region: string
) => ((getCtaData(state, type, id) || {}).data || {})[region];

export const getCtaRegionGroup = (
  state: CtaDataState = {},
  type: string,
  id: string,
  group: string
) => ((getCtaData(state, type, id) || {}).groups || {})[group];
