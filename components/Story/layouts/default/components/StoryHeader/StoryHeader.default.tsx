/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import { Box, Hidden, Typography } from '@material-ui/core';
import { useContext } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ContentContext from '@contexts/ContentContext';
import ContentLink from '@components/ContentLink';
import Image from '@components/Image'
import { storyHeaderStyles } from './StoryHeader.default.styles';

export default () => {
  const {
    data: {
      byline,
      dateBroadcast,
      datePublished,
      primaryCategory,
      program,
      title
    }
  } = useContext(ContentContext);
  const classes = storyHeaderStyles({});
  const hasLogos = program && program.podcastLogo;

  return (
    <Box className={classes.root} mt={4} mb={2}>
      {primaryCategory && (
        <Box mb={2}>
          <ContentLink className={classes.categoryLink} data={primaryCategory} />
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
              {byline.map(({ id, creditType: { title }, person }) => (
                <li className={classes.bylineItem} key={id}>
                  {title}{' '}
                  <ContentLink className={classes.bylineLink} data={person} />
                </li>
              ))}
            </ul>
          )}
        </Box>
        {hasLogos && (
          <Hidden smDown>
            <Box className={classes.logos}>
              <ContentLink data={program}>
                <Image data={program.podcastLogo} width={85} height={85} />
              </ContentLink>
            </Box>
          </Hidden>
        )}
      </Box>
    </Box>
  );
};
