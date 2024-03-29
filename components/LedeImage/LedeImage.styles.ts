/**
 * @file LedeImage.style.ts
 * Styles for LedeImage.
 */

import { makeStyles } from 'tss-react/mui';

export const ledeImageStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridGap: '0.75rem',
    margin: 0
  },

  imageWrapper: {
    position: 'relative',
    paddingTop: `${100 / (16 / 9)}%`
  },

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },

  footer: {
    display: 'grid',
    gridGap: '0.5rem',
    '& p': {
      margin: 0
    },
    '& p + p': {
      marginTop: '1rem'
    },
    '& a': {
      color: theme.palette.primary.main,
      '&:visited': {
        color: theme.palette.primary.main
      },
      '&:hover': {
        color: theme.palette.primary.dark
      }
    }
  },

  caption: {},

  credit: {
    display: 'flex',
    fontSize: '0.75rem',
    '&::before': {
      content: "'Credit:'",
      marginRight: '0.25rem'
    }
  }
}));
