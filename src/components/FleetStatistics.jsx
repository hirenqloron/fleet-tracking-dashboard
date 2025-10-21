import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { selectStatistics } from "../redux/slices/statisticsSlice";
import { selectLastUpdated } from "../redux/slices/vehicleSlice";

const FleetStatistics = () => {
  const statistics = useSelector(selectStatistics);
  const lastUpdated = useSelector(selectLastUpdated);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const seconds = Math.floor((Date.now() - new Date(lastUpdated)) / 1000);
        setTimeSinceUpdate(seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  const formatTime = (dateString) => {
    if (!dateString) return "--:--";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatTimeSince = (seconds) => {
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  const getNextUpdateTime = () => {
    const remainingSeconds = 180 - (timeSinceUpdate % 180);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    if (minutes > 0) return `~${minutes} minutes`;
    return `~${seconds} seconds`;
  };

  const calculateMovingPercentage = () => {
    if (!statistics?.total || statistics.total === 0) return 0;
    const moving = statistics.en_route || 0;
    return Math.round((moving / statistics.total) * 100);
  };

  const StatItem = ({ value, label }) => (
    <Box
      sx={{
        textAlign: "center",
        flex: 1,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "6px",
      }}
    >
      <Typography 
        variant="h5"
        sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: "text.secondary",
          fontSize: "0.65rem",
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 3,
          fontWeight: 800,
          color: "text.primary",
          textTransform: "uppercase",
          fontSize: "0.9rem",
          letterSpacing: 0.5,
        }}
      >
        Fleet Statistics
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <StatItem value={statistics?.total || 0} label="Total Fleet" />
        <StatItem value={statistics?.average_speed || 0} label="Avg Speed" />
      </Box>

      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <StatItem value={calculateMovingPercentage()} label="% Moving" />
        <StatItem value={formatTime(lastUpdated)} label="Last Update" />
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 2,
          color: "text.secondary",
          fontSize: "0.7rem",
          textAlign: "center",
        }}
      >
        Updated {formatTimeSince(timeSinceUpdate)} • Next update in{" "}
        {getNextUpdateTime()}
      </Typography>
    </Box>
  );
};

export default FleetStatistics;
