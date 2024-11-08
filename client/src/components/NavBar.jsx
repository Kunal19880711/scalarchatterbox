import React from "react";
import { useSelector } from "react-redux";
import NavBarView from "./NavBarView";
import { AppConsts } from "../common/contants";

const NavBar = () => {
  const { focusedRoom, identity } = useSelector((store) => store.userData);
  return (
    <NavBarView
      appName={AppConsts.AppName}
      roomName={focusedRoom}
      username={identity}
    />
  );
};

export default NavBar;
