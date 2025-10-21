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
  selectAllVehicles,
} from "../redux/slices/vehicleSlice";

const StatusFilter = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectAllVehicles) || [];
  const selectedStatus = useSelector((state) => state.vehicles.selectedStatus);

  const getStatusCount = (status) => {
    if (!Array.isArray(vehicles)) return 0;
    if (status === "all") return vehicles.length;
    return vehicles.filter(
      (v) => v.status && v.status.toLowerCase() === status.toLowerCase()
    ).length;
  };

  const handleChange = (event, newStatus) => {
    if (newStatus !== null) {
      dispatch(setSelectedStatus(newStatus));
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "text.primary",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          letterSpacing: 0.5,
        }}
      >
        ⚡ Filter by Status
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
            mb: 0.5,
            py: 1.5,
            px: 2,
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
        <ToggleButton value="all">
          <Typography sx={{ fontWeight: 500 }}>All</Typography>
          <Chip
            label={getStatusCount("all")}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </ToggleButton>
        <ToggleButton value="idle">
          <Typography sx={{ fontWeight: 500 }}>Idle</Typography>
          <Chip
            label={getStatusCount("idle")}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </ToggleButton>
        <ToggleButton value="en_route">
          <Typography sx={{ fontWeight: 500 }}>En Route</Typography>
          <Chip
            label={getStatusCount("en_route")}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </ToggleButton>
        <ToggleButton value="delivered">
          <Typography sx={{ fontWeight: 500 }}>Delivered</Typography>
          <Chip
            label={getStatusCount("delivered")}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
