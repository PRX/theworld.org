/**
 * @file SidebarList.style.ts
 * Styles and theme for SidebarList.
 */

import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { headingProps } from '@theme/App.theme';

export const styleOptions = {
  avatar: {
    size: 75
  }
};

export const sidebarListStyles = makeStyles()((theme) => ({
  root: {
    '& :is(.MuiLink-root)': {
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    '& :is(.MuiList-root)': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1)
    },
    '& :where(.MuiListItemButton-root)': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      paddingBlock: theme.spacing(0.75),
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        )
      }
    },
    '& :is(.MuiListItemButton-secondaryAction)': {
      '&:hover': {
        background: 'none'
      }
    },
    '& :is(.MuiListItemSecondaryAction-root)': {
      position: 'static',
      transform: 'none'
    },
    '& :where(.MuiListItemText-root)': {
      display: 'list-item',
      listStyle: 'disc',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: theme.spacing(2),
      color: theme.palette.grey[500],
      '&.noBullet': {
        display: 'unset',
        listStyle: 'unset',
        marginLeft: 0
      }
    },
    '& :is(.MuiListItemText-primary)': {
      display: 'grid',
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      lineHeight: 1,
      textWrap: 'balance'
    },

    '& :is(.MuiAvatar-root)': {
      width: `${styleOptions.avatar.size}px`,
      height: `${styleOptions.avatar.size}px`,
      marginRight: theme.spacing(2),
      boxShadow: theme.shadows[3]
    },

    '&:last-child': {
      paddingBlockEnd: theme.typography.pxToRem(16)
    }
  },

  noAvatarImage: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },

  MuiListSubheaderRoot: {
    ...headingProps
  }
}));
