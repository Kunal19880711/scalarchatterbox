import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatPanel from "./ChatPanel";
import NavBar from "./NavBar";
import SendMessage from "./SendMessage";
import Login from "./Login";
import { IncomingMsg } from "../common/contants";

function AppBody() {
  const dispatch = useDispatch();
  const {identity} = useSelector((state) => state.userData);
  const view = !!identity ? (
    <>
      <NavBar />
      <ChatPanel />
      <SendMessage />
    </>
  ) : (
    <Login />
  );

  useEffect(() => {
    Object.values(IncomingMsg).forEach((type) =>
      dispatch({ type })
    );
  }, [dispatch]);

  return view;
}

export default AppBody;
