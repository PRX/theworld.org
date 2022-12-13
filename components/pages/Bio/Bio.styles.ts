/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import {
  createTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

export const bioTheme = (theme: Theme) => createTheme(theme, {});

export const bioStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: theme.typography.body1
  })
);
