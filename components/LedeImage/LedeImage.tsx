/**
 * @file LedeImage.ts
 * Component for lede image.
 */

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@material-ui/core';
import { HtmlContent } from '@components/HtmlContent';
import { ledeImageStyles } from './LedeImage.styles';

export interface ILedeImageProps {
  data: any;
}

export const LedeImage = ({ data }: ILedeImageProps) => {
  const { caption, credit, url, metadata } = data;
  const { width, height } = metadata || {};
  const classes = ledeImageStyles({});
  const hasCaption = caption && !!caption.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;

  return (
    <figure className={classes.root}>
      <Image src={url} width={width} height={height} layout="responsive" />
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
