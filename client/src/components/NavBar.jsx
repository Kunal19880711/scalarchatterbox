import React from "react";
import { useSelector } from "react-redux";
import NavBarView from "./NavBarView";

const NavBar = () => {
  const appName = "WhisperHub";
  const { focusedRoom, isJoining } = useSelector((store) => store.focusedRoom);
  const identity = useSelector((store) => store.identity);
  return <NavBarView appName={appName} roomName={focusedRoom} username={identity} />;
};

export default NavBar;
