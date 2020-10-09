/**
 * @file StoryCard.default.ts
 * Component for story card links.
 */

import React from 'react';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
import { storyCardStyles, storyCardTheme } from './StoryCard.styles';
import { handleButtonClick } from '@lib/routing';
import { generateLinkHrefForContent } from '@lib/routing';

export type StoryCardSize = 'large' | 'small';

export interface StoryCardProps {
  data: IPriApiResource;
  size?: StoryCardSize;
}

export const StoryCard = ({ data, size = 'small' }: StoryCardProps) => {
  const { teaser, title, image, primaryCategory } = data;
  const classes = storyCardStyles({});
  const imageWidth = {
    large: {
      xs: '100vw',
      md: '568px',
      xl: '808px'
    },
    small: {
      xs: '50vw',
      md: '568px',
      xl: '808px'
    }
  }[size];

  return (
    <ThemeProvider theme={storyCardTheme}>
      <Card square elevation={1}>
        <CardActionArea>
          <CardMedia>
            <Image data={image} width={imageWidth} />
          </CardMedia>
          <CardContent>
            <Typography variant="overline" gutterBottom>
              <ContentLink data={primaryCategory} className={classes.overline}>
                {primaryCategory.title}
              </ContentLink>
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {teaser}
            </Typography>
          </CardContent>
          <ContentLink data={data} className={classes.link} />
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};
