/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
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

export const storyStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyBodyStyles(theme)
  })
);
