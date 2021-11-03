/**
 * @file ContentButton.tsx
 * Component for button to link content page.
 */

import Link from 'next/link';
import { Button, ButtonProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { generateLinkPropsForContent } from '@lib/routing';
import { contentButtonStyles } from './ContentButton.styles';

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
  const classes = contentButtonStyles({});

  return (
    <Link href={href} as={alias} passHref>
      <Button href="" classes={classes} {...other}>
        {children || title}
      </Button>
    </Link>
  );
};
