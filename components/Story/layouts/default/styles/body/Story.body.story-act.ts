/**
 * @file Story.body.story-act.ts
 * Body story act styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';
import { blue, yellow } from '@theme/colors';

const padded = {
  padding: '1rem 1.5rem'
};

export default (theme: Theme) =>
  ({
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
          margin: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(30)} 0.5rem 0`
        },
        '&.cta_align-right': {
          float: 'right',
          width: '44%',
          margin: `${theme.typography.pxToRem(7)} 0 0.5rem ${theme.typography.pxToRem(30)}`
        }
      }
    },

    '& .node-story-act': {
      display: 'grid',
      gridRowGap: '0.5rem',
      gridColumnGap: '1rem',

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
  } as CreateCSSProperties<{}>);
