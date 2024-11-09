import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

const CreateRoomView = ({ onCreateRoom, roomCreationErr }) => {
  const [newRoomName, setNewRoomName] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const onRoomNameChange = (e) => {
    setNewRoomName(e.target.value);
    setShowErrorMessage(false);
  };

  useEffect(() => {
    if (!roomCreationErr) {
      setNewRoomName("");
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  }, [roomCreationErr]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onCreateRoom(formData.get("room-name"));
        }}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexGrow: 0,
          paddingBottom: 1,
          mr: 2,
          ml: 2,
        }}
      >
        <TextField
          name="room-name"
          label="Create Room"
          variant="standard"
          sx={{ mr: 1 }}
          value={newRoomName}
          onChange={onRoomNameChange}
        />
        <IconButton type="submit" aria-label="create room">
          <AddIcon />
        </IconButton>
      </Box>
      {showErrorMessage && (
        <Typography
          component="p"
          variant="subtitle2"
          color="error"
          sx={{ fontSize: "small", pl: 2, pr: 2 }}
        >
          Room {newRoomName} already exists! Use different name.
        </Typography>
      )}
    </Box>
  );
};

export default CreateRoomView;
