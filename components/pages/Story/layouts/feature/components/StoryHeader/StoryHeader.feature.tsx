/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'moment-timezone';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  Hidden
} from '@material-ui/core';
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
    byline,
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
  const mdProps = {
    escapeHtml: false
  };

  return (
    <ThemeProvider theme={storyHeaderTheme}>
      <Box component="header" className={cx('root', { withImage: !!image })}>
        {image && (
          <Box className={cx('imageWrapper')}>
            <Hidden mdUp>
              <Image
                alt={alt}
                className={cx('image')}
                src={image.url}
                layout="fill"
                objectFit="cover"
                priority
              />
            </Hidden>
            <Hidden smDown>
              <Image
                alt={alt}
                className={cx('image')}
                src={image.url}
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
            <Box className={classes.meta} mb={2}>
              <Box className={classes.info}>
                {program && (
                  <ContentLink data={program} className={classes.programLink} />
                )}
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
        <Container fixed className={classes.footer}>
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
