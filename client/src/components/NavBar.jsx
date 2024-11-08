import React from "react";
import { useSelector } from "react-redux";
import NavBarView from "./NavBarView";

const NavBar = () => {
  const appName = "WhisperHub";
  const { focusedRoom, identity } = useSelector((store) => store.userData);
  return (
    <NavBarView appName={appName} roomName={focusedRoom} username={identity} />
  );
};

export default NavBar;
