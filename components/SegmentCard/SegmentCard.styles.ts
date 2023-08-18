/**
 * @file SegmentCard.style.tsx
 * Styles for segment card.
 */

import { makeStyles } from 'tss-react/mui';

export const segmentCardStyles = makeStyles<
  { isLoading: boolean },
  'feature'
>()((theme, { isLoading }, classes) => ({
  root: {},
  title: {
    margin: 0,
    lineHeight: 1.1,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
      [`.${classes.feature} &`]: {
        fontSize: theme.typography.pxToRem(22)
      }
    }
  },
  link: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    textIndent: '-2000vw'
  },
  loadingBar: {
    transition: 'transform 400ms ease-out',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    transform: `translateY(${!isLoading ? 0 : '-100%'})`
  },
  MuiCardActionAreaRoot: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr',
    gridGap: theme.typography.pxToRem(8),
    alignItems: 'center',
    padding: theme.typography.pxToRem(12)
  },
  MuiCardContentRoot: {
    overflow: 'hidden',
    padding: 0
  },
  MuiCardMediaRoot: {
    color: theme.palette.primary.main
  },
  feature: {},
  short: {},
  isLoading: {},
  noImage: {}
}));
