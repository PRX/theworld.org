/**
 * @file SidebarList.style.ts
 * Styles and theme for SidebarList.
 */

import {  createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const sidebarListTheme = (theme: Theme) => createMuiTheme(theme, {
  overrides: {
    MuiListItem: {
      root: {},
      button: {
        '&:hover': {
          backgroundColor: addCssColorAlpha(theme.palette.primary.dark, theme.palette.action.hoverOpacity)
        }
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
        lineHeight: 1,
        'a:hover &': {
          color: theme.palette.primary.dark
        }
      }
    }
  }
});

export const sidebarListStyles = makeStyles(() => (
  createStyles({
    root: {}
  })
));
