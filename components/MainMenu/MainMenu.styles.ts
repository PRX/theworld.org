/**
* @file MainMenu.style.ts
* Styles for MainMenu.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@theme/colors';

const mainMenuStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex'
  },
  topNav: {
    padding: theme.spacing(2)
  }
}));

export { mainMenuStyles };
