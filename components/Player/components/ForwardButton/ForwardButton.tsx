/**
 * @file ForwardButton.tsx
 * Forward button component to skip play progress forward.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { IconButtonProps } from '@material-ui/core';
import { Forward30Sharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { useForwardButtonStyles } from './ForwardButton.styles';

export interface IForwardButtonProps extends IconButtonProps {}

export const ForwardButton = ({ className, ...other }: IForwardButtonProps) => {
  const { forward } = useContext(PlayerContext);
  const styles = useForwardButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
  const iconClasses = {
    root: styles.iconRoot
  };

  const handleClick = () => {
    forward();
  };

  return (
    <IconButton
      {...other}
      className={rootClassNames}
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