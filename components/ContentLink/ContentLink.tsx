/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { forwardRef } from 'react';
import { useStore } from 'react-redux';
import Link from 'next/link';
import classNames from 'classnames/bind';
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
  ({ children, data, query, className, ...other }: ContentLinkProps, ref) => {
    const store = useStore();
    const { loading } = store.getState();
    const { type, id, title } = data || ({} as IPriApiResource);
    const props = generateLinkPropsForContent(data, query);
    const { href, as: alias } = props || {};
    const isLoading =
      (loading?.type === type && loading?.id === id) ||
      loading.alias === alias?.pathname;
    const classes = contentLinkStyles({});
    const cx = classNames.bind(classes);

    return href ? (
      <Link href={href} as={alias} passHref>
        <MuiLink
          ref={ref}
          component="a"
          underline="none"
          className={cx(className, classes.root, {
            [classes.isLoading]: isLoading
          })}
          {...other}
        >
          {children || title}
        </MuiLink>
      </Link>
    ) : (
      <>{children}</>
    );
  }
);
