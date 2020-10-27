/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Container,
  Grid,
  Hidden,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { Image } from '@components/Image';
import {
  landingPageHeaderStyles,
  landingPageHeaderTheme
} from './LandingPageHeader.styles';

interface ILandingPageHeaderProps {
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
      <Grid container>
        <Grid
          item
          xs={12}
          sm={image ? 12 : 9}
          className={cx('header', { withImage: !!image })}
        >
          {image && (
            <Image
              className={cx('image')}
              wrapperClassName={cx('imageWrapper')}
              data={image}
              width={{ xl: '100vw' }}
            />
          )}
          <div className={cx('content')}>
            <h1 className={cx('title')}>{title}</h1>
            <p className={cx('summary')}>{subhead}</p>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
