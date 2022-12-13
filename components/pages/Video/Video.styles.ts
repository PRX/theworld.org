/**
 * @file Video.styles.tsx
 * Theme and styles for Video layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const videoTheme = (theme: Theme) =>
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

export const videoStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyBodyStyles(theme)
  })
);
