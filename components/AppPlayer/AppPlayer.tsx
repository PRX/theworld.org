/**
 * Component for app audio player UI.
 */

import React, { useContext } from 'react';
import { PlayButton } from '@components/Player/components';
import { Box, NoSsr } from '@material-ui/core';
import { PlayerContext } from '@components/Player/contexts';

export const AppPlayer = () => {
  const { tracks } = useContext(PlayerContext);

  return (
    <NoSsr>
      <Box bgcolor="primary">
        <PlayButton />
      </Box>
    </NoSsr>
  );
};
