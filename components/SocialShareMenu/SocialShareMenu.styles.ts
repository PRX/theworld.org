/**
 * @file SocialShareMenu.style.ts
 * Styles for SocialShareMenu.
 */

import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSocialShareMenuStyles = makeStyles({
  name: 'TwSocialShareMenu'
})(theme => ({
  root: {
    position: 'relative',
    zIndex: theme.zIndex.speedDial,
    pointerEvents: 'none'
  },

  fab: {
    pointerEvents: 'all'
  },

  actionsClosed: {
    pointerEvents: 'none'
  },

  staticTooltipLabel: {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    paddingRight: 0
  },

  backdropRoot: {
    top: 'unset',
    height: '100vh',
    backgroundImage: `linear-gradient(-45deg, ${alpha(
      theme.palette.grey[900],
      0.75
    )}, ${alpha(theme.palette.grey[900], 0.25)})`
  }
}));
