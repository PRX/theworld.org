/**
 * @file DrawerSocialNav.tsx
 * Component for app drawer social nav.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { IButton } from '@interfaces';
import { IconButton, Toolbar } from '@material-ui/core';
import {
  Facebook,
  Twitter,
  RssFeed,
  Instagram,
  WhatsApp
} from '@material-ui/icons';
import { getMenusData } from '@store/reducers';
import { drawerTopNavStyles } from './DrawerSocialNav.styles';

export const iconComponentMap = {
  facebook: Facebook,
  twitter: Twitter,
  rss: RssFeed,
  instagram: Instagram,
  whatsapp: WhatsApp
};

export const renderIcon = (icon: string, label: string) => {
  const IconComponent = iconComponentMap[icon];

  return (IconComponent && <IconComponent aria-label={label} />) || label;
};

export const DrawerSocialNav = () => {
  const store = useStore();
  const drawerSocialNav = getMenusData(store.getState(), 'drawerSocialNav');
  const classes = drawerTopNavStyles({});

  return (
    (drawerSocialNav && (
      <Toolbar className={classes.root}>
        {drawerSocialNav.map(
          ({ name, url, icon, key, title, attributes }: IButton) => (
            <IconButton
              color="inherit"
              href={url.href}
              target="_blank"
              key={key}
              disableRipple
              {...attributes}
            >
              {renderIcon(icon, title || name)}
            </IconButton>
          )
        )}
      </Toolbar>
    )) ||
    null
  );
};
