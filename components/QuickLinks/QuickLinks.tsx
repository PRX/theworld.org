/**
 * @file QuickLinks.tsx
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
import { QuickLinksTheme } from './QuickLinks.styles';

const iconComponentMap = new Map();
iconComponentMap.set('heart', FavoriteSharp);

const renderIcon = (icon: string) => {
  const IconComponent = iconComponentMap.get(icon);
  return IconComponent ? <IconComponent /> : null;
};

export const QuickLinks = () => {
  const store = useStore();
  const quickLinks = getMenusData(store.getState(), 'quickLinks');

  return (
    (quickLinks?.length && (
      <ThemeProvider theme={QuickLinksTheme}>
        {quickLinks.map(
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
              <Hidden smUp>
                {icon ? (
                  <IconButton
                    component="a"
                    href={url.href}
                    onClick={handleButtonClick(url)}
                    aria-label={name}
                    color={color || 'default'}
                    size="small"
                    disableRipple
                    {...attributes}
                  >
                    {renderIcon(icon)}
                  </IconButton>
                ) : (
                  <Button
                    component="a"
                    href={url.href}
                    onClick={handleButtonClick(url)}
                    variant="text"
                    color={color || 'default'}
                    size="small"
                    disableRipple
                    disableElevation
                    {...attributes}
                    {...(icon && {
                      startIcon: renderIcon(icon)
                    })}
                  >
                    {name}
                  </Button>
                )}
              </Hidden>
            </React.Fragment>
          )
        )}
      </ThemeProvider>
    )) ||
    null
  );
};
