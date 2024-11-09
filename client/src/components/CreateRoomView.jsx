import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const CreateRoomView = ({ onCreateRoom }) => {
  const [newRoomName, setNewRoomName] = useState("");
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onCreateRoom(formData.get("room-name"));
        setNewRoomName("");
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
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      <IconButton type="submit" aria-label="create room">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CreateRoomView;
