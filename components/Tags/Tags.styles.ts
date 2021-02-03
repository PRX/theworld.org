/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const tagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '1rem',
      marginBottom: '1rem',
      color: theme.palette.text.hint
    },
    label: {
      display: 'inline',
      fontWeight: theme.typography.fontWeightRegular,
      '&::after': {
        content: '":\x20"'
      }
    },
    link: {
      fontWeight: theme.typography.fontWeightBold
    },
    tag: {
      textTransform: 'capitalize',
      '&::after': {
        content: '",\x20"'
      },
      '&:last-child': {
        '&:before': {
          content: '"and\x20"',
          textTransform: 'none'
        },
        '&::after': {
          content: 'none'
        }
      },
      '&:only-child': {
        '&::before': {
          content: 'none'
        },
        '&::after': {
          content: 'none'
        }
      }
    }
  })
);
