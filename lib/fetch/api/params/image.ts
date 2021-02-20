/**
 * @file image.ts
 *
 * Query parameters needed to requests data for image.
 */

export const basicImageParams = {
  fields: ['alt', 'metadata', 'styles']
};

export const fullImageParams = {
  include: ['license'],
  fields: [
    'title',
    'url',
    'metadata',
    'credit',
    'caption',
    'styles',
    'license.title'
  ]
};
