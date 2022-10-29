/**
 * @file PlayAudioButton.style.ts
 * Styles and theme for PlayAudioButton.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const playAudioButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ playing }: any) => ({
      ...(!playing && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }),
      ...(playing && {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark
        }
      })
    })
  })
);
