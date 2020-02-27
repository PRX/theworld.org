/**
* @file Image.style.ts
* Styles for Image.
*/

import { createStyles, makeStyles } from '@material-ui/core/styles';

export const imageStyles = makeStyles(() => createStyles({
  imageWrapper: (props: { width?: number, height?: number }) => ({
    position: 'relative',
    paddingTop: `${((props.height / props.width) || (9 / 16)) * 100}%`
  }),
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  root: {
    objectFit: 'cover'
  }
}));
