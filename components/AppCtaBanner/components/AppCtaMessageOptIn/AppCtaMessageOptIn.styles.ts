/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { blue } from '@theme/colors';

export const appCtaMessageOptInTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: blue[700],
          color: theme.palette.getContrastText(blue[700])
        }
      }
    }
  });
