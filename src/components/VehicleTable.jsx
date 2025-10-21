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
  fetchVehicleById,
  selectAllVehicles,
  selectVehiclesLoading,
  selectWebSocketConnected,
} from "../redux/slices/vehicleSlice";
import { fetchStatistics } from "../redux/slices/statisticsSlice";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../redux/middleware/websocketMiddleware";
import { formatDateTime, formatLocation, formatETA } from "../utils/formatters";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const VehicleTable = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectAllVehicles);
  const loading = useSelector(selectVehiclesLoading);
  const isConnected = useSelector(selectWebSocketConnected);

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchStatistics());
    dispatch(connectWebSocket());

    const pollInterval = setInterval(() => {
      dispatch(fetchVehicles());
      dispatch(fetchStatistics());
    }, 180000);

    return () => {
      dispatch(disconnectWebSocket());
      clearInterval(pollInterval);
    };
  }, [dispatch]);

  const handleVehicleClick = (vehicleId) => {
    dispatch(fetchVehicleById(vehicleId));
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status.toLowerCase().replace("_", " ");
    switch (normalizedStatus) {
      case "delivered":
        return "success";
      case "en route":
        return "info";
      case "idle":
        return "warning";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
          Vehicles ({vehicles.length})
        </Typography>
        <Chip
          icon={
            <FiberManualRecordIcon
              sx={{
                fontSize: 10,
                animation: isConnected ? "pulse 2s infinite" : "none",
              }}
            />
          }
          label="Live"
          color="success"
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.5 },
            },
          }}
        />
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell
                sx={{ fontWeight: 700, fontSize: "0.813rem", py: 1.5 }}
              >
                Vehicle
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Driver
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Speed
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Destination
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                ETA
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Last Update
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
                Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                sx={{
                  "&:hover": {
                    bgcolor: "grey.50",
                  },
                }}
              >
                <TableCell sx={{ py: 1.5 }}>
                  <Typography
                    onClick={() => handleVehicleClick(vehicle.id)}
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {vehicle.vehicleNumber}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>
                  {vehicle.driverName}
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status.replace("_", " ").toUpperCase()}
                    color={getStatusColor(vehicle.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.688rem",
                      height: 22,
                      textTransform: "uppercase",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    <strong>{vehicle.speed}</strong> mph
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>
                  {vehicle.destination}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    {formatETA(vehicle.estimatedArrival)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    {formatDateTime(vehicle.lastUpdated)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "monospace",
                      color: "text.secondary",
                      fontSize: "0.813rem",
                    }}
                  >
                    {formatLocation(vehicle.currentLocation)}
                  </Typography>
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
