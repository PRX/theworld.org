/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyLayoutStyles } from './styles/Story.layout';
import { storyBodyStyles } from './styles/Story.body';

export const storyTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(46),
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(36)
        }
      }
    }
  });

export const useStoryStyles = makeStyles()((theme) => ({
  ...storyLayoutStyles(theme),
  ...storyBodyStyles(theme)
}));
