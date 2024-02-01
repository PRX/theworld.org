/**
 * @file Story.body.qa.ts
 * Body Q&A styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';

const accentBorderWidth = 3;

export const storyBodyQAStyles = (theme: Theme) =>
  ({
    '& .qa-wrap': {
      padding: '0 2rem 0',
      marginBlockStart: theme.typography.pxToRem(32),
      marginBlockEnd: theme.typography.pxToRem(32),
      paddingBlockStart: theme.typography.pxToRem(16),
      paddingBlockEnd: theme.typography.pxToRem(16),
      borderInlineStar: 'none',
      boxShadow: `-${theme.typography.pxToRem(accentBorderWidth)} 0 0 ${
        theme.palette.primary.main
      }`,

      '& .qa-question': {
        marginBlockEnd: theme.typography.pxToRem(16),
        fontWeight: 'bold',
        paddingBlockEnd: theme.typography.pxToRem(16),
        borderBlockEnd: `${theme.typography.pxToRem(2)} solid ${
          theme.palette.grey[200]
        }`
      },

      '& p': {
        fontSize: '1.2rem'
      },

      '&--border-around': {
        border: `${theme.typography.pxToRem(1)} solid ${
          theme.palette.grey[200]
        }`,
        borderInlineStart: 'none'
      }
    }
  } as any);
