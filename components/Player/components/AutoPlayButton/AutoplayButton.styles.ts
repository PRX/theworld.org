/**
 * @file AutoplayButton.style.ts
 * Styles and theme for AutoplayButton.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useAutoplayButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    switchBase: {
      borderRadius: '50%'
    },
    colorPrimary: {
      color: theme.palette.grey[300],
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
        color: theme.palette.primary.main
      }
    }
  })
);
