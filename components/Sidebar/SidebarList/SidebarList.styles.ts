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
    }
  }
});

export const sidebarListStyles = makeStyles(() => (
  createStyles({
    root: {}
  })
));
