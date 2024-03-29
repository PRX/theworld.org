/**
 * @file Tags.style.ts
 * Styles for Tags.
 */

import { makeStyles } from 'tss-react/mui';

export const tagsStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: `${theme.typography.pxToRem(8)} 0`,
    gap: theme.typography.pxToRem(8),
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
    color: theme.palette.primary.main,
    textTransform: 'capitalize'
  }
}));
