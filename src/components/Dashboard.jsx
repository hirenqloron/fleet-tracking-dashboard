import React from 'react';
import { Box, Container } from '@mui/material';
import LiveIndicator from './LiveIndicator';
import StatusFilter from './StatusFilter';
import FleetStatistics from './FleetStatistics';
import VehicleTable from './VehicleTable';
import VehicleModal from './VehicleModal';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Box
        sx={{
          width: 320,
          bgcolor: 'white',
          borderRight: 1,
          borderColor: 'divider',
          p: 3,
          overflowY: 'auto',
        }}
      >
        <LiveIndicator />
        <StatusFilter />
        <FleetStatistics />
      </Box>

      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Container maxWidth="xl">
          <VehicleTable />
        </Container>
      </Box>

      <VehicleModal />
    </Box>
  );
};

export default Dashboard;