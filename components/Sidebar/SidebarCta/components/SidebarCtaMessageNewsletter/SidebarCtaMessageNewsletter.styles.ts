/**
 * @file SidebarCtaMessageNewsletter.style.ts
 * Styles for SidebarCtaMessageNewsletter.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';

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
          borderColor: alpha(theme.palette.success.main, 0.3),
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
