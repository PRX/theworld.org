/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import type React from 'react';
import type { LinkProps } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { generateLinkPropsForContent } from '@lib/routing';
import { contentLinkStyles } from './ContentLink.styles';

export interface IContentLinkProps extends LinkProps {
  url: string;
  query?: { [k: string]: string };
}

export type ContentLinkRef = HTMLAnchorElement;

export const ContentLink = forwardRef<ContentLinkRef, IContentLinkProps>(
  ({ children, url, query, className, ...other }: IContentLinkProps, ref) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const props = generateLinkPropsForContent(url, query);
    const { href, as: alias } = props || {};
    const pathname = alias?.pathname;
    const { classes, cx } = contentLinkStyles();

    useEffect(() => {
      const handleRouteChangeStart = (newUrl: string) => {
        setIsLoading(newUrl === pathname);
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
          {children}
        </MuiLink>
      </Link>
    ) : (
      <span>{children}</span>
    );
  }
);
