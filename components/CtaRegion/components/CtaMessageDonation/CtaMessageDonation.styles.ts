/**
 * @file CtaMessageDonation.style.ts
 * Styles for CtaMessageDonation.
 */

import { createTheme, Theme } from '@mui/styles';

export const ctaMessageDonationTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiCard: {
        root: {
          borderLeftColor: theme.palette.secondary.main
        }
      }
    }
  });
