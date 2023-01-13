/**
 * @file CtaRegion.style.ts
 * Styles for CtaRegion.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { blue } from '@theme/colors';

export const ctaRegionTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {},
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            display: 'grid',
            gridFlow: 'column',
            gridGap: theme.spacing(2),
            padding: theme.spacing(2),
            background: 'transparent',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            color: 'inherit'
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: 0,
            color: blue[900]
          },
          title: {
            fontSize: '1.1rem'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 0,
            '& p': {
              margin: 0
            },
            '& p + p': {
              marginTop: '1rem'
            }
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: 0
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'inherit'
          }
        }
      },
      Mui: {
        styleOverrides: {
          root: {
            paddingLeft: theme.spacing(2)
          },
          label: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.grey[700]
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: theme.palette.action.focus
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {}
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            justifyContent: 'center',
            marginTop: theme.spacing(3),
            '& > * + *': {
              marginLeft: theme.spacing(2)
            }
          }
        }
      }
    }
  });
