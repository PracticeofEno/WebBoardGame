import { useEffect, useState, useContext } from "react";
import { Player, GAME_STATE } from "../utils/player";
import UserView from "../components/game/user/UserView";
import CardView from "../components/game/card/CardView";
import Grave from "../components/game/card/Grave";
import io from "socket.io-client";
import Cookies from "js-cookie";
import TokenControl from "../components/game/token/tokenControl";
import Battle from "../components/game/battle/battle";
import Choise from "../components/game/battle/choise";

export default function Grid() {
  const [socket, setSocket] = useState(null);  			// 연결 소켓
  const [host, setHost] = useState(false);     			// 방장 여부
  const [startable, setStartable] = useState(false);	// 게임 시작 가능 여부
  const [self_number, setSelfNumber] = useState(999);	// 방에서 자신의 번호
  const [turn, setTurn] = useState(-1);   				// 
  const [gameState, setGameState] = useState(GAME_STATE.READY);		// 게임 상태
  

  const [mine, setMine] = useState(new Player());			//자신 데이터
  const [opponent, setOpponent] = useState(new Player());	//상대 데이터

  useEffect(() => {
    const socket = io.connect("http://localhost:5000/game", {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        },
      },
    });
	setSocket(socket);

    socket?.emit("create_game", async () => {
      console.log("send create game");
    });

    socket?.on("player", (message) => {
      console.log(`self_nubmer ${self_number}`);
      setSelfNumber(message);
    });

    socket?.on(
      "current_player",
      ({
        player1_number,
        player1_nickname,
        player1_avatar,
        player2_nickname,
        player2_avatar,
        player2_number,
      }) => {
        if (self_number != 999) {
          if (self_number == player1_number) {
            setMine({
              ...mine,
              nickname: player1_nickname,
              avatar: player1_avatar,
            });
            setOpponent({
              ...opponent,
              nickname: player2_nickname,
              avatar: player2_avatar,
            });
          } 
		  else {
            setMine({
              ...mine,
              nickname: player2_nickname,
              avatar: player2_avatar,
            });
            setOpponent({
              ...opponent,
              nickname: player1_nickname,
              avatar: player1_avatar,
            });
          }
        }
      }
    );

    socket?.on("host", (message) => {
      setHost(true);
      console.log(`you are host`);
    });

    socket?.on("join_user", (message) => {
      console.log("user joined");
    });

    socket?.on("ready", (message) => {
      console.log("ready to start");
      setStartable(true);
    });

    socket?.on("unready", (message) => {
      setStartable(false);
    });

    socket?.on("end", (message) => {
      let message2 = "winner is " + message.winner;
      console.log(message);
    });

    socket?.on("error", (data) => {
      console.log(`error : ${data.message}`);
    });

    socket?.on("start", (data) => {
      setGameState(true);
      console.log("game start");
    });

	socket?.on("turn", (data) => {
		console.log(data);
		setTurn(data.turn);
		setGameState(data.state);
	});

    socket?.on("start_game", (data) => {
      setGameState(1);
      console.log("game start");
    });

	socket?.on("state_change", (data) => {
		setGameState(data);
		console.log(`state_change -> ${data}`);
	});

	//결과 나왔을때
	socket?.on("result", (data) => {
		console.log(data);
		if (self_number == 1) {
			mine.submit_cards.push(data.player1_card);
			opponent.submit_cards.push(data.player2_card);
		}
		else {
			mine.submit_cards.push(data.player2_card);
			opponent.submit_cards.push(data.player1_card);
		}
		setMine({...mine, submit_card: "", submit_cards: mine.submit_cards});
		setOpponent({...opponent, submit_card: "", submit_cards: opponent.submit_cards});

	});

	//결과가 비겼을때 
	socket?.on("draw", (data) => {
		console.log(data);
		setMine({...mine, submit_card: ""});
		setOpponent({...opponent, submit_card: ""});
	});

	socket?.on("submit_card", (data) => {
		console.log(data);
		if (data.player_number == self_number) {
			let tmp = mine;
			tmp[""+ data.kind] = tmp[""+ data.kind] - 1;
			setMine({...mine, tiger: tmp.tiger, fox: tmp.fox, rabbit: tmp.rabbit, gam: tmp.gam, submit_card: data.kind});
		}
		else {
			let tmp = opponent;
			tmp.submit_card = "메롱 안보여줌";
			setOpponent({...opponent, submit_card: tmp.submit_card});
		}
	});

    return () => {
      socket?.disconnect();
    };

  }, [self_number]);

  function tmp() {
    console.log(self_number);
  }

  function tmp2() {
    socket?.emit("start", null);
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
        <div className="e bg-battle bg-cover bg-center bg-no-repeat ">
          {
		  	host && startable && (
            	<button onClick={tmp2} className="bg-red-400">
             	 start
            	</button>
          	)
		  }
		  {
			(gameState > 0) && <Battle mine={mine.submit_card} opponent={opponent.submit_card}/>
		  }
        </div>
        <div className="f">
			{
				(turn == self_number && gameState == GAME_STATE.SECOND_CHOICE ) && <Choise socket={socket}/>
			}
		</div>
        <div className="g">chatting tab</div>
        <div className="i flex flex-row justify-center items-center">
          <CardView
            tiger={mine.tiger}
            fox={mine.fox}
            rabbit={mine.rabbit}
            gam={mine.gam}
            state={gameState}
			socket={socket}
          />
        </div>
        <div className="j">
			{
				((turn == self_number) && (gameState == GAME_STATE.FIRST_MONEY_SELECT))&& <TokenControl socket={socket}/>
			}
		</div>
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
