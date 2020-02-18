/**
* @file AppFooter.style.ts
* Styles for AppFooter.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const appFooterStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: theme.typography.pxToRem(theme.spacing(3)),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: theme.typography.pxToRem(theme.spacing(2)),
    justifyItems: 'center',

    padding: theme.typography.pxToRem(theme.spacing(4)),

    '& p': {
      margin: 0
    }
  },
  twLogo: {
    width: '30vw',
    maxWidth: theme.typography.pxToRem(300),
    height: 'auto',
    fill: theme.palette.grey['A200']
  },
  logos: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, max-content)`,
    gridTemplateRows: `min-content ${theme.typography.pxToRem(25)}`,
    gridAutoRows: theme.typography.pxToRem(25),
    gridColumnGap: theme.typography.pxToRem(25),
    gridRowGap: theme.typography.pxToRem(theme.spacing(1.5)),
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%'
  },
  logosTitle: {
    gridColumn: '1 / -1',
    fontStyle: 'italic',

    '&::after': {
      content: ':'
    }
  },
  logo: {
    width: 'auto',
    height: '100%'
  },
  copyright: {}
}));

export { appFooterStyles };
