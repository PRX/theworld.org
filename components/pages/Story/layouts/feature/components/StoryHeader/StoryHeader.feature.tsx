/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import 'moment-timezone';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Container, Typography, ThemeProvider } from '@material-ui/core';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
import {
  storyHeaderStyles,
  storyHeaderTheme
} from './StoryHeader.feature.styles';

interface Props {
  data: IPriApiResource;
}

export const StoryHeader = ({ data }: Props) => {
  const {
    byline,
    dateBroadcast,
    datePublished,
    image,
    primaryCategory,
    program,
    title
  } = data;
  const { caption, credit } = image || {};
  const hasCaption = caption && !!caption.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const classes = storyHeaderStyles({});
  const cx = classNames.bind(classes);
  const mdProps = {
    escapeHtml: false
  };

  return (
    <ThemeProvider theme={storyHeaderTheme}>
      <Box className={cx('root', { withImage: !!image })}>
        {image && (
          <>
            <Image
              className={cx('image')}
              wrapperClassName={cx('imageWrapper')}
              data={image}
              width={{ xl: '100vw' }}
            />
          </>
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
            </Box>
            <Box className={classes.meta} mb={2}>
              <Box className={classes.info}>
                {program && (
                  <ContentLink data={program} className={classes.programLink} />
                )}
                <Moment
                  className={classes.date}
                  format="MMM. D, YYYY · h:mm A z"
                  tz="America/New_York"
                  unix
                >
                  {dateBroadcast || datePublished}
                </Moment>
                {byline && (
                  <ul className={classes.byline}>
                    {byline.map(({ id, creditType, person }) => (
                      <li className={classes.bylineItem} key={id}>
                        {creditType ? creditType.title : 'By'}{' '}
                        <ContentLink
                          className={classes.bylineLink}
                          data={person}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      {hasFooter && (
        <Container fixed className={cx('footer')}>
          <Typography variant="caption" component="div">
            {hasCaption && (
              <ReactMarkdown
                {...mdProps}
                className={classes.caption}
                source={caption}
              />
            )}
            {hasCredit && (
              <ReactMarkdown
                {...mdProps}
                className={classes.credit}
                source={credit}
              />
            )}
          </Typography>
        </Container>
      )}
    </ThemeProvider>
  );
};
