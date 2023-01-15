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

  const haha = () => {
	tmp.map(value => {
		return <Card key={`${value.id}`} name={`${value.name}`} src={`${value.src}`} detail={`${value.detail}`}/>
	  })
  }

export default function Grid() {
	const [player1, setPlayer1] = useState(new Player());
	const [player2, setPlayer2] = useState(new Player());

	
  return (
    <div className="wrapper">
      <div className="a border-2 border-red-100">Grave Card Tab</div>
      <div className="b border-2 border-red-100">
		<UserView nickname2={player2.nickname} src2={player2.avatar}/>
	  </div>
	  <div className="c">Token Count</div>
      <div className="d">Navi Var</div>
	  <div className="e">Battle Tab</div>
	  <div className="f">Battle Action Tab</div>
      <div className="g">chatting tab</div>
	  <div className="i flex flex-row justify-center items-center">
	  	{
		tmp.map(value => {
            return (
				<div key={`${value.id}`} className="flex flex-row w-[13rem] h-[16rem]">
					<Card key={`${value.id}`} name={`${value.name}`} src={`${value.src}`} detail={`${value.detail}`}/>
				</div>)
          })
		}
	  </div>
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
          grid-template-rows: 0.5fr 0.5fr 1.5fr 1fr 0.5fr;
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
		.i { 
			grid-area: i; 
		}
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
