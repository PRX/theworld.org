/**
* @file ContentLink.style.ts
* Styles for ContentLink.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const contentLinkStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: theme.palette.primary.main,
    '&:visited' : {
      color: theme.palette.primary.main
    },
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
}));

export { contentLinkStyles };
