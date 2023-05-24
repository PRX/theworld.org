/**
 * @file Program.theme.tsx
 * Theme and styles for Program layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const programTheme = (theme: Theme) =>
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
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            marginBottom: theme.typography.pxToRem(24)
          }
        }
      }
    }
  });

export const programStyles = makeStyles()(theme => ({
  ...storyBodyStyles(theme)
}));
