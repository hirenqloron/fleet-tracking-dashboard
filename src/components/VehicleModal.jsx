import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  LinearProgress,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  clearSelectedVehicle,
  selectSelectedVehicle,
  selectModalLoading,
} from "../redux/slices/vehicleSlice";
import { formatDateTime, formatLocation } from "../utils/formatters";

const VehicleModal = () => {
  const dispatch = useDispatch();
  const vehicle = useSelector(selectSelectedVehicle);
  const modalLoading = useSelector(selectModalLoading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    dispatch(clearSelectedVehicle());
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

  const InfoField = ({ label, value, children }) => (
    <Box
      sx={{
        mb: 3,
        pl: 2,
        borderLeft: "3px solid",
        borderRadius: "6px",
        borderColor: "primary.main",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: 0.5,
          display: "block",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          minHeight: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children || (
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, fontSize: "0.95rem" }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={Boolean(vehicle) || modalLoading}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: isMobile ? 0 : 3 },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {modalLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : vehicle ? (
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                🚛 {vehicle.vehicleNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vehicle.driverName} •{" "}
                {vehicle.status.toUpperCase().replace("_", " ")}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
              <Box sx={{ flex: 1 }}>
                <InfoField label="STATUS">
                  <Chip
                    label={vehicle.status.replace("_", " ").toUpperCase()}
                    color={getStatusColor(vehicle.status)}
                    size="small"
                    sx={{ fontWeight: 700, textTransform: "uppercase" }}
                  />
                </InfoField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoField label="🚗 CURRENT SPEED">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {vehicle.speed}{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      mph
                    </Typography>
                  </Typography>
                </InfoField>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
              <Box sx={{ flex: 1 }}>
                <InfoField label="👤 DRIVER" value={vehicle.driverName} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoField
                  label="📞 PHONE"
                  value={vehicle.driverPhone || "N/A"}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
              <Box sx={{ flex: 1 }}>
                <InfoField label="📍 DESTINATION" value={vehicle.destination} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoField label="📍 LOCATION">
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "monospace",
                      bgcolor: "grey.100",
                      p: 1,
                      borderRadius: 1,
                      fontSize: "0.85rem",
                    }}
                  >
                    {formatLocation(vehicle.currentLocation)}
                  </Typography>
                </InfoField>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
              <Box sx={{ flex: 1 }}>
                <InfoField label="🔋 BATTERY LEVEL">
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color:
                          vehicle.batteryLevel > 20
                            ? "success.main"
                            : "error.main",
                        mb: 0.5,
                      }}
                    >
                      {vehicle.batteryLevel || 0}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={vehicle.batteryLevel || 0}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        bgcolor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            vehicle.batteryLevel > 50
                              ? "success.main"
                              : vehicle.batteryLevel > 20
                              ? "warning.main"
                              : "error.main",
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                </InfoField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <InfoField label="⛽ FUEL LEVEL">
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color:
                          vehicle.fuelLevel > 20
                            ? "warning.main"
                            : "error.main",
                        mb: 0.5,
                      }}
                    >
                      {vehicle.fuelLevel || 0}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={vehicle.fuelLevel || 0}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        bgcolor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            vehicle.fuelLevel > 50
                              ? "success.main"
                              : vehicle.fuelLevel > 20
                              ? "warning.main"
                              : "error.main",
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                </InfoField>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <InfoField
                label="🕐 LAST UPDATED"
                value={formatDateTime(vehicle.lastUpdated)}
              />
            </Box>
          </DialogContent>
        </Box>
      ) : null}
    </Dialog>
  );
};

export default VehicleModal;
