/**
* @file DrawerTopNav.style.ts
* Styles for DrawerTopNav.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@theme/colors';

const drawerTopNavStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2)
  }
}));

export { drawerTopNavStyles };
