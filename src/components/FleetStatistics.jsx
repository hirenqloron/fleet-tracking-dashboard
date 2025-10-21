import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  fetchStatistics,
  selectStatistics,
} from "../redux/slices/statisticsSlice";

const FleetStatistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 3 }}>
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
              {statistics?.total || 0}
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
              {statistics?.average_speed || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Avg Speed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "success.main" }}
            >
              {statistics?.delivered || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Delivered
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "info.main" }}
            >
              {statistics?.en_route || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              En Route
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              {statistics?.idle || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Idle
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FleetStatistics;
