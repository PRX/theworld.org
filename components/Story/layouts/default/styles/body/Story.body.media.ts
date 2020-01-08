/**
 * @file Story.body.media.ts
 * Body media styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';

export default (theme: Theme) => ({
  // Reset for imag tag dimension attributes.
  '& img': {
    maxWidth: '100%',
    height: 'auto'
  },

  // Media styles.
  '& .media': {
    width: '100%'
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
      height: '100%'
    }
  },

  [theme.breakpoints.up('md')]: {
    '& .media-wysiwyg-align-left': {
      float: 'left',
      width: '44%',
      margin: `${theme.typography.pxToRem(7)} ${theme.typography.pxToRem(30)} 1rem 0`
    },
    '& .media-wysiwyg-align-right': {
      float: 'right',
      width: '44%',
      margin: `${theme.typography.pxToRem(7)} 0 1rem ${theme.typography.pxToRem(30)}`
    }
  },
} as CreateCSSProperties<{}>);
