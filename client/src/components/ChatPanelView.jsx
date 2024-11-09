import "./ChatPanelView.css";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { yellow } from "@mui/material/colors";
import { Toolbar } from "@mui/material";

const ChatPanelView = ({ chats, identity }) => {
  const msgEndRef = useRef();

  const createChat = ({ name, content, time }, index) => {
    const chatTime = new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const chatBubbleClass = `chat-bubble ${
      name === identity && "self-chat-bubble"
    }`;
    const extraBubbleStyle = {};
    if (name === identity) {
      extraBubbleStyle.backgroundColor = yellow[300];
    }
    return (
      <div key={index} className={chatBubbleClass} style={extraBubbleStyle}>
        <div className="chat-bubble-title">{name}</div>
        <div className="chat-bubble-content">{content}</div>
        <div className="chat-bubble-time">{chatTime}</div>
      </div>
    );
  };

  useEffect(() => {
    msgEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ml: { xs: 0, md: "275px" },
          mt: 1,
          maxWidth: "xl",
          mb: 12.5,
          pb: 12.5,
          overflow: scroll,
        }}
      >
        {chats.map(createChat)}
        <div ref={msgEndRef} />
      </Box>
    </>
  );
};

export default ChatPanelView;
