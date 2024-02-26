/**
 * @file Story.body.scroll-gallery.ts
 * Body Scroll Gallery styles as JSS object.
 */

import { type Theme, alpha } from '@mui/material/styles';

export const storyBodyScrollGalleryStyles = (theme: Theme) =>
  ({
    '.tw-scroll-gallery': {
      '--_screen-height': '100vh',
      '--_slide--shift--start': 0,
      '--_slide--offset--start': 'var(--_screen-height)',
      '--_slide--offset--end': 'var(--_screen-height)',
      '--_backdrop--color': alpha(theme.palette.background.default, 0.7),
      '--_backdrop--blur': '20px',
      '--_backdrop--border-radius--size': theme.spacing(10),
      '--_backdrop--border-radius':
        'var(--_backdrop--border-radius--size, 2rem)',
      '--_backdrop--padding-inline': theme.spacing(8),

      position: 'relative',
      clear: 'both',
      transform: 'translateX(-50%)',
      left: '50%',
      width: 'var(--_full-width, 100vw)',

      '&[data-transition="stack"]': {
        '.tw-scroll-gallery-slide': {
          '&:not(:first-of-type)': {
            '--_slide--shift--start': 'calc(var(--_screen-height) * -1)'
          },
          '&:not(:last-of-type)': {
            '--_slide--offset--end': 'calc(var(--_screen-height) * 2)'
          }
        }
      },

      '@supports (animation-timeline: view())': {
        // Performant cross-fade effect for browsers that support `animation-timeline`.
        // Keep sus from having to develop scroll driven animations in javascript.
        '&[data-transition="fade"]': {
          '.tw-scroll-gallery-slide': {
            '&:not(:first-of-type)': {
              '--_slide--shift--start': 'calc(var(--_screen-height) * -2)',
              '--_slide--offset--start': 'calc(var(--_screen-height) * 2)',

              '.tw-scroll-gallery-slide--media': {
                animation: 'scroll-fade linear forwards',
                animationTimeline: 'view()',
                animationRangeStart: 'contain',
                animationRangeEnd: 'calc(var(--_screen-height) * 2)',
                opacity: 0,
                transformOrigin: 'center'
              }
            },
            '&:not(:last-of-type)': {
              '--_slide--offset--end': 'calc(var(--_screen-height) * 2)'
            }
          }
        },
        '@keyframes scroll-fade': {
          to: {
            opacity: 1
          }
        }
      },

      '@supports not (animation-timeline: view())': {
        // Do a wipe fade effect for browsers that do not support `animation-timeline`.
        // Not as performant, but will become less used over time with growing support for `animation-timeline`.
        '&[data-transition="fade"]': {
          '--_backdrop--color': alpha(theme.palette.background.default, 0.8),
          '.tw-scroll-gallery-slide': {
            // Remove WebKit Fix.
            backdropFilter: 'none',

            // Mozilla Fix: Need to force each slide to a render layer.
            transform: 'translate3d(0, 0, 0)',

            '&:not(:first-of-type)': {
              '--_slide--shift--start': 'calc(var(--_screen-height) * -3)',
              '--_slide--offset--start': 'calc(var(--_screen-height) * 3)',
              maskImage:
                'linear-gradient(to bottom, transparent, transparent var(--_screen-height), black calc(var(--_screen-height) * 2))'
            },
            '&:not(:last-of-type)': {
              '--_slide--offset--end': 'calc(var(--_screen-height) * 3)'
            }
          },
          '.tw-scroll-gallery-slide--content': {
            // Safari Fix: Need to force content wrapper to a render layer.
            transform: 'translate3d(0, 0, 0)'
          }
        }
      }
    },

    '.tw-scroll-gallery-slide': {
      position: 'relative',
      display: 'grid',
      gridTemplateRows:
        'var(--_slide--offset--start) min-content var(--_slide--offset--end)',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      alignItems: 'center',
      margin: 0,
      marginBlockStart: 'var(--_slide--shift--start)',

      // WebKit Fix: Child backdrop filter going beyond border radius.
      // https://stackoverflow.com/questions/36378512/backdrop-filter-extends-beyond-border-radius
      backdropFilter: 'blur(0)',

      '> *': {
        gridColumn: '1 / -1',
        gridRow: 2,
        position: 'relative'
      },

      '&[data-content-position="left"]': {
        '--_backdrop--border-radius':
          '0 var(--_backdrop--border-radius--size) var(--_backdrop--border-radius--size) 0',
        justifyItems: 'start'
      },

      '&[data-content-position="right"]': {
        '--_backdrop--border-radius':
          'var(--_backdrop--border-radius--size) 0 0 var(--_backdrop--border-radius--size)',
        justifyItems: 'end'
      }
    },

    '.tw-scroll-gallery-slide--media': {
      alignSelf: 'start',
      gridRow: 1,
      position: 'sticky',
      top: 0,

      '&:is(img)': {
        width: '100%',
        height: 'var(--_screen-height)',
        objectFit: 'cover'
      }
    },

    '.tw-scroll-gallery-slide--content': {
      maxWidth: 'calc(var(--container--max-width) * 0.8)',
      backgroundColor: 'var(--_backdrop--color)',
      backdropFilter: 'blur(var(--_backdrop--blur))',
      paddingBlock: theme.spacing(2),
      paddingInline: 'var(--_backdrop--padding-inline)',
      borderRadius: 'var(--_backdrop--border-radius)',
      fontSize: '1.5rem'
    }
  } as any);
