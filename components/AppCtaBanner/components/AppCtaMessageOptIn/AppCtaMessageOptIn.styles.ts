/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blue } from '@theme/colors';

export const appCtaMessageOptInTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: blue[700],
          color: theme.palette.getContrastText(blue[700])
        }
      }
    }
  });
