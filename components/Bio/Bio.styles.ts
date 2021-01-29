/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

export const bioTheme = (theme: Theme) => createMuiTheme(theme, {});

export const bioStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: theme.typography.body1
  })
);
