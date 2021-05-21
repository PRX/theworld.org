/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { common } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const tagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      color: theme.palette.grey[700]
    },
    label: {
      display: 'inline',
      fontWeight: theme.typography.fontWeightRegular,
      '&::after': {
        content: '":\x20"'
      }
    },
    link: {
      display: 'block',
      background: common.white,
      fontWeight: theme.typography.fontWeightBold,
      padding: '1rem .5rem',
      borderRadius: '5px',
      '&:hover': {
        background: theme.palette.primary.main,
        color: common.white
      }
    },
    tag: {
      display: 'inline-block',
      textTransform: 'capitalize',
      margin: '.25rem'
    }
  })
);
