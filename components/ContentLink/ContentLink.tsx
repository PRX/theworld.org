/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { forwardRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UrlWithParsedQuery } from 'url';
import { Link as MuiLink, LinkProps } from '@mui/material';
import { IPriApiResource } from 'pri-api-library/types';
import {
  generateLinkHrefForContent,
  generateLinkPropsForContent
} from '@lib/routing';
import { contentLinkStyles } from './ContentLink.styles';

export interface IContentLinkProps extends LinkProps {
  data: IPriApiResource;
  query?: { [k: string]: string };
}

export type ContentLinkRef = HTMLAnchorElement;

export const ContentLink = forwardRef<ContentLinkRef, IContentLinkProps>(
  ({ children, data, query, className, ...other }: IContentLinkProps, ref) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { pathname } =
      (generateLinkHrefForContent(data, true) as UrlWithParsedQuery) || {};
    const { title, audioTitle } = data || ({} as IPriApiResource);
    const props = generateLinkPropsForContent(data, query);
    const { href, as: alias } = props || {};
    const { classes, cx } = contentLinkStyles();

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
    }, [pathname, router.events]);

    return href ? (
      <Link href={href} as={alias} passHref legacyBehavior>
        <MuiLink
          ref={ref}
          component="a"
          underline="none"
          className={cx(className, classes.root, {
            [classes.isLoading]: isLoading
          })}
          {...other}
        >
          {children || audioTitle || title}
        </MuiLink>
      </Link>
    ) : (
      children || audioTitle || title
    );
  }
);
