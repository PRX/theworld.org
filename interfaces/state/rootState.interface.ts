/**
 * @file rootState.interface.ts
 *
 * Define interfaces for RootState.
 */

import { ByAliasState } from './byAliasState.interface';
import { ByResourceState } from './byResource.interface';

export interface RootState {
  byAlias: ByAliasState;
  byResource: ByResourceState;
}
