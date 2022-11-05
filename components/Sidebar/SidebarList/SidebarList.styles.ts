/**
 * @file SidebarList.style.ts
 * Styles and theme for SidebarList.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const sidebarListTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      body2: {
        fontSize: theme.typography.pxToRem(18)
      }
    },
    overrides: {
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: addCssColorAlpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        }
      },
      MuiAvatar: {
        root: {
          width: '75px',
          height: '75px',
          boxShadow: theme.shadows[3]
        }
      },
      MuiListItemText: {
        root: {
          display: 'list-item',
          listStyle: 'disc',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: theme.spacing(2),
          color: theme.palette.grey[500]
        },
        primary: {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1
        }
      },
      MuiListSubheader: {
        root: {
          ...theme.typography.h6
        }
      }
    }
  });

export const sidebarListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:last-child': {
        paddingBlockEnd: theme.typography.pxToRem(theme.spacing(2))
      }
    },
    noBullet: {
      display: 'unset',
      listStyle: 'unset'
    }
  })
);
