/**
 * @file StoryCard.default.ts
 * Component for story card links.
 */

import React from 'react';
import { parse } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
import { ILink } from '@interfaces/link';
import { storyCardStyles, storyCardTheme } from './StoryCard.styles';

export type StoryCardSize = 'large' | 'small';

export interface StoryCardProps {
  data: IPriApiResource;
  size?: StoryCardSize;
  horizontal?: boolean;
  crossLinks?: boolean;
}

export const StoryCard = ({
  data,
  size = 'small',
  horizontal,
  crossLinks: showCrosslinks
}: StoryCardProps) => {
  const { teaser, title, image, primaryCategory, crossLinks } = data;
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

  const renderLink = ({ title: linkTitle, url }: ILink) => {
    const oUrl = parse(url, true, true);
    const LinkComponent = oUrl.host ? MuiLink : ContentLink;
    const other = oUrl.host
      ? {
          href: url
        }
      : {
          data: {
            metatags: { canonical: `/${url}` }
          }
        };

    console.log(oUrl);

    return (
      <ListItem button component={LinkComponent} key={url} {...other}>
        <ListItemText>{linkTitle}</ListItemText>
      </ListItem>
    );
  };

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
            {/* <ContentLink data={data} className={classes.link} /> */}
          </CardContent>
        </CardActionArea>
        {showCrosslinks && !!crossLinks.length && (
          <CardActions>
            <List>{crossLinks.map((link: ILink) => renderLink(link))}</List>
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
