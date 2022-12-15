/**
 * @file AppHeaderNav.style.ts
 * Styles for AppHeaderNav.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';

export const appHeaderNavTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiButton: {
        text: {
          color: theme.palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
          '&:hover, &:focus': {
            backgroundColor: alpha(theme.palette.primary.contrastText, 0.1)
          }
        }
      }
    }
  });
