import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import SendIcon from "@mui/icons-material/Send";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import NotesIcon from "@mui/icons-material/Notes";
import Tooltip from "@mui/material/Tooltip";

const InputType = {
  SingleLine: "SingleLine",
  MultiLine: "MultiLine",
};

const SendMessageView = ({ sendMessage, focusedRoom }) => {
  const [messageContent, setMessageContent] = useState("");
  const [inputType, setInputType] = useState(InputType.SingleLine);
  const inputLabel = focusedRoom
    ? inputType === InputType.MultiLine
      ? "Send message (Press Ctrl/Cmd + Enter to send)"
      : "Send message"
    : "Please select room to send message";

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(messageContent);
    setMessageContent("");
  };

  const onChangeInputType = (e, newInputType) => setInputType(newInputType);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: { xs: "calc(100% - 25px)", md: "calc(100% - 275px)" },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        ml: { xs: 0, md: "245px" },
        backgroundColor: "#f5f6f7",
      }}
    >
      <ToggleButtonGroup
        value={inputType}
        exclusive
        onChange={onChangeInputType}
        aria-label="input type"
      >
        <Tooltip title="Single-line message" dir="top">
        <ToggleButton
          value={InputType.SingleLine}
          aria-label="single lined"
          sx={{ pt: 2, pr: 0.5, pb: 2, pl: 0.5 }}
        >
          <HorizontalRuleIcon />
        </ToggleButton>
        </Tooltip>
        <Tooltip title="Multi-line message" dir="top">
          <ToggleButton
            value={InputType.MultiLine}
            aria-label="multiple lined"
            sx={{ pt: 2, pr: 0.5, pb: 2, pl: 0.5 }}
          >
            <NotesIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <TextField
        name="message"
        fullWidth
        multiline={inputType === InputType.MultiLine}
        disabled={!focusedRoom}
        label={inputLabel}
        variant="outlined"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        onKeyDown={(event) => {
          if (
            inputType === InputType.MultiLine &&
            event.key === "Enter" &&
            (event.ctrlKey || event.metaKey)
          ) {
            onSubmit(event);
          }
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        aria-label="send message"
        edge="end"
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default SendMessageView;
