import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";


export default function Tmp() {
  const [socket, setSocket] = useState(null);
  const [host, setHost] = useState(false);
  const [startable, setStartable] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState("");
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

	socket?.on("player", (message) => {
		setPlayerNumber(message)
		console.log(`player Number -> ${message}`);
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
		let message2 = "winner is " + message.winner;
		setMessage(message2)
		console.log(message);
    });

	socket.on("error", (data) => {
		setMessage(data.message)
		console.log(data.message);
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
	});
  }
  function sendRabbit() {
	socket.emit("submit_card", {
		kind: 'rabbit',
	});
  }
  function sendGam() {
	socket.emit("submit_card", {
		kind: 'gam',
	});
  }

  function sendToken() {
	socket.emit("submit_token", {
		count: count
	});
  }

  function sendBattle() {
	socket.emit("submit_choice", {
		choice: 'battle',
	});
  }
  function sendDrop() {
	socket.emit("submit_choice", {
		choice: 'drop',
	});
  }

  function sendDouble() {
	socket.emit("submit_choice", {
		choice: 'double',
	});
  }

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <button onClick={handleClick} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">1</button>
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
	  <button onClick={sendBattle} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        승부
      </button>
      <button onClick={sendDrop} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        포기
      </button>
	  <button onClick={sendDouble} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        따당
      </button>
	  <input type="text" onChange={(e) => setCount(e.target.value)} placeholder="token count" value={count}></input>
	  <button onClick={sendToken} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">
        토큰 내기
      </button>
	  <div>
		{ message }
	  </div>
    </div>
  );
}
