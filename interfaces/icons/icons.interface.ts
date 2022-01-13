/**
 * @file interfaces/icon/icon.interface.tsx
 * Interfaces for icons.
 */

import SvgIcon from '@material-ui/core/SvgIcon';

export interface IIconsMap {
  [k: string]: typeof SvgIcon;
}
