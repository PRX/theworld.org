/**
 * @file DrawerSocialNav.tsx
 * Component for app drawer social nav.
 */

import type { RootState } from '@interfaces';
import { useStore } from 'react-redux';
import { IconButton, Toolbar } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import {
  Facebook,
  Twitter,
  RssFeed,
  Instagram,
  WhatsApp
} from '@mui/icons-material';
import { getAppDataMenu } from '@store/reducers';
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
  const store = useStore<RootState>();
  const state = store.getState();
  const drawerSocialNav = getAppDataMenu(state, 'drawerSocialNav');
  const { classes } = drawerTopNavStyles();

  return (
    (drawerSocialNav && (
      <Toolbar className={classes.root}>
        {drawerSocialNav
          .map(({ url, ...other }) => ({
            ...other,
            url: new URL(url, 'https://theworld.org')
          }))
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
              service
            };
          })
          .map(({ name, url, icon, key, title, attributes }) => (
            <IconButton
              color="inherit"
              href={isLocalUrl(url.href) ? url.pathname || '/' : url.href}
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
