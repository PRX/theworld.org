/**
 * @file Tags.tsx
 * Component for Tags elements.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentButton } from '@components/ContentButton';
import { tagsStyles } from './Tags.styles';

export interface ITagsProps extends HTMLAttributes<{}> {
  data: IPriApiResource[];
  label?: string;
}

export const Tags = ({ data, label }: ITagsProps) => {
  const { classes } = tagsStyles();

  return (
    <Box component="aside" className={classes.root}>
      {label && <h2 className={classes.label}>{label}</h2>}
      {data.map(
        (item) =>
          item && (
            <ContentButton className={classes.link} data={item} key={item.id} />
          )
      )}
    </Box>
  );
};
