/**
 * @file PlayButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps, Tooltip } from '@mui/material';
import { Replay5Sharp } from '@mui/icons-material';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@mui/material/IconButton';
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
    <Tooltip title="Replay Last 5 Seconds" placement="top" arrow>
      <IconButton
        {...other}
        className={rootClassNames}
        onClick={handleClick}
        disableRipple
      >
        <Replay5Sharp classes={iconClasses} />
      </IconButton>
    </Tooltip>
  );
};
