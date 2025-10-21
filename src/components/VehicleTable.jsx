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
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import {
  fetchVehicles,
  selectFilteredVehicles,
  selectVehiclesLoading,
  setSelectedVehicle,
} from "../redux/slices/vehicleSlice";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../redux/middleware/websocketMiddleware";
import { formatDateTime, formatLocation, formatETA } from "../utils/formatters";

const VehicleTable = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectFilteredVehicles);
  const loading = useSelector(selectVehiclesLoading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(connectWebSocket());

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

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

  if (isMobile) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Vehicles ({vehicles.length})
        </Typography>
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            onClick={() => handleRowClick(vehicle)}
            sx={{
              mb: 2,
              cursor: "pointer",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s",
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  {vehicle.vehicleNumber}
                </Typography>
                <Chip
                  label={vehicle.status}
                  color={getStatusColor(vehicle.status)}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Driver
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {vehicle.driverName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Speed
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {vehicle.speed} mph
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Destination
                  </Typography>
                  <Typography variant="body2">{vehicle.destination}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Last Update
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.813rem" }}>
                    {formatDateTime(vehicle.lastUpdated)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Vehicles ({vehicles.length})
      </Typography>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.100" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Vehicle ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Driver
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Speed
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Destination
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                ETA
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Last Update
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle, index) => (
              <TableRow
                key={vehicle.id}
                onClick={() => handleRowClick(vehicle)}
                sx={{
                  cursor: "pointer",
                  bgcolor: index % 2 === 0 ? "white" : "grey.50",
                  "&:hover": {
                    bgcolor: "primary.light",
                    "& td": { color: "primary.contrastText" },
                  },
                  transition: "all 0.2s",
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: "primary.main" }}>
                  {vehicle.vehicleNumber}
                </TableCell>
                <TableCell>{vehicle.driverName}</TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status}
                    color={getStatusColor(vehicle.status)}
                    size="small"
                    sx={{ fontWeight: 600, textTransform: "capitalize" }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {vehicle.speed}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      mph
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Typography variant="body2" noWrap>
                    {vehicle.destination}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "0.813rem" }}>
                    {formatETA(vehicle.estimatedArrival)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "0.813rem" }}>
                    {formatDateTime(vehicle.lastUpdated)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.813rem",
                      fontFamily: "monospace",
                      color: "text.secondary",
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
