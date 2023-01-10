import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      },
    },
};

export default function Tmp() {
  const [socket, setSocket] = useState(null);
  let k = 3;

  useEffect(() => {
    const socket = io("http://localhost:5000/game", socketOptions)
    setSocket(socket);

    socket?.on("connect", async () => {
      console.log("socket connected");
    });
    socket.on('message', (message) => {
      console.log(message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit('message', 'Hello world');
    }
  };

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <button onClick={handleClick} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">1</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">2</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">3</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">4</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">5</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">6</button>
      <button className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">7</button>
    </div>
  );
}
