/**
* @file LedeVideo.style.ts
* Styles for LedeVideo.
*/

import { createStyles, makeStyles } from '@material-ui/core/styles';

export const ledeVideoStyles = makeStyles(() => createStyles({
  root: {
    display: 'grid',
    gridGap: '0.75rem',
    margin: 0
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: `${100 / (16 / 9)}%`
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  footer: {
    display: 'grid',
    gridGap: '0.5rem',
    '& p': {
      margin: 0
    },
    '& p + p': {
      marginTop: '1rem'
    }
  },
  caption: {
  },
  credit: {
    display: 'flex',
    fontSize: '0.75rem',
    '&::before': {
      content: "'Credit:'",
      marginRight: '0.25rem'
    }
  }
}));
