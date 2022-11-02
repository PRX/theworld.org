/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { IconButtonProps } from '@material-ui/core';
import { Replay5Sharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { useReplayButtonStyles } from './ReplayButton.styles';

export interface IReplayButtonProps extends IconButtonProps {
  className?: string;
}

export const ReplayButton = ({ className, ...other }: IReplayButtonProps) => {
  const { replay } = useContext(PlayerContext);
  const classes = useReplayButtonStyles({});
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, {
    playBtn: true
  });
  const iconClasses = {
    root: classes.iconRoot
  };

  const handleClick = () => {
    replay();
  };

  return (
    <IconButton
      {...other}
      className={playBtnClasses}
      onClick={handleClick}
      disableRipple
    >
      <Replay5Sharp titleAccess="Replay Last 5 Seconds" classes={iconClasses} />
    </IconButton>
  );
};
