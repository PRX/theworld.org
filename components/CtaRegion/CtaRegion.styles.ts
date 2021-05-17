/**
 * @file CtaRegion.style.ts
 * Styles for CtaRegion.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blue } from '@theme/colors';

export const ctaRegionTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {},
    overrides: {
      MuiCard: {
        root: {
          display: 'grid',
          gridFlow: 'column',
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
          paddingLeft: theme.spacing(2)
        },
        label: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          textAlign: 'left',
          color: theme.palette.grey[600]
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
