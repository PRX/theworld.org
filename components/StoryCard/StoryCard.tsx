/**
 * @file StoryCard.default.ts
 * Component for story card links.
 */

import React from 'react';
import { parse } from 'url';
import classNames from 'classnames/bind';
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

export interface StoryCardProps {
  data: IPriApiResource;
  feature?: boolean;
}

export const StoryCard = ({ data, feature }: StoryCardProps) => {
  const { teaser, title, image, primaryCategory, crossLinks } = data;
  const classes = storyCardStyles({});
  const cx = classNames.bind(classes);
  const imageWidth = {
    xs: '100vw',
    md: '568px',
    xl: '808px'
  };

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
      <Card square elevation={1} className={cx({ feature })}>
        <CardActionArea classes={{ root: classes.MuiCardActionAreaRoot }}>
          <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
            <Image
              data={image}
              width={imageWidth}
              wrapperClassName={classes.imageWrapper}
            />
          </CardMedia>
          <CardContent classes={{ root: classes.MuiCardContentRoot }}>
            {primaryCategory && (
              <Typography variant="overline" gutterBottom>
                <ContentLink data={primaryCategory}>
                  {primaryCategory.title}
                </ContentLink>
              </Typography>
            )}
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="textSecondary"
              className={classes.teaser}
            >
              {teaser}
            </Typography>
            <ContentLink data={data} className={cx('link')} />
          </CardContent>
        </CardActionArea>
        {feature && !!crossLinks.length && (
          <CardActions>
            <List>{crossLinks.map((link: ILink) => renderLink(link))}</List>
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
