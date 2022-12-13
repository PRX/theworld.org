/**
 * @file TogglePlaylistButton.tsx
 * Play button component to toggle playing state of player.
 */

import React from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { IconButtonProps, Tooltip } from '@material-ui/core';
import { CloseSharp, PlaylistPlaySharp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
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
  const styles = useTogglePlaylistButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
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
