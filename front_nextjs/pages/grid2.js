import { useEffect, useState } from "react";
import { Player } from "../utils/player";
import UserView from "../components/game/user/UserView";
import CardView from "../components/game/card/CardView";
import Grave from "../components/game/card/Grave";
import io from "socket.io-client";
import Cookies from "js-cookie";

export default function Grid() {
  const [socket, setSocket] = useState(null);
  const [host, setHost] = useState(false);
  const [startable, setStartable] = useState(false);
  const [self_number, setSelfNumber] = useState(999);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState("");
  const [gameState, setGameState] = useState(false);

  const [mine, setMine] = useState(new Player());
  const [opponent, setOpponent] = useState(new Player());

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
      console.log(`self_nubmer ${self_number}`);
      setSelfNumber(message);
    });

    socket?.on("current_player", ({ player1_number, player1_nickname, player1_avatar, player2_nickname, player2_avatar, player2_number }) => {
      if (self_number != 999) {
        if (self_number == player1_number) {
			console.log("abc");
			setMine({ ...mine, nickname: player1_nickname, avatar: player1_avatar });
			setOpponent({ ...opponent, nickname: player2_nickname, avatar: player2_avatar});
        } 
		else {
			console.log("def");
			setMine({ ...mine, nickname: player2_nickname, avatar: player2_avatar})
			setOpponent({ ...opponent, nickname: player1_nickname, avatar: player1_avatar });
        }
      }
    });

    socket.on("host", (message) => {
      setHost(true);
      console.log(`you are host`);
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
      setMessage(message2);
      console.log(message);
    });

    socket.on("error", (data) => {
      setMessage(data.message);
      console.log(data.message);
    });

    socket.on("start", (data) => {
      setGameState(true);
      console.log("game start");
    });

	socket.on("start_game", (data) => {
		setGameState(true);
		console.log("game start");
	  });


    return () => {
      socket.disconnect();
    };
  }, [self_number, host]);

  function tmp() {
    console.log(self_number);
  }

  function tmp2() {
    socket.emit("start", null);
  }

  return (
    <div className="wrapper">
      <div className="a border-2 border-red-100">
        <Grave
          cards1={mine.submit_cards}
          cards2={opponent.submit_cards}
          state={gameState}
        />
      </div>
      <div className="b border-2 border-red-100">
        <UserView nickname2={opponent.nickname} src2={opponent.avatar} />
      </div>
      <div className="c">
        Token Count
        <button onClick={tmp} className="bg-gray-400">
          aa
        </button>
      </div>
      <div className="d">Navi Var</div>
      <div className="e">Battle Tab
	  	{
			(host && startable ) && <button onClick={tmp2} className="bg-red-400">start</button>
	  	}
	  </div>
      <div className="f">Battle Action Tab</div>
      <div className="g">chatting tab</div>
      <div className="i flex flex-row justify-center items-center">
        <CardView
          tiger={mine.tiger}
          fox={mine.fox}
          rabbit={mine.rabbit}
          gam={mine.gam}
          state={gameState}
		  gmaeSocket={socket}
        />
      </div>
      <div className="j">Token Control tab</div>
      <div className="l">
        <UserView nickname2={mine.nickname} src2={mine.avatar} />
      </div>
      <style jsx>{`
        .wrapper {
          display: grid;
          width: 100vw;
          height: 100vh;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: 0.5fr 0.5fr 1.5fr 1fr 0.5fr;
          grid-template-areas:
            "b b b b b b b c d d"
            "a e e e e e e f g g"
            "a e e e e e e f g g"
            "i i i i i i i j g g"
            "l l l l l l l j g g";
        }

        .a {
          grid-area: a;
        }
        .b {
          grid-area: b;
        }
        .c {
          grid-area: c;
        }
        .d {
          grid-area: d;
        }
        .e {
          grid-area: e;
        }
        .f {
          grid-area: f;
        }
        .g {
          grid-area: g;
        }
        .i {
          grid-area: i;
        }
        .j {
          grid-area: j;
        }
        .k {
          grid-area: k;
        }
        .l {
          grid-area: l;
        }

        div {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
}
