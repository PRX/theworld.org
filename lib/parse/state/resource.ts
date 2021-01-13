/**
 * @file resource.ts
 *
 * Helper functions for managing resource state.
 */

import { IPriApiResource } from 'pri-api-library/types';

export const makeResourceSignature = ({ type, id }: IPriApiResource) =>
  [type, id].filter(v => !!v).join(':');
