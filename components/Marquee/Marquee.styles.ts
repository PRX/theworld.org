/**
 * @file Marquee.style.ts
 * Styles and theme for Marquee.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useMarqueeStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden'
    },
    content: {
      position: 'relative',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      paddingInlineEnd: theme.typography.pxToRem(2)
    }
  })
);
