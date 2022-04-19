/**
 * @file QuickLinks.tsx
 * Component for links to content page.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { Label } from '@material-ui/icons';
import { Breadcrumbs, Container, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { QuickLinksStyles, QuickLinksTheme } from './QuickLinks.styles';

export const QuickLinks = () => {
  const store = useStore();
  const quickLinks = getMenusData(store.getState(), 'quickLinks');
  const classes = QuickLinksStyles({});

  return (
    <ThemeProvider theme={QuickLinksTheme}>
      {quickLinks && (
        <Container>
          <Breadcrumbs separator=" " aria-label="Quick Links">
            <Label
              color="secondary"
              aria-hidden="true"
              className={classes.label}
            />
            {quickLinks.map(({ name, url, key, attributes }) =>
              isLocalUrl(url.href) ? (
                <Link
                  href={url.pathname}
                  onClick={handleButtonClick(url)}
                  key={key}
                  className={classes.link}
                  {...attributes}
                >
                  {name}
                </Link>
              ) : (
                <a
                  href={url.href}
                  className={classes.link}
                  key={key}
                  {...attributes}
                >
                  {name}
                </a>
              )
            )}
          </Breadcrumbs>
        </Container>
      )}
    </ThemeProvider>
  );
};
