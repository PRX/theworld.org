/**
 * @file interfaces/contexts/playerContext.interface.ts
 *
 * Interface for player context.
 */

import { IAudioData } from './IAudioData';
import { IPlayerState } from './IPlayerState';

export interface IPlayerContext {
  audioElm: HTMLAudioElement;
  state: IPlayerState;
  play(): void;
  playTrack(index: number): void;
  playAudio(audio: IAudioData): void;
  pause(): void;
  togglePlayPause(): void;
  toggleMute(): void;
  seekTo(time: number): void;
  seekBy(time: number): void;
  replay(): void;
  forward(): void;
  seekToRelative(time: number): void;
  nextTrack(): void;
  previousTrack(): void;
  setTrack(index: number): void;
  setTracks(tracks: IAudioData[]): void;
  setVolume(volume: number): void;
}
