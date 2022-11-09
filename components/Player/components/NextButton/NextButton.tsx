/**
 * @file NextButton.tsx
 * Forward button component to skip play progress forward.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps } from '@material-ui/core';
import { SkipNextSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { useNextButtonStyles } from './NextButton.styles';

export interface INextButtonProps extends IconButtonProps {}

export const NextButton = ({ className, ...other }: INextButtonProps) => {
  const { nextTrack, state } = useContext(PlayerContext);
  const { currentTrackIndex, tracks } = state;
  const disabled = tracks ? currentTrackIndex === tracks.length - 1 : true;
  const styles = useNextButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    nextTrack();
  };

  return (
    <IconButton
      {...other}
      className={rootClassNames}
      disabled={disabled}
      onClick={handleClick}
      disableRipple
    >
      <SkipNextSharp titleAccess="Previous" classes={iconClasses} />
    </IconButton>
  );
};
