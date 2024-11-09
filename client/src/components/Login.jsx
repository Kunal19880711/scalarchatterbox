import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginView from "./LoginView";
import { AppConsts, OutgoingMsg } from "../common/contants";

const Login = () => {
  const dispatch = useDispatch();
  const { identity } = useSelector((state) => state.userData);

  const setUsername = (identity) => {
    dispatch({
      type: OutgoingMsg.SetIdentity,
      payload: identity,
    });
  };

  return (
    <LoginView
      identity={identity}
      setIdentity={setUsername}
      appName={AppConsts.AppName}
    />
  );
};

export default Login;
