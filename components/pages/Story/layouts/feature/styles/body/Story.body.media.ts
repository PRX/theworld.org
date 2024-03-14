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
      maxWidth: '100%',
      height: 'auto',
      margin: '0 auto',
      backgroundColor: theme.palette.grey[200]
    },

    // Media styles.
    '& :where(.file-image, .media, .wp-block-image, .wp-block-embed)': {
      position: 'relative',
      clear: 'both',
      width: '100%',
      marginBlock: theme.typography.pxToRem(32),
      marginInline: 0,

      '&:where(.alignwide, .alignfull), & .file-full-width-wrapper': {
        transform: 'translateX(-50%)',
        position: 'relative',
        left: '50%',
        width: 'var(--_full-width, 100vw)',

        '& > img': {
          maxHeight: '90vh',
          width: '100%',
          objectFit: 'cover'
        }
      },

      '&.alignwide, & .file-browser-width-wrapper': {
        maxWidth: '1200px'
      },

      '&:where(.aligncenter, .alignleft, .alignright)': {
        maxWidth: `calc(100% - ${theme.spacing(6)})`,
        marginInline: 'auto'
      },

      '&:where(.wp-block-image, .wp-block-embed)': {
        ...theme.typography.caption,
        display: 'grid',
        rowGap: theme.spacing(1),
        '& :where(figcaption)': {
          display: 'grid',
          gap: theme.spacing(1)
        },
        '&:where(.alignwide, .alignfull) :where(figcaption)': {
          paddingInline: theme.spacing(2),
          marginInline: 'auto',
          [theme.breakpoints.up('sm')]: {
            width: '100%',
            maxWidth: 600,
            paddingInline: theme.spacing(3)
          },
          [theme.breakpoints.up('md')]: {
            maxWidth: 960
          },
          [theme.breakpoints.up('lg')]: {
            maxWidth: 960
          }
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
        '& :where(.image__credit, .media-credit)': {
          display: 'flex',
          gap: '0.25rem',
          fontSize: '0.75rem',
          lineHeight: 1
        }
      }
    },

    // YouTube embed styles.
    '& .media-youtube-video, & :where(.wp-block-embed-youtube, .wp-block-embed-vimeo) > .wp-block-embed__wrapper':
      {
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

    // Spotify embeds.
    '& .wp-block-embed-spotify:where(.alignwide, .alignfull)': {
      '--_full-width': `calc(100vw - ${theme.spacing(6)})`
    },

    [theme.breakpoints.up('md')]: {
      '& :where(.media-wysiwyg-align-left, .media-image_on_left, .alignleft)': {
        float: 'left',
        clear: 'left',
        width: '44%',
        margin: `${[
          theme.typography.pxToRem(8),
          theme.typography.pxToRem(48),
          theme.typography.pxToRem(32),
          0
        ].join(' ')}`,
        [theme.breakpoints.up(1028)]: {
          marginInlineStart: theme.spacing(-4)
        }
      },
      '& :where(.media-wysiwyg-align-right, .media-image_on_right, .alignright)':
        {
          float: 'right',
          clear: 'right',
          width: '44%',
          margin: `${[
            theme.typography.pxToRem(8),
            0,
            theme.typography.pxToRem(32),
            theme.typography.pxToRem(48)
          ].join(' ')}`,
          [theme.breakpoints.up(1028)]: {
            marginInlineEnd: theme.spacing(-4)
          }
        }
    }
  } as any);
