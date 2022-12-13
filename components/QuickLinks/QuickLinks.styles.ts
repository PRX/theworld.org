/**
 * @file QuickLinks.style.ts
 * Styles for QuickLinks.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const QuickLinksTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiBreadcrumbs: {
        root: {
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          overflow: 'hidden',
          maxHeight: theme.typography.pxToRem(theme.spacing(6)),
          marginTop: theme.typography.pxToRem(theme.spacing(1)),
          marginBottom: theme.typography.pxToRem(theme.spacing(-3))
        }
      }
    }
  });

export const QuickLinksStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);
