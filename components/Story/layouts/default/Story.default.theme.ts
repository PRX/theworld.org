/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { default as layoutStyles } from './styles/Story.layout';
import { default as bodyStyles } from './styles/Story.body';

let storyTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    typography: {
      ...theme.typography,
      h1: {
        ...theme.typography.h1,
        fontSize: theme.typography.pxToRem(46)
      }
    }
  });

const storyStyles = makeStyles((theme: Theme) => createStyles({
  ...layoutStyles(theme),
  ...bodyStyles(theme)
}));

export { storyTheme, storyStyles };