/**
* @file LedeImage.style.ts
* Styles for LedeImage.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const ledeImageStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'grid',
    gridGap: '0.75rem',
    margin: 0
  },
  image: {
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

export { ledeImageStyles };
