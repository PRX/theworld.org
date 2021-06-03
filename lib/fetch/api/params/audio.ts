/**
 * @file audio.ts
 *
 * Query parameters needed to requests data for audio.
 */

export const basicAudioParams = {
  include: ['segments']
};

export const fullAudioParams = {
  include: ['audioAuthor', 'program'],
  fields: [
    'audioAuthor.title',
    'audioAuthor.metatags',
    'audioTitle',
    'broadcastDate',
    'description',
    'program.title',
    'program.metatags',
    'url'
  ]
};
