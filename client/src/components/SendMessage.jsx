import React from "react";
import SendMessageView from "./SendMessageView";
import { useDispatch, useSelector } from "react-redux";
import { OutgoingMsg } from "../common/constants";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { focusedRoom } = useSelector((store) => store.userData);

  const sendMessage = (message) => {
    dispatch({
      type: OutgoingMsg.SendMessage,
      payload: { room: focusedRoom, message },
    });
  };
  return (
    <SendMessageView sendMessage={sendMessage} focusedRoom={focusedRoom} />
  );
};

export default SendMessage;
