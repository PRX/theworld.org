/**
 * @file ui.interface.ts
 *
 * Define interfaces for ui state.
 */

import { AnyAction } from 'redux';

export interface DrawerState {
  open: boolean;
}

export interface UiState {
  drawer?: DrawerState;
}

export interface UiAction extends AnyAction {
  payload: {
    ui?: UiState;
  };
}
