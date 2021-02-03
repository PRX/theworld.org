/**
 * @file byResource.interface.ts
 *
 * Define interfaces for byResource.
 */

import { IPriApiResource } from 'pri-api-library/types';

export interface ContentDataState {
  [k: string]: IPriApiResource;
}
