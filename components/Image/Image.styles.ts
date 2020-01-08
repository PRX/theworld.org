/**
* @file Image.style.ts
* Styles for Image.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const imageStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    objectFit: 'cover'
  }
}));

export { imageStyles };
