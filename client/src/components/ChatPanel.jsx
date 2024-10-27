import React from "react";
import { useSelector } from "react-redux";
import ChatPanelView from "./ChatPanelView";

const ChatPanel = () => {
  const identity = useSelector((store) => store.identity);
  const joinedRooms = useSelector((store) => store.joinedRooms);
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);
  const chats =
    (joinedRooms.find((roomInfo) => roomInfo.name === focusedRoom) || {})
      .chats || [];
  return <ChatPanelView chats={chats} identity={identity} />;
};

export default ChatPanel;
