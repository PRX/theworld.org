/**
 * Component for app audio player UI.
 */

import React, { MouseEvent, useContext, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EmbedModalContent,
  ForwardButton,
  NextButton,
  PlayButton,
  PlayerProgress,
  PreviousButton,
  ReplayButton,
  TimeInfo,
  TogglePlaylistButton,
  TrackInfo
} from '@components/Player/components';
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  NoSsr,
  Toolbar
} from '@material-ui/core';
import { CodeSharp, DeleteSharp, MoreVertSharp } from '@material-ui/icons';
import { AutoplayButton } from '@components/Player/components/AutoPlayButton';
import { PlayerContext } from '@components/Player/contexts';
import { appPlayerStyles } from './AppPlayer.styles';

export const AppPlayer = () => {
  const { state: playerState, removeTrack } = useContext(PlayerContext);
  const [menuButtonElm, setMenuButtonEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const { tracks, currentTrackIndex } = playerState || {};
  const currentTrack = tracks?.[currentTrackIndex];
  const isOpen = !!tracks?.length;
  const classes = appPlayerStyles({ isOpen });
  const toolbarClasses = {
    root: classes.toolbarRoot
  };
  const buttonClasses = {
    root: classes.iconButtonRoot
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuButtonEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuButtonEl(null);
  };

  const handleShowEmbedModalClick = () => {
    handleMenuClose();
    setShowEmbedModal(true);
  };

  const handleEmbedModalClose = () => {
    setShowEmbedModal(false);
  };

  const handleRemoveTrackClick = () => {
    handleMenuClose();
    removeTrack(currentTrack);
  };

  return (
    <NoSsr>
      <AppBar
        className={classes.root}
        component="div"
        position="static"
        {...(!tracks?.length && {
          inert: 'inert'
        })}
      >
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
            <AnimatePresence>
              {tracks?.length > 1 ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className={classes.controls}
                >
                  <PreviousButton classes={buttonClasses} color="inherit" />
                  <NextButton classes={buttonClasses} color="inherit" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <IconButton
              classes={buttonClasses}
              aria-controls="app-player-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertSharp />
            </IconButton>
          </Box>

          <Box className={classes.controls}>
            <AutoplayButton />
            <TogglePlaylistButton
              classes={buttonClasses}
              color="inherit"
              edge="end"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="app-player-menu"
        anchorEl={menuButtonElm}
        keepMounted
        open={Boolean(menuButtonElm)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRemoveTrackClick}>
          <ListItemIcon>
            <DeleteSharp />
          </ListItemIcon>
          <ListItemText>Remove From Playlist</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShowEmbedModalClick}>
          <ListItemIcon>
            <CodeSharp />
          </ListItemIcon>
          <ListItemText>Embed Audio</ListItemText>
        </MenuItem>
      </Menu>
      <Modal open={!!showEmbedModal} onClose={handleEmbedModalClose}>
        <EmbedModalContent onClose={handleEmbedModalClose} />
      </Modal>
    </NoSsr>
  );
};
