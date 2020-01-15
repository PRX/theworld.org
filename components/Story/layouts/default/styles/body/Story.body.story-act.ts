/**
 * @file Story.body.story-act.ts
 * Body story act styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';
import { blue, yellow } from '@theme/colors';

export default (theme: Theme) => {
  const padded = {
    padding: '1rem 1.5rem'
  };
  
  const button = {
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  };

  return {
    '& .edit-entity': {
      margin: '1rem 0',

      '&.cta_border': {
        ...padded,
        border: `1px solid ${theme.palette.grey[200]}`
      },

      '&.cta_icon-engagement': {
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-8px',
          right: '-13px',
          width: '25px',
          height: '30px',
          background: 'url(/images/callout.png) no-repeat right top'
        }
      },

      '&.cta_bg-gray': {
        ...padded,
        backgroundColor: theme.palette.grey[200]
      },
      '&.cta_bg-blue': {
        ...padded,
        backgroundColor: blue[100]
      },
      '&.cta_bg-yellow': {
        ...padded,
        backgroundColor: yellow[200]
      },

      [theme.breakpoints.up('md')]: {
        '&.cta_align-left': {
          float: 'left',
          width: '44%',
          margin: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(
            30
          )} 0.5rem 0`
        },
        '&.cta_align-right': {
          float: 'right',
          width: '44%',
          margin: `${theme.typography.pxToRem(
            7
          )} 0 0.5rem ${theme.typography.pxToRem(30)}`
        }
      }
    },

    '& .node-story-act': {
      display: 'grid',
      gridRowGap: '0.5rem',
      gridColumnGap: '1rem',

      '& .field-display-title': {
        ...theme.typography.overline
      },

      '& .field-story-act-teaser': {
        ...theme.typography.caption
      },

      '& .field-story-act-external-link': {
        '& a': {
          ...theme.typography.button
        }
      },

      '& .field-body': {
        ...theme.typography.caption,

        '& > *': {
          margin: 0
        },
        '& > * + *': {
          marginTop: '1rem'
        },

        '& .newsletter__signup': {
          borderTop: `2px solid ${theme.palette.primary.main}`,

          '& .campaignmonitor-subscribe-form': {
            display: 'grid',
            gridGap: '0.5rem',
            justifyItems: 'center',

            '& .form-item': {
              width: '100%',

              '& input': {
                width: '100%',
                padding: '0.25rem 0.5rem'
              }
            },

            '& .form-submit': {
              ...button
            }
          }
        }
      },

      '&.cta-type-external-link': {
        '& > *': {
          gridColumn: 1
        },

        '& .field-display-title': {
          gridColumn: '1 / 3',

          '& + .field-story-act-image': {
            gridRow: '2 / 4'
          }
        },

        '& .field-story-act-image': {
          gridColumn: '2',
          gridRow: '1 / 3'
        }
      },

      '&.cta-type-internal-link': {
        '& .element-hidden': {
          display: 'none'
        },

        '& > .field-story-act-internal-link + .field-story-act-internal-link': {
          marginTop: '0.5rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${theme.palette.background.default}`
        },

        '& .teaser-list__item': {
          display: 'grid',
          gridTemplateColumns: '1fr 100px',
          gridTemplateRows: 'repeat(4, min-content)',
          gridColumnGap: '0.5rem',

          '& .teaser-list__item-title': {
            gridColumn: '1 / -2',
            margin: 0,
            fontSize: 'inherit'
          },

          '& .story-list__group-1': {
            gridColumn: -2,
            gridRow: '1 / -2',

            '& .field-image': {
              margin: 0,
              padding: 0
            }
          },

          '& .field-date-published': {
            gridColumn: 1,
            margin: 0,
            color: theme.palette.grey[600],
            fontSize: '0.75rem',
            fontStyle: 'italic',
            lineHeight: 1.2
          },

          '& > .field-updated': {
            display: 'flex',
            gridColumn: 1,
            color: theme.palette.grey[600],
            fontSize: '0.75rem',
            fontStyle: 'italic',
            lineHeight: 1.2,

            '& .field-updated-label': {
              '&::after': {
                content: '"\\00A0"'
              },
              fontWeight: theme.typography.fontWeightBold
            }
          },

          '& .story__categories': {
            gridColumn: '1 / -1',
            marginTop: '0.5rem',
            fontSize: theme.typography.pxToRem(14),
            lineHeight: 1.4,

            '& .terms-inline': {
              display: 'flex',
              flexWrap: 'wrap',

              '& + .terms-inline': {
                marginTop: theme.typography.pxToRem(10)
              },

              '& > * + *': {
                marginLeft: '0.25rem'
              },

              '& .category-label': {
                fontWeight: 'bold'
              },

              '& > span:not(:last-of-type)': {
                '&::after': {
                  content: '", "'
                }
              },

              '& > span:last-of-type': {
                '&::before': {
                  content: '"and "'
                }
              }
            }
          },

          [theme.breakpoints.only('md')]: {
            '& .story-list__group-1': {
              gridRow: 1,
              gridColumn: '1 / -1'
            },

            '& .teaser-list__item-title': {
              gridColumn: '1 / -1'
            },

            '& .field-date-published': {
              gridColumn: '1 / -1'
            },

            '& > .field-updated': {
              gridColumn: '1 / -1'
            }
          }
        }
      },

      '& #subscription_form_wrapper': {
        '& p': {
          margin: 0,
          display: 'inline'
        },
        '& br': {
          display: 'none'
        },
        '& .form-item': {
          display: 'inline',
          '& .form-text': {
            width: '65%'
          }
        }
      }
    }
  } as CreateCSSProperties<{}>;
};
