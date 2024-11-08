import React from "react";
import { useSelector } from "react-redux";
import ViewMembersView from "./ViewMembersView";

const ViewMembers = () => {
  const { focusedRoom, joinedRooms } = useSelector((store) => store.userData);
  const members =
    (joinedRooms.find((roomInfo) => roomInfo.name === focusedRoom) || {})
      .members || [];

  return <ViewMembersView members={members} />;
};

export default ViewMembers;
