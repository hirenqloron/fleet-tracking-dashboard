import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  fetchVehicles,
  fetchVehiclesByStatus,
  selectFilteredVehicles,
  selectVehiclesLoading,
  setSelectedVehicle,
} from "../redux/slices/vehicleSlice";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../redux/middleware/websocketMiddleware";

const VehicleTable = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectFilteredVehicles);
  const loading = useSelector(selectVehiclesLoading);
  const selectedStatus = useSelector((state) => state.vehicles.selectedStatus);

  useEffect(() => {
    if (selectedStatus === "all") {
      dispatch(fetchVehicles());
    } else {
      dispatch(fetchVehiclesByStatus(selectedStatus));
    }

    dispatch(connectWebSocket());

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch, selectedStatus]);

  const handleRowClick = (vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "en route":
        return "info";
      case "idle":
        return "default";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Vehicles ({vehicles.length})
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>Vehicle ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Driver</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Speed</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Destination</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ETA</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Update</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                onClick={() => handleRowClick(vehicle)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "grey.50" },
                }}
              >
                <TableCell>{vehicle.vehicle_id}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status}
                    color={getStatusColor(vehicle.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{vehicle.speed}</TableCell>
                <TableCell>{vehicle.destination}</TableCell>
                <TableCell>{vehicle.eta || "-"}</TableCell>
                <TableCell>{vehicle.last_update}</TableCell>
                <TableCell>
                  {vehicle.location
                    ? `${vehicle.location.lat}, ${vehicle.location.lng}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VehicleTable;
