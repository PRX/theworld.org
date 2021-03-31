/**
 * @file LedeImage.ts
 * Component for lede image.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Typography } from '@material-ui/core';
import { Image, IResponsiveConfig } from '@components/Image';
import { ledeImageStyles } from './LedeImage.styles';

export interface ILedeImageProps {
  data: any;
  widths: IResponsiveConfig;
}

export const LedeImage = ({ data, widths = null }: ILedeImageProps) => {
  const { caption, credit } = data;
  const classes = ledeImageStyles({});
  const hasCaption = caption && !!caption.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const mdProps = {
    escapeHtml: false
  };

  return (
    <figure className={classes.root}>
      <Image className={classes.image} data={data} width={widths} />
      {hasFooter && (
        <Typography
          variant="caption"
          component="figcaption"
          className={classes.footer}
        >
          {hasCaption && (
            <ReactMarkdown
              {...mdProps}
              className={classes.caption}
              source={caption}
            />
          )}
          {hasCredit && (
            <ReactMarkdown
              {...mdProps}
              className={classes.credit}
              source={credit}
            />
          )}
        </Typography>
      )}
    </figure>
  );
};
