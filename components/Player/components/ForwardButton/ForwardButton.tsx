/**
 * @file ForwardButton.tsx
 * Forward button component to skip play progress forward.
 */

import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { IconButtonProps } from '@material-ui/core';
import { Forward30Sharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { useForwardButtonStyles } from './ForwardButton.styles';

export interface IForwardButtonProps extends IconButtonProps {
  className?: string;
}

export const ForwardButton = ({ className, ...other }: IForwardButtonProps) => {
  const { forward } = useContext(PlayerContext);
  const classes = useForwardButtonStyles({});
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, {
    playBtn: true
  });
  const iconClasses = {
    root: classes.iconRoot
  };

  const handleClick = () => {
    forward();
  };

  return (
    <IconButton
      {...other}
      className={playBtnClasses}
      onClick={handleClick}
      disableRipple
    >
      <Forward30Sharp
        titleAccess="Skip Ahead 30 Seconds"
        classes={iconClasses}
      />
    </IconButton>
  );
};
