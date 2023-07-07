/**
 * @file PageHeader.ts
 * Component for page header.
 */

import type { Page } from '@interfaces';
import { Box, Typography } from '@mui/material';
import { pageHeaderStyles } from './PageHeader.styles';

interface Props {
  data: Page;
}

export const PageHeader = ({ data }: Props) => {
  const { title } = data;
  const { classes } = pageHeaderStyles();

  return (
    <Box className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
