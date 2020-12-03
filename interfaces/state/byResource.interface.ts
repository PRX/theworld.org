/**
 * @file byResource.interface.ts
 *
 * Define interfaces for byResource.
 */

import { IContentContextData } from '@interfaces/content';

export interface ByResourceState {
  [k: string]: IContentContextData;
}
