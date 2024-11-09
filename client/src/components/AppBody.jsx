import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChatPanel from "./ChatPanel";
import NavBar from "./NavBar";
import SendMessage from "./SendMessage";
import Login from "./Login";
import { IncomingMsg, SocketEvents } from "../common/constants";

function AppBody() {
  const dispatch = useDispatch();

  useEffect(() => {
    Object.values(IncomingMsg).forEach((type) => dispatch({ type }));
    Object.values(SocketEvents).forEach((type) => dispatch({ type }));
  }, [dispatch]);

  return (
    <>
      <Login />
      <NavBar />
      <ChatPanel />
      <SendMessage />
    </>
  );
}

export default AppBody;
