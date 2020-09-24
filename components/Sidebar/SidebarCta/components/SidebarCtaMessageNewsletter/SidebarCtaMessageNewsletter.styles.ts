/**
 * @file SidebarCtaMessageNewsletter.style.ts
 * Styles for SidebarCtaMessageNewsletter.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const sidebarCtaMessageNewsletterTheme = (theme: Theme) =>
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
      },
      MuiCard: {
        root: {
          borderLeftColor: theme.palette.success.main
        }
      }
    }
  });
