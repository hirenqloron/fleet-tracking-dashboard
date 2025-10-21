import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
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

  const calculateMovingCount = () => {
    return statistics?.en_route || 0;
  };

  const StatCard = ({ icon, value, label }) => (
    <Box
      sx={{
        flex: 1,
        border: "2px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1.5,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.75,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          fontSize: "1.75rem",
        }}
      >
        {value}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            color: "text.secondary",
            fontSize: "0.688rem",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center",  mb: 2.5 }}>
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
          Fleet Statistics
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <StatCard
          icon={<PeopleIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
          value={statistics?.total || 0}
          label="Total Fleet"
        />
        <StatCard
          icon={
            <TrendingUpIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          }
          value={statistics?.average_speed || 0}
          label="Avg Speed"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <StatCard
          icon={
            <ShowChartIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          }
          value={calculateMovingCount()}
          label="Moving"
        />
        <StatCard
          icon={
            <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          }
          value={formatTime(lastUpdated)}
          label="Last Update"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          mt: 1.5,
        }}
      >
        <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          Updated {formatTimeSince(timeSinceUpdate)} • Next update in{" "}
          {getNextUpdateTime()}
        </Typography>
      </Box>
    </Box>
  );
};

export default FleetStatistics;
