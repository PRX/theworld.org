/**
 * Component for app audio player UI.
 */

import React, { useContext } from 'react';
import {
  ForwardButton,
  PlayButton,
  ReplayButton,
  TrackInfo
} from '@components/Player/components';
import { AppBar, Box, NoSsr, Toolbar } from '@material-ui/core';
import { PlayerContext } from '@components/Player/contexts';
import { appPlayerStyles } from './AppPlayer.styles';
import clsx from 'clsx';

export const AppPlayer = () => {
  const { state } = useContext(PlayerContext);
  const { tracks } = state || {};
  const isOpen = !!tracks?.length;
  const classes = appPlayerStyles({ isOpen });
  const toolbarClasses = {
    root: classes.toolbarRoot
  };
  const buttonClasses = {
    root: classes.iconButtonRoot
  };

  return (
    <NoSsr>
      <AppBar className={classes.root} component="div" position="static">
        <Toolbar classes={toolbarClasses}>
          <Box className={classes.controls}>
            <ReplayButton
              classes={buttonClasses}
              color="inherit"
              edge="start"
            />
            <PlayButton className={classes.playButton} color="inherit" />
            <ForwardButton classes={buttonClasses} color="inherit" />
          </Box>

          <Box className={clsx(classes.controls, classes.info)}>
            <TrackInfo />
          </Box>

          <Box className={classes.controls}></Box>
        </Toolbar>
      </AppBar>
    </NoSsr>
  );
};
