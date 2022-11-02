/**
 * @file TrackInfo.style.ts
 * Styles and theme for TrackInfo.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useTrackInfoStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: 'min-content auto',
      gap: theme.typography.pxToRem(theme.spacing(1)),
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      display: 'grid',
      alignContent: 'center'
    },
    title: {
      fontSize: '1rem',
      whiteSpace: 'nowrap',
      lineHeight: 1
    },
    info: {
      lineHeight: 1
    },
    infoItem: {
      '& + &': {
        '&::before': {
          content: "'\u2022'",
          marginInline: theme.typography.pxToRem(theme.spacing(0.5))
        }
      }
    }
  })
);
