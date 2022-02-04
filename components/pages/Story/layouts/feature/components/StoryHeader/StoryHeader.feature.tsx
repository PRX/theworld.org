/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'moment-timezone';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@material-ui/core';
import { IContentLinkProps } from '@components/ContentLink';
import { HtmlContent } from '@components/HtmlContent';
import {
  storyHeaderStyles,
  storyHeaderTheme
} from './StoryHeader.feature.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const ContentLink = dynamic(() =>
  import('@components/ContentLink').then(mod => mod.ContentLink)
) as React.FC<IContentLinkProps>;
interface Props {
  data: IPriApiResource;
}

export const StoryHeader = ({ data }: Props) => {
  const {
    bylines,
    dateBroadcast,
    datePublished,
    dateUpdated,
    image,
    primaryCategory,
    program,
    title,
    teaser
  } = data;
  const { alt, caption, credit } = image || {};
  const hasCaption = caption && !!caption.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const classes = storyHeaderStyles({});
  const cx = classNames.bind(classes);

  return (
    <ThemeProvider theme={storyHeaderTheme}>
      <Box component="header" className={cx('root', { withImage: !!image })}>
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
            {primaryCategory && (
              <Box mb={2}>
                <ContentLink
                  className={classes.categoryLink}
                  data={primaryCategory}
                />
              </Box>
            )}
            <Box mb={3}>
              <Typography variant="h1">{title}</Typography>
              {teaser && (
                <Typography className={classes.teaser}>
                  <HtmlContent html={teaser} />
                </Typography>
              )}
            </Box>
            <Box className={classes.info} mb={2}>
              {program && (
                <ContentLink data={program} className={classes.programLink} />
              )}
              {(dateBroadcast || datePublished) && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.date}
                >
                  <Moment
                    format="MMMM D, YYYY · h:mm A z"
                    tz="America/New_York"
                    unix
                  >
                    {dateBroadcast || datePublished}
                  </Moment>
                </Typography>
              )}
              {dateUpdated && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.date}
                >
                  {' '}
                  Updated on{' '}
                  <Moment
                    format="MMM. D, YYYY · h:mm A z"
                    tz="America/New_York"
                    unix
                  >
                    {dateUpdated}
                  </Moment>
                </Typography>
              )}
              {bylines && (
                <ul className={classes.byline}>
                  {bylines.map(([creditTitle, people]) => (
                    <li className={classes.bylineItem} key={creditTitle}>
                      {creditTitle}{' '}
                      <Box className={classes.bylinePeople} component="span">
                        {people.map((person: IPriApiResource) => (
                          <Box
                            className={classes.bylinePerson}
                            component="span"
                            key={person.id}
                          >
                            <ContentLink
                              className={classes.bylineLink}
                              data={person}
                            />
                          </Box>
                        ))}
                      </Box>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
      {hasFooter && (
        <Container fixed className={classes.footer}>
          <Typography variant="caption" component="div">
            {hasCaption && (
              <Box className={classes.caption}>
                <HtmlContent html={caption} />
              </Box>
            )}
            {hasCredit && (
              <Box className={classes.credit}>
                <HtmlContent html={credit} />
              </Box>
            )}
          </Typography>
        </Container>
      )}
    </ThemeProvider>
  );
};
