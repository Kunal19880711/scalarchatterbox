import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomPanelView from "./RoomsPanelView";
import { OutgoingMsg } from "../common/contants";
import { setFocusedRoom } from "../redux/focusedRoomSlice";

const RoomPanel = () => {
  const dispatch = useDispatch();

  const allRooms = useSelector((store) => store.allRooms);
  const joinedRoomsList = useSelector((store) => store.joinedRooms);
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);

  const joinedRooms = joinedRoomsList.map(({ name }) => name);
  const joinedRoomsSet = new Set(joinedRooms);
  const remainingRooms = allRooms.filter((room) => !joinedRoomsSet.has(room));

  const joinRoom = (roomName) => {
    dispatch({ type: OutgoingMsg.JoinRoom, payload: roomName });
  };

  const deleteRoom = (roomName) => {
    console.log("delete room", roomName);
    dispatch({ type: OutgoingMsg.DeleteRoom, payload: roomName });
  };

  const changeRoom = (roomName) => {
    console.log("change room", roomName);
    dispatch(
      setFocusedRoom({
        focusedRoom: roomName,
        isJoining: false,
      })
    );
  };

  const leaveRoom = (roomName) => {
    dispatch({ type: OutgoingMsg.LeaveRoom, payload: roomName });
  };

  return (
    <RoomPanelView
      joinedRooms={joinedRooms}
      remainingRooms={remainingRooms}
      focusedRoom={focusedRoom}
      joinRoom={joinRoom}
      deleteRoom={deleteRoom}
      changeRoom={changeRoom}
      leaveRoom={leaveRoom}
    />
  );
};

export default RoomPanel;
