/**
 * @file Image.style.ts
 * Styles for Image.
 */

import { createStyles, makeStyles } from '@material-ui/core/styles';

export const imageStyles = makeStyles(() =>
  createStyles({
    imageWrapper: ({
      width = 16,
      height = 9
    }: {
      width?: number;
      height?: number;
    }) => ({
      position: 'relative',
      paddingTop: `${(height / width) * 100}%`
    }),
    responsive: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    root: {
      objectFit: 'cover',
      padding: '1rem',
      textIndent: '0.5rem'
    }
  })
);
