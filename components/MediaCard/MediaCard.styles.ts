/**
 * @file MediaCard.style.tsx
 * Styles for media card.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const mediaCardStyles = makeStyles<{ isLoading: boolean }, 'feature'>()(
  (theme, { isLoading }, classes) => ({
    root: {},
    title: {
      marginTop: theme.typography.pxToRem(8),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(16),
        [`.${classes.feature} &`]: {
          fontSize: theme.typography.pxToRem(22)
        }
      }
    },
    link: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      textIndent: '-2000vw'
    },
    loadingBar: {
      transition: 'transform 400ms ease-out',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      transform: `translateY(${!isLoading ? 0 : '-100%'})`
    },
    MuiCardActionAreaRoot: {
      display: 'grid',
      gridTemplateColumns: 'min-content 1fr',
      gridGap: `${theme.spacing(2)}px`,
      alignItems: 'center',
      padding: `${theme.spacing(2)}px`
    },
    MuiCardContentRoot: {
      overflow: 'hidden',
      padding: 0
    },
    MuiCardMediaRoot: {},
    feature: {},
    short: {},
    isLoading: {},
    noImage: {}
  })
);

export const mediaCardTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h5: {
        lineHeight: 1.1
      },
      overline: {
        display: 'block',
        position: 'relative',
        zIndex: 1,
        fontFamily:
          '"Open Sans","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
        letterSpacing: 'unset',
        textTransform: 'unset'
      }
    },
    overrides: {
      MuiButtonBase: {
        root: {
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }
      },
      MuiCard: {
        root: {
          color: theme.palette.primary.main
        }
      },
      MuiCardActions: {
        root: {
          margin: 0,
          padding: 0
        }
      },
      MuiCardContent: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightBold
        }
      },
      MuiCardMedia: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }
      },
      MuiList: {
        root: {
          width: '100%'
        },
        padding: {
          paddingTop: 0,
          paddingBottom: theme.typography.pxToRem(16)
        }
      },
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        }
      },
      MuiListItemText: {
        root: {
          display: 'list-item',
          listStyle: 'disc',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: theme.spacing(2),
          color: theme.palette.grey[500]
        },
        primary: {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1
        }
      },
      MuiTypography: {
        gutterBottom: {
          marginBottom: theme.typography.pxToRem(12)
        }
      }
    }
  });
