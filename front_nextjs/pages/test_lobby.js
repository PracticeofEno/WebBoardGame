import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";


export default function Tmp() {
  const [socket, setSocket] = useState(null);
  const [host, setHost] = useState(false);
  const [startable, setStartable] = useState(false);
  let k = 3;

  useEffect(() => {
    const socket = io("http://localhost:5000/game", {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        },
      },
    });
    setSocket(socket);

    socket?.on("connect", async () => {
      console.log("socket connected");
    });

	socket.on("host", (message) => {
		setHost(true)
		console.log(`you are host ${host}`);
    });

	socket.on("join_user", (message) => {
		console.log("user joined");
	  });

    socket.on("ready", (message) => {
		console.log("ready to start");
		setStartable(true);
    });

    socket.on("unready", (message) => {
		setStartable(false);
    });

	socket.on("end", (message) => {
		console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit("start", "Hello world");
    }
  };

  function startGame() {
	socket.emit("start");
  }

  function sendTiger() {
	socket.emit("submit_card", {
		kind: 'tiger',
	});
  }
  function sendFox() {
	socket.emit("submit_card", {
		kind: 'fox',
		count: 1,
	});
  }
  function sendRabbit() {
	socket.emit("submit_card", {
		kind: 'rabbit',
		count: 1,
	});
  }
  function sendGam() {
	socket.emit("submit_card", {
		kind: 'gam',
		count: 1,
	});
  }
  function sendDrop() {
	socket.emit("submit_card", {
		kind: 'drop',
		count: 1,
	});
  }

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <button
        onClick={handleClick}
        className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400"
      >
        1
      </button>
	  {(host && startable) ? <button onClick={startGame} className={`w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400 }`}> 시작하기 </button> : <button>a</button>}
      <button onClick={sendTiger} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        호랑이
      </button>
      <button onClick={sendFox}className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        여우
      </button>
      <button onClick={sendRabbit}className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        토끼
      </button>
      <button onClick={sendGam}className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        감
      </button>
      <button onClick={sendDrop} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        포기
      </button>
    </div>
  );
}
