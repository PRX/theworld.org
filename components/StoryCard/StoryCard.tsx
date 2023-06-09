/**
 * @file StoryCard.tsx
 * Component for story card links.
 */

import type React from 'react';
import type { UrlWithParsedQuery } from 'url';
import type {
  // ILink,
  PostStory,
  Post_Additionaldates as PostAdditionalDates,
  Post_Additionalmedia as PostAdditionalMedia
} from '@interfaces';
import type { IAudioControlsProps } from '@components/Player/components';
import type { IAudioData } from '@components/Player/types';
import { useEffect, useState } from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
// import { parse } from 'url';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography
  // CardActions,
  // Link as MuiLink,
  // List,
  // ListItemText,
  // ListItemButton
} from '@mui/material';
import { Label } from '@mui/icons-material';
import { ThemeProvider } from '@mui/styles';
import { ContentLink } from '@components/ContentLink';
import { generateLinkHrefForContent } from '@lib/routing';
import { useStoryCardStyles, storyCardTheme } from './StoryCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then((mod) => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

export interface StoryCardProps {
  data: PostStory;
  feature?: boolean;
  short?: boolean;
  priority?: boolean;
}

export const StoryCard = ({
  data,
  feature,
  short,
  priority
}: StoryCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    link,
    title,
    date,
    excerpt,
    featuredImage,
    primaryCategory,
    additionalDates,
    additionalMedia
  } = data;
  const image = featuredImage?.node;
  const { broadcastDate } = additionalDates as PostAdditionalDates;
  const { audio } = additionalMedia as PostAdditionalMedia;
  const audioProps = {
    title,
    queuedFrom: 'Card Controls',
    ...(image?.sourceUrl && { imageUrl: image.sourceUrl }),
    linkResource: data
  } as Partial<IAudioData>;
  const { pathname } = generateLinkHrefForContent(
    link || '',
    true
  ) as UrlWithParsedQuery;
  const { classes, cx } = useStoryCardStyles();
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '552px'],
    ['max-width: 1280px', '600px'],
    [null, '820px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  // const renderLink = ({ title: linkTitle, url }: ILink) => {
  //   const oUrl = parse(url, true, true);
  //   const LinkComponent = oUrl.host ? MuiLink : ContentLink;
  //   const other = oUrl.host
  //     ? {
  //         href: url
  //       }
  //     : {
  //         data: {
  //           metatags: { canonical: `/${url}` }
  //         }
  //       };

  //   return (
  //     <ListItemButton component={LinkComponent} key={url} {...other}>
  //       <ListItemText>{linkTitle}</ListItemText>
  //     </ListItemButton>
  //   );
  // };

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setIsLoading(url === pathname);
    };
    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [pathname, router.events]);

  return (
    data.link && (
      <ThemeProvider theme={storyCardTheme}>
        <Card
          square
          elevation={1}
          className={cx({
            feature: feature || !image,
            short,
            isLoading
          })}
        >
          <CardActionArea
            classes={{ root: classes.MuiCardActionAreaRoot }}
            component="div"
          >
            <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
              {image?.sourceUrl && (
                <Image
                  src={image.sourceUrl}
                  alt={image.altText || ''}
                  layout="fill"
                  objectFit="cover"
                  sizes={sizes}
                  priority={priority}
                />
              )}
              <LinearProgress
                className={classes.loadingBar}
                color="secondary"
                aria-label="Progress Bar"
              />
            </CardMedia>
            <CardContent classes={{ root: classes.MuiCardContentRoot }}>
              <Box className={classes.heading}>
                <Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                  <Grid
                    container
                    justifyContent="flex-start"
                    spacing={1}
                    // style={{ marginBottom: 0 }}
                  >
                    <Grid item xs="auto" zeroMinWidth>
                      <Typography component="span">
                        <Moment
                          format="MMMM D, YYYY"
                          tz="America/New_York"
                          unix
                        >
                          {broadcastDate || date}
                        </Moment>
                      </Typography>
                    </Grid>
                    {primaryCategory?.nodes[0] && (
                      <Grid item xs="auto" zeroMinWidth>
                        <Typography
                          variant="overline"
                          noWrap
                          className={classes.primaryCategory}
                        >
                          <Label color="secondary" />
                          {primaryCategory.nodes[0].link ? (
                            <ContentLink url={primaryCategory.nodes[0].link}>
                              {primaryCategory.nodes[0].name}
                            </ContentLink>
                          ) : (
                            <span>{primaryCategory.nodes[0].name}</span>
                          )}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
                {audio && (
                  <Box className={classes.audio}>
                    <AudioControls id={audio.id} fallbackProps={audioProps} />
                  </Box>
                )}
              </Box>
              <Typography variant="body1" component="p" color="textSecondary">
                {excerpt}
              </Typography>
            </CardContent>
            <ContentLink url={data.link} className={classes.link} />
          </CardActionArea>
          {/* {feature && !!(crossLinks && crossLinks.length) && (
          <CardActions>
            <List>{crossLinks.map((link: ILink) => renderLink(link))}</List>
          </CardActions>
        )} */}
        </Card>
      </ThemeProvider>
    )
  );
};
