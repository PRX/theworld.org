/**
 * @file Tags.style.ts
 * Styles for Tags.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const tagsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: `${theme.typography.pxToRem(theme.spacing(1))} 0`,
      gap: theme.typography.pxToRem(theme.spacing(1)),
      color: theme.palette.grey[700]
    },
    label: {
      margin: 0,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightRegular,
      '&::after': {
        content: '":\x20"'
      }
    },
    link: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main
    },
    tag: {
      textTransform: 'capitalize'
    }
  })
);
