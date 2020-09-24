/**
 * @file CtaMessageDonation.style.ts
 * Styles for CtaMessageDonation.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';

export const ctaMessageDonationTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiCard: {
        root: {
          borderLeftColor: theme.palette.secondary.main
        }
      }
    }
  });
