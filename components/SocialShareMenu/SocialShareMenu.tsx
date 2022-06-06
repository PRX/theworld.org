/**
 * @file SocialShareMenu.tsx
 * Component for social share menu.
 */

import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faFlipboard,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import CloseRounded from '@material-ui/icons/CloseRounded';
import EmailRounded from '@material-ui/icons/EmailRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconsMap } from '@interfaces/icons';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { getUiSocialShareMenu } from '@store/reducers';
import { socialShareMenuStyles } from './SocialShareMenu.styles';

const defaultIconsMap = new Map();
[
  ['facebook', <FontAwesomeIcon size="sm" icon={faFacebook} key="facebook" />],
  ['twitter', <FontAwesomeIcon size="sm" icon={faTwitter} key="twitter" />],
  ['linkedin', <FontAwesomeIcon size="sm" icon={faLinkedin} key="linkedin" />],
  [
    'flipboard',
    <FontAwesomeIcon size="sm" icon={faFlipboard} key="flipboard" />
  ],
  ['whatsapp', <FontAwesomeIcon size="sm" icon={faWhatsapp} key="whatsapp" />],
  ['email', <EmailRounded key="email" />]
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

export const SocialShareMenu = () => {
  const store = useStore();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    console.log(state);
    updateForce(store.getState());
  });
  const { shown, links, icons } = getUiSocialShareMenu(state) || {};
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const classes = socialShareMenuStyles({});
  const cx = classNames.bind(classes);
  const iconsMap = getIconsMap(icons);

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

  useEffect(() => {
    return () => {
      console.log('SocialShareMenu going away...');
      unsub();
    };
  }, [unsub, shown, links, icons]);

  return (
    !!links && (
      <NoSsr>
        <Box className={cx('root')}>
          <SpeedDial
            ariaLabel="Show Share Links"
            hidden={!shown}
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
                classes={{
                  staticTooltipLabel: cx('staticTooltipLabel')
                }}
                icon={<SvgIcon color="primary">{iconsMap.get(key)}</SvgIcon>}
                tooltipTitle={title}
                delay={index * 50}
                onClick={handleActionClick(url)}
                tooltipOpen={isTouch}
              />
            ))}
          </SpeedDial>
          {isTouch && (
            <Backdrop
              classes={{
                root: cx('backdropRoot')
              }}
              open={open}
            />
          )}
        </Box>
      </NoSsr>
    )
  );
};
