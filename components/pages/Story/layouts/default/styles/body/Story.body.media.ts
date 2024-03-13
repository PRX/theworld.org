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
    '& :where(.file-image, .media, .wp-block-image, .wp-block-embed, .tw-scroll-gallery-slide)':
      {
        clear: 'both',
        display: 'grid',
        rowGap: theme.spacing(1),
        marginBlock: theme.typography.pxToRem(32),
        marginInline: 0,
        '& :where(.wp-element-caption, .content, .tw-scroll-gallery-slide--content)':
          {
            ...theme.typography.caption,
            display: 'grid',
            rowGap: '0.5rem',
            '& p': {
              margin: 0
            },
            '& p + p': {
              marginTop: '1rem'
            },
            '& :where(.image__credit, .media-credit)': {
              display: 'flex',
              gap: '0.25rem',
              fontSize: '0.75rem',
              lineHeight: 1,
              backgroundImage: `linear-gradient(to right, ${theme.palette.divider}, transparent 75%)`,
              backgroundSize: '100% 1px',
              backgroundRepeat: 'no-repeat',
              paddingBlockStart: theme.spacing(1)
            },
            '& .image__credit-label': {
              marginRight: '0.25rem'
            }
          },
        '&  > .wp-block-embed__wrapper': {
          lineHeight: 0
        }
      },
    '& .tw-scroll-gallery': {
      display: 'contents'
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

    [theme.breakpoints.up('md')]: {
      '& :where(.media-wysiwyg-align-left, .media-image_on_left, .alignleft)': {
        float: 'left',
        clear: 'left',
        width: '44%',
        margin: `0 ${theme.typography.pxToRem(30)} 0.5rem 0`
      },
      '& :where(.media-wysiwyg-align-right, .media-image_on_right, .alignright)':
        {
          float: 'right',
          clear: 'right',
          width: '44%',
          margin: `0 0 0.5rem ${theme.typography.pxToRem(30)}`
        },
      '& :where(.aligncenter)': {
        marginInline: theme.spacing(4)
      }
    }
  } as any);
