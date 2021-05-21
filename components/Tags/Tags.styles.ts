/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { common } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';

export const tagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '.5rem 0',
      color: theme.palette.grey[700]
    },
    label: {
      margin: '0',
      padding: '0',
      fontWeight: theme.typography.fontWeightRegular,
      '&::after': {
        content: '":\x20"'
      }
    },
    link: {
      fontWeight: theme.typography.fontWeightBold,
      margin: '0 2px',
      color: theme.palette.primary.main
    },
    tag: {
      textTransform: 'capitalize'
    }
  })
);
