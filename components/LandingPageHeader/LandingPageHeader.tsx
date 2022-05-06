/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import Image from 'next/image';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@material-ui/core';
import {
  landingPageHeaderStyles,
  landingPageHeaderTheme
} from './LandingPageHeader.styles';

export interface ILandingPageHeaderProps {
  image?: IPriApiResource;
  logo?: IPriApiResource;
  title: string;
  subhead?: string;
}

export const LandingPageHeader = ({
  image,
  logo,
  title,
  subhead
}: ILandingPageHeaderProps) => {
  const classes = landingPageHeaderStyles({});
  const cx = classNames.bind(classes);
  const { alt } = image || ({} as any);
  return (
    <ThemeProvider theme={landingPageHeaderTheme}>
      <Box className={cx('root', { withImage: !!image })}>
        {image && (
          <Box className={cx('imageWrapper')}>
            <Image
              alt={alt}
              className={cx('image')}
              src={image.url}
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
        )}
        <Box className={cx('content')}>
          <Container fixed className={cx('header')}>
            {logo && (
              <Box className={cx('logo')}>
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  layout="fill"
                  objectFit="cover"
                  className={cx('logo')}
                />
              </Box>
            )}
            <Box className={cx('text')}>
              <Typography variant="h1">{title}</Typography>
              {subhead && (
                <Typography variant="subtitle1" component="p">
                  {subhead}
                </Typography>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
