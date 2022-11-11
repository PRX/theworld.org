/**
 * @file ui.ts
 *
 * Reducers for handling ui state and data.
 */

import { HYDRATE } from 'next-redux-wrapper';
import { RootState, UiState, UiAction } from '@interfaces/state';

type State = UiState | RootState;

export const ui = (state = {} as State, action: UiAction): State => {
  const { player } = state as UiState;
  const { playlistOpen } = player || {};

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

    case 'UI_PLAYER_OPEN':
      return {
        ...state,
        player: {
          ...player,
          open: true
        }
      } as UiState;

    case 'UI_PLAYER_CLOSE':
      return {
        ...state,
        player: {
          open: false,
          playlistOpen: false
        }
      } as UiState;

    case 'UI_PLAYER_PLAYLIST_OPEN':
      return {
        ...state,
        player: {
          ...player,
          playlistOpen: true
        }
      } as UiState;

    case 'UI_PLAYER_PLAYLIST_CLOSE':
      return {
        ...state,
        player: {
          ...player,
          playlistOpen: false
        }
      } as UiState;

    case 'UI_PLAYER_PLAYLIST_TOGGLE':
      return {
        ...state,
        player: {
          ...player,
          playlistOpen: !playlistOpen
        }
      } as UiState;

    case 'UI_SHOW_SOCIAL_SHARE_MENU':
      return {
        ...state,
        socialShareMenu: {
          shown: true,
          links: action.payload.ui.socialShareMenu.links,
          icons: action.payload.ui.socialShareMenu.icons
        }
      } as UiState;

    case 'UI_HIDE_SOCIAL_SHARE_MENU':
      return {
        ...state,
        socialShareMenu: {
          shown: false
        }
      } as UiState;

    default:
      return state;
  }
};

export const getUiDrawerOpen = (state: UiState) => state?.drawer?.open;
export const getUiPlayerOpen = (state: UiState) => state?.player?.open;
export const getUiPlayerPlaylistOpen = (state: UiState) =>
  state?.player?.playlistOpen;
export const getUiSocialShareMenu = (state: UiState) => state?.socialShareMenu;
