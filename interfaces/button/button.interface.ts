/**
 * @file interfaces/button/button.interface.tsx
 * Interfaces for button.
 */

import { PropTypes } from '@material-ui/core';

export interface IButton {
  key?: string | number;
  name: string;
  url?: string;
  itemLinkClass?: string;
  color?: PropTypes.Color;
  icon?: string;
  title?: string;
  children?: IButton[];
  attributes?: { [k: string]: string };
}
