import Image from "next/image";
import { useState } from "react";
import Token from "../components/game/token/Token";
import TokenView from "../components/game/token/TokenView";
import Avatar from "../components/avatar"
import UserView from "../components/game/user/UserView"

export default function Tmp() {
  const [nickname, setMoney] = useState("My Nickname");
  const [avatar, setAvatar] = useState("/api/images/avatar/1");

  function changeMoney() {
	setMoney(32);
  }

  return (
    <div className="flex w-[80rem] h-[20rem] justify-start bg-gray-400 flex-row">
      <div className="w-[26rem] h-[13rem] flex bg-red-200 justify-center items-center">
		<UserView nickname={nickname} avatar={avatar}/> 
		
      </div>
    </div>
  );
}
