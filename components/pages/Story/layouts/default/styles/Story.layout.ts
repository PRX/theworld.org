/**
 * @file layout.ts
 * Layout styles as JSS object.
 */

import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const storyLayoutStyles = (theme: Theme) => ({
  main: {
    display: 'grid',
    gridGap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 300px'
    }
  } as CSSObject,
  content: {} as CSSObject,
  sidebar: {
    gap: theme.typography.pxToRem(8)
  } as CSSObject
});
