/**
 * @file VideoHeader.style.tsx
 * Styles for VideoHeader layout.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const videoHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1.2rem'
    },
    date: {
      fontStyle: 'italic'
    },
    info: {
      display: 'grid',
      alignContent: 'start',
      gridArea: 'INFO',
      gridGap: theme.typography.pxToRem(4)
    }
  })
);
