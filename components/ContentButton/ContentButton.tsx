/**
 * @file ContentButton.tsx
 * Component for button to link content page.
 */

import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
import { IPriApiResource } from 'pri-api-library/types';
import { generateLinkPropsForContent } from '@lib/routing';

export interface ContentButtonProps extends ButtonProps {
  data: IPriApiResource;
  query?: { [k: string]: string };
}

export type ContentButtonRef = HTMLAnchorElement;

export const ContentButton = ({
  children,
  data,
  query,
  ...other
}: ContentButtonProps) => {
  const { title } = data || ({} as IPriApiResource);
  const { href, as: alias } = generateLinkPropsForContent(data, query);

  return (
    <Link href={href} as={alias} passHref legacyBehavior>
      <Button href="" {...other}>
        {children || title}
      </Button>
    </Link>
  );
};
