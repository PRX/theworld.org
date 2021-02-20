/**
 * @file audio.ts
 *
 * Query parameters needed to requests data for audio.
 */

export const basicAudioParams = {};

export const fullAudioParams = {
  include: ['audioAuthor', 'program', 'segments']
};
