/**
 * @file AudioPlayer.interfaces.ts
 * Defines interfaces used by audio player.
 */
import { HTMLAttributes } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface IAudioPlayerProps extends HTMLAttributes<{}> {
  data: IPriApiResource;
  downloadFilename?: string | true;
  embeddedPlayerUrl?: string;
  message?: string;
  popoutPlayerUrl?: string;
}

export interface IProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export interface IEmbedCodeState {
  show: boolean;
  copied: boolean;
  failed: boolean;
}

export interface IAudioPlayerState extends IProgressState {
  hasPlayed: boolean;
  playing: boolean;
  volume: number;
  muted: boolean;
  duration: number;
  seeking: number;
  embedCode: IEmbedCodeState;
}
