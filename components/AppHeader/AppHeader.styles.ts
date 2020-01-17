/**
* @file ContentLink.style.ts
* Styles for ContentLink.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@theme/colors';

const appHeaderStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    boxShadow: `inset 0 -3px 0 0 ${blue[400]}`
  },
  twLogo: {
    width: 'auto',
    height: theme.typography.pxToRem(28),
    fill: theme.palette.primary.contrastText
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: 0
  }
}));

export { appHeaderStyles };
