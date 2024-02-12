/**
 * @file SocialShareMenu.tsx
 * Component for social share menu.
 */

import type { HTMLAttributes } from 'react';
import type { IIconsMap } from '@interfaces/icons';
import type { RootState } from '@interfaces/state';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
  faFlipboard,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import CloseRounded from '@mui/icons-material/CloseRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { getUiPlayerPlaylistOpen, getUiSocialShareMenu } from '@store/reducers';
import { useSocialShareMenuStyles } from './SocialShareMenu.styles';

const defaultIconsMap = new Map();
[
  ['facebook', <FontAwesomeIcon size="sm" icon={faFacebook} />],
  ['twitter', <FontAwesomeIcon size="sm" icon={faXTwitter} />],
  ['linkedin', <FontAwesomeIcon size="sm" icon={faLinkedin} />],
  ['flipboard', <FontAwesomeIcon size="sm" icon={faFlipboard} />],
  ['whatsapp', <FontAwesomeIcon size="sm" icon={faWhatsapp} />],
  ['email', <EmailRounded />]
].forEach(([key, icon]) => {
  defaultIconsMap.set(key, icon);
});

const getIconsMap = (icons?: IIconsMap) => {
  const iconsMap = new Map();

  defaultIconsMap.forEach((value, key) => iconsMap.set(key, value));

  if (icons) {
    Object.entries(icons).forEach(([key, icon]) => iconsMap.set(key, icon));
  }

  return iconsMap;
};

export interface ISocialShareMenuProps extends HTMLAttributes<{}> {}

export const SocialShareMenu = ({ className }: ISocialShareMenuProps) => {
  const store = useStore<RootState>();
  const state = store.getState();
  const { shown, links, icons } = getUiSocialShareMenu(state) || {};
  const playlistOpen = getUiPlayerPlaylistOpen(state);
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const iconsMap = getIconsMap(icons);
  const { classes: styles, cx } = useSocialShareMenuStyles();
  const rootClassNames = cx('root', className);
  const speedDialClasses = {
    actionsClosed: styles.actionsClosed
  };
  const speedDialActionClasses = {
    fab: styles.fab,
    staticTooltipLabel: styles.staticTooltipLabel
  };
  const backdropClasses = {
    root: styles.backdropRoot
  };

  const handleTouchStart = () => {
    setIsTouch(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (url: string) => () => {
    window.open(url, '_ blank');
  };

  return links ? (
    <NoSsr>
      <Box className={rootClassNames}>
        <SpeedDial
          ariaLabel="Show Share Links"
          classes={speedDialClasses}
          hidden={!shown || playlistOpen}
          icon={
            <SpeedDialIcon
              icon={<ShareRoundedIcon />}
              openIcon={<CloseRounded />}
            />
          }
          onClose={handleClose}
          onOpen={handleOpen}
          onTouchStart={handleTouchStart}
          open={open}
        >
          {links.map(({ key, link: { title, url } }, index) => (
            <SpeedDialAction
              key={key}
              classes={speedDialActionClasses}
              icon={<SvgIcon color="primary">{iconsMap.get(key)}</SvgIcon>}
              tooltipTitle={title}
              delay={index * 50}
              onClick={handleActionClick(url)}
              tooltipOpen={isTouch}
            />
          ))}
        </SpeedDial>
        {isTouch && <Backdrop classes={backdropClasses} open={open} />}
      </Box>
    </NoSsr>
  ) : null;
};
