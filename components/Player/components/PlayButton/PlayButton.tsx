/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { playButtonStyles } from './PlayButton.styles';

const PauseSharp = dynamic(() => import('@material-ui/icons/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

export interface IPlayButtonProps {
  className?: string;
}

export const PlayButton = ({ className }: IPlayButtonProps) => {
  const { state, togglePlayPause } = useContext(PlayerContext);
  const { playing } = state;
  const classes = playButtonStyles({
    playing
  });
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, {
    playBtn: true
  });

  const handleClick = () => {
    togglePlayPause();
  };

  return (
    <IconButton
      className={playBtnClasses}
      aria-label={playing ? 'Pause' : 'Play'}
      onClick={handleClick}
      disableRipple
    >
      {!playing && <PlayArrowSharp titleAccess="Play" />}
      {playing && <PauseSharp titleAccess="Pause" />}
    </IconButton>
  );
};
