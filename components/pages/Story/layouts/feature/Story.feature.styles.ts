/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from './styles/Story.body';

export const storyTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            [theme.breakpoints.up('md')]: {
              maxWidth: '960px'
            }
          }
        }
      }
    }
  });

export const storyStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme),
  MuiContainerMaxWidthLg: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '960px'
    }
  }
}));
