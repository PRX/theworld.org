/**
 * @file AudioPlayer.actions.ts
 * Defines state change actions for audio player.
 */

export enum AudioPlayerActionTypes {
  AUDIO_PLAYER_INIT = '[AudioPlayer] INIT',
  AUDIO_PLAYER_PLAY = '[AudioPlayer] PLAY',
  AUDIO_PLAYER_PAUSE = '[AudioPlayer] PAUSE',
  AUDIO_PLAYER_TOGGLE_PLAYING = '[AudioPlayer] TOGGLE_PLAYING',
  AUDIO_PLAYER_MUTE = '[AudioPlayer] MUTE',
  AUDIO_PLAYER_UNMUTE = '[AudioPlayer] UNMUTE',
  AUDIO_PLAYER_TOGGLE_MUTED = '[AudioPlayer] TOGGLE_MUTED',
  AUDIO_PLAYER_UPDATE_VOLUME = '[AudioPlayer] SET_VOLUME',
  AUDIO_PLAYER_UPDATE_PROGRESS = '[AudioPlayer] UPDATE_PROGRESS',
  AUDIO_PLAYER_UPDATE_SEEKING = '[AudioPlayer] UPDATE_SEEKING',
  AUDIO_PLAYER_UPDATE_PROGRESS_TO_SEEKING = '[AudioPlayer] UPDATE_PROGRESS_TO_SEEKING',
  AUDIO_PLAYER_UPDATE_DURATION = '[AudioPlayer] UPDATE_DURATION',
  AUDIO_PLAYER_SHOW_EMBED_CODE = '[AudioPlayer] SHOW_EMBED_CODE',
  AUDIO_PLAYER_HIDE_EMBED_CODE = '[AudioPlayer] HIDE_EMBED_CODE',
  AUDIO_PLAYER_TOGGLE_EMBED_CODE_SHOWN = '[AudioPlayer] TOGGLE_EMBED_CODE_SHOW',
  AUDIO_PLAYER_UPDATE_STUCK = '{AudioPLayer] UPDATE_STUCK'
}

export type AudioPlayerAction = {
  type: AudioPlayerActionTypes;
  payload?: any;
};
