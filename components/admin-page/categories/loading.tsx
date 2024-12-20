import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" my={10}>
    <CircularProgress />
  </Box>
);

export default Loading;