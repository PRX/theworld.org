/**
 * @file SidebarCtaMessageDonation.style.ts
 * Styles for SidebarCtaMessageDonation.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';

export const sidebarCtaMessageDonationTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiCard: {
        root: {
          borderLeftColor: theme.palette.secondary.main
        }
      }
    }
  });
