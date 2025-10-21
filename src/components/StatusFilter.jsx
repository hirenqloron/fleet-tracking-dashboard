import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  setSelectedStatus,
  selectSelectedStatus,
  fetchVehicles,
  fetchVehiclesByStatus,
} from "../redux/slices/vehicleSlice";
import {
  selectStatistics,
  fetchStatistics,
} from "../redux/slices/statisticsSlice";

const StatusFilter = ({ onClose }) => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector(selectSelectedStatus);
  const statistics = useSelector(selectStatistics);

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
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 800,
          color: "text.primary",
          textTransform: "uppercase",
          fontSize: "0.9rem",
          letterSpacing: 0.5,
        }}
      >
        Filter by Status
      </Typography>

      <ToggleButtonGroup
        value={selectedStatus}
        exclusive
        onChange={handleChange}
        orientation="vertical"
        fullWidth
        sx={{
          "& .MuiToggleButton-root": {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            textTransform: "none",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 1, width: "100%" }}>
          <ToggleButton value="all" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>All</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {getStatusCount("all")}
              </Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="idle" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Idle</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {getStatusCount("idle")}
              </Typography>
            </Box>
          </ToggleButton>
        </Box>

        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <ToggleButton value="en_route" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>En Route</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {getStatusCount("en_route")}
              </Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="delivered" sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Delivered</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {getStatusCount("delivered")}
              </Typography>
            </Box>
          </ToggleButton>
        </Box>
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
