/**
 * @file Program.theme.tsx
 * Theme and styles for Program layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { storyLayoutStyles } from '@components/pages/Story/layouts/default/styles/Story.layout';
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
    overrides: {
      MuiDivider: {
        root: {
          marginBottom: theme.typography.pxToRem(24)
        }
      }
    }
  });

export const programStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyLayoutStyles(theme),
    ...storyBodyStyles(theme)
  })
);
