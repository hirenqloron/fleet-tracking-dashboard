import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { clearSelectedVehicle, selectSelectedVehicle } from '../redux/slices/vehicleSlice';

const VehicleModal = () => {
  const dispatch = useDispatch();
  const vehicle = useSelector(selectSelectedVehicle);

  const handleClose = () => {
    dispatch(clearSelectedVehicle());
  };

  if (!vehicle) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'en route':
        return 'info';
      case 'idle':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={Boolean(vehicle)} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingIcon />
          <Typography variant="h6">{vehicle.vehicle_id}</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="caption" color="text.secondary">STATUS</Typography>
              <Chip 
                label={vehicle.status} 
                color={getStatusColor(vehicle.status)} 
                size="small" 
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">CURRENT SPEED</Typography>
            <Typography variant="h6">{vehicle.speed}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">DRIVER</Typography>
            <Typography variant="h6">{vehicle.driver}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">PHONE</Typography>
            <Typography variant="body2">{vehicle.phone || 'N/A'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">LOCATION</Typography>
            <Typography variant="body2">
              {vehicle.location ? `${vehicle.location.lat}, ${vehicle.location.lng}` : 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">DESTINATION</Typography>
            <Typography variant="body1">{vehicle.destination}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">BATTERY LEVEL</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={vehicle.battery_level || 0} 
                sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">{vehicle.battery_level || 0}%</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">FUEL LEVEL</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={vehicle.fuel_level || 0} 
                sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">{vehicle.fuel_level || 0}%</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">LAST UPDATED</Typography>
            <Typography variant="body2">{vehicle.last_update || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;