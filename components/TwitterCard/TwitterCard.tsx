/**
 * @file TwitterCard.tsx
 * Component for displaying formatted time.
 */

import { twitter } from '@config';
import { IImageStyle } from '@interfaces/content';

export interface ITwitterCardProps {
  type: string;
  title: string;
  url: string;
  description?: string;
  image?: IImageStyle;
  children?: React.ReactNode;
}

export const TwitterCard = ({
  type,
  title,
  url,
  description,
  image,
  children
}: ITwitterCardProps) => (
  <>
    <meta name="twitter:account_id" content={twitter.accountId} />
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:url" content={url} />
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image.src} />}
    {children}
  </>
);
