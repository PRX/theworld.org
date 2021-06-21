/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentButton } from '@components/ContentButton';
import { tagsStyles } from './Tags.styles';

export interface ITagsProps extends HTMLAttributes<{}> {
  data: IPriApiResource[];
  label?: string;
}

export const Tags = ({ data, label }: ITagsProps) => {
  const classes = tagsStyles({});

  return (
    <Box component="aside" className={classes.root}>
      {label && <h2 className={classes.label}>{label}</h2>}
      {data.map(
        item =>
          item && (
            <span className={classes.tag} key={item.id}>
              <ContentButton className={classes.link} data={item} />
            </span>
          )
      )}
    </Box>
  );
};
