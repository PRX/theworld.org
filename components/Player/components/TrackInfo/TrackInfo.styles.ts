/**
 * @file TrackInfo.style.ts
 * Styles and theme for TrackInfo.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useTrackInfoStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      overflow: 'hidden'
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: 'min-content auto',
      gap: theme.typography.pxToRem(theme.spacing(1)),
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      backgroundColor: theme.palette.grey[200]
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
    },
    link: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      textIndent: '-2000vw'
    }
  })
);
