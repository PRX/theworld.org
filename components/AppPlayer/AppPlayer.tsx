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
  TrackInfo,
  VolumeControls
} from '@components/Player/components';
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  Menu,
  MenuItem,
  Modal,
  NoSsr,
  Toolbar
} from '@mui/material';
import {
  CodeSharp,
  DeleteForeverSharp,
  DeleteSharp,
  GetAppSharp,
  MoreVertSharp
} from '@mui/icons-material';
import { AutoplayButton } from '@components/Player/components/AutoPlayButton';
import { PlayerContext } from '@components/Player/contexts';
import { appPlayerStyles } from './AppPlayer.styles';

export const AppPlayer = () => {
  const {
    state: playerState,
    removeTrack,
    clearPlaylist
  } = useContext(PlayerContext);
  const [menuButtonElm, setMenuButtonEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const { tracks = [], currentTrackIndex = 0 } = playerState || {};
  const currentTrack = tracks[currentTrackIndex];
  const { classes: styles } = appPlayerStyles();
  const toolbarClasses = {
    root: styles.toolbarRoot
  };
  const buttonClasses = {
    root: styles.iconButtonRoot
  };
  const menuItemClasses = {
    root: styles.MuiMenuItemRoot
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

  const handleClearPlaylistClick = () => {
    handleMenuClose();
    clearPlaylist();
  };

  return (
    <NoSsr>
      <AppBar
        className={styles.root}
        component="div"
        position="static"
        {...(!tracks.length && {
          inert: 'inert'
        })}
      >
        <Box className={styles.progress}>
          <PlayerProgress />
        </Box>
        <Toolbar classes={toolbarClasses}>
          <Box className={styles.controls}>
            <ReplayButton
              classes={buttonClasses}
              color="inherit"
              edge="start"
            />
            <PlayButton className={styles.playButton} color="inherit" />
            <ForwardButton classes={buttonClasses} color="inherit" />
            <TimeInfo className={styles.timeInfo} />
          </Box>

          <Box className={styles.controls}>
            <Box className={styles.info}>
              <TrackInfo className={styles.trackInfo} />
              <AnimatePresence>
                {tracks?.length > 1 ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className={clsx(styles.controls, styles.queueControls)}
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
          </Box>

          <Box className={styles.controls}>
            <VolumeControls
              className={styles.volume}
              muteButtonProps={{
                classes: buttonClasses,
                color: 'inherit'
              }}
            />
            <AutoplayButton className={styles.autoplayButton} />
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
        MenuListProps={
          { component: 'nav', className: styles.menu } as ListProps
        }
      >
        <MenuItem
          component="button"
          classes={menuItemClasses}
          onClick={handleClearPlaylistClick}
        >
          <ListItemIcon>
            <DeleteForeverSharp />
          </ListItemIcon>
          <ListItemText>Clear Playlist</ListItemText>
        </MenuItem>
        <MenuItem
          component="button"
          classes={menuItemClasses}
          onClick={handleRemoveTrackClick}
        >
          <ListItemIcon>
            <DeleteSharp />
          </ListItemIcon>
          <ListItemText>Remove From Playlist</ListItemText>
        </MenuItem>
        <MenuItem
          component="button"
          classes={menuItemClasses}
          onClick={handleShowEmbedModalClick}
        >
          <ListItemIcon>
            <CodeSharp />
          </ListItemIcon>
          <ListItemText>Embed Audio</ListItemText>
        </MenuItem>
        <MenuItem
          component="a"
          classes={menuItemClasses}
          href={currentTrack?.url}
          download
        >
          <ListItemIcon>
            <GetAppSharp />
          </ListItemIcon>
          <ListItemText>Download Audio</ListItemText>
        </MenuItem>
      </Menu>
      <Modal open={!!showEmbedModal} onClose={handleEmbedModalClose}>
        <EmbedModalContent onClose={handleEmbedModalClose} />
      </Modal>
    </NoSsr>
  );
};
