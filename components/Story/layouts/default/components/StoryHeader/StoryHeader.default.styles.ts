/**
* @file StoryHeader.default.style.tsx
* Styles for default Story layout.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const storyHeaderStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    fontSize: '1.2rem'
  },
  byline: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  bylineItem: {},
  bylineLink: {
    fontWeight: theme.typography.fontWeightBold
  },
  date: {
    fontStyle: 'italic'
  },
  meta: {
    display: 'grid',
    gridTemplateColumns: 'max-content',
    gridTemplateAreas: "'INFO'",
    justifyContent: 'space-between'
  },
  info: {
    display: 'grid',
    alignContent: 'start',
    gridArea: 'INFO',
    gridGap: theme.typography.pxToRem(4)
  },
  programLink: {
    fontWeight: theme.typography.fontWeightBold
  },
  categoryLink: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
