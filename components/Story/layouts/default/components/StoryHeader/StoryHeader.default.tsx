/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import { Box, Hidden, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useContext } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ContentContext from '@contexts/ContentContext';
import ContentLink from '@components/ContentLink';
import Image from '@components/Image'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1.2rem'
    },
    byline: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    },
    bylineItem: {},
    bylineLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    date: {
      fontStyle: 'italic'
    },
    meta: {
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
      gridTemplateAreas: "'INFO LOGOS'",
      justifyContent: 'space-between'
    },
    info: {
      display: 'grid',
      alignContent: 'start',
      gridArea: 'INFO',
      gridGap: theme.typography.pxToRem(4)
    },
    logo: {
      width: theme.typography.pxToRem(85)
    },
    logos: {
      display: 'grid',
      gridArea: 'LOGOS'
    },
    programLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    categoryLink: {
      fontWeight: theme.typography.fontWeightBold
    }
  })
);

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
  const classes = useStyles({});
  const hasLogos = program && program.podcastLogo;

  console.log(program.podcastLogo);

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
