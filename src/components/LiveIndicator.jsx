import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { selectWebSocketConnected } from "../redux/slices/vehicleSlice";

const LiveIndicator = () => {
  const isConnected = useSelector(selectWebSocketConnected);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Fleet Tracking Dashboard
      </Typography>
      <Chip
        icon={
          <FiberManualRecordIcon
            sx={{
              fontSize: 12,
              animation: isConnected ? "pulse 2s infinite" : "none",
            }}
          />
        }
        label={isConnected ? "Live Updates: Active" : "Disconnected"}
        color={isConnected ? "success" : "default"}
        size="small"
        sx={{
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
