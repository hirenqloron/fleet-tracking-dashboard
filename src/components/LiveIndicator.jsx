import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { selectWebSocketConnected } from "../redux/slices/vehicleSlice";

const LiveIndicator = () => {
  const isConnected = useSelector(selectWebSocketConnected);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 700, fontSize: "1.1rem" }}
      >
        🚚 Fleet Tracking Dashboard
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: "0.7rem",
          mb: 1,
          display: "block",
        }}
      >
        Real-time vehicle monitoring • Logisticar Case Study
      </Typography>
      <Chip
        icon={
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              animation: isConnected ? "pulse 2s infinite" : "none",
            }}
          />
        }
        label="Live Updates Active"
        color={isConnected ? "success" : "default"}
        size="small"
        sx={{
          fontSize: "0.7rem",
          height: 24,
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
        }}
      />
    </Box>
  );
};

export default LiveIndicator;
