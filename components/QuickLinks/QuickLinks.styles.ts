/**
 * @file QuickLinks.style.ts
 * Styles for QuickLinks.
 */

import { makeStyles } from 'tss-react/mui';

export const QuickLinksStyles = makeStyles()(theme => ({
  root: {
    textAlign: 'center'
  },

  container: {
    display: 'flex',
    justifyContent: 'center'
  },

  label: {
    display: 'flex'
  },

  link: {
    color: theme.palette.primary.main,
    '&:is(a)': {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontWeight: 'bold',
      minHeight: '48px',
      minWidth: '48px',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '&:visited': {
      color: theme.palette.primary.main
    }
  },

  MuiBreadcrumbsRoot: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden',
    maxHeight: theme.typography.pxToRem(48),
    marginTop: theme.typography.pxToRem(8),
    marginBottom: theme.typography.pxToRem(-24)
  }
}));
