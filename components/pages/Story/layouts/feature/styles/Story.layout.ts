/**
 * @file layout.ts
 * Layout styles as JSS object.
 */

import { createStyles, Theme } from '@mui/material/styles';

export const storyLayoutStyles = (theme: Theme) =>
  createStyles({
    main: {
      display: 'grid',
      gridGap: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto 300px'
      }
    },
    content: {},
    sidebar: {}
  });
