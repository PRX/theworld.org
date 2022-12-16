/**
 * @file Page.styles.tsx
 * Theme and styles for Page layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const pageTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(46)
      },
      h4: {
        fontSize: theme.typography.pxToRem(20),
        marginBottom: theme.typography.pxToRem(16)
      }
    },
    overrides: {
      MuiDivider: {
        root: {
          marginBottom: theme.typography.pxToRem(24)
        }
      }
    }
  });

export const pageStyles = makeStyles()(theme => ({
  ...storyBodyStyles(theme)
}));
