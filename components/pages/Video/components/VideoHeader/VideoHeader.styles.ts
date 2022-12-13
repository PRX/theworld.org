/**
 * @file VideoHeader.style.tsx
 * Styles for VideoHeader layout.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

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
