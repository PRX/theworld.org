/**
 * @file AddAudioButton.style.ts
 * Styles and theme for AddAudioButton.
 */

import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useAddAudioButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ isInTracks }: any) => ({
      borderRadius: '50%',
      padding: '0.35em',
      ...(!isInTracks && {
        backgroundColor: 'transparent',
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 0.25)
        }
      }),
      ...(isInTracks && {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.success.light
        }
      })
    }),
    circularProgressPrimary: {
      color: 'inherit'
    },
    iconButtonRoot: {},
    iconRoot: {
      fontSize: 'inherit'
    }
  })
);
