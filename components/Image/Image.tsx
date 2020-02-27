/**
 * @file Image.js
 * Component file for Image.
 */

import React from 'react';
import { useTheme, Theme } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { imageStyles } from './Image.styles';

export interface IResponsiveConfig {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl: number | string;
}

export type ImageWidth = number | IResponsiveConfig;

export interface IImageComponentProps {
  data: any;
  width: ImageWidth;
  [k: string]: any;
}

export interface IImageStyle {
  src: string;
  info: {
    width: number;
    height?: number;
  };
}

/**
 * Determine if an object uses the IResponsiveConfig interface.
 *
 * @param relationship
 *    Relationship object to test.
 *
 * @returns
 *    True when interface is used, false otherwise.
 */
export const determineIfIResponsiveConfig = (
  resp: any | IResponsiveConfig
): resp is IResponsiveConfig => {
  if ((resp as IResponsiveConfig).xl) {
    return true;
  }
  return false; //
};

/**
 * Find the best image style to cover the provided width.
 *
 * @param width
 *    Width of image in pixels.
 * @param styles
 *    Collection of image style objects.
 *
 * @returns
 *    Smallest image style larger than the provided width.
 */
export const findBestStyle = (width: number, styles: IImageStyle[]) =>
  _.reduceRight(
    styles,
    (best: IImageStyle, style: IImageStyle) =>
      style.info.width >= width ? style : best,
    _.last(styles)
  );

/**
 * Generate attributes for images with a fixed width.
 *
 * @param width
 *    Width image will be displayed.
 * @param imageSrcs
 *    Collection of image style objects.
 *
 * @returns
 *    Object with attribute values.
 */
export const generateStaticAttributes = (
  width: number,
  imageSrcs: IImageStyle[]
) => {
  const srcSetStyles = [1, 1.5, 2, 2.5, 3].map(pixelDensity => ({
    style: findBestStyle((width as number) * pixelDensity, imageSrcs),
    pixelDensity
  }));
  const srcSet = srcSetStyles
    .map(({ style: { src }, pixelDensity }) => `${src} ${pixelDensity}x`)
    .toString();
  const {
    style: { src }
  } = _.last(srcSetStyles);

  return {
    srcSet,
    src,
    width
  };
};

/**
 * Generate attributes for images with a responsive widths.
 *
 * @param widths
 *    Image widths responsive config.
 * @param imageSrcs
 *    Collection of image style objects.
 *
 * @returns
 *    Object with attribute values.
 */
export const generateResponsiveAttributes = (
  widths: IResponsiveConfig,
  imageSrcs: IImageStyle[],
  theme: Theme
) => {
  const srcSet = imageSrcs
    .map(({ src, info: { width } }) => `${src} ${width}w`)
    .toString();
  const sizes = ((Object.entries(widths) as unknown) as [
    'xs' | 'sm' | 'md' | 'lg' | 'xl',
    number | string
  ][])
    .map(([breakpoint, width], index, all) => {
      const bp: string =
        index < all.length - 1
          ? `${theme.breakpoints.down(breakpoint).replace(/^@media /, '')} `
          : '';
      const units = typeof width === 'number' ? 'px' : '';

      return `${bp}${width}${units}`;
    })
    .toString();
  const { src } = _.last(imageSrcs);

  return {
    src,
    srcSet,
    sizes,
    width: null,
    height: null
  };
};

export const Image = ({
  data,
  width: propWidth,
  className,
  ...other
}: IImageComponentProps) => {
  const theme = useTheme();
  const isResponsive = determineIfIResponsiveConfig(propWidth);
  const {
    styles,
    alt,
    url,
    metadata: { width, height }
  } = data;
  const classes = imageStyles({
    width,
    height
  });
  const cx = classNames.bind(classes);
  const defaultSrc = url;
  // Filter styles to with names starting with 'w'.
  // Filter out styles without info.
  // Sort result by width descanding.
  const imageSrcs = ((Object.entries(styles) as unknown) as [
    string,
    IImageStyle
  ][])
    .filter(pair => pair[0].match(/^w\d+$/))
    .map(([key, style]) => {
      return {
        ...style,
        info: style.info || {
          width: parseInt(key.replace(/^w/, ''), 10)
        }
      };
    })
    .filter(({ info }) => !!info)
    .sort(({ info: { width: wa } }, { info: { width: wb } }) =>
      wa < wb ? -1 : 1
    ) as IImageStyle[];

  const imgAttrs = {
    className: [className, cx({ root: true, image: isResponsive })].join(' '),
    src: defaultSrc,
    ...other,
    ...(isResponsive
      ? generateResponsiveAttributes(propWidth as IResponsiveConfig, imageSrcs, theme)
      : generateStaticAttributes(propWidth as number, imageSrcs))
  };

  return (
    (!isResponsive && <img alt={alt} {...imgAttrs} />) || (
      <div className={classes.imageWrapper}>
        <img alt={alt} {...imgAttrs} />
      </div>
    )
  );
};
