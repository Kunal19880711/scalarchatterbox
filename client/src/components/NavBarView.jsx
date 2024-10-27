import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import LeftPanelView from "./LeftPanelView";
import RightPanelView from "./RightPanelView";

const NavBarView = ({ appName, roomName }) => {
  const [showLeftPanel, setLeftPanel] = React.useState(false);
  const [viewMembers, setViewMembers] = React.useState(false);

  const openLeftPanel = () => setLeftPanel(true);
  const closeLeftPanel = () => setLeftPanel(false);
  const openViewMembers = () => setViewMembers(true);
  const closeViewMembers = () => setViewMembers(false);

  return (
    <>
      <AppBar
        position="sticky"
        component="nav"
        sx={{
          zIndex: 1400,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openLeftPanel}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="header"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              paddingLeft: "1em",
            }}
          >
            {appName}
          </Typography>
          {roomName && (
            <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
              <Typography
                variant="body1"
                noWrap
                component="div"
                sx={{
                  mt: 1,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {roomName}
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={openViewMembers}
                sx={{ ml: 1, display: { xs: "flex" } }}
              >
                <GroupsIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <LeftPanelView open={showLeftPanel} onClose={closeLeftPanel} />
      <RightPanelView open={viewMembers} onClose={closeViewMembers} />
    </>
  );
};

export default NavBarView;
