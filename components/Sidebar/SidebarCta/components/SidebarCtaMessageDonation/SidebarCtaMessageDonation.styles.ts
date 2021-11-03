/**
 * @file SidebarCtaMessageDonation.style.ts
 * Styles for SidebarCtaMessageDonation.
 */

import { createTheme, Theme } from '@material-ui/core/styles';

export const sidebarCtaMessageDonationTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiCard: {
        root: {
          borderLeftColor: theme.palette.secondary.main
        }
      }
    }
  });
