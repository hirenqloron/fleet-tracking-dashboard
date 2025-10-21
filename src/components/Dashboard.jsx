import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveIndicator from "./LiveIndicator";
import StatusFilter from "./StatusFilter";
import FleetStatistics from "./FleetStatistics";
import VehicleTable from "./VehicleTable";
import VehicleModal from "./VehicleModal";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarContent = (
    <Box
      sx={{
        width:  380,
        bgcolor: "white",
        p: 3,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <LiveIndicator />
      <StatusFilter />
      <FleetStatistics />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 380,
              },
            }}
          >
            {sidebarContent}
          </Drawer>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: "primary.main" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
              <Container maxWidth="xl" disableGutters>
                <VehicleTable />
              </Container>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              width: 380,
              bgcolor: "white",
              borderRight: 1,
              borderColor: "divider",
              overflowY: "auto",
              boxShadow: 1,
            }}
          >
            {sidebarContent}
          </Box>
          <Box sx={{ flex: 1, p: 4, overflowY: "auto" }}>
            <Container maxWidth="xl">
              <VehicleTable />
            </Container>
          </Box>
        </>
      )}
      <VehicleModal />
    </Box>
  );
};

export default Dashboard;
