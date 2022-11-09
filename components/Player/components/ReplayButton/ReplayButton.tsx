/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps } from '@material-ui/core';
import { Replay5Sharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { useReplayButtonStyles } from './ReplayButton.styles';

export interface IReplayButtonProps extends IconButtonProps {}

export const ReplayButton = ({ className, ...other }: IReplayButtonProps) => {
  const { replay } = useContext(PlayerContext);
  const styles = useReplayButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    replay();
  };

  return (
    <IconButton
      {...other}
      className={rootClassNames}
      onClick={handleClick}
      disableRipple
    >
      <Replay5Sharp titleAccess="Replay Last 5 Seconds" classes={iconClasses} />
    </IconButton>
  );
};
