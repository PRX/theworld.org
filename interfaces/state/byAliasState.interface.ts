/**
 * @file byAliasState.interface.ts
 *
 * Define interfaces for byAliasState.
 */

import { IPriApiResource } from 'pri-api-library/types';

export interface ByAliasState {
  [k: string]: IPriApiResource;
}
