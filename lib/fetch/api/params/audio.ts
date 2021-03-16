/**
 * @file audio.ts
 *
 * Query parameters needed to requests data for audio.
 */

export const basicAudioParams = {
  include: ['program', 'segments']
};

export const fullAudioParams = {
  include: ['audioAuthor', 'program']
};
