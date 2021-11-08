/**
 * @file Story.body.qa.ts
 * Body Q&A styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';

const accentBorderWidth = 3;

export const storyBodyQAStyles = (theme: Theme) =>
  ({
    '& .qa-wrap': {
      clear: 'both',
      padding: '0 2rem 0',
      marginLeft: theme.typography.pxToRem(accentBorderWidth),
      border: '1px solid transparent',
      boxShadow: `-${theme.typography.pxToRem(accentBorderWidth)} 0 0 0 ${
        theme.palette.primary.main
      }`,

      '& .qa-question': {
        margin: '1rem 0 1rem',
        fontWeight: 'bold',
        paddingBottom: '1.25rem',
        borderBottom: `${theme.typography.pxToRem(2)} solid ${
          theme.palette.grey[200]
        }`
      },

      '& p': {
        fontSize: '1.2rem'
      },

      '& + .qa-wrap': {
        marginTop: '2rem'
      },

      '&--border-around': {
        border: `${theme.typography.pxToRem(1)} solid ${
          theme.palette.grey[200]
        }`,
        borderLeft: 'none'
      }
    }
  } as CreateCSSProperties<{}>);
