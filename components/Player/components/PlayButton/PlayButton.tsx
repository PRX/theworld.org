/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps, Tooltip } from '@material-ui/core';
import { PauseSharp, PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { usePlayButtonStyles } from './PlayButton.styles';

export interface IPlayButtonProps extends IconButtonProps {}

export const PlayButton = ({ className, ...other }: IPlayButtonProps) => {
  const { state, togglePlayPause } = useContext(PlayerContext);
  const { playing } = state;
  const tooltipTitle = playing ? 'Pause' : 'Play';
  const styles = usePlayButtonStyles({
    playing
  });
  const rootClassNames = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    togglePlayPause();
  };

  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      <IconButton
        {...other}
        className={rootClassNames}
        onClick={handleClick}
        disableRipple
      >
        {!playing && <PlayArrowSharp classes={iconClasses} />}
        {playing && <PauseSharp classes={iconClasses} />}
      </IconButton>
    </Tooltip>
  );
};
