import { useEffect, useState } from "react";
import { Player } from "../utils/player";
import TokenView from "../components/game/token/TokenView";
import UserView from "../components/game/user/UserView";
import Card from "../components/game/card/Card"

let tmp = [
	{
	  id: '1',
	  name: "여우",
	  src: "/images/fox.svg",
	  detail: "토끼와 곶감을 이김",
   },
   {
	id: '2',
	name: "토끼",
	src: "/images/rabbit.svg",
	detail: "곶감을 이김",
  },
  {
	id: '3',
	name: "호랑이",
	src: "/images/tiger.svg",
	detail: "토끼,여우를 이김",
  },
  {
	id: '4',
	name: "곶감",
	src: "/images/gam.svg",
	detail: "호랑이를 이김",
  },
  ];


export default function Grid() {
	const [player1, setPlayer1] = useState(new Player());
	const [player2, setPlayer2] = useState(new Player());

	
  return (
    <div className="wrapper">
      <div className="a border-2 border-red-100">Grave Card Tab</div>
      <div className="b border-2 border-red-100">
		<UserView nickname2={player2.nickname} src2={player2.avatar}/>
	  </div>
      <div className="c border-2 border-red-100">
		<TokenView gold={player2.token}/>
	  </div>
      <div className="d border-2 border-red-100">Navi Var</div>
	  <div className="e border-2 border-red-100">Battle Tab</div>
      <div className="f border-2 border-red-100">Control tab</div>
      <div className="g border-2 border-red-100">chatting tab</div>
	  <div className="h border-2 border-red-100">Grave Card Tab</div>
	  <div className="i border-2 border-red-100">
		<div className="flex relative bg-gray-400 justify-center items-center">
			{
				tmp.map(value => {
					return <Card key={`${value.id}`} name={`${value.name}`} src={`${value.src}`} detail={`${value.detail}`}/>
				  })
			}
		</div>
	  </div>
	  <div className="j border-2 border-red-100">Token Control tab</div>
	  <div className="k border-2 border-red-100">
	  	<TokenView gold={player1.token}/>
	  </div>
	  <div className="l border-2 border-red-100">
	  	<UserView nickname2={player1.nickname} src2={player1.avatar}/>
	  </div>
      <style jsx>{`
        .wrapper {
          display: grid;
		  width: 100vw;
		  height: 100vh;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 0.3fr 0.3fr 2fr 1fr 0.3fr;
          grid-template-areas:
		      "a a b b b b c c d d d"
			  "a a . . . . c c g g g"
			  "e e e e e e f f g g g"
			  "h h i i i i k k g g g"
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
