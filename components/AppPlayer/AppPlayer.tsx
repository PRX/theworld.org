/**
 * Component for app audio player UI.
 */

import React from 'react';
import { PlayButton } from '@components/Player/components';
import { Box, NoSsr } from '@material-ui/core';
// import { PlayerContext } from '@components/Player/contexts';

export const AppPlayer = () => {
  // const { state } = useContext(PlayerContext);
  // const { tracks } = state || {};

  return (
    <NoSsr>
      <Box bgcolor="primary">
        <PlayButton />
      </Box>
    </NoSsr>
  );
};
