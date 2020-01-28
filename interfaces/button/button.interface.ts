/**
 * @file interfaces/button/button.interface.tsx
 * Interfaces for button.
 */

import { Url } from 'url';

export interface IButton {
  key: string | number,
  name: string,
  url: Url,
  itemLinkClass?: string,
  color?: string,
  icon?: string,
  title?: string,
  children?: IButton[]
}
