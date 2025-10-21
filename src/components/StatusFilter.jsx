import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
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

const StatusFilter = () => {
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
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              "& .MuiChip-root": {
                bgcolor: "white",
                color: "primary.main",
              },
            },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
          <ToggleButton
            value="all"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              minWidth: "40px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>All</Typography>
            <Chip
              label={getStatusCount("all")}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </ToggleButton>
          <ToggleButton
            value="idle"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              minWidth: 0,
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Idle</Typography>
            <Chip
              label={getStatusCount("idle")}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </ToggleButton>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <ToggleButton
            value="en_route"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              minWidth: 20,
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>En Route</Typography>
            <Chip
              label={getStatusCount("en_route")}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </ToggleButton>
          <ToggleButton
            value="delivered"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              minWidth: 20,
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Delivered</Typography>
            <Chip
              label={getStatusCount("delivered")}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </ToggleButton>
        </Box>
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
