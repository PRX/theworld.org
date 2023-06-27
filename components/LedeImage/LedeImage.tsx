/**
 * @file LedeImage.ts
 * Component for lede image.
 */

import type { MediaItem } from '@interfaces';
import Image from 'next/legacy/image';
import { Box, Typography } from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { ledeImageStyles } from './LedeImage.styles';

export interface ILedeImageProps {
  data: MediaItem;
}

export const LedeImage = ({ data }: ILedeImageProps) => {
  const { altText, caption, sourceUrl, mediaDetails } = data;
  const { width, height } = mediaDetails || {};
  const { classes } = ledeImageStyles();
  const hasCaption = caption && !!caption.length;
  const hasFooter = hasCaption;
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '560px'],
    ['max-width: 1280px', '600px'],
    [null, '920px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  if (!sourceUrl) return null;

  return (
    <figure className={classes.root}>
      <Image
        src={sourceUrl}
        width={width || 16}
        height={height || 9}
        layout="responsive"
        sizes={sizes}
        priority
        alt={altText || ''}
      />
      {hasFooter && (
        <Typography
          variant="caption"
          component="figcaption"
          className={classes.footer}
        >
          {hasCaption && (
            <Box className={classes.caption}>
              <HtmlContent html={caption} />
            </Box>
          )}
        </Typography>
      )}
    </figure>
  );
};
