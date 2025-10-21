import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  clearSelectedVehicle,
  selectSelectedVehicle,
} from "../redux/slices/vehicleSlice";
import { formatDateTime, formatLocation } from "../utils/formatters";

const VehicleModal = () => {
  const dispatch = useDispatch();
  const vehicle = useSelector(selectSelectedVehicle);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    dispatch(clearSelectedVehicle());
  };

  if (!vehicle) return null;

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

  return (
    <Dialog
      open={Boolean(vehicle)}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: isMobile ? 0 : 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <LocalShippingIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {vehicle.vehicleNumber}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                Status
              </Typography>
              <Chip
                label={vehicle.status.replace("_", " ")}
                color={getStatusColor(vehicle.status)}
                size="medium"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Current Speed
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {vehicle.speed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                mph
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Driver
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {vehicle.driverName}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Phone
            </Typography>
            <Typography variant="body1">
              {vehicle.driverPhone || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Destination
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {vehicle.destination}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Location
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                bgcolor: "grey.100",
                p: 1,
                borderRadius: 1,
                wordBreak: "break-all",
              }}
            >
              {formatLocation(vehicle.currentLocation)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Battery Level
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {vehicle.batteryLevel || 0}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={vehicle.batteryLevel || 0}
                sx={{
                  height: 10,
                  borderRadius: 1,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor:
                      vehicle.batteryLevel > 50
                        ? "success.main"
                        : vehicle.batteryLevel > 20
                        ? "warning.main"
                        : "error.main",
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Fuel Level
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {vehicle.fuelLevel || 0}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={vehicle.fuelLevel || 0}
                sx={{
                  height: 10,
                  borderRadius: 1,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor:
                      vehicle.fuelLevel > 50
                        ? "success.main"
                        : vehicle.fuelLevel > 20
                        ? "warning.main"
                        : "error.main",
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Last Updated
            </Typography>
            <Typography variant="body1">
              {formatDateTime(vehicle.lastUpdated)}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;
