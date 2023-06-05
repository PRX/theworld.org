/**
 * @file QuickLinks.tsx
 * Component for links to content page.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { parse } from 'url';
import { Label } from '@mui/icons-material';
import { Breadcrumbs, Container, Link } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { QuickLinksStyles } from './QuickLinks.styles';

export const QuickLinks = () => {
  const store = useStore();
  const quickLinks = getMenusData(store.getState(), 'quickLinks');
  const { classes } = QuickLinksStyles();

  return (
    (quickLinks && (
      <Container>
        <Breadcrumbs
          classes={{ root: classes.MuiBreadcrumbsRoot }}
          separator=" "
          aria-label="Quick Links"
          maxItems={20}
        >
          <Label
            color="secondary"
            aria-hidden="true"
            className={classes.label}
          />
          {quickLinks
            .map(({ url, ...other }) => ({ ...other, url: parse(url) }))
            .map(({ name, url, key, attributes }) =>
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
    )) ||
    null
  );
};
