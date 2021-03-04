/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { generateLinkPropsForContent } from '@lib/routing';
import { contentLinkStyles } from './ContentLink.styles';

export interface ContentLinkProps extends LinkProps {
  data: IPriApiResource;
  query?: { [k: string]: string };
}

export type ContentLinkRef = HTMLAnchorElement;

export const ContentLink = forwardRef<ContentLinkRef, ContentLinkProps>(
  ({ children, data, query, ...other }: ContentLinkProps, ref) => {
    const { title } = data || ({} as IPriApiResource);
    const { href, as: alias } = generateLinkPropsForContent(data, query);
    const classes = contentLinkStyles({});

    return (
      <Link href={href} as={alias} passHref>
        <MuiLink
          ref={ref}
          component="a"
          underline="none"
          classes={classes}
          {...other}
        >
          {children || title}
        </MuiLink>
      </Link>
    );
  }
);
