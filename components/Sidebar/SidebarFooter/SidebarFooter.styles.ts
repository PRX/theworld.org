/**
 * @file SidebarFooter.style.ts
 * Styles for SidebarFooter.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const sidebarFooterTheme = (theme: Theme) => {
  return createMuiTheme(theme, {});
};

export const sidebarFooterStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '0.5rem 1rem 1rem'
    }
  })
);
