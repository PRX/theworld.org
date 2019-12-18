/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React from 'react';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: theme.palette.primary.main,
    '&:visited' : {
      color: theme.palette.primary.main
    },
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
}));

export default ({ children = null, data, ...other }) => {
  const {
    metatags: { canonical },
    title
  } = data;
  const alias = canonical.replace(/^https?:\/\/[^\/]+/, '');
  const href = {
    pathname: '/',
    query: {
      alias
    }
  };
  const classes = useStyles({});

  return (
      <Link href={href} as={alias}>
        <MuiLink href={alias} underline="none" classes={classes} {...other}>{children || title}</MuiLink>
      </Link>
  );
};
