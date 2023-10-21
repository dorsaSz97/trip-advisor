import React from 'react';
import { Box, Skeleton } from '@mui/material';

const ItemSkeleton = () => {
  return (
    <Box display="flex" width="100%" p="2" gap="1rem">
      <Skeleton variant="rectangular" width="210px" height="130px" />
      <Box flex="1" display="flex" flexDirection="column">
        <Box display="flex" width="100%" mb="1" justifyContent="space-between">
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" />
        </Box>
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Box>
  );
};

export default ItemSkeleton;

// TODO: different skeleton for mobile
