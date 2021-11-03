/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import Image from 'next/image';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  Hidden
} from '@material-ui/core';
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
          <Box className={cx('imageWrapper')}>
            <Hidden mdUp>
              <Image
                className={cx('image')}
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                priority
              />
            </Hidden>
            <Hidden smDown>
              <Image
                className={cx('image')}
                src={image.url}
                alt={image.alt}
                layout="responsive"
                width={image.metadata.width}
                height={image.metadata.height}
                objectFit="cover"
                priority
              />
            </Hidden>
          </Box>
        )}
        <Box className={cx('content')}>
          <Container fixed className={cx('header')}>
            {logo && (
              <Image
                src={logo.url}
                alt={logo.alt}
                layout="fixed"
                width={220}
                height={220}
                objectFit="cover"
                className={cx('logo')}
              />
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
