/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentLink } from '@components/ContentLink';
import { tagsStyles } from './Tags.styles';

interface ITagsProps extends HTMLAttributes<{}> {
  data: IPriApiResource[];
  label?: string;
}

export const Tags = ({ data, label }: ITagsProps) => {
  const classes = tagsStyles({});
  const cx = classNames.bind(classes);

  return (
    <Box component="aside" className={classes.root}>
      {label && <h4 className={classes.label}>{label}</h4>}
      {data.map(item => (
        <span className={classes.tag} key={item.id}>
          <ContentLink className={classes.link} data={item} />
        </span>
      ))}
    </Box>
  );
};
