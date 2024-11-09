import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../ws/socketService";
import LoginView from "./LoginView";
import {
  AppConsts,
  OutgoingMsg,
  IncomingFormResponseMsg,
  FormState,
} from "../common/constants";

const Login = () => {
  const [formState, setFormState] = useState(FormState.Success);
  const dispatch = useDispatch();
  const { identity } = useSelector((state) => state.userData);

  const setUsername = (identity) => {
    setFormState(FormState.Pending);
    dispatch({
      type: OutgoingMsg.SetIdentity,
      payload: identity,
    });
  };

  const formResponseListener = ({ success }) => {
    setFormState(success ? FormState.Success : FormState.Failed);
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
      formState={formState}
    />
  );
};

export default Login;
