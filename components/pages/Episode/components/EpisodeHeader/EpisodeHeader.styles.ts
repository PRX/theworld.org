/**
 * @file EpisodeHeader.style.tsx
 * Styles for Episode layout.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const episodeHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1.2rem'
    },
    heading: {},
    byline: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    },
    bylineItem: {},
    bylineLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    date: {
      fontStyle: 'italic'
    },
    meta: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      alignItems: 'start',
      gap: theme.typography.pxToRem(theme.spacing(2)),
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }
    },
    info: {
      display: 'grid',
      alignContent: 'start',
      gridGap: theme.typography.pxToRem(4)
    },
    programLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    categoryLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    audio: {
      justifySelf: 'center',
      display: 'flex',
      alignItems: 'center',
      gap: theme.typography.pxToRem(theme.spacing(1))
    }
  })
);
