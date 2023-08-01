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
  const { altText, caption, sourceUrl, mediaItemUrl, mediaDetails } = data;
  const { width: w, height: h } = mediaDetails || {};
  const width = w || 16;
  const height = h ? (h === width && width / (16 / 9)) || h : 9;
  const { classes } = ledeImageStyles();
  const imageSrc = sourceUrl || mediaItemUrl;
  const hasCaption = caption && !!caption.length;
  const hasFooter = hasCaption;
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '560px'],
    ['max-width: 1280px', '600px'],
    [null, '920px']
  ];
  const sizes = imageWidth
    .map(([q, iw]) => (q ? `(${q}) ${iw}` : iw))
    .join(', ');

  if (!imageSrc) return null;

  return (
    <figure className={classes.root}>
      <Image
        src={imageSrc}
        width={width}
        height={height}
        layout="responsive"
        sizes={sizes}
        priority
        alt={altText || ''}
        objectFit="cover"
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
