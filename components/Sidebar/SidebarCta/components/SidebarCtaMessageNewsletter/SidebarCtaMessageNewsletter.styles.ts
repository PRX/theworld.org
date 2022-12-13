/**
 * @file SidebarCtaMessageNewsletter.style.ts
 * Styles for SidebarCtaMessageNewsletter.
 */

import { createTheme, Theme } from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const sidebarCtaMessageNewsletterTheme = (theme: Theme) => {
  const tempTheme = createTheme(theme, {
    palette: {
      primary: {
        ...theme.palette.success,
        contrastText: theme.palette.common.white
      }
    }
  });

  return createTheme(tempTheme, {
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
};
