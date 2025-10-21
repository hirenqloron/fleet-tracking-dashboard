import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItemButton, ListItemText, Chip } from '@mui/material';
import { setSelectedStatus, selectAllVehicles } from '../redux/slices/vehicleSlice';

const StatusFilter = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectAllVehicles);
  const selectedStatus = useSelector((state) => state.vehicles.selectedStatus);

  const getStatusCount = (status) => {
    if (status === 'all') return vehicles.length;
    return vehicles.filter(v => v.status.toLowerCase() === status.toLowerCase()).length;
  };

  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'idle', label: 'Idle' },
    { value: 'en route', label: 'En Route' },
    { value: 'delivered', label: 'Delivered' },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
        Filter by Status
      </Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        {statuses.map((status) => (
          <ListItemButton
            key={status.value}
            selected={selectedStatus === status.value}
            onClick={() => dispatch(setSelectedStatus(status.value))}
            sx={{ py: 1 }}
          >
            <ListItemText primary={status.label} />
            <Chip label={getStatusCount(status.value)} size="small" />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default StatusFilter;