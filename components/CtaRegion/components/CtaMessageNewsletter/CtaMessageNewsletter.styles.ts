/**
 * @file CtaMessageNewsletter.style.ts
 * Styles for CtaMessageNewsletter.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';

export const ctaMessageNewsletterTheme = (theme: Theme) => {
  const tempTheme = createTheme(theme, {
    palette: {
      primary: {
        ...theme.palette.success,
        contrastText: theme.palette.common.white
      }
    }
  });

  return createTheme(tempTheme, {
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: theme.palette.grey[700]
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: theme.palette.grey[700]
          }
        }
      },
      MuiButton: {
        styleOverrides: {
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
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            paddingBottom: '0.5rem',
            borderLeftColor: theme.palette.success.main
          }
        }
      }
    }
  });
};
