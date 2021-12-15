/**
 * @file image.ts
 *
 * Query parameters needed to requests data for image.
 */

export const basicImageParams = {
  fields: ['alt', 'metadata']
};

export const fullImageParams = {
  include: ['license'],
  fields: [
    'title',
    'url',
    'alt',
    'metadata',
    'credit',
    'caption',
    'license.title'
  ]
};
