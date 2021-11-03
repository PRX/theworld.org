/**
 * @file LedeImage.ts
 * Component for lede image.
 */

import Image from 'next/image';
import { Box, Typography } from '@material-ui/core';
import { HtmlContent } from '@components/HtmlContent';
import { ledeImageStyles } from './LedeImage.styles';

export interface ILedeImageProps {
  data: any;
}

export const LedeImage = ({ data }: ILedeImageProps) => {
  const { alt, caption, credit, url, metadata } = data;
  const { width, height } = metadata || {};
  const classes = ledeImageStyles({});
  const hasCaption = caption && !!caption.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '560px'],
    ['max-width: 1280px', '600px'],
    [null, '920px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <figure className={classes.root}>
      <Image
        src={url}
        width={width || 16}
        height={height || 9}
        layout="responsive"
        sizes={sizes}
        priority
        alt={alt}
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
          {hasCredit && (
            <Box className={classes.credit}>
              <HtmlContent html={credit} />
            </Box>
          )}
        </Typography>
      )}
    </figure>
  );
};
