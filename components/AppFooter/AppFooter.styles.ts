/**
* @file AppFooter.style.ts
* Styles for AppFooter.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const appFooterStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: theme.typography.pxToRem(theme.spacing(3)),
    textAlign: 'center'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: theme.typography.pxToRem(theme.spacing(2)),
    justifyItems: 'center',

    padding: theme.typography.pxToRem(theme.spacing(4)),

    '& > p': {
      margin: 0
    }
  },
  twLogo: {
    width: theme.typography.pxToRem(250),
    height: 'auto',
    fill: theme.palette.grey.A200
  },
  logos: {
    textAlign: 'center'
  },
  logosTitle: {
    marginTop: 0,
    marginBottom: theme.typography.pxToRem(theme.spacing(1.5)),
    fontStyle: 'italic',

    '&::after': {
      content: ':'
    }
  },
  logoLink: {},
  logo: {
    width: '100%',
    height: 'auto'
  },
  producedBy:{},
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
    gridTemplateColumns: `repeat(4, ${theme.typography.pxToRem(150)})`,
    gridGap: theme.typography.pxToRem(theme.spacing(1)),
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `repeat(2, ${theme.typography.pxToRem(150)})`
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
