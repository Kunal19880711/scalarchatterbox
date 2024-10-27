import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ViewMembers from "./ViewMembers";

const RightPanelView = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      onClick={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <ViewMembers />
      </Box>
    </Drawer>
  );
};

export default RightPanelView;
