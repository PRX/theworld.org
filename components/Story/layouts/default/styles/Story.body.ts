/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
  body: {
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    },
    '& .media': {
      width: '100%'
    },
    '& .media-youtube-video': {
      position: 'relative',
      height: 0,
      paddingTop: `${9 / 16 * 100}%`,
      '& iframe': {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    },
    '& p': {
      fontSize: '1.2rem',
      lineHeight: '1.7rem'
    },
    '& > p:first-of-type': {
      fontSize: '1.35rem',
      fontWeight: 300,
      lineHeight: '2.15rem',
      marginBottom: '1.5rem'
    }
  }
});