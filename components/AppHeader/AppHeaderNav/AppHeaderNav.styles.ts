/**
 * @file AppHeaderNav.style.ts
 * Styles for AppHeaderNav.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const appHeaderNavTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '0.25em'
        }
      }
    }
  });

export const appHeaderNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      columnGap: theme.typography.pxToRem(theme.spacing(1))
    }
  })
);
