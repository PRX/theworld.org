/**
* @file DrawerMainNav.style.ts
* Styles for DrawerMainNav.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { orange, yellow, cyan } from '@theme/colors';
import { hexToRgb } from '@lib/parse/color';

const drawerMainNavStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  accordion: {
    '--accent-color': orange[500],
    '--accent-color-rgb': hexToRgb(orange[500]).toString(),
    '--accent-color-contrast': theme.palette.getContrastText(orange[500]),
    boxShadow: `-${theme.spacing(0.5)}px 0 0 0 var(--accent-color)`,

    '&:nth-child(2n)': {
      '--accent-color': yellow[500],
      '--accent-color-rgb': hexToRgb(yellow[500]).toString(),
      '--accent-color-contrast': theme.palette.getContrastText(yellow[500]),
    },

    '&:nth-child(3n)': {
      '--accent-color': cyan[500],
      '--accent-color-rgb': hexToRgb(cyan[500]).toString(),
      '--accent-color-contrast': theme.palette.getContrastText(cyan[500]),
    },
    '& + &': {
      marginTop: '-1px'
    }
  },
  subMenu: {
    backgroundColor: theme.palette.background.paper,
    border: 'none'
  },
  subMenuItem: {
    paddingLeft: theme.spacing(4)
  }
}));

export { drawerMainNavStyles };
