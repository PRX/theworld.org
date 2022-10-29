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
   * Subtitle to display below the title in player.
   */
  subtitle?: string;

  /**
   * Source URL for image to use in thumbnail or feature art.
   */
  imageUrl?: string;

  /**
   * Duration of audio track formatted as '[HH:]MM:SS'.
   */
  duration?: string;
}
