/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext } from 'react';
import { handleButtonClick } from '@lib/routing';
import { IButton } from '@interfaces';
// Material
import { IconButton, Toolbar } from '@material-ui/core';
import { drawerTopNavStyles } from './DrawerSocialNav.styles';
import {
  Facebook,
  Twitter,
  RssFeed,
  Instagram,
  WhatsApp
} from '@material-ui/icons';
// Contexts
import AppContext from '@contexts/AppContext';

const iconComponentMap = {
  facebook: Facebook,
  twitter: Twitter,
  rss: RssFeed,
  instagram: Instagram,
  whatsapp: WhatsApp
};

const renderIcon = (icon: string, label: string) => {
  const IconComponent = iconComponentMap[icon];

  return (IconComponent && <IconComponent aria-label={label} />) || label;
};

export default () => {
  const {
    menus: { drawerSocialNav }
  } = useContext(AppContext);
  const classes = drawerTopNavStyles({});

  return (
    (drawerSocialNav && (
      <Toolbar className={classes.root}>
        {drawerSocialNav.map(({ name, url, icon, key, title }: IButton) => (
          <IconButton
            color="inherit"
            href={url.href}
            target="_blank"
            key={key}
            disableRipple={true}
          >
            {renderIcon(icon, title || name)}
          </IconButton>
        ))}
      </Toolbar>
    )) ||
    null
  );
};
