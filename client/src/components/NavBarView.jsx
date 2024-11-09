import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import LeftPanelView from "./LeftPanelView";
import RightPanelView from "./RightPanelView";
import Badge from "@mui/material/Badge";

const NavBarView = ({ appName, roomName, username, memberCnt }) => {
  const [showLeftPanel, setLeftPanel] = useState(false);
  const [viewMembers, setViewMembers] = useState(false);

  const openLeftPanel = () => setLeftPanel(true);
  const closeLeftPanel = () => setLeftPanel(false);
  const openViewMembers = () => setViewMembers(true);
  const closeViewMembers = () => setViewMembers(false);

  return (
    <>
      <AppBar
        position="fixed"
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="whisperhub logo"
            sx={{
              display: { xs: "none", md: "flex" },
              p: 0.5,
            }}
          >
            <img
              src="/WhisperHub.svg"
              alt="WhisperHub"
              style={{ width: "2em", height: "2em" }}
            />
          </IconButton>
          <Typography
            variant="subtitle1"
            noWrap
            component="header"
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appName}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              flexDirection: "row",
              justifyContent: { xs: "start", md: "center" },
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="h2"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                pr: 18,
              }}
            >
              {username}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: 1,
              display: { xs: "flex" },
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            {roomName && (
              <>
                <Typography
                  variant="body1"
                  noWrap
                  component="div"
                  sx={{
                    mt: 1,
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
                  <Badge badgeContent={memberCnt} color="success">
                    <GroupsIcon />
                  </Badge>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <LeftPanelView open={showLeftPanel} onClose={closeLeftPanel} />
      <RightPanelView open={viewMembers} onClose={closeViewMembers} />
    </>
  );
};

export default NavBarView;
