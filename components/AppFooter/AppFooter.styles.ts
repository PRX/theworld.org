/**
 * @file AppFooter.style.ts
 * Styles for AppFooter.
 */

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appFooterStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.typography.pxToRem(24),
    textAlign: 'center'
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: theme.typography.pxToRem(16),
    justifyItems: 'center',

    padding: theme.typography.pxToRem(32),

    '& > p': {
      margin: 0
    }
  },

  twLogo: {
    width: '100%',
    maxWidth: theme.typography.pxToRem(250),
    height: 'auto',
    fill: theme.palette.grey.A200
  },

  link: {
    color: theme.palette.primary.main,
    '&:is(a)': {
      textDecoration: 'none',
      display: 'block',
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

  logos: {
    textAlign: 'center'
  },

  logosTitle: {
    marginTop: 0,
    marginBottom: theme.typography.pxToRem(12),
    fontStyle: 'italic',

    '&::after': {
      content: ':'
    }
  },

  logoLink: {
    display: 'block'
  },

  logo: {
    width: '100%',
    height: 'auto'
  },

  producedBy: {},

  producedByMuiOl: {
    justifyContent: 'center'
  },

  producedByMuiLi: {
    height: theme.typography.pxToRem(25)
  },

  producedByLogo: {
    width: 'auto',
    height: '100%'
  },

  fundedBy: {},

  fundedByMuiOl: {
    display: 'grid',
    gridTemplateColumns: `${theme.typography.pxToRem(150)}`,
    gridGap: theme.typography.pxToRem(8),
    justifyContent: 'center',
    [theme.breakpoints.up(370)]: {
      gridTemplateColumns: `repeat(2, ${theme.typography.pxToRem(150)})`
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `repeat(4, ${theme.typography.pxToRem(150)})`
    }
  },

  fundedByMuiLi: {
    width: '100%',
    height: 'auto'
  },

  fundedByMuiSeparator: {
    display: 'none'
  },

  footerNav: {},

  footerNavMuiOl: {
    justifyContent: 'center'
  },

  copyright: {}
}));
