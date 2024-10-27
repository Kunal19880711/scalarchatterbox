import React from "react";
import RoomPanelView from "./RoomsPanelView";

const joinedRooms = ["alpha", "bravo", "charlie"];
const remainingRooms = ["omega", "theeta", "gamma"];

const RoomPanel = () => {
  return (
    <RoomPanelView joinedRooms={joinedRooms} remainingRooms={remainingRooms} />
  );
};

export default RoomPanel;
