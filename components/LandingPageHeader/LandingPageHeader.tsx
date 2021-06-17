/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@material-ui/core';
import { Image } from '@components/Image';
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
  return (
    <ThemeProvider theme={landingPageHeaderTheme}>
      <Box className={cx('root', { withImage: !!image })}>
        {image && (
          <Image
            className={cx('image')}
            wrapperClassName={cx('imageWrapper')}
            data={image}
            width={{ xl: '100vw' }}
          />
        )}
        <Box className={cx('content')}>
          <Container fixed className={cx('header')}>
            {logo && (
              <Image
                data={logo}
                width={220}
                height={220}
                className={cx('logo')}
              />
            )}
            <Box className={cx('text')}>
              <Typography variant="h1">{title}</Typography>
              {subhead && (
                <Typography variant="subtitle1" component="p">{subhead}</Typography>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
