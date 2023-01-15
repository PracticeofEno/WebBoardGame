import Image from "next/image";
import { useState } from "react";
import Token from "../components/game/token/Token";
import TokenView from "../components/game/token/TokenView";
import Avatar from "../components/avatar"
import UserView from "../components/game/user/UserView"
import Card from "../components/game/card/Card";

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
  
export default function Tmp() {
  const [nickname, setMoney] = useState("My Nickname");
  const [avatar, setAvatar] = useState("/api/images/avatar/1");

  function changeMoney() {
	setMoney(32);
  }

  return (
    <div className="flex w-[80rem] h-[20rem] justify-start bg-gray-400 flex-row">
      <div className="w-[21rem] h-[23rem] flex bg-red-200 justify-center items-center">
		<Card src={tmp[0].src} name={tmp[0].name} detail={tmp[0].detail} />
      </div>
    </div>
  );
}
