/**
 * @file layout.ts
 * Layout styles as JSS object.
 */

import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
  main: {
    display: 'grid',
    gridGap: `${theme.spacing(2)}px`,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `auto 300px`
    },
  },
  content: {},
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    '& > .stretch': {
      flexGrow: 1,
      justifyContent: 'center'
    }
  }
});