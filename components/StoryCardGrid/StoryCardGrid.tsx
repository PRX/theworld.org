/**
 * @file StoryCardGrid.default.ts
 * Component for story card links.
 */

import React from 'react';
import { parse } from 'url';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
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
import {
  storyCardStyles,
  storyCardTheme
} from '@components/StoryCard/StoryCard.styles';
import {
  storyCardGridStyles,
  storyCardGridTheme
} from './StoryCardGrid.styles';

export interface StoryCardGridProps {
  data: IPriApiResource[];
}

export const StoryCardGrid = ({ data }: StoryCardGridProps) => {
  const classes = storyCardGridStyles({});
  const cardClasses = storyCardStyles({});
  const cx = classNames.bind(classes);
  const cxCard = classNames.bind(cardClasses);
  const imageWidth = {
    xs: '100px',
    sm: '50vw',
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
      <ThemeProvider theme={storyCardGridTheme}>
        <Box className={cx('root')}>
          {data.map(item => {
            const { id, title, image, primaryCategory, crossLinks } = item;
            return (
              <Card square elevation={1} key={id}>
                <CardActionArea>
                  <CardMedia>
                    <Image data={image} width={imageWidth} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="overline" gutterBottom>
                      <ContentLink data={primaryCategory}>
                        {primaryCategory.title}
                      </ContentLink>
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {title}
                    </Typography>
                    <ContentLink data={item} className={cxCard('link')} />
                  </CardContent>
                </CardActionArea>
                {!!crossLinks.length && (
                  <CardActions>
                    <List>
                      {crossLinks.map((link: ILink) => renderLink(link))}
                    </List>
                  </CardActions>
                )}
              </Card>
            );
          })}
        </Box>
      </ThemeProvider>
    </ThemeProvider>
  );
};
