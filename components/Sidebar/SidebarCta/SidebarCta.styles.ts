/**
 * @file sidebarCta.style.ts
 * Styles for sidebarCta.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blue, grey } from '@theme/colors';

export const sidebarCtaTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {},
    overrides: {
      MuiCard: {
        root: {
          display: 'grid',
          gridGap: theme.spacing(2),
          padding: theme.spacing(2),
          background: 'transparent',
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          color: 'inherit'
        }
      },
      MuiCardHeader: {
        root: {
          padding: 0,
          color: blue[900]
        },
        title: {
          fontSize: '1.1rem'
        }
      },
      MuiCardContent: {
        root: {
          padding: 0,
          '& p': {
            margin: 0
          },
          '& p + p': {
            marginTop: '1rem'
          },
          '& a:link, & a:visited': {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textDecoration: 'none'
          },
          '& ul': {
            margin: '1em 0 0 16px',
            padding: 0
          },
          '& li': {
            padding: 0,
            margin: 0,
            color: grey[500]
          },
          '& li a:link, & li a:visited': {
            padding: '3px 0',
            width: '100%'
          },
          '& li a:hover': {
            color: theme.palette.primary.dark,
            textDecoration: 'underline'
          }
        }
      },
      MuiCardActions: {
        root: {
          padding: 0
        }
      },
      MuiCheckbox: {
        root: {
          color: 'inherit'
        }
      },
      MuiFormControlLabel: {
        root: {
          paddingLeft: theme.spacing(2),
          color: theme.palette.grey[700]
        },
        label: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          textAlign: 'left',
          color: theme.palette.grey[700]
        }
      },
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: theme.palette.action.focus
          }
        }
      },
      MuiPaper: {
        root: {}
      },
      MuiToolbar: {
        root: {
          justifyContent: 'center',
          marginTop: theme.spacing(3),
          '& > * + *': {
            marginLeft: theme.spacing(2)
          }
        }
      }
    }
  });
