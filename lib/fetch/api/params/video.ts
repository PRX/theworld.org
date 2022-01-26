/**
 * @file video.ts
 *
 * Query parameters needed to requests data for video.
 */

export const basicVideoParams = {
  fields: ['title', 'metatags']
};

export const fullVideoParams = {
  fields: [
    'title',
    'url',
    'date',
    'metatags',
    'credit',
    'transcript',
    'description'
  ]
};
