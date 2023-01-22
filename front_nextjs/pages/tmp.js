import { useState } from "react";
import Battle from "../components/game/battle/battle"
import Choise from "../components/game/battle/choise"

export default function Tmp() {
  return (
    <div className="flex w-full h-full justify-start bg-gray-400 flex-row">
		<div className="flex w-[12rem] h-[40rem] bg-pink-400">
			<Choise />
		</div>
    </div>
  );
}
