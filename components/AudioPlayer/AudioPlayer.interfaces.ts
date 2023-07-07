/**
 * @file AudioPlayer.interfaces.ts
 * Defines interfaces used by audio player.
 */
import { HTMLAttributes } from 'react';
import { Maybe, MediaItem } from '@interfaces';

export interface IAudioPlayerProps extends HTMLAttributes<{}> {
  data?: Maybe<MediaItem> | string;
  downloadFilename?: string | true;
  embeddedPlayerUrl?: string;
  message?: string;
  popoutPlayerUrl?: string;
}

export interface IProgressState {
  played: number | null;
  playedSeconds: number | null;
  loaded: number | null;
  loadedSeconds: number | null;
}

export interface IAudioPlayerState extends IProgressState {
  hasPlayed: boolean;
  playing: boolean;
  volume: number;
  muted: boolean;
  duration: number | null;
  seeking: number | null;
  embedCodeShown: boolean;
  prevTop?: number;
  stuck: boolean;
}
