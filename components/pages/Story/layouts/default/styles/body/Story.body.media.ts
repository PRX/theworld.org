/**
 * @file Story.body.media.ts
 * Body media styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';

export const storyBodyMediaStyles = (theme: Theme) =>
  ({
    // Iframe styles.
    '& iframe': {
      display: 'block',
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    // Reset for img tag dimension attributes.
    '& img:not([width="1"])': {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      margin: '0 auto',
      backgroundColor: theme.palette.grey[200]
    },

    // Media styles.
    '& .media': {
      clear: 'both',
      width: '100%',
      marginTop: theme.typography.pxToRem(32),
      marginBottom: theme.typography.pxToRem(32)
    },
    '& .file-image': {
      '& .content': {
        ...theme.typography.caption,
        display: 'grid',
        rowGap: '0.5rem',
        '& p': {
          margin: 0
        },
        '& p + p': {
          marginTop: '1rem'
        },
        '& .field-caption': {
          marginTop: '0.25rem'
        },
        '& .image__credit': {
          display: 'flex',
          fontSize: '0.75rem',
          lineHeight: 1
        },
        '& .image__credit-label': {
          marginRight: '0.25rem'
        }
      }
    },

    // YouTube embed styles.
    '& .media-youtube-video': {
      position: 'relative',
      height: 0,
      paddingTop: `${(9 / 16) * 100}%`,
      '& iframe': {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0
      }
    },

    // Twitter embeds.
    '& .twitter-tweet': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    // Facebook embeds.
    '& .fb-post': {
      display: 'block',

      '& > span': {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },

    // Instagram embeds.
    '& .instagram-media': {
      marginLeft: 'auto !important',
      marginRight: 'auto !important'
    },

    [theme.breakpoints.up('md')]: {
      '& .media-wysiwyg-align-left, & .media-image_on_left': {
        float: 'left',
        clear: 'left',
        width: '44%',
        margin: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(
          30
        )} 0.5rem 0`
      },
      '& .media-wysiwyg-align-right, & .media-image_on_right': {
        float: 'right',
        clear: 'right',
        width: '44%',
        margin: `${theme.typography.pxToRem(
          7
        )} 0 0.5rem ${theme.typography.pxToRem(30)}`
      }
    }
  } as any);
