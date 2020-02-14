/**
* @file AppFooter.style.ts
* Styles for AppFooter.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const appFooterStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));

export { appFooterStyles };
