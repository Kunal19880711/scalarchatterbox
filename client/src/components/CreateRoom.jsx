import React from "react";
import { useDispatch } from "react-redux";
import CreateRoomView from "./CreateRoomView";
import { OutgoingMsg } from "../common/contants";

const CreateRoom = () => {
  const dispatch = useDispatch();

  const onCreateRoom = (roomName) => {
    dispatch({
      type: OutgoingMsg.CreateRoom,
      payload: roomName
    })
  };

  return <CreateRoomView onCreateRoom={onCreateRoom} />;
};

export default CreateRoom;
