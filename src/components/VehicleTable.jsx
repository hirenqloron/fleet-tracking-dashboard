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

  const getStatusStyle = (status) => {
    const normalizedStatus = status.toLowerCase().replace("_", " ");
    switch (normalizedStatus) {
      case "delivered":
        return {
          bgcolor: "#D1F4E0",
          color: "#00875A",
        };
      case "en route":
        return {
          bgcolor: "#DEEBFF",
          color: "#0052CC",
        };
      case "idle":
        return {
          bgcolor: "#F4F5F7",
          color: "#6B778C",
        };
      default:
        return {
          bgcolor: "#F4F5F7",
          color: "#6B778C",
        };
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
    <Box
      sx={{
        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.125rem",
            marginLeft: "15px",
            marginTop: "15px",
          }}
        >
          Vehicles ({vehicles.length})
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            bgcolor: "success.light",
            borderRadius: 1,
            marginTop: "15px",
            marginRight: "15px",
          }}
        >
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              color: "success.main",
              animation: isConnected ? "pulse 2s infinite" : "none",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "success.main",
            }}
          >
            Live
          </Typography>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          maxHeight: "calc(100vh - 200px)", 
          overflowX: "auto", 
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#555",
            },
          },
        }}
      >
        <Table className="vehicle-table">
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.300" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.813rem" }}>
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
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 2,
                      py: 0.75,
                      borderRadius: 2,
                      ...getStatusStyle(vehicle.status),
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {vehicle.status.replace("_", " ")}
                    </Typography>
                  </Box>
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
