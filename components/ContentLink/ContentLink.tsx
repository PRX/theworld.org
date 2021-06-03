/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { forwardRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import {
  generateLinkHrefForContent,
  generateLinkPropsForContent
} from '@lib/routing';
import { contentLinkStyles } from './ContentLink.styles';

export interface ContentLinkProps extends LinkProps {
  data: IPriApiResource;
  query?: { [k: string]: string };
}

export type ContentLinkRef = HTMLAnchorElement;

export const ContentLink = forwardRef<ContentLinkRef, ContentLinkProps>(
  ({ children, data, query, className, ...other }: ContentLinkProps, ref) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { pathname } = generateLinkHrefForContent(data) || {};
    const { title } = data || ({} as IPriApiResource);
    const props = generateLinkPropsForContent(data, query);
    const { href, as: alias } = props || {};
    const classes = contentLinkStyles({});
    const cx = classNames.bind(classes);

    useEffect(() => {
      const handleRouteChangeStart = (url: string) => {
        setIsLoading(url === pathname);
      };
      const handleRouteChangeEnd = () => {
        setIsLoading(false);
      };

      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeEnd);
      router.events.on('routeChangeError', handleRouteChangeEnd);

      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeEnd);
        router.events.off('routeChangeError', handleRouteChangeEnd);
      };
    }, []);

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
