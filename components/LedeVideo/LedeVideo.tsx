/**
 * @file LedeVideo.ts
 * Component for lede video.
 */

import ReactMarkdown from 'react-markdown/with-html';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ledeVideoStyles } from './LedeVideo.styles';

export default ({ data }) => {
  const { description, credit, url } = data;
  const theme = useTheme();
  const classes = ledeVideoStyles({});
  const hasCaption = description && !!description.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const mdProps = {
    escapeHtml: false
  };
  const playerConfig = {
    youtube: {
      playerVars: {
        controls: 1,
        modestbranding: 0,
        rel: 0
      }
    },
    vimeo: {
      playerOptions: {
        color: theme.palette.secondary.main.slice(1),
        controls: true
      }
    }
  };

  return (
    <figure className={classes.root}>
      <Box className={classes.playerWrapper}>
        <ReactPlayer className={classes.player} url={url} width="100%" height="100%" config={playerConfig} />
      </Box>
      {hasFooter && (
        <Typography variant="caption" component="figcaption" className={classes.footer}>
          {hasCaption && (<ReactMarkdown
            {...mdProps}
            className={classes.caption}
            source={description}
          />)}
          {hasCredit && (<ReactMarkdown
            {...mdProps}
            className={classes.credit}
            source={credit}
          />)}
        </Typography>
      )}
    </figure>
  );
};
