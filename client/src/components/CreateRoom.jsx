import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import CreateRoomView from "./CreateRoomView";
import { OutgoingMsg, IncomingFormResultMsg } from "../common/contants";
import socket from "../ws/socketService";

const CreateRoom = () => {
  const [roomCreationErr, setRoomCreationErr] = useState(null);
  const dispatch = useDispatch();

  const onCreateRoom = (roomName) => {
    dispatch({
      type: OutgoingMsg.CreateRoom,
      payload: roomName,
    });
  };

  const errorListener = useCallback(({ error }) => {
    setRoomCreationErr(error);
  }, []);

  useEffect(() => {
    socket.on(IncomingFormResultMsg.RoomCreationResult, errorListener);
    return () =>
      socket.off(IncomingFormResultMsg.RoomCreationResult, errorListener);
  }, [socket]);

  return (
    <CreateRoomView
      onCreateRoom={onCreateRoom}
      roomCreationErr={roomCreationErr}
    />
  );
};

export default CreateRoom;
