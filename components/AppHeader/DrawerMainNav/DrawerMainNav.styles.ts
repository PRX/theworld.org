/**
* @file DrawerMainNav.style.ts
* Styles for DrawerMainNav.
*/

import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { orange, yellow, cyan } from '@theme/colors';
import { hexToRgb } from '@lib/parse/color';

const drawerMainNavTheme = (theme: Theme) =>
  createMuiTheme(
    {
      overrides: {
        MuiList: {
          root: {
            padding: 0
          }
        },
        MuiListItem: {
          root: {
            color: 'var(--accent-color)',
            '&.opened': {
              color: theme.palette.common.white,
              backgroundColor: 'var(--accent-color)',
              '&:hover': {
                backgroundColor: 'var(--accent-color)',
              }
            },
            '& + &': {
              borderTopWidth: 0
            }
          },
          button: {
            '&:hover': {
              backgroundColor: `rgba(var(--accent-color-rgb), 0.3)`
            }
          }
        },
        MuiListItemText: {
          root: {
            position: 'relative',
            zIndex: 1,
            color: 'var(--accent-color-contrast)'
          }
        }
      }
    },
    theme
  );

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
  },
  expandIndicator: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeOut,
      delay: 0
    }),
    transform: 'rotate(0deg)',
    position: 'relative',
    zIndex: 1,
    color: 'var(--accent-color-contrast)',
    '&.opened': {
      transform: 'rotate(180deg)',
    }
  }
}));

export { drawerMainNavTheme, drawerMainNavStyles };
