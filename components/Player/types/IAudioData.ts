import { ContentNode } from '@interfaces';
import { IPriApiResource } from 'pri-api-library/types';

/**
 * Audio data interface.
 */
export interface IAudioData {
  /**
   * Globally unique id for the audio.
   */
  guid: string;

  /**
   * Link URL to view more about the audio.
   */
  link: string;

  /**
   * Source URL for the audio file.
   */
  url: string;

  /**
   * Title to be displayed in player.
   */
  title: string;

  /**
   * Name of the controls that queued the audio either from a play
   * button or add to playlist button.
   */
  queuedFrom: string;

  /**
   * Subtitle to display below the title in player.
   */
  subtitle?: string;

  /**
   * Info strings.
   */
  info?: string[];

  /**
   * Source URL for image to use in thumbnail or feature art.
   */
  imageUrl?: string;

  /**
   * Duration of audio track formatted as '[HH:]MM:SS'.
   */
  duration?: string;

  /**
   * Content link resource data.
   */
  linkResource?: ContentNode;
}
