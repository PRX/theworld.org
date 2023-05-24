/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import Image from 'next/legacy/image';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
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
  const { classes, cx } = landingPageHeaderStyles();
  const { alt } = image || ({} as any);
  return (
    <ThemeProvider theme={landingPageHeaderTheme}>
      <Box className={cx(classes.root, { [classes.withImage]: !!image })}>
        {image && (
          <Box>
            <Image
              alt={alt}
              src={image.url}
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
        )}
        <Box className={classes.content}>
          <Container fixed className={classes.header}>
            {logo && (
              <Box className={classes.logo}>
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            )}
            <Box className={classes.text}>
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
