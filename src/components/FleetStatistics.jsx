import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  fetchStatistics,
  selectStatistics,
} from "../redux/slices/statisticsSlice";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const FleetStatistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const StatCard = ({ icon, value, label, color, bgColor }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        textAlign: "center",
        borderRadius: 2,
        bgcolor: bgColor,
        border: "2px solid",
        borderColor: color,
        transition: "all 0.3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 120,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
          borderColor: color,
        },
      }}
    >
      <Box sx={{ color: color, mb: 1 }}>{icon}</Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 0.5 }}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: color,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );

  return (
    <Box>
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
        Fleet Statistics
      </Typography>
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <StatCard
            icon={<DirectionsCarIcon sx={{ fontSize: 32 }} />}
            value={statistics?.total || 0}
            label="Total"
            color="#1976d2"
            bgColor="#e3f2fd"
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            icon={<SpeedIcon sx={{ fontSize: 32 }} />}
            value={statistics?.average_speed || 0}
            label="Avg Speed"
            color="#0288d1"
            bgColor="#e1f5fe"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
            value={statistics?.delivered || 0}
            label="Delivered"
            color="#2e7d32"
            bgColor="#e8f5e9"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            icon={<LocalShippingIcon sx={{ fontSize: 28 }} />}
            value={statistics?.en_route || 0}
            label="En Route"
            color="#0288d1"
            bgColor="#e1f5fe"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            icon={<PauseCircleIcon sx={{ fontSize: 28 }} />}
            value={statistics?.idle || 0}
            label="Idle"
            color="#ed6c02"
            bgColor="#fff4e5"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FleetStatistics;
