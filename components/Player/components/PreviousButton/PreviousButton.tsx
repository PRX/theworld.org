/**
 * @file PreviousButton.tsx
 * Forward button component to skip play progress forward.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps } from '@material-ui/core';
import { SkipPrevious } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { usePreviousButtonStyles } from './PreviousButton.styles';

export interface IPreviousButtonProps extends IconButtonProps {}

export const PreviousButton = ({
  className,
  ...other
}: IPreviousButtonProps) => {
  const { previousTrack, state } = useContext(PlayerContext);
  const { currentTrackIndex } = state;
  const disabled = !currentTrackIndex;
  const styles = usePreviousButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    previousTrack();
  };

  return (
    <IconButton
      {...other}
      className={rootClassNames}
      disabled={disabled}
      onClick={handleClick}
      disableRipple
    >
      <SkipPrevious titleAccess="Previous" classes={iconClasses} />
    </IconButton>
  );
};
