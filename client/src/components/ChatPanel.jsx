import React from "react";
import { useSelector } from "react-redux";
import ChatPanelView from "./ChatPanelView";

const ChatPanel = () => {
  const { focusedRoom, identity, joinedRooms } = useSelector(
    (store) => store.userData
  );
  const chats =
    (joinedRooms.find((roomInfo) => roomInfo.name === focusedRoom) || {})
      .chats || [];
  return <ChatPanelView chats={chats} identity={identity} />;
};

export default ChatPanel;
