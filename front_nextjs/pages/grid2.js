import { useEffect, useState } from "react";
import { Player } from "../utils/player";
import TokenView from "../components/game/token/TokenView";
import UserView from "../components/game/user/UserView";

export default function Grid() {
	const [player1, setPlayer1] = useState(new Player());
	const [player2, setPlayer2] = useState(new Player());

	
  return (
    <div className="wrapper">
      <div className="a">Grave Card Tab</div>
      <div className="b">
		<UserView nickname2="haha" src2="/api/images/avatar/1"/>
	  </div>
      <div className="c">
		<TokenView gold={player2.token}/>
	  </div>
      <div className="d">Navi Var</div>
	  <div className="e">Battle Tab</div>
      <div className="f">Control tab</div>
      <div className="g">chatting tab</div>
	  <div className="h">Grave Card Tab</div>
	  <div className="i">hand Card Tab</div>
	  <div className="j">Token Control tab</div>
	  <div className="k">
	  	<TokenView gold={player1.token}/>
	  </div>
	  <div className="l">User tab</div>
      <style jsx>{`
        .wrapper {
          display: grid;
		  width: 100vw;
		  height: 100vh;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 0.5fr 0.5fr 3fr 1fr 1fr;
          grid-template-areas:
		      "a a b b b c c c d d d"
			  "a a b b b c c c g g g"
			  "e e e e e e f f g g g"
			  "h h i i i j k k g g g"
			  "h h l l l j k k g g g"
        }

		.a { 
			grid-area: a; 
		}
		.b { grid-area: b; }
		.c { grid-area: c; }
		.d { grid-area: d; }
		.e { grid-area: e; }
		.f { grid-area: f; }
		.g { grid-area: g; }
		.h { grid-area: h; }
		.i { grid-area: i; }
		.j { grid-area: j; }
		.k { grid-area: k; }
		.l { grid-area: l; }
		
      `}</style>
    </div>
  );
}
