/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const tagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: `${theme.typography.pxToRem(theme.spacing(1))} 0`,
      color: theme.palette.grey[700]
    },
    label: {
      margin: '0',
      fontWeight: theme.typography.fontWeightRegular,
      '&::after': {
        content: '":\x20"'
      }
    },
    link: {
      fontWeight: theme.typography.fontWeightBold,
      gap: theme.typography.pxToRem(theme.spacing(1)),
      color: theme.palette.primary.main
    },
    tag: {
      textTransform: 'capitalize'
    }
  })
);
