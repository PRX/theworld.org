/**
 * @file Image.js
 * Component file for Image.
 */

import React from 'react';
import PropTypes, { string } from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import _ from 'lodash';
import ContentContext from '@contexts/ContentContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      objectFit: 'cover'
    }
  })
);

interface IImageStyle {
  src: string;
  info: {
    width: number;
    height: number;
  };
}

const defaultOptions = {
  containerWidth: 800
};

const findBestStyle = (width: number, styles: IImageStyle[]) =>
  _.find(styles, ({ info: { width: w } }) => w >= width);

const Image = ({ data, width, height = null, ...other }) => {
  const { styles, alt, url } = data;
  const classes = useStyles({});
  const cx = classNames.bind(classes);
  const defaultSrc = url;
  // Filter styles to with names starting with 'w'.
  // Filter out styles without info.
  // Sort result by width descanding.
  const imageSrcs = (Object.entries(styles) as unknown as [string, IImageStyle][])
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
    .sort(
      (a, b) => (console.log(a, b), 1)
    ) as IImageStyle[];
  const srcSetStyles = [1, 1.5, 2, 2.5, 3]
    .map(
      pixelDensity => ({
        style: findBestStyle(width * pixelDensity, imageSrcs),
        pixelDensity
      })
    );
  console.log(imageSrcs, srcSetStyles);
  const srcSet = srcSetStyles
    .map(
      ({ style: { src }, pixelDensity }) =>
        `${src} ${pixelDensity}x`
    )
    .toString();
  const { style: { src = defaultSrc } } = srcSetStyles.pop();
  const imgAttrs = {
    className: cx({ root: true }),
    srcSet,
    src,
    width,
    height,
    ...other
  };

  return <img alt={alt} {...imgAttrs} />;
};

export default Image;
