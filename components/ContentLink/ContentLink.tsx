/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import { parse } from 'url';
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { contentLinkStyles } from './ContentLink.styles';

export interface ContentLinkProps extends LinkProps {
  data: IPriApiResource
}

export const ContentLink: FunctionComponent<ContentLinkProps> = ({ children, data, ...other }: ContentLinkProps) => {
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
        <MuiLink component="a" href={alias} underline="none" classes={classes} {...other}>{children || title}</MuiLink>
      </Link>
  );
};
