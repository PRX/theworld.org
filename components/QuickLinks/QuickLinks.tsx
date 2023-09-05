/**
 * @file QuickLinks.tsx
 * Component for links to content page.
 */

import type { IButton, IButtonWithUrl } from '@interfaces';
import React from 'react';
import { Label } from '@mui/icons-material';
import { Breadcrumbs, Container, Link } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { QuickLinksStyles } from './QuickLinks.styles';

type QuickLinksProps = {
  data: IButton[];
};

export const QuickLinks = ({ data }: QuickLinksProps) => {
  const { classes } = QuickLinksStyles();

  return (
    (data && (
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
          {data
            .filter((v): v is IButtonWithUrl => !!v.url)
            .map(({ url, ...other }) => ({
              ...other,
              url: new URL(url, 'https://theworld.org')
            }))
            .map(({ name, url, key, attributes }) =>
              isLocalUrl(url.href) ? (
                <Link
                  href={url.pathname || '/'}
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
