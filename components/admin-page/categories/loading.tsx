import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
    <Typography ml={2}>Loading...</Typography>
  </Box>
);

export default Loading;