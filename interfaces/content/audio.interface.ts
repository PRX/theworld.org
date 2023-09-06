/**
 * Defines audio data interfaces and types.
 */

import { IPriApiResource } from 'pri-api-library/types';

export interface IAudioUsage {
  id: number;
  type: string;
  title: string;
  metatags: {
    canonical: string;
  };
}

export interface IAudioResource extends IPriApiResource {
  /**
   * Meta tags for resource page.
   */
  metatags?: {
    [k: string]: string | null;
  };

  /**
   * System title of resource.
   */
  title?: string;

  /**
   * Display title.
   */
  audioTitle?: string;

  /**
   * Description of audio content.
   */
  description?: string;

  /**
   * System created date for resource.
   */
  date?: string;

  /**
   * Broadcast data of audio content.
   */
  broadcastDate?: string;

  /**
   * Audio file URL.
   */
  url: string;

  /**
   * File metadata.
   */
  metadata?: {
    duration: string;
    size: string;
    mime: string;
  };

  /**
   * Array authors of the audio content.
   */
  audioAuthor?: IPriApiResource[];

  /**
   * Program owning audio content.
   */
  program?: IPriApiResource;

  /**
   * Segment audio resources.
   */
  segments?: IAudioResource[];

  /**
   * Resource the audio is associated with.
   */
  usage?:
    | []
    | {
        episode?: IAudioUsage[];
        story?: IAudioUsage[];
      };
}
