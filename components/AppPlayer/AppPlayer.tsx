/**
 * Component for app audio player UI.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import {
  ForwardButton,
  NextButton,
  PlayButton,
  PlayerProgress,
  PreviousButton,
  ReplayButton,
  TimeInfo,
  TrackInfo
} from '@components/Player/components';
import { AppBar, Box, NoSsr, Toolbar } from '@material-ui/core';
import { AutoplayButton } from '@components/Player/components/AutoPlayButton';
import { PlayerContext } from '@components/Player/contexts';
import { appPlayerStyles } from './AppPlayer.styles';

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
        <Box className={classes.progress}>
          <PlayerProgress />
        </Box>
        <Toolbar classes={toolbarClasses}>
          <Box className={classes.controls}>
            <ReplayButton
              classes={buttonClasses}
              color="inherit"
              edge="start"
            />
            <PlayButton className={classes.playButton} color="inherit" />
            <ForwardButton classes={buttonClasses} color="inherit" />
            <TimeInfo />
          </Box>

          <Box className={clsx(classes.controls, classes.info)}>
            <TrackInfo />
            {tracks?.length ? (
              <>
                <PreviousButton classes={buttonClasses} color="inherit" />
                <NextButton classes={buttonClasses} color="inherit" />
              </>
            ) : null}
          </Box>

          <Box className={classes.controls}>
            <AutoplayButton />
          </Box>
        </Toolbar>
      </AppBar>
    </NoSsr>
  );
};
