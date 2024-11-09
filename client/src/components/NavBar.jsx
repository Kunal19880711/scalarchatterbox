import React from "react";
import { useSelector } from "react-redux";
import NavBarView from "./NavBarView";
import { AppConsts } from "../common/constants";

const NavBar = () => {
  const { focusedRoom, identity, joinedRooms } = useSelector(
    (store) => store.userData
  );
  const members =
    (joinedRooms.find((roomInfo) => roomInfo.name === focusedRoom) || {})
      .members || [];
  const memberCnt = members.length;
  return (
    <NavBarView
      appName={AppConsts.AppName}
      roomName={focusedRoom}
      username={identity}
      memberCnt={memberCnt}
    />
  );
};

export default NavBar;
