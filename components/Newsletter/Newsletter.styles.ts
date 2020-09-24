/**
 * @file Newsletter.style.ts
 * Styles for Newsletter.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const newsletterTheme = (theme: Theme) =>
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
      MuiDialogContent: {
        root: {
          padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
        }
      },
      MuiSvgIcon: {
        colorPrimary: {
          color: theme.palette.success.main
        }
      }
    }
  });
