import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import socket from "../ws/socketService";
import CreateRoomView from "./CreateRoomView";
import {
  OutgoingMsg,
  IncomingFormResponseMsg,
  FormState,
} from "../common/constants";

const CreateRoom = () => {
  const [formState, setFormState] = useState(FormState.Success);
  const dispatch = useDispatch();

  const onCreateRoom = (roomName) => {
    setFormState(FormState.Pending);
    dispatch({
      type: OutgoingMsg.CreateRoom,
      payload: roomName,
    });
  };

  const formResponseListener = ({ success }) => {
    setFormState(success ? FormState.Success : FormState.Failed);
  };

  useEffect(() => {
    socket.on(IncomingFormResponseMsg.RoomCreation, formResponseListener);
    return () =>
      socket.off(IncomingFormResponseMsg.RoomCreation, formResponseListener);
  }, [socket]);

  return <CreateRoomView onCreateRoom={onCreateRoom} formState={formState} />;
};

export default CreateRoom;
