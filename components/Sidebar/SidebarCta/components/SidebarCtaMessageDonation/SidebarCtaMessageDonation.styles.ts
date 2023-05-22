/**
 * @file SidebarCtaMessageDonation.style.ts
 * Styles for SidebarCtaMessageDonation.
 */

import { createTheme, Theme } from '@mui/material/styles';

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
