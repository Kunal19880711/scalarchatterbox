import "./ChatPanelView.css";
import React from "react";
import Box from "@mui/material/Box";

const ChatPanelView = ({ chats, identity }) => {
  const createChat = ({ name, content }, index) => {
    const chatStyle = {};
    if(name === identity) {
      chatStyle.alignSelf = "flex-end";
      chatStyle.alignItems = "flex-end";
    }
    return (
      <div key={index} className="chat-bubble" style={chatStyle}>
        <div className="chat-bubble-title">{name}</div>
        <div>{content}</div>
      </div>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ml: { xs: 0, md: "275px" },
          mt: 1,
          maxWidth: "xl",
        }}
      >
        {chats.map(createChat)}
      </Box>
    </>
  );
};

export default ChatPanelView;
