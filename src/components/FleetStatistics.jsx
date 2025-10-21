import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  fetchStatistics,
  selectStatistics,
} from "../redux/slices/statisticsSlice";
import { selectAllVehicles } from "../redux/slices/vehicleSlice";

const FleetStatistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const vehicles = useSelector(selectAllVehicles);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const calculateStats = () => {
    const total = vehicles.length;
    const avgSpeed =
      vehicles.reduce((acc, v) => acc + (parseFloat(v.speed) || 0), 0) /
      (total || 1);

    return {
      total,
      avgSpeed: avgSpeed.toFixed(1),
    };
  };

  const stats = calculateStats();

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, fontWeight: 600, color: "text.secondary" }}
      >
        Fleet Statistics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {stats.total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Fleet
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {stats.avgSpeed}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Avg Speed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FleetStatistics;
