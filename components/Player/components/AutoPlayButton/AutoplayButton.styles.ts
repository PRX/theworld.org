/**
 * @file AutoplayButton.style.ts
 * Styles and theme for AutoplayButton.
 */

import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useAutoplayButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    switchBase: {
      borderRadius: '50%'
    },
    colorPrimary: {
      color: theme.palette.grey[300],
      '&:hover': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
        color: theme.palette.primary.main
      }
    }
  })
);
