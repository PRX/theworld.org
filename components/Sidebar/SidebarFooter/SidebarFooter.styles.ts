/**
 * @file SidebarFooter.style.ts
 * Styles for SidebarFooter.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sidebarFooterTheme = (theme: Theme) => {
  return createTheme(theme, {
    overrides: {
      MuiPagination: {
        ul: {
          justifyContent: 'center'
        }
      }
    }
  });
};

export const sidebarFooterStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '0.5rem 1rem 1rem'
    }
  })
);
