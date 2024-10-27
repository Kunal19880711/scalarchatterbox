import React from "react";
import { useSelector } from "react-redux";
import NavBarView from "./NavBarView";

const NavBar = () => {
  const appName = "Chatter Box";
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);
  return <NavBarView appName={appName} roomName={focusedRoom} />;
};

export default NavBar;
