/**
 * @file AutoplayButton.tsx
 * Autoplay button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import { Switch, SwitchProps, Tooltip } from '@material-ui/core';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { useAutoplayButtonStyles } from './AutoplayButton.styles';

export interface IAutoplayButtonProps extends SwitchProps {}

export const AutoplayButton = ({
  className,
  classes,
  ...other
}: IAutoplayButtonProps) => {
  const { state, toggleAutoplay } = useContext(PlayerContext);
  const { autoplay } = state;
  const styles = useAutoplayButtonStyles({});
  const rootClassNames = clsx(className, styles.root);
  const rootClasses = {
    switchBase: styles.switchBase,
    colorPrimary: styles.colorPrimary,
    ...classes
  };

  const handleClick = () => {
    toggleAutoplay();
  };

  return (
    <Tooltip title="Autoplay" arrow>
      <Switch
        color="primary"
        {...other}
        className={rootClassNames}
        classes={rootClasses}
        checked={autoplay}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
