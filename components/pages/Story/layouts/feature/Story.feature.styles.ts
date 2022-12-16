/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from './styles/Story.body';

export const storyTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiContainer: {
        maxWidthLg: {
          [theme.breakpoints.up('md')]: {
            maxWidth: '960px'
          }
        }
      }
    }
  });

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const storyStyles = makeStyles()((theme: Theme) =>
  ({
    ...storyBodyStyles(theme)
  }));
