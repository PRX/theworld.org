/**
 * @file DrawerSocialNav.tsx
 * Component for app drawer social nav.
 */

import { useContext } from 'react';
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
import { AppContext } from '@contexts/AppContext';
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
  const {
    data
  } = useContext(AppContext);
  const {
    menus
  } = data || {};
  const {
    drawerSocialNav
  } = menus || {};
  const { classes } = drawerTopNavStyles();

  return (
    (drawerSocialNav && (
      <Toolbar className={classes.root}>
        {drawerSocialNav
          .map(({ url, ...other }) => ({ ...other, url: parse(url) }))
          .map(({ service, ...other }) => {
            if (!service) return other;

            const servicesOptions = new Map([
              [
                'facebook',
                {
                  icon: 'facebook'
                }
              ],
              ['instagram', { icon: 'instagram' }],
              ['twitter', { icon: 'twitter' }]
            ]);
            const options = servicesOptions.get(service);

            return {
              ...options,
              ...other,
              service,
            };
          })
          .map(({ name, url, icon, key, title, attributes }) => (
            <IconButton
              color="inherit"
              href={isLocalUrl(url.href) && url.path ? url.path : url.href}
              target="_blank"
              rel="noopener noreferrer"
              key={key}
              disableRipple
              {...attributes}
            >
              {icon ? renderIcon(icon, title || name) : title || name}
            </IconButton>
          ))}
      </Toolbar>
    )) ||
    null
  );
};
