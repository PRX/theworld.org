/**
 * @file ui.ts
 *
 * Reducers for handling ui state and data.
 */

import { HYDRATE } from 'next-redux-wrapper';
import { RootState, UiState, UiAction } from '@interfaces/state';

type State = UiState | RootState;

export const ui = (state = {}, action: UiAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.ui };

    case 'UI_DRAWER_OPEN':
      return {
        ...state,
        drawer: {
          open: true
        }
      } as UiState;

    case 'UI_DRAWER_CLOSE':
      return {
        ...state,
        drawer: {
          open: false
        }
      } as UiState;

    default:
      return state;
  }
};

export const getUiDrawerOpen = (state: UiState) => state?.drawer?.open;
