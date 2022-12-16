/**
 * @file SidebarFooter.style.ts
 * Styles for SidebarFooter.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const sidebarFooterTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiPagination: {
        ul: {
          justifyContent: 'center'
        }
      }
    }
  });

export const sidebarFooterStyles = makeStyles()(() => ({
  root: {
    padding: '0.5rem 1rem 1rem'
  }
}));
