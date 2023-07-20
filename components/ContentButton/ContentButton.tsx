/**
 * @file ContentButton.tsx
 * Component for button to link content page.
 */

import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
import { generateContentLinkHref } from '@lib/routing';

export interface ContentButtonProps extends ButtonProps {
  url: string;
  shallow?: boolean;
}

export type ContentButtonRef = HTMLAnchorElement;

export const ContentButton = ({
  children,
  url,
  shallow,
  ...other
}: ContentButtonProps) => {
  const href = generateContentLinkHref(url);

  return href ? (
    <Link href={href} shallow={shallow} passHref legacyBehavior>
      <Button href="" {...other}>
        {children}
      </Button>
    </Link>
  ) : (
    <span>{children}</span>
  );
};
