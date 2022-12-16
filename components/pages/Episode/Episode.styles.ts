/**
 * @file Episode.theme.tsx
 * Theme and styles for Episode layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyLayoutStyles } from '@components/pages/Story/layouts/default/styles/Story.layout';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const episodeTheme = (theme: Theme) =>
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

export const episodeStyles = makeStyles()(theme => ({
  ...storyLayoutStyles(theme),
  ...storyBodyStyles(theme)
}));
