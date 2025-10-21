import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { selectWebSocketConnected } from "../redux/slices/vehicleSlice";

const LiveIndicator = () => {
  const isConnected = useSelector(selectWebSocketConnected);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 0.5,
          fontWeight: 700,
          fontSize: "1.125rem",
          color: "text.primary",
        }}
      >
        🚚 Fleet Tracking Dashboard
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          display: "block",
          lineHeight: 1.5,
        }}
      >
        Real-time vehicle monitoring • Logisticar Case Study
      </Typography>
    </Box>
  );
};

export default LiveIndicator;
