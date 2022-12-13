/**
 * @file Marquee.style.ts
 * Styles and theme for Marquee.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useMarqueeStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden'
    },
    content: {
      position: 'relative',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      paddingInlineEnd: theme.typography.pxToRem(theme.spacing(0.25))
    }
  })
);
