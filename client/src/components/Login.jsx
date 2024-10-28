import React from "react";
import { useDispatch } from "react-redux";
import LoginView from "./LoginView";
import { OutgoingMsg } from "../common/contants";

const Login = () => {
  const dispatch = useDispatch();

  const setUsername = (identity) => {
    dispatch({
      type: OutgoingMsg.SetIdentity,
      payload: identity,
    });
  };

  return <LoginView setIdentity={setUsername} />;
};

export default Login;
