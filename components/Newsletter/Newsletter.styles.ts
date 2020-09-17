/**
 * @file Newsletter.style.ts
 * Styles for Newsletter.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

export const newsletterTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {}
  });

export const newsletterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    body: {
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      marginTop: `${theme.spacing(4)}px`,
      paddingTop: `${theme.spacing(4)}px`,
      borderTop: `1px solid ${theme.palette.divider}`
    }
  })
);
