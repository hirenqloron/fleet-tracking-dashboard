import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import {
  setSelectedStatus,
  selectSelectedStatus,
  fetchVehicles,
  fetchVehiclesByStatus,
  selectWebSocketConnected,
} from "../redux/slices/vehicleSlice";
import {
  selectStatistics,
  fetchStatistics,
} from "../redux/slices/statisticsSlice";

const StatusFilter = ({ onClose }) => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector(selectSelectedStatus);
  const statistics = useSelector(selectStatistics);
  const isConnected = useSelector(selectWebSocketConnected);

  const getStatusCount = (status) => {
    if (!statistics) return 0;

    switch (status) {
      case "all":
        return statistics.total || 0;
      case "idle":
        return statistics.idle || 0;
      case "en_route":
        return statistics.en_route || 0;
      case "delivered":
        return statistics.delivered || 0;
      default:
        return 0;
    }
  };

  const handleChange = (event, newStatus) => {
    if (newStatus !== null) {
      dispatch(setSelectedStatus(newStatus));

      if (newStatus === "all") {
        dispatch(fetchVehicles());
      } else {
        dispatch(fetchVehiclesByStatus(newStatus));
      }

      dispatch(fetchStatistics());

      if (onClose) onClose();
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          border: "2px solid",
          borderColor: isConnected ? "success.main" : "grey.300",
          borderRadius: 2,
          py: 2,
          px: 3,
          mb: 3,
          bgcolor: "white",
        }}
      >
        <WifiIcon
          sx={{
            color: isConnected ? "success.main" : "grey.400",
            fontSize: 18,
          }}
        />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.8rem",
            color: isConnected ? "success.main" : "grey.400",
          }}
        >
          Live Updates {isConnected ? "Active" : "Inactive"}
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
          fontSize: "0.8rem",
          letterSpacing: 0.5,
        }}
      >
        Filter By Status
      </Typography>

      <ToggleButtonGroup
        value={selectedStatus}
        exclusive
        onChange={handleChange}
        orientation="vertical"
        fullWidth
        sx={{
          "& .MuiToggleButton-root": {
            border: "2px solid",
            borderColor: "divider",
            borderRadius: 2,
            textTransform: "none",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            bgcolor: "white",
            color: "text.primary",
            "&.Mui-selected": {
              bgcolor: "white",
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": {
                bgcolor: "rgba(25, 118, 210, 0.04)",
              },
            },
            "&:hover": {
              bgcolor: "grey.50",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 1, width: "100%" }}>
          <ToggleButton value="all" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Radio
                  checked={selectedStatus === "all"}
                  sx={{
                    p: 0,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontWeight: 400 }}>All</Typography>
              </Box>
              <Typography sx={{ fontWeight: 500 }}>
                ({getStatusCount("all")})
              </Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="idle" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Radio
                  checked={selectedStatus === "idle"}
                  sx={{
                    p: 0,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontWeight: 400 }}>Idle</Typography>
              </Box>
              <Typography sx={{ fontWeight: 500 }}>
                ({getStatusCount("idle")})
              </Typography>
            </Box>
          </ToggleButton>
        </Box>

        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <ToggleButton value="en_route" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Radio
                  checked={selectedStatus === "en_route"}
                  sx={{
                    p: 0,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontWeight: 400 }}>En Route</Typography>
              </Box>
              <Typography sx={{ fontWeight: 500 }}>
                ({getStatusCount("en_route")})
              </Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="delivered" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Radio
                  checked={selectedStatus === "delivered"}
                  sx={{
                    p: 0,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontWeight: 400 }}>Delivered</Typography>
              </Box>
              <Typography sx={{ fontWeight: 500 }}>
                ({getStatusCount("delivered")})
              </Typography>
            </Box>
          </ToggleButton>
        </Box>
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
