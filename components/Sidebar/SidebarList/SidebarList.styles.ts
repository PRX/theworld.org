/**
 * @file SidebarList.style.ts
 * Styles and theme for SidebarList.
 */

import {
  createMuiTheme,
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const sidebarListTheme = (theme: Theme) =>
  createMuiTheme(theme, {
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
            backgroundColor: fade(
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
          padding: theme.typography.pxToRem(theme.spacing(0.25)),
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: fade(
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
        paddingBlockEnd: theme.typography.pxToRem(theme.spacing(2))
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
