/**
 * @file Tags.tsx
 * Component for Tags elements.
 */

import type { TermNode } from '@interfaces';
import type { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { ContentButton } from '@components/ContentButton';
import { tagsStyles } from './Tags.styles';

export interface ITagsProps extends HTMLAttributes<{}> {
  data: TermNode[];
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
            <ContentButton
              className={classes.link}
              url={item.link || ''}
              key={item.id}
            >
              {item.name}
            </ContentButton>
          )
      )}
    </Box>
  );
};
