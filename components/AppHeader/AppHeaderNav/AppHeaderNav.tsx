/**
 * @file AppHeaderNav.tsx
 * Component for app header nav.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { Button, NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { FavoriteSharp } from '@material-ui/icons';
import { SubscribeButton } from '@components/SubscribeButton';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { blue } from '@theme/colors';
import { appHeaderNavStyles, appHeaderNavTheme } from './AppHeaderNav.styles';

const iconComponentMap = new Map();
iconComponentMap.set('heart', FavoriteSharp);

const renderIcon = (icon: string) => {
  const IconComponent = iconComponentMap.get(icon);
  return IconComponent ? <IconComponent /> : null;
};

export const AppHeaderNav = () => {
  const store = useStore();
  const headerNav = getMenusData(store.getState(), 'headerNav');
  const classes = appHeaderNavStyles({});

  return (
    (headerNav?.length && (
      <ThemeProvider theme={appHeaderNavTheme}>
        <div className={classes.root}>
          {/* Subscribe Button */}
          <NoSsr>
            <SubscribeButton
              title="The World: Latest Edition"
              feedUrl="http://feeds.feedburner.com/pri/theworld"
              itunesLinkUrl="https://itunes.apple.com/us/podcast/pris-the-world-latest-edition/id278196007?mt=2"
              coverImageUrl="https://f.prxu.org/299/images/24f4a36e-7038-42dc-8464-2eee24774457/tw-podcast-3000.png"
              size="medium"
              variant="filled"
              color={blue[500]}
            />
          </NoSsr>

          {headerNav.map(
            ({ color, icon, name, url, key, attributes, itemLinkClass }) => (
              <Button
                component="a"
                href={url.href}
                onClick={handleButtonClick(url)}
                key={key}
                variant={
                  /\bbtn-(text|link)\b/.test(itemLinkClass)
                    ? 'text'
                    : 'contained'
                }
                color={color || 'default'}
                disableRipple
                disableElevation
                {...(icon && { startIcon: renderIcon(icon) })}
                {...attributes}
              >
                {name}
              </Button>
            )
          )}
        </div>
      </ThemeProvider>
    )) ||
    null
  );
};
