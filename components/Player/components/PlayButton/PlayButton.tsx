/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { IconButtonProps } from '@material-ui/core';
import { PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { usePlayButtonStyles } from './PlayButton.styles';

const PauseSharp = dynamic(() => import('@material-ui/icons/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

export interface IPlayButtonProps extends IconButtonProps {
  className?: string;
}

export const PlayButton = ({ className, ...other }: IPlayButtonProps) => {
  const { state, togglePlayPause } = useContext(PlayerContext);
  const { playing } = state;
  const classes = usePlayButtonStyles({
    playing
  });
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, classes.root);
  const iconClasses = {
    root: classes.iconRoot
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
