/**
 * @file AudioPlayer.style.ts
 * Styles and theme for AudioPlayer.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const usePlayButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ playing }: any) => ({
      ...(!playing && {
        color: theme.palette.grey[900],
        backgroundColor: alpha(theme.palette.grey[900], 0.1),
        '&:hover': {
          backgroundColor: alpha(theme.palette.grey[900], 0.3)
        }
      }),
      ...(playing && {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.light
        }
      })
    }),
    iconRoot: {
      fontSize: 'inherit'
    }
  })
);
