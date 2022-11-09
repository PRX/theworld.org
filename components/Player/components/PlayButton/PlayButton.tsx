/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps } from '@material-ui/core';
import { PauseSharp, PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { usePlayButtonStyles } from './PlayButton.styles';

export interface IPlayButtonProps extends IconButtonProps {
  className?: string;
}

export const PlayButton = ({ className, ...other }: IPlayButtonProps) => {
  const { state, togglePlayPause } = useContext(PlayerContext);
  const { playing } = state;
  const styles = usePlayButtonStyles({
    playing
  });
  const playBtnClasses = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    togglePlayPause();
  };

  return (
    <IconButton
      {...other}
      className={playBtnClasses}
      aria-label={playing ? 'Pause' : 'Play'}
      onClick={handleClick}
      disableRipple
    >
      {!playing && <PlayArrowSharp titleAccess="Play" classes={iconClasses} />}
      {playing && <PauseSharp titleAccess="Pause" classes={iconClasses} />}
    </IconButton>
  );
};
