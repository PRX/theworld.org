/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import { parse } from 'url';
import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { contentLinkStyles } from './ContentLink.styles';

export interface ContentLinkProps extends LinkProps {
  data: IPriApiResource
}

export type ContentLinkRef = HTMLAnchorElement;

export const ContentLink = forwardRef<ContentLinkRef, ContentLinkProps>(({ children, data, ...other }: ContentLinkProps, ref) => {
  const {
    metatags: { canonical },
    title
  } = data;
  const url = parse(canonical);
  const alias = url.pathname;
  const href = {
    pathname: '/',
    query: {
      alias
    }
  };
  const classes = contentLinkStyles({});

  return (
      <Link href={href} as={alias}>
        <MuiLink ref={ref} component="a" href={alias} underline="none" classes={classes} {...other}>{children || title}</MuiLink>
      </Link>
  );
});
