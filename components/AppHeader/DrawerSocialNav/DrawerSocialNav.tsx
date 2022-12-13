/**
 * @file DrawerSocialNav.tsx
 * Component for app drawer social nav.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { parse } from 'url';
import { IconButton, Toolbar } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import {
  Facebook,
  Twitter,
  RssFeed,
  Instagram,
  WhatsApp
} from '@mui/icons-material';
import { getMenusData } from '@store/reducers';
import { drawerTopNavStyles } from './DrawerSocialNav.styles';

const iconComponentMap = new Map();
iconComponentMap.set('facebook', Facebook);
iconComponentMap.set('twitter', Twitter);
iconComponentMap.set('rss', RssFeed);
iconComponentMap.set('instagram', Instagram);
iconComponentMap.set('whatsapp', WhatsApp);

const renderIcon = (icon: string, label: string) => {
  const IconComponent = iconComponentMap.get(icon);

  return (IconComponent && <IconComponent aria-label={label} />) || label;
};

export const DrawerSocialNav = () => {
  const store = useStore();
  const drawerSocialNav = getMenusData(store.getState(), 'drawerSocialNav');
  const classes = drawerTopNavStyles({});

  return (
    (drawerSocialNav && (
      <Toolbar className={classes.root}>
        {drawerSocialNav
          .map(({ url, ...other }) => ({ ...other, url: parse(url) }))
          .map(({ name, url, icon, key, title, attributes }) => (
            <IconButton
              color="inherit"
              href={isLocalUrl(url.href) ? url.path : url.href}
              target="_blank"
              rel="noopener noreferrer"
              key={key}
              disableRipple
              {...attributes}
            >
              {renderIcon(icon, title || name)}
            </IconButton>
          ))}
      </Toolbar>
    )) ||
    null
  );
};
