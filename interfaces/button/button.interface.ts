/**
 * @file interfaces/button/button.interface.tsx
 * Interfaces for button.
 */

import { PropTypes } from '@material-ui/core';
import { Url } from 'url';

export interface IButton {
  key?: string | number;
  name: string;
  url?: Url;
  itemLinkClass?: string;
  color?: PropTypes.Color;
  icon?: string;
  title?: string;
  children?: IButton[];
  attributes?: { [k: string]: string };
}
