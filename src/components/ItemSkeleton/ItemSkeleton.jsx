import React from 'react';
import { Box, Card, Skeleton } from '@mui/material';

const ItemSkeleton = () => {
  return (
    <Box sx={{ gap: '1', display: 'flex', p: '8px' }}>
      <Card sx={{ width: '100%', p: '16px' }}>
        {/* <Skeleton variant="rectangular" width="210px" height="130px" /> */}
        <Box flex="1" display="flex" flexDirection="column" sx={{ p: '16px' }}>
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="text" width="30%" sx={{ mt: 'auto' }} />
        </Box>
      </Card>
    </Box>
  );
};

export default ItemSkeleton;
