import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateRoom from "./CreateRoom";

const RoomsPanelView = ({
  joinedRooms,
  remainingRooms,
  focusedRoom,
  joinRoom,
  deleteRoom,
  changeRoom,
  leaveRoom,
}) => {
  const createJoinedRoomElement = (roomName) => (
    <Box
      key={roomName}
      component="li"
      sx={{
        display: "flex",
        alignItems: "center",
        p: 0.5,
        pr: 2.5,
        pl: 2,
        backgroundColor: () => (roomName === focusedRoom ? "lightgray" : null),
      }}
      onClick={() => changeRoom(roomName)}
    >
      <Typography variant="h6">{roomName}</Typography>
      <IconButton
        aria-label="leave room"
        sx={{ ml: "auto" }}
        onClick={(e) => {
          leaveRoom(roomName);
          e.stopPropagation();
        }}
      >
        <LogoutIcon />
      </IconButton>
      <IconButton
        aria-label="delete room"
        onClick={(e) => {
          deleteRoom(roomName);
          e.stopPropagation();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
  const createRemainingRoomElement = (roomName) => (
    <Box
      key={roomName}
      component="li"
      sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 2.5, pl: 2 }}
      onClick={() => joinRoom(roomName)}
    >
      <Typography variant="h6">{roomName}</Typography>
      <IconButton aria-label="join room" sx={{ ml: "auto" }} color="primary">
        <MeetingRoomIcon />
      </IconButton>
    </Box>
  );
  return (
    <Box
      sx={{
        mt: 2,
        width: "calc(100% - 2px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CreateRoom />
      <Divider />
      <Box
        component="ul"
        sx={{ m: 0, p: 0, listStyle: "none", flexGrow: 1, mt: 2, mb: 2 }}
      >
        {joinedRooms.map(createJoinedRoomElement)}
      </Box>
      <Divider />
      <Box
        component="ul"
        sx={{ m: 0, p: 0, listStyle: "none", flexGrow: 1, mt: 2 }}
      >
        {remainingRooms.map(createRemainingRoomElement)}
      </Box>
    </Box>
  );
};

export default RoomsPanelView;
