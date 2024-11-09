import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import CreateRoomView from "./CreateRoomView";
import { OutgoingMsg, IncomingFormResponseMsg } from "../common/contants";
import socket from "../ws/socketService";

const CreateRoom = () => {
  const [isRoomCreationSuccess, setIsRoomCreationSuccess] = useState(true);
  const dispatch = useDispatch();

  const onCreateRoom = (roomName) => {
    dispatch({
      type: OutgoingMsg.CreateRoom,
      payload: roomName,
    });
  };

  const formResponseListener = ({ success }) => {
    setIsRoomCreationSuccess(success);
  };

  useEffect(() => {
    socket.on(IncomingFormResponseMsg.RoomCreation, formResponseListener);
    return () =>
      socket.off(IncomingFormResponseMsg.RoomCreation, formResponseListener);
  }, [socket]);

  return (
    <CreateRoomView
      onCreateRoom={onCreateRoom}
      isRoomCreationSuccess={isRoomCreationSuccess}
    />
  );
};

export default CreateRoom;
