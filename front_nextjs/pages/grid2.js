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
	  <div className="c">Token Count</div>
      <div className="d">Navi Var</div>
	  <div className="e">Battle Tab</div>
	  <div className="f">Battle Action Tab</div>
      <div className="g">chatting tab</div>
	  <div className="i">hand Card Tab</div>
	  <div className="j">Token Control tab</div>
	  <div className="l">
	  	<UserView nickname2="haha" src2="/api/images/avatar/1"/>
	  </div>
      <style jsx>{`
        .wrapper {
          display: grid;
		  width: 100vw;
		  height: 100vh;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 0.5fr 0.5fr 1.5fr 1.5fr 0.5fr;
          grid-template-areas:
		      "b b b b b b b c d d"
			  "a e e e e e e f g g"
			  "a e e e e e e f g g"
			  "i i i i i i i j g g"
			  "l l l l l l l j g g"
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
		.i { grid-area: i; }
		.j { grid-area: j; }
		.k { grid-area: k; }
		.l { grid-area: l; }
		
		div {
			border: 1px solid black;
		}
      `}</style>
    </div>
  );
}
