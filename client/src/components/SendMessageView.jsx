import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const SendMessageView = ({ sendMessage }) => {
  const [messageContent, setMessageContent] = useState("");

  const onSendBtnClick = () => {
    sendMessage(messageContent);
    setMessageContent("");
  };

  return (
    <Box
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
      <TextField
        fullWidth
        multiline
        label="Send message (Press Ctrl/Cmd + Enter to send)"
        variant="outlined"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        sx={{ marginBottom: 2 }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            onSendBtnClick();
          }
        }}
      />
      <IconButton
        onClick={onSendBtnClick}
        color="primary"
        aria-label="send message"
        edge="end"
        sx={{ mb: 1 }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default SendMessageView;
