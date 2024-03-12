/**
 * @file AppFooter.style.ts
 * Styles for AppFooter.
 */

import { makeStyles } from 'tss-react/mui';

export const appFooterStyles = makeStyles()((theme) => ({
  root: {
    textAlign: 'center'
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: theme.typography.pxToRem(16),
    justifyItems: 'center',

    padding: theme.typography.pxToRem(32),

    '& > p': {
      margin: 0,
      fontSize: '1.15rem',
    }
  },

  twLogo: {
    width: '300px',
    maxWidth: theme.typography.pxToRem(300),
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
      fontSize: '1.25rem',
      fontWeight: 'bold',
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
    fontSize: '1.25rem',

    '&::after': {
      content: '":"'
    }
  },

  logoLink: {
    display: 'block'
  },

  logo: {
    height: '100%'
  },

  producedBy: {},

  producedByMuiOl: {
    display: 'grid',
    gridTemplateColumns: `${theme.typography.pxToRem(300)}`,
    gridGap: theme.typography.pxToRem(12),
    justifyContent: 'center',
    [theme.breakpoints.up(370)]: {
      gridTemplateColumns: `repeat(2, ${theme.typography.pxToRem(300)})`
    }
  },
  
  producedByMuiLi: {
    width: '100%',
    height: 'auto'
  },

  producedByMuiSeparator: {
    display: 'none'
  },

  sponsoredBy: {},

  sponsoredByMuiOl: {
    display: 'grid',
    gridTemplateColumns: `${theme.typography.pxToRem(300)}`,
    gridGap: theme.typography.pxToRem(8),
    justifyContent: 'center',
  },

  sponsoredByMuiStyleLogosTitle: {
    margin: '0',
  },

  fundedBy: {},

  fundedByMuiOl: {
    display: 'grid',
    gridTemplateColumns: `${theme.typography.pxToRem(300)}`,
    gridGap: theme.typography.pxToRem(12),
    justifyContent: 'center',
    [theme.breakpoints.up(370)]: {
      gridTemplateColumns: `repeat(2, ${theme.typography.pxToRem(300)})`
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
