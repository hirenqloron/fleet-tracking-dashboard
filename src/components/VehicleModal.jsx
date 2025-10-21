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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

  const InfoField = ({ label, value, children }) => (
    <Box sx={{ mb: 3 }}>
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
      {children || (
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: "0.95rem" }}
        >
          {value}
        </Typography>
      )}
    </Box>
  );

  return (
    <Dialog
      open={Boolean(vehicle)}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: isMobile ? 0 : 3 },
      }}
    >
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
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <InfoField label="✓ STATUS">
                <Chip
                  label={vehicle.status.replace("_", " ").toUpperCase()}
                  color={getStatusColor(vehicle.status)}
                  size="small"
                  sx={{ fontWeight: 700, textTransform: "uppercase" }}
                />
              </InfoField>

              <InfoField label="👤 DRIVER" value={vehicle.driverName} />

              <InfoField label="📍 DESTINATION" value={vehicle.destination} />

              <InfoField label="🔋 BATTERY LEVEL">
                <Box>
                  <Typography
                    variant="h6"
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
                      height: 8,
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

              <InfoField
                label="📞 PHONE"
                value={vehicle.driverPhone || "N/A"}
              />

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

              <InfoField label="⛽ FUEL LEVEL">
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        vehicle.fuelLevel > 20 ? "warning.main" : "error.main",
                      mb: 0.5,
                    }}
                  >
                    {vehicle.fuelLevel || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={vehicle.fuelLevel || 0}
                    sx={{
                      height: 8,
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

          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <InfoField
              label="🕐 LAST UPDATED"
              value={formatDateTime(vehicle.lastUpdated)}
            />
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default VehicleModal;
