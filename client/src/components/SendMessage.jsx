import React from "react";
import SendMessageView from "./SendMessageView";
import { useDispatch, useSelector } from "react-redux";
import { OutgoingMsg } from "../common/contants";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);

  const sendMessage = (message) => {
    console.log(`message send on [${focusedRoom}]:${message}`);
    dispatch({
      type: OutgoingMsg.SendMessage,
      payload: { room: focusedRoom, message },
    });
  };
  return <SendMessageView sendMessage={sendMessage} />;
};

export default SendMessage;
