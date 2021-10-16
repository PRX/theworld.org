/**
 * @file contentData.ts
 *
 * Reducers for handling data by resource signature.
 */

import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { MenusDataState, RootState } from '@interfaces/state';

type State = MenusDataState | RootState;

export const menusData = (state: State = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload.menusData, ...state };
    case 'FETCH_MENUS_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export const getMenusData = (state: MenusDataState = {}, menu: string) =>
  state[menu];
