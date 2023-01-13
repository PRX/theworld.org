/**
 * @file StoryRelatedLinks.default.style.tsx
 * Styles for default Story layout.
 */

import { makeStyles } from 'tss-react/mui';

export const storyRelatedLinksStyles = makeStyles()((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  title: {
    fontSize: 'inherit'
  },
  MuiCardActionAreaRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'start',
    height: '100%',
    fontSize: '0.875rem',
    color: theme.palette.primary.main,
    '&:is(:hover, :focus)': {
      color: theme.palette.primary.main
    }
  },
  MuiCardMediaRoot: {
    position: 'relative',
    paddingTop: `${100 / (16 / 9)}%`
  }
}));
