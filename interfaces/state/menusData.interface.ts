/**
 * @file menus.interface.ts
 *
 * Define interfaces for menus.
 */

import { IButton } from '@interfaces/button';

export interface MenusDataState {
  [k: string]: IButton[];
}
