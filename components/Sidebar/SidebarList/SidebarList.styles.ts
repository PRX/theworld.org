/**
 * @file SidebarList.style.ts
 * Styles and theme for SidebarList.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sidebarListTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      body2: {
        fontSize: theme.typography.pxToRem(18)
      }
    },
    overrides: {
      MuiLink: {
        root: {
          '&:hover': {
            color: theme.palette.primary.main
          }
        }
      },
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        },
        secondaryAction: {
          paddingRight: `${theme.spacing(2)}px`,
          '&:hover': {
            background: 'none'
          }
        },
        container: {
          display: 'flex',
          alignItems: 'center',
          padding: theme.typography.pxToRem(2),
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        }
      },
      MuiAvatar: {
        root: {
          width: '75px',
          height: '75px',
          marginRight: `${theme.spacing(2)}px`,
          boxShadow: theme.shadows[3]
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
          display: 'grid',
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1
        }
      },
      MuiListItemSecondaryAction: {
        root: {
          position: 'static',
          transform: 'none',
          paddingRight: `${theme.spacing(2)}px`
        }
      },
      MuiListSubheader: {
        root: {
          ...theme.typography.h6
        }
      }
    }
  });

export const sidebarListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:last-child': {
        paddingBlockEnd: theme.typography.pxToRem(16)
      }
    },
    noBullet: {
      display: 'unset',
      listStyle: 'unset',
      marginLeft: 0
    },
    noAvatarImage: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  })
);
