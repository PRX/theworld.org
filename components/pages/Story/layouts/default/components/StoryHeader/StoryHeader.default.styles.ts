/**
 * @file StoryHeader.default.style.tsx
 * Styles for default Story layout.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const storyHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    bylinePeople: {},
    bylinePerson: {
      '&::after': {
        content: "', '"
      },
      '&:last-of-type:not(:only-child)::before': {
        content: "' and '"
      },
      '&:last-of-type::after': {
        content: "''"
      }
    },
    date: {
      fontStyle: 'italic'
    },
    info: {
      display: 'grid',
      alignContent: 'start',
      gridGap: theme.typography.pxToRem(4)
    },
    programLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    categoryLink: {
      fontWeight: theme.typography.fontWeightBold
    }
  })
);
