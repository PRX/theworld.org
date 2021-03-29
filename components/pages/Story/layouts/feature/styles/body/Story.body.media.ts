/**
 * @file Story.body.media.ts
 * Body media styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';

export const storyBodyMediaStyles = (theme: Theme) =>
  ({
    // Iframe styles.
    '& iframe': {
      display: 'block',
      maxWidth: '100%',
      marginLeft: 'auto !important',
      marginRight: 'auto !important'
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
      position: 'relative',
      clear: 'both',
      width: '100%',
      marginTop: theme.typography.pxToRem(theme.spacing(4)),
      marginBottom: theme.typography.pxToRem(theme.spacing(4)),

      '&.media-full_width': {
        position: 'relative',

        '& .file-full-width-wrapper': {
          transform: 'translateX(-50%)',
          position: 'relative',
          left: '50%',
          width: '100vw',
          maxWidth: '1600px'
        }
      },

      '&.media-browser_width': {
        position: 'relative',

        '& .file-browser-width-wrapper': {
          transform: 'translateX(-50%)',
          position: 'relative',
          left: '50%',
          width: '100vw'
        }
      }
    },
    '& .file-image': {
      '& .content': {
        ...theme.typography.caption,
        '& > * + *': {
          marginTop: theme.typography.pxToRem(theme.spacing(2))
        },
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
  } as CreateCSSProperties<{}>);
