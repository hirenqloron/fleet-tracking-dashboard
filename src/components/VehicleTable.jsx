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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
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
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Driver</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Speed</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Destination</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>ETA</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Last Update</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <Typography
                    onClick={() => handleVehicleClick(vehicle.id)}
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      textDecoration: "none",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {vehicle.vehicleNumber}
                  </Typography>
                </TableCell>
                <TableCell>{vehicle.driverName}</TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status.replace("_", " ")}
                    color={getStatusColor(vehicle.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      fontSize: "0.75rem",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <strong>{vehicle.speed}</strong> mph
                  </Typography>
                </TableCell>
                <TableCell>{vehicle.destination}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatETA(vehicle.estimatedArrival)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
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