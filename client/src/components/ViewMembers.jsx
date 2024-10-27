import React from "react";
import { useSelector } from "react-redux";
import ViewMembersView from "./ViewMembersView";

const ViewMembers = () => {
  const joinedRooms = useSelector((store) => store.joinedRooms);
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);
  const members =
    (joinedRooms.find((roomInfo) => roomInfo.name === focusedRoom) || {})
      .members || [];

  return <ViewMembersView members={members} />;
};

export default ViewMembers;
