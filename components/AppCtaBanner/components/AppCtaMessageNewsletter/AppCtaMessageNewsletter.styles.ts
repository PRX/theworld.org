/**
 * @file AppCtaMessageNewsletter.style.ts
 * Styles for AppCtaMessageNewsletter.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const appCtaMessageNewsletterTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiButton: {
        containedPrimary: {
          backgroundColor: theme.palette.success.main,
          '&:hover': {
            backgroundColor: theme.palette.success.dark
          }
        },
        outlinedPrimary: {
          color: theme.palette.success.main,
          borderColor: addCssColorAlpha(theme.palette.success.main, 0.3),
          '&:hover': {
            borderColor: theme.palette.success.main
          }
        }
      }
    }
  });
