/**
 * @file AppHeaderNav.tsx
 * Component for app header nav.
 */

import React from 'react';
import { useStore } from 'react-redux';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import { FavoriteSharp } from '@material-ui/icons';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { appHeaderNavTheme } from './AppHeaderNav.styles';

const iconComponentMap = new Map();
iconComponentMap.set('heart', FavoriteSharp);

const renderIcon = (icon: string) => {
  const IconComponent = iconComponentMap.get(icon);
  return IconComponent ? <IconComponent /> : null;
};

export const AppHeaderNav = () => {
  const store = useStore();
  const headerNav = getMenusData(store.getState(), 'headerNav');

  return (
    (headerNav?.length && (
      <ThemeProvider theme={appHeaderNavTheme}>
        {headerNav.map(
          ({ color, icon, name, url, key, attributes, itemLinkClass }) => (
            <React.Fragment key={key}>
              <Hidden xsDown>
                <Button
                  component="a"
                  href={url.href}
                  onClick={handleButtonClick(url)}
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
              </Hidden>
              {icon && (
                <Hidden smUp>
                  <IconButton
                    color={color || 'default'}
                    component="a"
                    href={url.href}
                    onClick={handleButtonClick(url)}
                    disableRipple
                    aria-label={name}
                    {...attributes}
                  >
                    {renderIcon(icon)}
                  </IconButton>
                </Hidden>
              )}
            </React.Fragment>
          )
        )}
      </ThemeProvider>
    )) ||
    null
  );
};
