/**
 * @file ContentButton.tsx
 * Component for button to link content page.
 */

import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
import { generateLinkPropsForContent } from '@lib/routing';

export interface ContentButtonProps extends ButtonProps {
  url: string;
  query?: { [k: string]: string };
}

export type ContentButtonRef = HTMLAnchorElement;

export const ContentButton = ({
  children,
  url,
  query,
  ...other
}: ContentButtonProps) => {
  const { href, as: alias } = generateLinkPropsForContent(url, query);

  return href && alias ? (
    <Link href={href} as={alias} passHref legacyBehavior>
      <Button href="" {...other}>
        {children}
      </Button>
    </Link>
  ) : (
    children
  );
};
