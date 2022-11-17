/**
 * @file TrackInfo.style.ts
 * Styles and theme for TrackInfo.
 */

import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useTrackInfoStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ hasLink }: any) => ({
      position: 'relative',
      overflow: 'hidden',
      padding: theme.typography.pxToRem(theme.spacing(2)),
      ...(hasLink && {
        '&:hover': {
          transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp
          }),
          backgroundColor: fade(theme.palette.primary.main, 0.1)
        }
      })
    }),
    layout: {
      display: 'grid',
      gridTemplateColumns: 'min-content auto',
      gap: theme.typography.pxToRem(theme.spacing(1.5)),
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      backgroundColor: theme.palette.grey[200],
      lineHeight: 0
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
      whiteSpace: 'nowrap',
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
