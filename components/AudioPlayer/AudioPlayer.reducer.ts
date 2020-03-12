/**
 * @file AudioPlayer.reducer.ts
 * Defines reducer for handling audio player state actions.
 */

import {
  AudioPlayerActionTypes as ActionTypes,
  AudioPlayerAction
} from './AudioPlayer.actions';
import { IAudioPlayerState } from './AudioPlayer.interfaces';

export const audioPlayerInitialState: IAudioPlayerState = {
  hasPlayed: false,
  playing: false,
  volume: 0.8,
  muted: false,
  duration: null,
  seeking: null,
  embedCode: {
    show: false,
    copied: false,
    failed: false
  },
  played: null,
  playedSeconds: null,
  loaded: null,
  loadedSeconds: null
};

export const audioPlayerStateReducer = (
  state: IAudioPlayerState,
  action: AudioPlayerAction
): IAudioPlayerState => {
  const { playing, muted, seeking, embedCode } = state;

  switch (action.type) {
    case ActionTypes.AUDIO_PLAYER_INIT:
      return audioPlayerInitialState;

    case ActionTypes.AUDIO_PLAYER_PLAY:
      return { ...state, playing: true };

    case ActionTypes.AUDIO_PLAYER_PAUSE:
      return { ...state, playing: false };

    case ActionTypes.AUDIO_PLAYER_TOGGLE_PLAYING:
      return { ...state, playing: !playing, hasPlayed: true };

    case ActionTypes.AUDIO_PLAYER_MUTE:
      return { ...state, muted: true };

    case ActionTypes.AUDIO_PLAYER_UNMUTE:
      return { ...state, muted: false };

    case ActionTypes.AUDIO_PLAYER_TOGGLE_MUTED:
      return { ...state, muted: !muted };

    case ActionTypes.AUDIO_PLAYER_UPDATE_VOLUME:
      return { ...state, volume: action.payload };

    case ActionTypes.AUDIO_PLAYER_UPDATE_PROGRESS:
      return { ...state, ...action.payload };

    case ActionTypes.AUDIO_PLAYER_UPDATE_SEEKING:
      return { ...state, seeking: action.payload };

    case ActionTypes.AUDIO_PLAYER_UPDATE_PROGRESS_TO_SEEKING:
      return {
        ...state,
        played: seeking,
        seeking: null
      };

    case ActionTypes.AUDIO_PLAYER_UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload,
        playing: false,
        hasPlayed: false
      };

    case ActionTypes.AUDIO_PLAYER_SHOW_EMBED_CODE:
      return { ...state, embedCode: { ...embedCode, show: true } };

    case ActionTypes.AUDIO_PLAYER_HIDE_EMBED_CODE:
      return { ...state, embedCode: { ...embedCode, show: false } };

    case ActionTypes.AUDIO_PLAYER_TOGGLE_EMBED_CODE_SHOW:
      return { ...state, embedCode: { ...embedCode, show: !embedCode.show } };

    case ActionTypes.AUDIO_PLAYER_COPY_EMBED_CODE_SUCCESS:
      return {
        ...state,
        embedCode: { ...embedCode, copied: true, failed: false }
      };

    case ActionTypes.AUDIO_PLAYER_COPY_EMBED_CODE_FAILURE:
      return {
        ...state,
        embedCode: { ...embedCode, copied: false, failed: true }
      };

    default:
      throw new Error('Unknown Audio Player Action.');
  }
};
