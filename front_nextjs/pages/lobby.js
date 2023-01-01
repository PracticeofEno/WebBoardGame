import BigBox from "../components/lobby/BigBox";
import TopPadding from "../components/lobby/TopPadding";
import Chat from "../components/lobby/Chat";
import Middle from "../components/lobby/MiddlePannel";
import io from "socket.io-client";
import { useEffect } from "react";

export default function Lobby() {
  useEffect(() => {
    // connect to socket server
    const socket = io.connect("http://localhost:5050/game");

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  return (
    <BigBox>
      <TopPadding />
      <Middle />
      <Chat />
    </BigBox>
  );
}
