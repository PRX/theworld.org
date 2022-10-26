/**
 * @file layout.ts
 * Layout styles as JSS object.
 */

import { createStyles, Theme } from '@material-ui/core/styles';

export const storyLayoutStyles = (theme: Theme) =>
  createStyles({
    main: {
      display: 'grid',
      gridGap: `${theme.spacing(2)}px`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto 300px'
      }
    },
    content: {},
    sidebar: {
      gap: theme.typography.pxToRem(theme.spacing(1))
    }
  });
