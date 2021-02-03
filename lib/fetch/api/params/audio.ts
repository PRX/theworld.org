/**
 * @file fulStory.ts
 *
 * Query parameters needed to requests data for full story.
 */

export const basicAudioParams = {};

export const fullAudioParams = {
  include: ['audioAuthor', 'program', 'segments']
};
