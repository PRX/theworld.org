/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const bioTheme = (theme: Theme) => createTheme(theme, {});

export const bioStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: theme.typography.body1
  })
);
