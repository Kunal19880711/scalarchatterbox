import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import RoomsPanel from "./RoomsPanel";
import Drawer from "@mui/material/Drawer";

const LeftPanelView = ({ open, onClose }) => {
  const leftPanel = (
    <Box sx={{ width: "100%" }}>
      <Toolbar />
      <Divider />
      <RoomsPanel />
    </Box>
  );
  return (
  <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {leftPanel}
      </Drawer>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {leftPanel}
      </Drawer>
    </>
  );
};

export default LeftPanelView;
