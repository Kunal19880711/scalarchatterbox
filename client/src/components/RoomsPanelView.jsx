import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CreateRoom from "./CreateRoom";

const RoomsPanelView = ({ joinedRooms, remainingRooms }) => {

  const createJoinedRoomElement = (roomName) => (
    <Box
      key={roomName}
      component="li"
      sx={{ display: "flex", alignItems: "center", p: 0.5, mr: 2 }}
    >
      <Typography variant="h6">{roomName}</Typography>
      <IconButton
        aria-label="delete room"
        sx={{ ml: "auto" }}
        onClick={() => console.log(`delete room ${roomName}`)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
  const createRemainingRoomElement = (roomName) => (
    <Box
      key={roomName}
      component="li"
      sx={{ display: "flex", alignItems: "center", p: 0.5, mr: 2 }}
      onClick={() => console.log(`join room ${roomName}`)}
    >
      <Typography variant="h6">{roomName}</Typography>
      <IconButton aria-label="delete room" sx={{ ml: "auto" }}>
        <MeetingRoomIcon />
      </IconButton>
    </Box>
  );
  return (
    <Box
      sx={{
        ml: 2,
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
