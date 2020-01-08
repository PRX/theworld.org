/**
 * @file Story.default.theme.tsx
 * Theme and styles for default Story layout.
 */

import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { default as layoutStyles } from './styles/Story.layout';
import { default as bodyStyles } from './styles/Story.body';

const headingStyles = {
  fontFamily:
    '"Raleway","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

let storyTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    typography: {
      ...theme.typography,
      h1: {
        ...headingStyles,
        fontSize: theme.typography.pxToRem(46)
      },
      h2: {
        ...headingStyles
      },
      h3: {
        ...headingStyles
      },
      h4: {
        ...headingStyles
      },
      h5: {
        ...headingStyles
      },
      h6: {
        ...headingStyles
      }
    }
  });

const storyStyles = makeStyles((theme: Theme) => createStyles({
  ...layoutStyles(theme),
  ...bodyStyles(theme)
}));

export { storyTheme, storyStyles };