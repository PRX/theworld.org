/**
 * @file TogglePlaylistButton.tsx
 * Play button component to toggle playing state of player.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { IconButtonProps, Tooltip } from '@mui/material';
import { CloseSharp, PlaylistPlaySharp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { getUiPlayerPlaylistOpen } from '@store/reducers';
import { useTogglePlaylistButtonStyles } from './TogglePlaylistButton.styles';

export interface ITogglePlaylistButtonProps extends IconButtonProps {}

export const TogglePlaylistButton = ({
  className,
  ...other
}: ITogglePlaylistButtonProps) => {
  const store = useStore();
  const state = store.getState();
  const playlistOpen = getUiPlayerPlaylistOpen(state);
  const tooltipTitle = playlistOpen ? 'Close Playlist' : 'Open Playlist';
  const { classes: styles, cx } = useTogglePlaylistButtonStyles();
  const rootClassNames = cx(className, 'root');
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    store.dispatch<any>({
      type: 'UI_PLAYER_PLAYLIST_TOGGLE'
    });
  };

  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      <IconButton
        {...other}
        className={rootClassNames}
        onClick={handleClick}
        disableRipple
      >
        {!playlistOpen && <PlaylistPlaySharp classes={iconClasses} />}
        {playlistOpen && <CloseSharp classes={iconClasses} />}
      </IconButton>
    </Tooltip>
  );
};
