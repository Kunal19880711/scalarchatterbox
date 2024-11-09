import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomPanelView from "./RoomsPanelView";
import { OutgoingMsg } from "../common/constants";
import { setFocusedRoom } from "../redux/userDataSlice";

const RoomPanel = () => {
  const dispatch = useDispatch();

  const allRooms = useSelector((store) => store.allRooms);
  const { focusedRoom, joinedRooms: joinedRoomsList } = useSelector(
    (store) => store.userData
  );

  const joinedRooms = joinedRoomsList.map(({ name }) => name);
  const joinedRoomsSet = new Set(joinedRooms);
  const remainingRooms = allRooms.filter((room) => !joinedRoomsSet.has(room));

  const joinRoom = (roomName) => {
    dispatch({ type: OutgoingMsg.JoinRoom, payload: roomName });
  };

  const deleteRoom = (roomName) => {
    dispatch({ type: OutgoingMsg.DeleteRoom, payload: roomName });
  };

  const changeRoom = (roomName) => {
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
