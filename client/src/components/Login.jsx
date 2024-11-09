import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../ws/socketService";
import LoginView from "./LoginView";
import {
  AppConsts,
  OutgoingMsg,
  IncomingFormResponseMsg,
} from "../common/contants";

const Login = () => {
  const [isUserCreationSuccess, setIsUserCreationSuccess] = useState(true);
  const dispatch = useDispatch();
  const { identity } = useSelector((state) => state.userData);

  const setUsername = (identity) => {
    dispatch({
      type: OutgoingMsg.SetIdentity,
      payload: identity,
    });
  };

  const formResponseListener = ({ success }) => {
    setIsUserCreationSuccess(success);
  };

  useEffect(() => {
    socket.on(IncomingFormResponseMsg.UserCreation, formResponseListener);
    return () =>
      socket.off(IncomingFormResponseMsg.UserCreation, formResponseListener);
  }, [socket]);

  return (
    <LoginView
      identity={identity}
      setIdentity={setUsername}
      appName={AppConsts.AppName}
      isUserCreationSuccess={isUserCreationSuccess}
    />
  );
};

export default Login;
