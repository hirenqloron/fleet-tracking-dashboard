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
import CloseIcon from "@mui/icons-material/Close";
import LiveIndicator from "./LiveIndicator";
import StatusFilter from "./StatusFilter";
import FleetStatistics from "./FleetStatistics";
import VehicleTable from "./VehicleTable";
import VehicleModal from "./VehicleModal";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  const sidebarContent = (
    <Box
      sx={{
        width: 420,
        bgcolor: "white",
        p: 3,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <StatusFilter onClose={closeDrawer} />
      <FleetStatistics />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "white",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "primary.main", mb: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <LiveIndicator />
      </Box>

      <Box sx={{ display: "flex", flex: 1 }}>
        {isMobile ? (
          <>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={closeDrawer}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: 420,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <IconButton onClick={closeDrawer}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {sidebarContent}
            </Drawer>
            <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>
              <Container maxWidth="xl" disableGutters>
                <VehicleTable />
              </Container>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: 420,
                bgcolor: "white",
                borderRight: 1,
                borderColor: "divider",
                overflowY: "auto",
                boxShadow: 1,
              }}
            >
              {sidebarContent}
            </Box>
            <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>
              <Container maxWidth="xl">
                <VehicleTable />
              </Container>
            </Box>
          </>
        )}
      </Box>

      <VehicleModal />
    </Box>
  );
};

export default Dashboard;
