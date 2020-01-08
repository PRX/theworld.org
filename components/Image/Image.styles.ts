/**
* @file Image.style.ts
* Styles for Image.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const imageStyles = makeStyles((theme: Theme) => createStyles({
  imageWrapper: {
    position: 'relative'
  },
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

export { imageStyles };
