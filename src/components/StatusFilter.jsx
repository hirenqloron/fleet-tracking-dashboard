import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
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

  const statuses = [
    { value: "all", label: "All" },
    { value: "idle", label: "Idle" },
    { value: "en route", label: "En Route" },
    { value: "delivered", label: "Delivered" },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "text.primary",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: 1,
        }}
      >
        Filter by Status
      </Typography>
      <List sx={{ bgcolor: "background.paper", borderRadius: 2, p: 0.5 }}>
        {statuses.map((status) => (
          <ListItemButton
            key={status.value}
            selected={selectedStatus === status.value}
            onClick={() => dispatch(setSelectedStatus(status.value))}
            sx={{
              py: 1.5,
              borderRadius: 1.5,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "& .MuiChip-root": {
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 700,
                },
              },
            }}
          >
            <ListItemText
              primary={status.label}
              primaryTypographyProps={{
                fontWeight: selectedStatus === status.value ? 700 : 500,
              }}
            />
            <Chip
              label={getStatusCount(status.value)}
              size="small"
              sx={{
                fontWeight: 600,
                minWidth: 32,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default StatusFilter;
