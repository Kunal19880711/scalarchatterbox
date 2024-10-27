import React from "react";
import CreateRoomView from "./CreateRoomView";

const CreateRoom = () => {
  const onCreateRoom = (roomName) => {
    console.log(roomName);
  };

  return <CreateRoomView onCreateRoom={onCreateRoom} />;
};

export default CreateRoom;
