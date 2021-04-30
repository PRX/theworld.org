/**
 * @file SidebarLatestStories.style.tsx
 * Styles for default sidebar latest stories card.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const sidebarLatestStoriesStyles = makeStyles(() =>
  createStyles({
    root: {}
  })
);

export const sidebarLatestStoriesTheme = (theme: Theme) =>
  createMuiTheme(theme, {});
